import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Test from '../pages/Test.vue'
import Login from '../pages/Login.vue'
import Signup from '../pages/Signup.vue' 
import Main from '../pages/Main.vue'
import Transaction from '../pages/main/Transaction.vue'
import Asset from '../pages/main/Asset.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta:{
        layout:"main"
      }
    },
    {
      path: '/login', 
      name: 'Login',     
      component: Login ,
      meta:{
        layout:"empty"
      }
    },
    {
      path: '/signup', 
      name: 'signup',
      component: Signup ,
      meta:{
        layout:"empty"
      }
    },
    {
      path: '/home',
      name: 'Main',
      component: Main,     
      meta:{
        layout:"main"   
      },
      children:[
        {
          path: '/home/transaction',   
          name: 'Transaction',       
          component: Transaction, 

        },
        {
          path: '/asset',    
          name: 'Asset',    
          component: Asset,  
        }
      ]
    }
  ]
})

export default router
