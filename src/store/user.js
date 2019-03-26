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
      checkPeriod: 'Month'
    }
  },
  mutations: {
    setData(state, payload) {
      state.user.spent = payload;
    },
    setIncome(state, payload) {
      state.user.income = payload;
    }
  },
  getters: {
    getData: (state) => state.user.spent,
    getBalance: (state, getters) => {
      let res = 0;
      if (state.user.income.once[date.getFullYear()] && state.user.income.once[date.getFullYear()][date.getMonth()]) {
        let data = state.user.income.once[date.getFullYear()][date.getMonth()];
        Object.keys(data).forEach(el => {
          res += data[el].price;
        });
      }
      return res - getters.getSpent.total;
    },
    getSpent: (state) => {
      const res = {total: 0};
      const data = state.user.spent;

      for (let id in data) {
        res[id] = {total: 0};
        for (let y in data[id]) {
          if (!isNaN(y)) {
            res[id][y] = {total: 0};
            for (let m in data[id][y]) {
              res[id][y][m] = {total: 0};
              for (let i in data[id][y][m]) {
                res[id][y][m].total += data[id][y][m][i].price;
              }
              res[id][y].total += res[id][y][m].total;
            }
            res[id].total += res[id][y].total;
          }
        }
        res.total += res[id].total;
      }
      return res;
    },
    getCategories: (state) => {
      return Object.keys(state.user.spent)
    },
    getCheckPeriod: (state) => state.user.checkPeriod,
    getTotalSpentForPeriod: (state, getters) => {
      const date = getters.today;
      let res = 0;
      switch (getters.getCheckPeriod) {
        case 'Month':
          Object.keys(getters.getSpent).forEach(id => {
            if (id !== 'Total' && getters.getSpent[id][date.getFullYear()] && getters.getSpent[id][date.getFullYear()][date.getMonth()]) {
              res += getters.getSpent[id][date.getFullYear()][date.getMonth()].total
            }
          });
          return res;
      }
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