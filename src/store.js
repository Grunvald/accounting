import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    title:{
      food:'Food',
      auto:'Auto'
    },
    user:{
      Loading:true,
    },
    money:{
      income:{
        once:{},
        regular:{},
      },
      spent:{
        auto:{},
        food:{},
        cloth:{},
        entertainment:{},
        medicine:{},
        furniture:{},
        tech:{},
        transport:{},
        household:{},
        services:{},
        other:{},
      },
    }
  },
  getters:{
    userName: state => {
      if (!state.user.Loading) return state.user.user.displayName;
    }
  },  mutations: {
    auth(state, payload){
      state.user = payload;
    }
  },
  actions: {

  }
});
