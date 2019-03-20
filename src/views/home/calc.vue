<template>
  <div class="calc-wrap">
    <div class="calc">
      <div class="calc__header">
        <span v-text="header"></span>
        <button class="calc__close" @click="$emit('closeCalc')"></button>
      </div>
      <div class="calc__title">
        <span v-text="today"></span>
      </div>
      <div class="calc__input">
        <label>
          <input
          :value="value"
          type="text"
          disabled
        >
          <span class="calc__input-delete">
            <svg width="40" height="24" viewBox="0 0 40 24" @click="deleteLast">
              <path d="M0,12 l12,-12 l28,0 l0,24 l-28,0 l-12,-12" stroke="white" fill="rgb(48, 128, 38)"></path>
              <path d="M22,7 l10,10" stroke="white" stroke-width="3" stroke-linecap="round"></path>
              <path d="M32,7 l-10,10" stroke="white" stroke-width="3" stroke-linecap="round"></path>
            </svg>
          </span>
        </label>
      </div>
      <div class="calc__desc">
        <label> <input v-model="description" type="text">
        </label>
      </div>
      <div class="calc__keyboard">
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
      <div class="calc__submit"></div>
      <h1>sdf</h1>
    </div>
  </div>
</template>
<script>
  const days = [ 'Воскресенье', 'Понедельник','Вторник','Среда','Четверг','Пятница','Суббота' ];
  const month = [ 'Января', 'Февраля','Марта','Апреля','Мая','Июня','Июля','Августа','Сентября','Октября','Ноября','Декабря', ];
  let date = new Date();
  export default {
    name: "calc",
    data: () => ({
      val: 0,
      res: null,
      description:'',
    }),
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
      plus() {
        this.res = this.value.toString() + '+';
        this.val = 0;
      },
      minus(){
        this.res = this.value.toString() + '-';
        this.val = 0;
      },
      divide(){
        this.res = this.value.toString() + '/';
        this.val = 0;
      },
      multiply(){
        this.res = this.value.toString() + '*';
        this.val = 0;
      },
      equal(){
        this.res += this.value;
        this.val = eval(this.res)
      },
      deleteLast(){
        let len = this.value.toString().length;
        this.val = len > 1 ? this.value.toString().substring(0, (len - 1)) : 0;
      }
    }
  }
</script>
<style
  lang="scss"
  src="./scss/_calc.scss"
></style>