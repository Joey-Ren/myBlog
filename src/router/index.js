import Vue from 'vue'
import Router from 'vue-router'
import indexPage from '@/container/pages/indexPage'
import debounce from '@/container/debounce/index'
import markdown from '@/container/pages/markdown'
import home from '@/container/pages/home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'indexPage',
      component: indexPage
    },
    {
      path: '/debounce',
      name: 'debounce',
      component: debounce
    },
    {
      path: '/markdown',
      name: 'markdown',
      component: markdown
    },
    {
      path: '/home',
      name: 'home',
      component: home
    }
  ]
})
