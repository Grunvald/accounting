<template>
  <v-container>
    <div class="main">
      <div
        v-for="(item, key, index) in $store.getters.getData"
        :key="key"
        class="main__item-wrap"
      >
        <div
          class="main__item"
          :style="`transform:rotate(${rotate(index)}deg)`"
          @mouseover="hovered = item"
          @mouseout="hovered = null"
        >
          <Card
            :data="item"
            :rotate="rotate(index)"
            :color="colors[index]"
            @showCalc="showCalc({id:item.id, index:index, color:colors[index]})"
          />
        </div>
      </div>
      <div class="main__info">
        <transition name="fade" mode="out-in">
          <div
            v-if="hovered"
            key="title">
            <h2 v-text="$store.getters.getData[hovered.id].title"></h2>
            <h2 v-text="$store.getters.getSpent[hovered.id]"></h2>
          </div>
          <div
            v-else
            key="balance"
          >
            <h2 v-text="$store.getters.getBalance"></h2>
            <h2 v-text="$store.getters.getSpent.total"></h2>
          </div>
        </transition>
      </div>
    </div>
    <div class="main__control">
      <button
        class="btn btn--spent"
        @click="showCalc({id:'spent'})"
      ></button>
      <button
        class="btn btn--add"
        @click="showCalc({id:'add'})"
      ></button>
    </div>
    <transition name="calc">
      <Calc
        v-if="isCalcShow"
        :selected="selected"
        :colors="colors"
        @closeCalc="isCalcShow = false"
        @selectCategory="selected = $event"
      />
    </transition>
  </v-container>
</template>
<script>
  import Card from './card';
  import Calc from './calc'

  export default {
    name: "index",
    components: {
      Card,
      Calc,
    },
    data: () => ({
      colors: [
        '#DC143C',
        '#7CFC00',
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
    mounted() {

    },
    methods: {
      rotate(index) {
        return 360 / Object.keys(this.$store.getters.getData).length * index
      },
      showCalc(id) {
        this.isCalcShow = true;
        this.selected = id;
      },
      test() {
        debugger;
      }
    }
  }
</script>
<style
  lang="scss"
  src="./scss/_main.scss"
></style>