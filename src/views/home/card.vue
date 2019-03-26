<template>
  <div :class="['card']">
    <div
      :style="`transform:rotate(${-rotate}deg); color:${color}`"
      class="card__ico-wrap"
      @click="$emit('showCalc')"
    >
        <span
          class="card__ico-percent"
        >{{percent}}%
        </span>
        <component
          :is="data.id"
          class="card__ico"
          :alt="data.id"
        />
    </div>
  </div>
</template>
<script>
  export default {
    name: "card",
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
    },
    data: () => ({
      state: 'card',
      dialogAdd: false,
      hovered: false,
    }),
    props: {
      data: {type: Object, default: () => ({})},
      rotate: {type: Number},
      color: {type: String, default: '#000'},
      percent: {type: [String, Number], default: 0}
    },
    methods: {
      stateAdd() {
        this.state = 'add';
      },
      stateHistory() {
        this.state = 'history'
      }
    }
  }
</script>
<style
  lang="scss"
  src="./scss/_card.scss"
></style>