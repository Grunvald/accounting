import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase/app';
import {firestoreDb} from '@/firebase';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    title: {
      auto: 'Авто',
      cafe: 'Кафе',
      cloth: 'Одежда',
      entertainment: 'Развлечения',
      food: 'Еда',
      home: 'Жилье',
      hygiene: 'Гигиена',
      medicine: 'Медицина',
      other: 'Другое',
      sport: 'Спорт',
      taxi: 'Такси',
      transport: 'Транспорт',
    },
    user: {},
    money: {}
  },
  getters: {
    userName(state) {
      return Object.keys(state.user) ? state.user.userName : '';
    },
    userPic(state) {
      return Object.keys(state.user) ? state.user.userPic : undefined;
    },
    auto(state) {
      return state.money.spent ? state.money.spent.auto : {id: 'auto'};
    },
    cafe(state) {
      return state.money.spent ? state.money.spent.cafe : {id: 'cafe'};
    },
    cloth(state) {
      return state.money.spent ? state.money.spent.cloth : {id: 'cloth'};
    },
    entertainment(state) {
      return state.money.spent ? state.money.spent.entertainment : {id: 'entertainment'};
    },
    food(state) {
      return state.money.spent ? state.money.spent.food : {id: 'food'};
    },
    home(state) {
      return state.money.spent ? state.money.spent.home : {id: 'home'};
    },
    hygiene(state) {
      return state.money.spent ? state.money.spent.hygiene : {id: 'hygiene'};
    },
    medicine(state) {
      return state.money.spent ? state.money.spent.medicine : {id: 'medicine'};
    },
    other(state) {
      return state.money.spent ? state.money.spent.other : {id: 'other'};
    },
    sport(state) {
      return state.money.spent ? state.money.spent.sport : {id: 'sport'};
    },
    taxi(state) {
      return state.money.spent ? state.money.spent.taxi : {id: 'taxi'};
    },
    transport(state) {
      return state.money.spent ? state.money.spent.transport : {id: 'transport'};
    }
  },
  mutations: {
    auth(state, user) {
      state.user = user || {};
    },
    setData(state, data) {
      console.log(data);
      state.money = data || {};
    }
  },
  actions: {
    auth(state) {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          state.user = user || {};
          firestoreDb.collection(`${user.email}`).doc('userData').get()
              .then((res) => {
                if (!res.exists) {
                  firestoreDb.collection(`${user.email}`).doc('userData').set({
                    userName: `${user.displayName}`,
                    email: `${user.email}`,
                    userPic: `${user.photoURL}`
                  });
                  firestoreDb.collection(`${user.email}`).doc('money').set({
                    income: {
                      once: {},
                      regular: {}
                    },
                    spent: {
                      auto: {id: 'auto'},
                      cafe: {id: 'food',},
                      cloth: {id: 'cloth',},
                      entertainment: {id: 'entertainment'},
                      food: {id: 'food'},
                      home: {id: 'home'},
                      hygiene: {id: 'hygiene'},
                      medicine: {id: 'medicine'},
                      other: {id: 'other'},
                      sport: {id: 'sport'},
                      taxi: {id: 'taxi'},
                      transport: {id: 'transport'},
                    }
                  });
                }
                state.isLoggedIn = true;
                state.commit('auth', res.data());
                firestoreDb.collection(`${user.email}`).doc('money').get()
                    .then(res => {
                      state.commit('setData', res.data());
                    })
              })
              .catch((error) => {
                debugger;
                console.log(error);
              });
        }
      });
    },
    logOut(state) {
      firebase.auth().signOut()
          .then(() => {
            state.isLoggedIn = false;
            state.commit('auth', {});
            console.log('LogOut')
          })
          .catch((error) => {
            console.log('LogOut Error' + error)
          });
    },
    addSpent(state, data) {
      let date = new Date(data.date);
      let id = data.id;
      let year = date.getFullYear();
      let month = date.getMonth();
      debugger;
      firestoreDb.collection(state.state.user.email).doc('money').update({
        spent: {
          [data.id]: {
            [date.getFullYear()]: {
              [date.getMonth()]: {
                [data.date]: {
                  'date': data.date,
                  title: data.title,
                  price: data.price,
                  description: data.description
                }
              }
            }
          }
        }
      })
          .then(res => {
            console.log(res)
          })
          .catch(error => {
            console.log(error)
          })
    }
  }
});
