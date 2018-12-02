import Vue from 'vue'
import Router from 'vue-router'
import ShoppingMall from '@/pages/ShoppingMall/ShoppingMall'
import Register from '@/pages/Register/Register'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ShoppingMall',
      component: ShoppingMall
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    }
  ]
})
