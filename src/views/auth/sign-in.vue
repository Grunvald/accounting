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

    },
  }
</script>

<style lang="scss" src=""></style>