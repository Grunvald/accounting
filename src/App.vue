<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase d-flex align-center">
        <v-img
          v-if="$store.getters.userPic"
          :src="$store.getters.userPic"
          class="user-pic"
        ></v-img>
        <span class="font-weight-light">{{ $store.getters.userEmail }}</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        flat
        v-if="isAuth"
        @click="signOut"
      >Выйти
      </v-btn>
      <template v-else>
        <v-btn
          flat
          :to="{name:'SignIn'}"
        >
          Войти
        </v-btn>
        <v-btn
          flat
          :to="{name:'SignUp'}"
        >
          Зарегистрироваться
        </v-btn>
      </template>
    </v-toolbar>
    <v-content>
      <transition name="fade" mode="out-in">
        <router-view/>
      </transition>
    </v-content>
  </v-app>
</template>
<script>
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
    computed: {
      isAuth() {
        return this.$store.getters.isUserAuth
      }
    },
    mounted() {
      // this.$store.dispatch('auth');
    },
    methods: {
      signOut() {
        this.$store.dispatch('signOut');
        this.$router.push({name: 'SignIn'});
      },
    }
  }
</script>
<style
  lang="scss"
  src="./scss/main.scss"
></style>
