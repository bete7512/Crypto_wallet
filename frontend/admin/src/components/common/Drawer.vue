<template>
  <div class="w-72 fixed bg-white z-10 h-screen border-black">
    <div class="flex w-full justify-center space-x-3 pr-3 items-center pt-3">
      <h1 class="h-20 flex justify-center items-center">
        <div class="text-2xl">Santim Crypto</div>
      </h1>
    </div>
    <nav class="">
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
        data-tippy-content="Customers"
        data-tippy-placement="right"
        class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4"
        :class="[$route.name === 'customers' ? activeClass : inactiveClass]"
        to="/customers"
      >
        <font-awesome-icon :icon="['fas', 'user-group']" size="lg" />
        <span class="mx-4">Customers</span>
      </router-link>

      <!-- <router-link
        data-tippy-content="Transactions"
        data-tippy-placement="right"
        class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4"
        :class="[$route.name === 'transactions' ? activeClass : inactiveClass]"
        to="/transactions"
      >
        <font-awesome-icon :icon="['fass', 'comments-dollar']" size="lg" />
        <span class="mx-4">Transactions</span>
      </router-link> -->

      <router-link
        data-tippy-content="Orders"
        data-tippy-placement="right"
        class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4"
        :class="[$route.name === 'orders' ? activeClass : inactiveClass]"
        to="/orders"
      >
        <font-awesome-icon :icon="['fas', 'money-check-dollar']" />
        <span class="mx-4">Orders</span>
      </router-link>
      <router-link
        data-tippy-content="withdrawal"
        data-tippy-placement="right"
        class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4"
        :class="[$route.name === 'withdrawal' ? activeClass : inactiveClass]"
        to="/withdrawal"
      >
        <font-awesome-icon :icon="['fas', 'money-check-dollar']" />
        <span class="mx-4">Withdrawal</span>
      </router-link>
      <!-- <router-link
        data-tippy-content="Utitlities"
        data-tippy-placement="right"
        class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4"
        :class="[$route.name === 'utilities' ? activeClass : inactiveClass]"
        to="/utilities"
      >
        <font-awesome-icon :icon="['fass', 'screwdriver-wrench']" size="lg" />
        <span class="mx-4">Utilities</span>
      </router-link>
      <router-link
        data-tippy-content="Setting"
        data-tippy-placement="right"
        class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4"
        :class="[$route.name === 'setting' ? activeClass : inactiveClass]"
        to="/setting"
      >
        <font-awesome-icon :icon="['fass', 'gear']" size="lg" />
        <span class="mx-4">Setting</span>
      </router-link> -->
    </nav>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import "@fortawesome/fontawesome-free/css/all.css";
import "tippy.js/dist/tippy.css";
import tippy from "tippy.js";

onMounted(() => {
  tippy("[data-tippy-content]");
});
// const emit = defineEmits(["close"]);
const activeClass = ref(
  "bg-gray-600 font-bold  text-lg bg-opacity-25 text-[#EF4104] border-[#EF4104]"
);
const inactiveClass = ref(
  "border-gray-900 text-lg font-bold   text-[#404147] hover:text-[#FBB919] border-[#9197B3] hover:border-[#FBB919]"
);
</script>
<style></style>
