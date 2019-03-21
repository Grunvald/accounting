import Vue from 'vue';

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
  mutations: {},
  getters: {},

  actions: {
    loadData({commit, state}, payload) {
      commit('setProcessing', true);
      commit('cleanError');
      Vue.$db.collection(payload)
        .get()
        .then(querySnapshot => {
          let res = {};
          querySnapshot.forEach(s => {
            const data = s.data();
            res[data.id] = data;
          });
          debugger;
          if (!res.categories) {
            Vue.$db.collection(payload).doc('categories').set(
              state.categories
            )
              .then(res => {
                console.log(res);
                debugger;
              })
              .catch(error => {
                console.log(error);
                debugger;
              });
          }
          commit('setProcessing', false);
        })
        .catch(error => {
          commit('setProcessing', false);
          commit('setError', error.message);
        })
    }
  }
}