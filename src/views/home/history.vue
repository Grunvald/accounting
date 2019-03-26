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
    <div
      v-if="isHistoryOpened"
      class="history__body"
    >
      <h1>history</h1>
    </div>
  </div>
  </div>
</template>
<script>
  export default {
    name: "history",
    data: () => ({
      isHistoryOpened: false
    }),
    methods: {
      changeStateHistory() {
        this.isHistoryOpened = !this.isHistoryOpened
      }
    }
  }
</script>
<style
  lang="scss"
  src="./scss/_history.scss"
></style>