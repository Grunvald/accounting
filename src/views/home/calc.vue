<template>
  <div class="calc-wrap">
    <div class="calc">
      <div class="calc__header">
        <span v-text="header"></span>
        <button
          class="calc__close"
          @click="$emit('closeCalc')"
        ></button>
      </div>
      <div class="calc__body">
        <div class="calc__title">
          <span v-text="today"></span>
        </div>
        <div class="calc__input">
          <label>
            <span class="calc__input-pre">
              <Money
                width="28"
                height="28"
              />
              <span>BYN</span>
            </span>
            <input
              :value="value"
              type="text"
              disabled
            >
            <span class="calc__input-delete">
              <svg
                width="40"
                height="24"
                viewBox="0 0 40 24"
                @click="deleteLast"
              >
                <path
                  d="M0,12 l12,-12 l28,0 l0,24 l-28,0 l-12,-12"
                  stroke="white"
                  fill="rgb(48, 128, 38)"
                ></path>
                <path
                  d="M22,7 l10,10"
                  stroke="white"
                  stroke-width="3"
                  stroke-linecap="round"
                ></path>
                <path
                  d="M32,7 l-10,10"
                  stroke="white"
                  stroke-width="3"
                  stroke-linecap="round"
                ></path>
              </svg>
            </span>
          </label>
        </div>
        <div class="calc__desc">
          <Write/>
          <v-text-field
            v-model="description"
            label="Добавьте заметку"
          ></v-text-field>
        </div>
        <div class="calc__keyboard-wrap">
          <transition name="slide">
            <div
              v-if="isSelectCategory"
              class="calc__keyboard"
              key="categorySelect"
            >
              <button
                v-for="(item, key) in $store.getters.getCategories"
                :key="key"
                :style="`color:${colors[key]}`"
                @click="selectCategory(item, key)"
              >
                <component :is="item"></component>
              </button>
            </div>
            <div
              v-else
              class="calc__keyboard"
              key="calcButtons"
            >
              <button @click="val +='1'">1</button>
              <button @click="val +='2'">2</button>
              <button @click="val +='3'">3</button>
              <button @click="plus">+</button>
              <button @click="val +='4'">4</button>
              <button @click="val +='5'">5</button>
              <button @click="val +='6'">6</button>
              <button @click="minus">-</button>
              <button @click="val +='7'">7</button>
              <button @click="val +='8'">8</button>
              <button @click="val +='9'">9</button>
              <button @click="multiply">x</button>
              <button @click="val +='.'">.</button>
              <button @click="val +='0'">0</button>
              <button @click="divide">/</button>
              <button @click="equal">=</button>
            </div>
          </transition>
        </div>
        <button
          :class="{'disabled':$store.getters.getProcessing || isSelectCategory && !selected.color || selected.color && !value}"
          class="calc__submit"
          @click="selected.id === 'add' ? addMoney() : selected.id === 'spent' ? selectCategory() : addSpent()"
        >
          <div
            class="calc__submit-icon"
            :style="`color: ${selected.color};`"
          >
            <component
              v-if="selected.id !== 'add' && selected.id !== 'spent'"
              :is="selected.id"
              width="32"
              height="32"
            ></component>
          </div>
          <div class="calc__submit-text">
            <span v-if="selected.id === 'add'">Добавить</span>
            <span v-else-if="selected.id === 'spent'">Выбрать категорию</span>
            <span
              v-else
            >Добавить в "{{ $store.getters.getData[selected.id].title }}"
            </span>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>
<script>
  const days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
  const month = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря',];
  let date = new Date();
  export default {
    name: "calc",
    components: {
      auto: () => import( /* webpackChunkName: "icons" */ '@/icons/auto.svg'),
      cafe: () => import( /* webpackChunkName: "icons" */ '@/icons/cafe.svg'),
      cloth: () => import( /* webpackChunkName: "icons" */ '@/icons/cloth.svg'),
      entertainment: () => import( /* webpackChunkName: "icons" */ '@/icons/entertainment.svg'),
      food: () => import( /* webpackChunkName: "icons" */ '@/icons/food.svg'),
      home: () => import( /* webpackChunkName: "icons" */ '@/icons/home.svg'),
      hygiene: () => import( /* webpackChunkName: "icons" */ '@/icons/hygiene.svg'),
      medicine: () => import( /* webpackChunkName: "icons" */ '@/icons/medicine.svg'),
      other: () => import( /* webpackChunkName: "icons" */ '@/icons/other.svg'),
      sport: () => import( /* webpackChunkName: "icons" */ '@/icons/sport.svg'),
      taxi: () => import( /* webpackChunkName: "icons" */ '@/icons/taxi.svg'),
      transport: () => import( /* webpackChunkName: "icons" */ '@/icons/transport.svg'),
      Write: () => import( /* webpackChunkName: "icons" */ '@/icons/write.svg'),
      Money: () => import( /* webpackChunkName: "icons" */ '@/icons/money.svg'),
    },
    props: {
      selected: {type: Object, default: () => ({})},
      colors: {type: Array, default: () => ([])},
      isCalcShow: {type: Boolean, default: false}
    },
    data: () => ({
      val: 0,
      res: null,
      description: '',
      isSelectCategory: false,
    }),
    mounted() {
      document.addEventListener('click', this.close);
    },
    computed: {
      header() {
        return 'Новый расход'
      },
      today() {
        console.log(date.getDay());
        return `${days[date.getDay()]}, ${date.getDate()} ${month[date.getMonth()]}`
      },
      value() {
        return this.val ? Number(this.val) : 0;
      },
    },
    methods: {
      addSpent() {
        let res = {
          id: this.selected.id,
          price: this.value,
          description: this.description,
          date: new Date()
        };
        this.$store.dispatch('addSpent', res);
        this.$emit('closeCalc');
      },
      selectCategory(item, key) {
        if (this.isSelectCategory) {
          this.isSelectCategory = false;
          this.$emit('selectCategory', {id: item, index: key, color: this.colors[key]})
        } else {
          this.isSelectCategory = true;
        }
      },
      addMoney() {
        debugger;
        let res = {
          id: 'once',
          sum: this.value,
          description: this.description,
          date: new Date()
        };
        this.$store.dispatch('addMoney', res);
        this.$emit('closeCalc');
      },
      plus() {
        this.res = this.value.toString() + '+';
        this.val = 0;
      },
      minus() {
        this.res = this.value.toString() + '-';
        this.val = 0;
      },
      divide() {
        this.res = this.value.toString() + '/';
        this.val = 0;
      },
      multiply() {
        this.res = this.value.toString() + '*';
        this.val = 0;
      },
      equal() {
        this.res += this.value;
        this.val = eval(this.res)
      },
      deleteLast() {
        let len = this.value.toString().length;
        this.val = len > 1 ? this.value.toString().substring(0, (len - 1)) : 0;
      },
      close(e) {
        if (e.target.classList.contains('calc-wrap')) this.$emit('closeCalc')
      }
    }
  }
</script>
<style
  lang="scss"
  src="./scss/_calc.scss"
></style>