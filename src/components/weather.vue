<template>
  <transition name="fadeWeather" appear>
    <div v-if="!Weather.current.Loading && isShowWidget"
         class="weather"
    >
      <div class="weather__current">
        <img :src="'/img/weather/' + Weather.current.weather[0].icon + '.svg'"
             class="weather__current-ico"
             alt="">
        <div>
          <p>
          <span class="weather__current-temp"
                v-html="(Weather.current.main.temp > 0 ? '+' : '') + Weather.current.main.temp + '&deg;'"
          ></span>
            <span class="weather__current-desc"
                  v-text="Weather.current.weather[0].description"
            ></span>
          </p>
          <p>
          <span class="weather__current-day"
                v-text="toDay + ','"
          ></span>
            <span class="weather__current-city"
                  v-text="User.data.city"
            ></span>
            <img :src="User.data.location.country_flag"
                 class="weather__current-flag"
                 alt="country flag">
          </p>
        </div>
      </div>
      <transition name="fade" mode="out-in">
        <button v-if="!isShowForecast"
                key="showForecast"
                class="weather__more"
                @click="getForecast">Прогноз на 3 дня
        </button>
        <button v-else
                key="hideForecast"
                class="weather__more"
                @click="isShowForecast = false">Скрыть прогноз
        </button>
      </transition>
      <transition name="forecast"
                  @enter="ForecastEnter"
                  @leave="ForecastLeave"
      >
        <div v-if="!Weather.forecast.Loading && isShowForecast"
             ref="forecast"
             class="weather__forecast-wrap">
          <div class="weather__forecast">
            <div v-for="(day, key, i) in Weather.forecast"
                 v-if="i<3"
                 :key="key"
                 class="weather__forecast-day"
            >
              <h4 class="weather__forecast-title"
                  v-text="getWeekDay(key)"></h4>
              <div v-for="(i, key) in day"
                   :key="key"
                   class="weather__forecast-item"
              >
                <p v-text="i.dt_txt.split(' ')[1].split(':').slice(0,2).join(':')"></p>
                <img
                    :src="'/img/weather/' + i.weather[0].icon + '.svg'"
                    class="weather__forecast-ico"
                    alt="weather icon">
                <p>
                  {{i.main.temp_min.toFixed()}}&deg;/{{i.main.temp_max.toFixed()}}&deg;
                </p>
              </div>
            </div>
          </div>
        </div>
      </transition>
      <button class="weather__close"
              @click="isShowWidget = false"
      ></button>
    </div>
  </transition>
</template>

<script>
  import axios from 'axios';

  export default {
    name: "weather",
    data: () => ({
      API: {
        ip: {
          url: 'http://api.ipstack.com/check?access_key=',
          key: '6f290aa8590abf39f6b57a0606b1d315'
        },
        weather: {
          url: 'http://api.openweathermap.org/data/2.5/',
          location: 'location/search/?lattlong=',
          key: '&APPID=e9a79d2e4f0054b8f0699f6cfdf48c5d',
          units: 'metric'
        },
      },
      User: {
        Loading: true,
      },
      Weather: {
        current: {
          Loading: true,
        },
        forecast: {
          Loading: true,
        },
      },
      isShowWidget: true,
      isShowForecast: false,

    }),
    computed: {
      toDay() {
        return this.getWeekDay(Date.now());
      }
    },
    mounted() {
      axios.get(this.API.ip.url + this.API.ip.key)
        .then(res => {
          this.User = res;
          axios.get(`${this.API.weather.url}weather?lat=${this.User.data.latitude}&lon=${this.User.data.longitude}${this.API.weather.key}&units=${this.API.weather.units}&lang=ru`).then(res => {
            this.Weather.current = res.data;
          })
        })
    },
    methods: {
      getForecast() {
        if (this.Weather.forecast.Loading) {
          axios.get(`${this.API.weather.url}forecast?id=${this.Weather.current.id}${this.API.weather.key}&units=${this.API.weather.units}&lang=ru`).then(res => {
            this.Weather.forecast = {};
            res.data.list.forEach(el => {
              if (!this.Weather.forecast[el.dt_txt.split(' ')[0]]) this.Weather.forecast[el.dt_txt.split(' ')[0]] = [];
              this.Weather.forecast[el.dt_txt.split(' ')[0]].push(el);
            });
          });
        }
        this.isShowForecast = true;
      },
      getWeekDay(day) {
        let weekDays = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота',];
        return weekDays[new Date(day).getDay()];
      },
      ForecastEnter(el, done) {
        let height = el.clientHeight;
        el.style.height = 0;
        this.$nextTick(() => {
          el.style.height = height + 'px';
          el.addEventListener('transitionend', done);
        });
      },
      ForecastLeave(el, done) {
        el.style.height = 0;
        el.addEventListener('transitionend', done);
      },
    },
  }
</script>

<style lang="scss" src="./scss/weather.scss"></style>

