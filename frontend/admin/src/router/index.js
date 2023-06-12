import { createRouter, createWebHistory } from "vue-router";
import Login from "../pages/Login.vue";
import Dashboard from "../pages/Dashboard.vue";
import Utility from "../pages/Utility.vue";
import Setting from "../pages/Setting.vue";
import Transactions from "../pages/Transactions.vue";
import Customers from "../pages/Customers.vue";
import Orders from "../pages/Orders.vue";
import Withdrawal from "../pages/Withdrawal.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "dashboard",
      component: Dashboard,
      meta: { layout: "main" },
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem("cryptoAdminToken")) {
          next();
        } else {
          next("/login");
        }
      },
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: { layout: "empty" },
      beforeEnter: (to, from, next) => {
        if (localStorage.removeItem("cryptoAdminToken")) {
          console.log("am here");
          next("/login");
        } else {
          console.log("the fucked one");
          next();
          console.log(next());
        }
      },
    },
    {
      path:'/customers',
      name:'customers',
      component:Customers,
      meta:{
        layout:'main'
      }
    },
    {
      path:'/transactions',
      name:'transactions',
      component:Transactions,
      meta:{
        layout:'main'
      }
    },
    {
      path:'/orders',
      name:'orders',
      component:Orders,
      meta:{
        layout:'main'
      }
    },
    {
      path:'/withdrawal',
      name:'withdrawal',
      component:Withdrawal,
      meta:{
        layout:'main'
      }
    },
    {
      path:'/utilities',
      name:'utilities',
      component:Utility,
      meta:{
        layout:'main'
      }
    },
    {
      path:'/setting',
      name:'setting',
      component:Setting,
      meta:{
        layout:'main'
      }
    }
  ],
});

router.beforeEach(async (to) => {
  const publicPages = ['/login'];
  const authRequired = !publicPages.includes(to.path);
  if (authRequired && !window.localStorage.getItem("cryptoAdminToken")) {
    // returnUrl = to.fullPath;
    return '/login';
  }
});
// console.log(window.localStorage.getItem("AdminToken"));
export default router;
