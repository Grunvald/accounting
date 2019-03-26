<template>
  <div class="aside__wrap">
    <div class="aside">
      <div class="aside__close ml-auto">
        <v-btn
          fab
          dark
          flat
          small
          @click="$emit('close')"
        >
          <v-icon dark>arrow_back</v-icon>
        </v-btn>
      </div>
      <div class="aside__period">
        <v-btn
          v-for="(period, key) in $store.getters.getAvailablePeriod"
          :key="key"
          dark
          block
          :color="`light-green lighten-1 ${key===0? 'mt-0':''}`"
          class="aside__period-item"
          @click="setPeriod(period)"
          v-text="periodName[period]"
        ></v-btn>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "settings",
    data: () => ({
      periodName: {
        All: 'Все время',
        Year: 'Год',
        Month: 'Месяц'
      }
    }),
    mounted() {
      document.addEventListener('click', this.close);
    },
    methods: {
      setPeriod(period) {
        this.$store.dispatch('setCheckPeriod', period);
        this.$emit('close');
      },
      close(e) {
        if (e.target.classList.contains('aside__wrap')) this.$emit('close')
      }
    },
  }
</script>
<style
  lang="scss"
  src="./scss/aside.scss"
></style>