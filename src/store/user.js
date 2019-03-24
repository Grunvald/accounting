import Vue from 'vue';

let date = new Date();
export default {
  state: {
    user: {
      categories: {},
      income: {
        once: {},
        regular: {}
      },
      spent: {},
    }
  },
  mutations: {
    setData(state, payload) {
      state.user.spent = payload
    },
    setIncome(state, payload) {
      state.user.income = payload
    }
  },
  getters: {
    getData: (state) => state.user.spent,
    getBalance: (state) => {
      let res = 0;
      if (state.user.income.once[date.getFullYear()] && state.user.income.once[date.getFullYear()][date.getMonth()]) {
        let data = state.user.income.once[date.getFullYear()][date.getMonth()];
        Object.keys(data).forEach(el => {
          res += data[el].price;
        });
      }
      return res;
    },
    getSpent: (state) => {
      let total = 0;
      let res = {};
      let date = new Date();
      let y = date.getFullYear();
      let m = date.getMonth();
      let data = state.user.spent;
      for(let id in data){
        res[id] = 0;
        if(data[id][y] && data[id][y][m])
        Object.keys(data[id][y][m]).forEach(el => {
          res[id] += data[id][y][m][el].price;
          total += data[id][y][m][el].price;
        })
      }
      res.total = total;
      return res;
    },
    getCategories(state){
      return Object.keys(state.user.spent)
    }
  },

  actions: {
    loadData({commit, getters, state}, payload) {
      commit('setProcessing', true);
      commit('cleanError');
      Vue.$db.collection(payload).doc('spent')
        .get()
        .then(querySnapshot => {
          if (querySnapshot.exists) {
            state.user.spent = querySnapshot.data();
          } else {
            Vue.$db.collection(payload).doc('spent')
              .set(getters.getDefauilState)
          }
          commit('setProcessing', false);
        })
        .catch(error => {
          commit('setProcessing', false);
          commit('setError', error);
        });
      Vue.$db.collection(payload).doc('income')
        .onSnapshot(doc => {
          commit('setIncome', doc.data());
        });
      Vue.$db.collection(payload).doc('spent')
        .onSnapshot(doc => {
          commit('setData', doc.data());
        });
    },

    addSpent({commit, getters}, payload) {
      commit('setProcessing', true);
      commit('cleanError');
      Vue.$db.collection(getters.userEmail).doc('spent')
        .update(`${payload.id}.${payload.date.getFullYear()}.${payload.date.getMonth()}.${+payload.date}`, {
          'description': payload.description,
          'price': payload.price,
          'date': payload.date
        })
        .then(() => {
          commit('setProcessing', false);
        })
        .catch(error => {
          commit('setProcessing', false);
          commit('setError', error);
        })
    },
    addMoney({commit, getters}, payload) {
      commit('setProcessing', true);
      commit('cleanError');
      Vue.$db.collection(getters.userEmail).doc('income')
        .update(`${payload.id}.${payload.date.getFullYear()}.${payload.date.getMonth()}.${+payload.date}`, {
          'description': payload.description,
          'price': payload.sum,
          'date': payload.date
        })
        .then(() => {
          commit('setProcessing', false);
        })
        .catch(error => {
          commit('setProcessing', false);
          commit('setError', error);
        })
    },
  }
}