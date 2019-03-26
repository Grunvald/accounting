import Vue from 'vue';
//import './plugins/vuetify';
import Vuetify, {
  VApp,
  VContainer,
  VLayout,
  VCard,
  VAlert,
  VForm,
  VToolbar,
  VFadeTransition,
} from 'vuetify/lib';
import 'vuetify/src/stylus/app.styl';

import { Ripple } from 'vuetify/lib/directives';

import App from './App.vue';
import router from './router';
import store from './store';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const config = {
  apiKey: "AIzaSyAtLS59icZ4hzUY0YuElNzjxm1PxwR017c",
  authDomain: "homeaccounting-bba8d.firebaseapp.com",
  databaseURL: "https://homeaccounting-bba8d.firebaseio.com",
  projectId: "homeaccounting-bba8d",
  storageBucket: "homeaccounting-bba8d.appspot.com",
  messagingSenderId: "729782110521"
};

Vue.use(Vuetify, {
  components: {
    VApp,
    VContainer,
    VLayout,
    VCard,
    VAlert,
    VForm,
    VToolbar,
    VFadeTransition
  },
  directives: {
    Ripple
  }
});


//import './registerServiceWorker';

Vue.config.productionTip = false;

const firebaseApp = firebase.initializeApp(config);

const db = firebaseApp.firestore();

db.settings({
  // timestampsInSnapshots: true
});

Vue.$db = db;

new Vue({
  router,
  store,
  render: h => h(App),
  created(){
    firebase.auth().onAuthStateChanged((user) => {
      this.$store.dispatch('stateChanged', user)
      });
  }
}).$mount('#app');
