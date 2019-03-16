<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Vuetify</span>
        <span class="font-weight-light">{{ $store.getters.userName }}</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn flat
             :to="{name: 'SignIn'}"
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

  export default {
    name: 'App',
    mounted() {
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
              else {
                console.log(res.data());
              }
            })
            .catch((error) => {
              debugger;
              console.log(error)
            })
        }
      })
    },
    methods: {
      LogOut() {
        firebase.auth().signOut()
          .then(() => {
            this.$router.push({name: 'Home'});
            console.log('LogOut')
          })
          .catch((error) => {
            console.log('LogOut Error')
          });
      },
      test() {

      }
    }
  }
</script>
