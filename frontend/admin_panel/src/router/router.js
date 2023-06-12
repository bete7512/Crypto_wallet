import { createRouter, createWebHistory } from "vue-router";
// import home from '../pages/Home.vue'
import login from "../pages/login.vue";
import dashboard from "../pages/dashboard.vue";
import service_request from "../pages/service_request.vue";
import technicians from "../pages/technician.vue";
import accessory from "../pages/accessory.vue";
import invoice from "../pages/invoices.vue";
import manage_user from "../pages/manage_user.vue";
import service_payment from "../pages/service_payment.vue";
import setting from "../pages/setting.vue";
import technician_complain from "../pages/technician_complain.vue";
import service_request_detail from "../pages/service_request_detail.vue";
// import register_new_service_request from '../pages/register_service_request.vu
//import register_technician from '../pages/register_technician.vue'
import technician_detail from "../pages/techncian_detail.vue";
import utility from "../pages/utility.vue";
import map_technician from "../pages/map_technician.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: "dashboard",
      path: "/",
      component: dashboard,
      meta: { layout: "main", title: "Dashboard" },
    },
    {
      name: "login",
      path: "/signin",
      component: login,
      meta: { layout: "empty" },
    },
    {
      name: "utility",
      path: "/utility",
      component: utility,
      meta: { layout: "main", title: "Utility" },
    },
    {
      name: "services",
      path: "/services",
      component: service_request,
      meta: { layout: "main", title: "Services Requests" },
    },
    {
      name: "technicians",
      path: "/technicians",
      component: technicians,
      meta: { layout: "main", title: "Technicians" },
    },
    {
      name: "accessory",
      path: "/accessory",
      component: accessory,
      meta: { layout: "main", title: "Accessory" },
    },
    {
      name: "invoices",
      path: "/invoices",
      component: invoice,
      meta: {
        layout: "main",
        title: "Subscription",
      },
    },
    {
      name: "manage-user-account",
      path: "/manage-user-account",
      component: manage_user,
      meta: { layout: "main", title: "Manage User Account" },
    },
    {
      name: "service-payment",
      path: "/service-payment",
      component: service_payment,
      meta: { layout: "main", title: "Service Payment" },
    },
    {
      name: "setting",
      path: "/setting",
      component: setting,
      meta: { layout: "main" },
    },
    {
      name: "technician-complain",
      path: "/technician-complain",
      component: technician_complain,
      meta: { layout: "main", title: "Technician Complain" },
    },
    // {
    //   name:'register_new_service_request',
    //   path:'/register-new-service-request',
    //   component:register_new_service_request,
    //   meta:{
    //     layout:'main'
    //   }
    // },
    // {
    //   name:'register new technician',
    //   path:'/register-new-technician',
    //   component:register_technician,
    //   meta:{
    //     layout:'main'
    //   }
    // },
    {
      name: "service_request_detail",
      path: "/service-request-detail/:id",
      component: service_request_detail,
      meta: { layout: "main" },
    },
    {
      name: "technician_detail",
      path: "/technician-detail/:id",
      component: technician_detail,
      meta: {
        layout: "main",
      },
      props: true,
    },
    {
      name: "map_technician",
      path: "/map-technician",
      component: map_technician,
      meta: {
        layout: "empty",
      },
    },
  ],
});
router.beforeEach(async (to, from, next) => {
  if (to.name !== "login" && !localStorage.getItem("rensysAdminToken")) {
    return next({ name: "login" });
  } else {
    // next({name:'dashboard'})
    const title = to.meta.title;
    const titleFromParams = to.params.name;
    console.log("am here", to);
    if (title) {
      document.title = title;
    }
    if (titleFromParams) {
      document.title = `${titleFromParams} - ${document.title}`;
    }
    next();
  }
});
export default router;
