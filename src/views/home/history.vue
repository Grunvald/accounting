<template>
  <div class="history-wrap">
    <div
      :class="{'history--opened':isHistoryOpened}"
      class="history"
    >
      <button
        class="history__title"
        @click="changeStateHistory"
      >
        <div class="burger"></div>
        <span class="text">ИСТОРИЯ</span>
        <div class="burger"></div>
      </button>
      <transition
        @before-enter="beforeEnter"
        @after-enter="afterEnter"
        @before-leave="beforeLeave"
        @leave="leave"
      >
        <div
          v-if="isHistoryOpened"
          class="history__body-wrap"
        >
          <div class="history__body">
            <ul class="history__list">
              <li
                class="history__list-item history__list-item--income"
                @click="toggleActive($event)"
              >
                <div class="history__list-item-body">
                  <Money
                    width="24"
                    height="24"
                  />
                  <span
                    class="title"
                    v-text="'Приход'"
                  ></span>
                  <span class="badge">{{ Object.keys($store.getters.getTotalIncome.once['2019']['2']).length }}</span>
                  <span class="income">{{ priceToStr($store.getters.getIncome['2019']['2'].total) }}</span>
                </div>
                <ul class="history__list--sub">
                  <li
                    v-for="(i, key) in $store.getters.getTotalIncome.once['2019']['2']"
                    :key="key"
                    class="history__list--sub-item"
                  >
                    <span
                      class="price"
                      v-text="priceToStr(i.price)"
                    ></span>
                    <span
                      class="descr"
                      v-text="i.description"
                    ></span>
                    <span
                      class="date"
                      v-text="dateToStr(i.date.seconds)"
                    ></span>
                  </li>
                </ul>
              </li>
              <li
                v-for="(item, key) in $store.getters.getData"
                :key="key"
                v-if="item['2019'] && item['2019']['2']"
                class="history__list-item"
                @click="toggleActive($event)"
              >
                <div class="history__list-item-body">
                  <component
                    :is="item.id"
                    width="24"
                    height="24"
                  ></component>
                  <span
                    class="title"
                    v-text="item.title"
                  ></span>
                  <span class="badge">{{ Object.keys(item['2019']['2']).length }}</span>
                  <span class="spent">{{ priceToStr($store.getters.getSpent[item.id]['2019']['2'].total) }}</span>
                </div>
                <ul class="history__list--sub">
                  <li
                    v-for="(i, key) in item['2019']['2']"
                    :key="key"
                    class="history__list--sub-item"
                  >
                    <span
                      class="price"
                      v-text="priceToStr(i.price)"
                    ></span>
                    <span
                      class="descr"
                      v-text="i.description"
                    ></span>
                    <span
                      class="date"
                      v-text="dateToStr(i.date.seconds)"
                    ></span>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
  const monthShort = ['Янв', 'Фев', 'Мар', 'Апр', 'Мая', 'Июн', 'Июл', 'Авг', 'Снт', 'Окт', 'Ноя', 'Дек',];
  export default {
    name: "history",
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
      Money: () => import( /* webpackChunkName: "icons" */ '@/icons/money.svg'),
    },
    data: () => ({
      isHistoryOpened: false,
      parent: {}
    }),
    mounted() {
      window.addEventListener('popstate', this.historyClose);
    },
    methods: {
      changeStateHistory() {
        this.isHistoryOpened = !this.isHistoryOpened
      },
      historyClose(){
        this.isHistoryOpened = false;
      },
      toggleActive(event) {
        event.currentTarget.classList.toggle('active');
      },
      dateToStr(sec) {
        let date = new Date(sec * 1000);
        return `${date.getDate()} ${monthShort[date.getMonth()]}`
      },
      priceToStr(price) {
        let res = price.toFixed(2).toString().split('.');
        return `${res[0] ? res[0] + ' р. ' : ''}${res[1] > 0 ? res[1] + ' коп.' : ''}`
      },
      beforeEnter(el) {
        el.style.height = 0;
        this.parent.el = document.getElementsByClassName('history-wrap')[0];
        this.parent.pos = this.parent.el.getBoundingClientRect().top;
      },
      afterEnter(el) {
        el.style.height = this.parent.pos + 'px';
      },
      beforeLeave(el) {
        el.style.height = 0;
      },
      leave(el, done) {
        el.addEventListener('transitionend', done);
      },
    }
  }
</script>
<style
  lang="scss"
  src="./scss/_history.scss"
></style>