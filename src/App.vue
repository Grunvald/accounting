<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Vuetify</span>
        <span class="font-weight-light">{{ $store.getters.userName }}</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn flat
             @click="signIn"
      >
        Sign In
      </v-btn>

      <v-btn
          v-if="!$store.getters.userName"
          flat
          :to="{name: 'SignUp'}"
      >
        Sign Up
      </v-btn>
      <v-btn
          @click="LogOut"
      >Log out
      </v-btn>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
  import firebase from 'firebase/app';
  import {firestoreDb} from '@/firebase';

  let provider = new firebase.auth.GoogleAuthProvider();

  export default {
    name: 'App',
    data: () => ({
      data: {
        token: '',
        user: '',
        error: {
          code: '',
          message: '',
          email: '',
          credential: ''
        }
      },
    }),
    mounted() {
      this.$store.dispatch('auth');

      //this.$store.commit('auth', 'sadfsdf');
      //this.$store.dispatch('auth', 'test1');
    },
    methods: {
      LogOut() {
        this.$store.dispatch('logOut');
      },
      signIn() {
        firebase.auth().signInWithPopup(provider)
          .then((res) => {
            this.data.token = res.credential.accessToken;
            this.data.user = res.user;
            this.$store.commit('auth', this.data);
            this.$router.push({name: 'Home'});
          })
          .catch((err) => {
            this.data.error.code = err.code;
            this.data.error.message = err.message;
            this.data.email = err.email;
            this.data.error.credential = err.credential;
            //this.store.commit('auth', this.data);
          });
      }
    }
  }
</script>
