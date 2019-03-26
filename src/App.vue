<template>
  <v-app>
    <transition
      name="slideRight"
      appear
    >
      <div
        v-if="isAuth"
        :class="{'blurred': isBlurred}"
        class="log-out"
      >
        <v-btn
          fab
          dark
          color="teal"
          @click="$store.dispatch('signOut')"
        >
          <v-icon dark>logout</v-icon>
        </v-btn>
      </div>
    </transition>
    <transition
      name="fade"
      mode="out-in"
    >
      <router-view @CalcShow="isBlurred = $event"/>
    </transition>
  </v-app>
</template>
<script>
  export default {
    name: 'App',
    data: () => ({
      isBlurred: false,
    }),
    watch: {
      isAuth(value) {
        if (!value) this.$router.push({name: 'SignIn'})
      }
    },
    computed: {
      isAuth() {
        return this.$store.getters.isUserAuth
      }
    },
    methods: {
      signOut() {
        this.$store.dispatch('signOut');
      },
    }
  }
</script>
<style
  lang="scss"
  src="./scss/main.scss"
></style>
<style>
  .log-out {
    position: absolute;
    right: 0;
    transition: filter 0.3s, transform 0.5s 1s;
  }
</style>
