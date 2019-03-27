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
          color="light-green lighten-1"
          :class="['aside__period-item',{'mt-0':key===0}]"
          @click="setPeriod(period)"
          v-text="periodName[period]"
        ></v-btn>
<!--        <v-btn
          dark
          block
          color="light-green lighten-1"
          @click="addCustom"
        >
          add
        </v-btn>-->
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
      },
/*      addCustom(){
        let res = {};
        res.id = 'once';
        res.description = 'Комуналка';
        res.price = 79.60;
        res.date = new Date(2018,11,24,10,30);
        this.$store.dispatch('addSpent', res);
      }*/
    },
  }
</script>
<style
  lang="scss"
  src="./scss/aside.scss"
></style>