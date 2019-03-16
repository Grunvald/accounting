import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/auth/sign-in',
      name: 'SignIn',
      component: () => import(/* webpackChunkName: "pages/auth/sign-in" */ '@/views/auth/sign-in')
    },
    {
      path: '/auth/sign-up',
      name: 'SignUp',
      component: () => import(/* webpackChunkName: "pages/auth/sign-in" */ '@/views/auth/sign-up')
    },
    {
      path: '/',
      name: 'Home',
      component: () => import(/* webpackChunkName: "pages/home" */ '@/views/home/index')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
