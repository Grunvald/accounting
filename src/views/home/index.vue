<template>
  <v-container>
    <div
      v-if="$store.state.money"
      class="main"
    >
      <div
        v-for="(item, key, index) in $store.state.money.spent"
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
            :data="$store.getters[item.id]"
            :rotate="rotate(index)"
            :color="colors[index]"
            @showCalc="showCalc({id:item.id, index:index, color:colors[index]})"

          />
        </div>
      </div>
      <div class="main__info">
        <h1 v-if="hovered">{{ $store.state.title[hovered.id] }}</h1>
        <h1 v-else>balance</h1>
      </div>
    </div>
    <div class="main__control">
      <button class="btn btn--add"></button>
      <button class="btn btn--spent"></button>
    </div>
    <transition name="calc">
    <Calc
      v-if="isCalcShow"
      :selected="selected"
      @closeCalc="isCalcShow = false"
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
    data:()=>({
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
      selected:'',
      hovered:null
    }),
    mounted() {

    },
    methods:{
      rotate(index){
        return 360 / Object.keys(this.$store.state.money.spent).length * index
      },
      showCalc(id){
        this.isCalcShow = true;
        this.selected = id;
      },
      test(){
        debugger;
      }
    }
  }
</script>
<style
  lang="scss"
  src="./scss/_main.scss"
></style>