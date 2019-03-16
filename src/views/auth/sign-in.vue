<template>
  <v-container class="">
    <v-layout column>
      <h3>sign in</h3>
      <v-form>
        <v-text-field label="Email"></v-text-field>
        <v-text-field label="Password"></v-text-field>
      </v-form>
      <v-btn flat @click="signIn">Sign in</v-btn>
    </v-layout>
  </v-container>
</template>

<script>
  import firebase from 'firebase/app';
  import {firestoreDb} from '@/firebase';

  let provider = new firebase.auth.GoogleAuthProvider();
  export default {
    name: "sign-in",
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
    methods: {
      signIn() {
        firebase.auth().signInWithPopup(provider)
          .then((res) => {
            this.data.token = res.credential.accessToken;
            this.data.user = res.user;

            console.log(this);
            //debugger;
            this.$store.commit('auth', this.data);
            this.$router.push({name: 'Home'});
          })
          .catch((err) => {
            this.data.error.code = err.code;
            this.data.error.message = err.message;
            this.data.email = err.email;
            this.data.error.credential = err.credential;
            this.store.commit('auth', this.data);
          });
      }
    },
  }
</script>

<style lang="scss" src=""></style>