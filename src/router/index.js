import Vue from 'vue'
import Router from 'vue-router'

import Login from '../components/login.vue'
import Home from '../components/home'

import Manage from '../components/manage'
import Shoplist from '../components/shoplist.vue'
import UserFreeback from '../components/userFreeback.vue'

import Add from '../components/client/Add.vue'
import Freeback from '../components/client/Freeback.vue'
import Personage from '../components/client/personage.vue'
import Shoplists from '../components/client/shoplists.vue'
import Collect from '../components/client/collect.vue'
import Hotshop from '../components/client/hotshop.vue'

import ShopDitail from '../components/client/shopDitail.vue'
import Indent from '../components/client/indent.vue'




Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/manage',
      name: 'Manage',
      component: Manage,
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    {
      path: '/shoplist',
      name: 'Shoplist',
      component: Shoplist,
      meta: {
        requireAuth: true,  
      }
    },
    {
      path: '/userFreeback',
      name: 'UserFreeback',
      component: UserFreeback,
      meta: {
        requireAuth: true,  
      }
    },
    {
      path: '/collect',
      name: 'Collect',
      component: Collect,
      meta: {
        requireAuth: true,  
      }
    },
    {
      path: '/hotshop',
      name: 'Hotshop',
      component: Hotshop,
      meta: {
        requireAuth: true,  
      }
    },
    {
      path: '/shopDitail',
      name: 'ShopDitail',
      component: ShopDitail,
      meta: {
        requireAuth: true,  
      }
    },
    {
      path: '/indent',
      name: 'Indent',
      component: Indent,
      meta: {
        requireAuth: true,  
      }
    },
    {
      path: '/add',
      name: 'Add',
      component: Add,
      meta: {
        requireAuth: true,  
      }
    },
    {
      path: '/freeback',
      name: 'Freeback',
      component: Freeback,
      meta: {
        requireAuth: true,  
      }
    },
    {
      path: '/personage',
      name: 'Personage',
      component: Personage,
      meta: {
        requireAuth: true,  
      }
    },
    {
      path: '/shoplists',
      name: 'Shoplists',
      component: Shoplists,
      meta: {
        requireAuth: true,  
      }
    },
  ],
  linkActiveClass: 'active'
})
