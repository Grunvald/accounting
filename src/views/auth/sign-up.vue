<template>
  <v-container
    fluid
    fill-height
  >
    <v-layout
      align-center
      justify-center
    >
      <v-card class="elevation-12 auth-modal">
        <v-toolbar
          dark
          color="primary"
        >
          <v-toolbar-title>Регистрация</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form @submit.prevent="signUp">
            <v-alert
              transition="fade"
              :value="error"
              type="warning"
            >
              {{ error }}
            </v-alert>
            <v-text-field
              v-model="email"
              prepend-icon="person"
              name="login"
              label="E-mail"
              type="text"
            ></v-text-field>
            <v-text-field
              v-model="password"
              prepend-icon="lock"
              name="password"
              label="Password"
              id="password"
              type="password"
            ></v-text-field>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                :disabled="!email || !password || processing"
                color="primary"
                type="submit"
              >Зарегистрироваться
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card-text>
      </v-card>
    </v-layout>
  </v-container>
</template>
<script>
  export default {
    name: "sign-up",
    data: () => ({
      email: null,
      password: null
    }),
    watch: {
      isAuth(val) {
        if (val) this.$router.push({name: 'Home'})
      }
    },
    computed: {
      error() {
        return this.$store.getters.getError;
      },
      processing() {
        return this.$store.getters.getProcessing
      },
      isAuth() {
        return this.$store.getters.isUserAuth;
      }
    },
    mounted(){
      this.email = null;
      this.password = null;
    },
    methods: {
      signUp() {
        this.$store.commit('cleanError');
        this.$store.dispatch('signUp', {email: this.email, password: this.password})
      }
    }
  }
</script>
<style
  lang="scss"
  src="./auth.scss"
></style>