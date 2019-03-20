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
          :style="`transform:rotate(${rotate(index)}deg)`">
          <Card
            :data="$store.getters[item.id]"
            :rotate="rotate(index)"
            :color="colors[index]"
            @showCalc="isCalcShow = true"
          />
        </div>
      </div>
      <div class="main__info"></div>
    </div>
    <transition name="calc">
    <Calc
      v-if="isCalcShow"
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
    }),
    mounted() {

    },
    methods:{
      rotate(index){
        return 360 / Object.keys(this.$store.state.money.spent).length * index
      }
    }
  }
</script>
<style
  lang="scss"
  src="./scss/_main.scss"
></style>