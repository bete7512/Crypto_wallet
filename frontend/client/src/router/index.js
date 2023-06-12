import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Login from '../pages/Login.vue'
import Signup from '../pages/Signup.vue'
import Main from '../pages/Main.vue'
import Transaction from '../pages/main/Transaction.vue'
import Asset from '../pages/main/Asset.vue'
import Profile from '../pages/Profile.vue'
import twostep from '../pages/two_step.vue'
import forget_password from '../pages/forget_password.vue'      
import reset_password from '../pages/set_password.vue'      
import forget_code from '../pages/fortger_code.vue'        
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        layout: 'main'
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        layout: 'empty'
      }
    },
    {
      path: '/two-step-verfication',
      name: 'two-step',
      component: twostep,
      meta: {
        layout: 'empty'
      }
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup,
      meta: {
        layout: 'empty'
      }
    },
    {
      path: '/forget-password', 
      name: 'forget-password',     
      component: forget_password,         
      meta: {
        layout: 'empty'      
      }
    },
    {
      path: '/verification-code',
      name: 'verification-code',          
      component: forget_code,          
      meta :{
        layout: 'empty'      
      }
    },
    {
      path: '/reset-password', 
      name: 'reset-password',      
      component: reset_password,         
      meta:{
        layout: 'empty'    
      }
    },
    {
      path: '/home',
      name: 'Main',
      component: Main,
      meta: {
        layout: 'authed'
      },
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem('crypto-token') == null) {
          next('/login')
        } else {
          next()
        }
      }
    },

    {
      path: '/transaction',
      name: 'Transaction',
      component: Transaction,
      meta: {
        layout: 'authed'
      },
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem('crypto-token') == null) {
          next('/login')
        } else {
          next()
        }
      }
    },
    {
      path: '/crypto-currency',
      name: 'Asset',
      component: Asset,
      meta: {
        layout: 'authed'
      },
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem('crypto-token') == null) {
          next('/login')
        } else {
          next()
        }
      }
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      meta: {
        layout: 'authed'
      },
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem('crypto-token') == null) {
          next('/login')
        } else {
          next()
        }
      }
    }
  ]
})

export default router
