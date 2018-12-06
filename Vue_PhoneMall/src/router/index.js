import Vue from 'vue'
import Router from 'vue-router'
import ShoppingMall from '@/pages/ShoppingMall/ShoppingMall'
import Register from '@/pages/Register/Register'
import Login from '@/pages/Login/Login'
// import Member from '@/pages/Member/Member'
import Goods from '@/pages/Goods/Goods'
import CategoryList from '@/pages/CategoryList/CategoryList'
import Cart from '@/pages/Cart/Cart'

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
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/goods/:goodsId',
      name: 'Goods',
      component: Goods
    },
    {
      path: '/categoryList',
      name: 'CategoryList',
      component: CategoryList
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart
    }
  ]
})
