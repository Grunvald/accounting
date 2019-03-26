<template>
  <v-app light>
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
          color="light-green lighten-1"
          @click="$store.dispatch('signOut')"
        >
          <v-icon dark>logout</v-icon>
        </v-btn>
      </div>
    </transition>
    <transition
      name="slideLeft"
      appear
    >
      <div
        v-if="isAuth"
        :class="{'blurred': isBlurred}"
        class="settings"
      >
        <v-btn
          fab
          dark
          color="light-green lighten-1"
          @click="showSettings"
        >
          <v-icon dark>settings</v-icon>
        </v-btn>
      </div>
    </transition>
    <transition
      name="fade"
      mode="out-in"
    >
      <router-view
        :class="{'tl-140':isSettingsShow}"
        @CalcShow="isBlurred = $event"
      />
    </transition>
    <transition name="aside">
      <Settings
        v-if="isSettingsShow"
        @close="hideSettings"
      />
    </transition>
  </v-app>
</template>
<script>
  export default {
    name: 'App',
    components: {
      Settings: () => import( /* webpackChunkName: "settings" */ '@/views/settings'),
    },
    data: () => ({
      isBlurred: false,
      isSettingsShow: false,
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
    mounted(){
      window.addEventListener('popstate', this.hideSettingsOnBack)
    },
    methods: {
      signOut() {
        this.$store.dispatch('signOut');
      },
      showSettings() {
        this.isSettingsShow = true
      },
      hideSettings() {
        this.isSettingsShow = false
      },
      hideSettingsOnBack(event) {
        if (this.isSettingsShow) {
          event.preventDefault();
          this.isSettingsShow = false
        }

      }
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

  .settings {
    position: absolute;
    left: 0;
    transition: filter 0.3s, transform 0.5s 1s;
  }

  #app {
    background: #ECEFF1;
  }

  .application--wrap {
    overflow: hidden;
    max-width: 650px;
    margin: auto;
    background: #fff;
    border-left: 1px solid #CFD8DC;
    border-right: 1px solid #CFD8DC;
  }
</style>
