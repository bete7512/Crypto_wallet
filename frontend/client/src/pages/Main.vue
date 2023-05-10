<template>
  <!-- https://vscode.dev/profile/github/4f025d1dabc23d65276ae00ab03dd6d7 -->
  <div class="flex w-full h-screen gap-2">
    <div class="w-72 h-full space-x-2 bg-slate-200">
      <router-link
        data-tippy-content="Dasboard"
        data-tippy-placement="right"
        class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4"
        :class="[$route.name === 'dashboard' ? activeClass : inactiveClass]"
        to="/"
      >
        <font-awesome-icon :icon="['fas', 'gauge']" size="lg" />

        <span class="mx-4">Dasboard </span>
      </router-link>
      <router-link
        data-tippy-content="Services requests"
        data-tippy-placement="right"
        class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4"
        :class="[$route.name === 'services' ? activeClass : inactiveClass]"
        to="/services"
      >
        <font-awesome-icon :icon="['fas', 'screwdriver-wrench']" size="lg" />
        <span class="mx-4">Service Requests</span>
      </router-link>

      <router-link
        data-tippy-content="Technicians"
        data-tippy-placement="right"
        class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4"
        :class="[$route.name === 'technicians' ? activeClass : inactiveClass]"
        to="/technicians"
      >
        <font-awesome-icon :icon="['fas', 'user-group']" size="lg" />
        <span class="mx-4">Technicians</span>
      </router-link>

      <router-link
        data-tippy-content="Service Payment"
        data-tippy-placement="right"
        class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4"
        :class="[$route.name === 'service-payment' ? activeClass : inactiveClass]"
        to="/service-payment"
      >
        <font-awesome-icon :icon="['fas', 'money-check-dollar']" />
        <span class="mx-4">Service Payment</span>
      </router-link>
      <router-link
        data-tippy-content="Invoices"
        data-tippy-placement="right"
        class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4"
        :class="[$route.name === 'invoices' ? activeClass : inactiveClass]"
        to="/invoices"
      >
        <font-awesome-icon :icon="['fas', 'file-invoice-dollar']" size="lg" />

        <span class="mx-4">Subscription</span>
      </router-link>

      <router-link
        data-tippy-content="Manage User Account"
        data-tippy-placement="right"
        class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4"
        :class="[$route.name === 'manage-user-account' ? activeClass : inactiveClass]"
        to="/manage-user-account"
      >
        <font-awesome-icon :icon="['fas', 'people-roof']" size="lg" />
        <span class="mx-4">Manage users</span>
      </router-link>
      <router-link
        data-tippy-content="Customers"
        data-tippy-placement="right"
        class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4"
        :class="[$route.name === 'accessory' ? activeClass : inactiveClass]"
        to="/accessory"
      >
        <font-awesome-icon :icon="['fas', 'gear']" size="lg" />
        <span class="mx-4">Acessory</span>
      </router-link>
      <router-link
        data-tippy-content="Technician complain"
        data-tippy-placement="right"
        class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4"
        :class="[$route.name === 'technician-complain' ? activeClass : inactiveClass]"
        to="/technician-complain"
      >
        <font-awesome-icon :icon="['fass', 'circle-info']" />
        <span class="mx-4">Technician complain</span>
      </router-link>
      <router-link
        data-tippy-content="Service Payment"
        data-tippy-placement="right"
        class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4"
        :class="[$route.name === 'utility' ? activeClass : inactiveClass]"
        to="/utility"
      >
        <font-awesome-icon :icon="['fas', 'wrench']" size="lg" />
        <span class="mx-4">Utility</span>
      </router-link>
    </div>
    <div class="w-full bg-red-300">
      <div>Navigator</div>
      <div>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { ref, onMounted } from 'vue'
import '@fortawesome/fontawesome-free/css/all.css'
import 'tippy.js/dist/tippy.css'
import tippy from 'tippy.js'

onMounted(() => {
  tippy('[data-tippy-content]')
})
// const emit = defineEmits(["close"]);
const activeClass = ref(
  'bg-gray-600 font-bold  text-lg bg-opacity-25 text-[#EF4104] border-[#EF4104]'
)
const inactiveClass = ref(
  'border-gray-900 text-lg font-bold   text-[#404147] hover:text-[#FBB919] border-[#9197B3] hover:border-[#FBB919]'
)
</script>
<style></style>
