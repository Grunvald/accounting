import Vue from 'vue';
import Router from 'vue-router';
import Store from './store';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/auth/sign-in',
      name: 'SignIn',
      component: () => import(/* webpackChunkName: "pages/auth/sign-in" */ '@/views/auth/sign-in'),
      beforeEnter: notAuth
    },
    {
      path: '/auth/sign-up',
      name: 'SignUp',
      component: () => import(/* webpackChunkName: "pages/auth/sign-in" */ '@/views/auth/sign-up'),
      beforeEnter: notAuth
    },
    {
      path: '/',
      name: 'Home',
      component: () => import(/* webpackChunkName: "pages/home" */ '@/views/home/index'),
      beforeEnter: auth
    }
  ]
});

function auth(from, to, next) {
  if (Store.getters.isUserAuth) {
    next();
  } else {
    next({name:'SignIn'});
  }
}

function notAuth(from, to, next) {
  if (!Store.getters.isUserAuth) {
    next();
  } else {
    next({name:'Home'});
  }
}