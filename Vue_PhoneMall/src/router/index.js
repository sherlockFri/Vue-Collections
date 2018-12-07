import Vue from 'vue'
import Router from 'vue-router'
import ShoppingMall from '@/pages/ShoppingMall/ShoppingMall'
import Register from '@/pages/Register/Register'
import Login from '@/pages/Login/Login'
import Member from '@/pages/Member/Member'
import Goods from '@/pages/Goods/Goods'
import CategoryList from '@/pages/CategoryList/CategoryList'
import Cart from '@/pages/Cart/Cart'
import Main from '@/pages/Main/'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main,
      children: [
        {
          path: '/ShoppingMall',
          name: 'ShoppingMall',
          component: () => import('@/pages/ShoppingMall/ShoppingMall')
        },
        {
          path: '/member',
          name: 'Member',
          component: () => import('@/pages/Member/Member')
        },
        {
          path: '/categoryList',
          name: 'CategoryList',
          component: () => import('@/pages/CategoryList/CategoryList')
        },
        {
          path: '/cart',
          name: 'Cart',
          component: () => import('@/pages/Cart/Cart')
        }
      ]
    },

    {
      path: '/register',
      name: 'Register',
      component: () => import('@/pages/Register/Register')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/pages/Login/Login')
    },
    {
      path: '/goods/:goodsId',
      name: 'Goods',
      component: () => import('@/pages/Goods/Goods')
    },

  
   
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition && to.meta.keepAlive) {
     return savedPosition;
    }
    return { x: 0, y:0 };
   },
})