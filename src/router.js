import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import e404 from './views/e404.vue';
import Editpage from './views/Editpage.vue';

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '*',
      name: 'error',
      component: e404
  },
  {
    path:'/task:id',
    component: Editpage
  }
  ]
})
