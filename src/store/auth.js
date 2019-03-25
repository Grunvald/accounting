import firebase from 'firebase/app';
import 'firebase/auth';
import Vue from "vue";

export default {
  state: {
    user: {
      isAuthenticated: false,
      uid: null,
      email: null
    }
  },
  getters: {
    isUserAuth: (state) => state.user.isAuthenticated,
    userEmail: (state) => state.user.email
  },
  mutations: {
    setUser(state, payload) {
      state.user.isAuthenticated = true;
      state.user.uid = payload.uid;
      state.user.email = payload.email;
    },
    unSetUser(state) {
      state.user = {isAuthenticated: false};
    }
  },
  actions: {
    signUp({commit}, payload) {
      commit('setProcessing', true);
      commit('cleanError');
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then((res) => {
          commit('setProcessing', false);
          Vue.$db.collection(payload.email).doc('user').set({
            email: payload.email,
            uid: res.user.uid,
          });
          Vue.$db.collection(payload.email).doc('income').set({
            once: {},
            regular: {}
          });
        })
        .catch((error) => {
          commit('setProcessing', false);
          commit('setError', error.message);
        })
    },

    signIn({commit}, payload) {
      commit('setProcessing', true);
      commit('cleanError');
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(() => {
          commit('setProcessing', false);
        })
        .catch((error) => {
          commit('setProcessing', false);
          commit('setError', error.message);
        })
    },
    signOut() {
      firebase.auth().signOut();
    },
    stateChanged({commit, dispatch}, payload) {
      if (payload) {
        commit('setUser', {uid: payload.uid, email: payload.email});
        dispatch('loadData', payload.email);
      } else {
        commit('unSetUser')
      }
    }
  }
}