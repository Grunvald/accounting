import Vue from 'vue';
import './plugins/vuetify';
import firebase from 'firebase';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

Vue.config.productionTip = false;

const config = {
  apiKey: "AIzaSyAtLS59icZ4hzUY0YuElNzjxm1PxwR017c",
  authDomain: "homeaccounting-bba8d.firebaseapp.com",
  databaseURL: "https://homeaccounting-bba8d.firebaseio.com",
  projectId: "homeaccounting-bba8d",
  storageBucket: "homeaccounting-bba8d.appspot.com",
  messagingSenderId: "729782110521"
};

firebase.initializeApp(config);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
