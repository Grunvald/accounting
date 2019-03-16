import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import firebase from 'firebase/app';
import {firestoreDb} from '@/firebase';

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    title: {
      auto: 'Авто',
      food: 'Продукты',
      cloth: 'Одежда',
      entertainment: 'Развлечения',
      sport: 'Спорт',
      medicine: 'Медицина',
      furniture: 'Мебель',
      tech: 'Техника',
      transport: 'Транспорт',
      household: 'Бытовые товары',
      services: 'Услуги',
      other: 'Другое'
    },
    user: {},
    money: {
      income: {
        once: {},
        regular: {}
      },
      spent: {
        auto: {},
        food: {},
        cloth: {},
        entertainment: {},
        sport: {},
        medicine: {},
        furniture: {},
        tech: {},
        transport: {},
        household: {},
        services: {},
        other: {}
      }
    }
  },
  getters: {
    userName(state) {
      return Object.keys(state.user) ? state.user.userName : '';
    }
  },
  mutations: {
    auth: (state, user) => {
      state.user = user;
    }
  },
  actions: {
    auth(state) {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          firestoreDb.collection(`${user.email}`).doc('userData').get()
            .then((res) => {
              if (!res.exists) {
                firestoreDb.collection(`${user.email}`).doc('userData').set({
                  userName: `${user.displayName}`,
                  email: `${user.email}`,
                });
              }
              state.isLoggedIn = true;
              state.commit('auth', res.data());
            })
            .catch((error) => {
              debugger;
              console.log(error)
            })
        }
      });
    },
    logOut(state){
      firebase.auth().signOut()
        .then(() => {
          state.isLoggedIn = false;
          state.commit('auth', {});
          console.log('LogOut')
        })
        .catch((error) => {
          console.log('LogOut Error' + error)
        });
    }
  }
});
