<template>
  <v-container class="">
    <v-layout column>
    <h3>sign up</h3>
      <v-form>
        <v-text-field label="Email"></v-text-field>
        <v-text-field label="Password"></v-text-field>
      </v-form>
      <v-btn flat>Sign up</v-btn>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: "sign-up",
    data:()=>({

    }),
  }
</script>

<style lang="scss" src=""></style>