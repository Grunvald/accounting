<template>
  <main>
    <div class="main-wrap">
      <div
        :class="{'blurred':isCalcShow}"
        class="main"
      >
        <div
          v-for="(item, key, index) in $store.getters.getData"
          :key="key"
          class="main__item-wrap"
        >
          <div
            class="main__item"
            :style="`transform:rotate(${rotate(index)}deg)`"
            @mouseover="hovered = {id:item.id, index:index, color:colors[index]}"
            @mouseleave="hovered = null"
          >
            <Card
              :data="item"
              :rotate="rotate(index)"
              :color="colors[index]"
              :percent="hoveredSpent.percent"
              @showCalc="showCalc({id:item.id, index:index, color:colors[index]})"
            />
          </div>
        </div>
        <div class="main__info">
          <transition name="slide">
            <div
              v-if="hovered"
              key="title"
              class="main__info-title"
            >
              <h2
                class="info-title"
                v-text="$store.getters.getData[hovered.id].title"
              ></h2>
              <h3
                class="info-total"
                v-html="hoveredSpent.total"
              ></h3>
            </div>
            <div
              v-else
              key="balance"
              class="main__info-balance"
            >
              <h3
                v-html="income"
                class="balance-income"
              ></h3>
              <h2
                v-html="balance"
                class="balance"
              ></h2>
              <h3
                v-html="totalSpent"
                class="balance-totalSpent"
              ></h3>
            </div>
          </transition>
        </div>
      </div>
    </div>
    <History/>
    <div
      :class="{'blurred':isCalcShow}"
      class="main__control"
    >
      <button
        class="btn btn--spent"
        @click="showCalc({id:'spent'})"
      ></button>
      <button
        class="btn btn--add"
        @click="showCalc({id:'add'})"
      ></button>
    </div>
    <transition name="fade">
      <div
        v-if="isCalcShow"
        class="overlay"
      ></div>
    </transition>
    <transition name="calc">
      <Calc
        v-if="isCalcShow"
        :selected="selected"
        :isCalcShow="isCalcShow"
        :colors="colors"
        @closeCalc="isCalcShow = false"
        @selectCategory="selected = $event"
      />
    </transition>
  </main>
</template>
<script>
  import Card from './card';
  import Calc from './calc'
  import History from './history'

  export default {
    name: "index",
    components: {
      Card,
      Calc,
      History
    },
    data: () => ({
      colors: [
        '#DC143C',
        '#ff4400',
        '#00FA9A',
        '#FF1493',
        '#556B2F',
        '#008080',
        '#FFA500',
        '#FF00FF',
        '#191970',
        '#2F4F4F',
        '#8B4513',
        '#00FFFF',
      ],
      isCalcShow: false,
      selected: '',
      hovered: null
    }),
    watch: {
      isCalcShow(value) {
        this.$emit('CalcShow', value)
      }
    },
    computed: {
      balance() {
        return this.formatMoney(this.$store.getters.getBalance);
      },
      totalSpent() {
        return this.formatMoney(this.$store.getters.getTotalSpentForPeriod);
      },
      income() {
        return this.formatMoney(this.$store.getters.getTotalIncomeForPeriod);
      },
      date() {
        return this.$store.getters.today
      },
      hoveredSpent() {
        let res = {
          total: 0,
          percent: 0
        };
        if (this.hovered) {
          switch (this.$store.getters.getCheckPeriod) {
            case 'Month':
              if (this.$store.getters.getSpent[this.hovered.id][this.date.getFullYear()] && this.$store.getters.getSpent[this.hovered.id][this.date.getFullYear()][this.date.getMonth()]) {
                res.percent = (this.$store.getters.getSpent[this.hovered.id][this.date.getFullYear()][this.date.getMonth()].total / this.$store.getters.getTotalSpentForPeriod * 100).toFixed(2);
                res.total = this.formatMoney(this.$store.getters.getSpent[this.hovered.id][this.date.getFullYear()][this.date.getMonth()].total);
              }
              break;
            case 'Year':
              if (this.$store.getters.getSpent[this.hovered.id][this.date.getFullYear()]) {
                res.percent = (this.$store.getters.getSpent[this.hovered.id][this.date.getFullYear()].total / this.$store.getters.getTotalSpentForPeriod * 100).toFixed(2);
                res.total = this.formatMoney(this.$store.getters.getSpent[this.hovered.id][this.date.getFullYear()].total);
              }
              break;
            case 'All':
              res.percent = (this.$store.getters.getSpent[this.hovered.id].total / this.$store.getters.getTotalSpentForPeriod * 100).toFixed(2);
              res.total = this.formatMoney(this.$store.getters.getSpent[this.hovered.id].total);
          }
        }
        return res;
      }
    },
    mounted() {
      window.addEventListener('popstate', this.closeCalcOnBack)
    },
    methods: {
      rotate(index) {
        return 360 / Object.keys(this.$store.getters.getData).length * index
      },
      showCalc(id) {
        this.isCalcShow = true;
        this.selected = id;
      },
      closeCalcOnBack(event) {
        if (this.isCalcShow) {
          event.preventDefault();
          this.isCalcShow = false;
        }
      },
      formatMoney(value) {
        let val = (value / 1).toFixed(2).replace('.', ',');
        let res = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".").split(',');
        return `${res[0]}<small>.${res[1]}</small>`
      }
    }
  }
</script>
<style
  lang="scss"
  src="./scss/_main.scss"
></style>