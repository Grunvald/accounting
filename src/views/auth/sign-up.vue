<template>
  <v-container
    fluid
    fill-height
  >
    <v-layout
      align-center
      justify-center
    >
      <v-flex
        xs12
        sm8
        md4
      >
        <v-card class="elevation-12">
          <v-toolbar
            dark
            color="primary"
          >
            <v-toolbar-title>Регистрация</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-alert
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
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              :disabled="!email || !password || processing"
              color="primary"
              @click.prevent="signUp"
            >Зарегистрироваться
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
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
    watch:{
      isAuth(val){
        if (val) this.$router.push({name:'Home'})
      }
    },
    computed: {
      error() {
        return this.$store.getters.getError;
      },
      processing(){
        return this.$store.getters.getProcessing
      },
      isAuth(){
        return this.$store.getters.isUserAuth;
      }
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
  src=""
></style>