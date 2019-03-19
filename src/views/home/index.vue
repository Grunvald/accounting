<template>
  <v-container>
    <svg
      v-if="$store.state.money"
      class="main"
      viewBox="0 0 500 500"
      xmlns="http://www.w3.org/2000/svg"
    >
      <foreignObject
        x="0"
        y="0"
        width="100%"
        height="100%"
      >
        <div
          v-for="(item, key, index) in $store.state.money.spent"
          :key="key"
          class="main__item-wrap"
          xmlns="http://www.w3.org/1999/xhtml"
        >
          <div
            class="main__item"
            :style="`transform:rotate(${rotate(index) + 0.1}deg)`"
          >
            <Card
              :data="$store.getters[item.id]"
              :rotate="rotate(index)"
              :color="colors[index]"
            />
          </div>
        </div>
        <div class="main__info"></div>
      </foreignObject>
    </svg>
  </v-container>
</template>
<script>
  import Card from './card';

  export default {
    name: "index",
    components: {
      Card,
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
    }),
    mounted() {

    },
    methods: {
      rotate(index) {
        return 360 / Object.keys(this.$store.state.money.spent).length * index
      }
    }
  }
</script>
<style
  lang="scss"
  src="./_main.scss"
></style>