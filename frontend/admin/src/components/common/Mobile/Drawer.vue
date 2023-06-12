<template>
  <div
    class="overlay top-0 z-50 lg:hidden md:w-1/3 w-1/2 left-0 flex items-center justify-center"
  >
    <!-- <div class="w-72 fixed bg-white z-10 h-screen border-r border-black">
    <div class="flex justify-center space-x-3 pr-3 items-center pt-3">
      <img src="../../assets/logo.png" alt="" class="w-56 h-60" />
    </div> -->

    <div
      class="space-y-80 z-50 w-full bg-white shadow-black shadow-2xl h-screen border-black rounded-md"
    >
      <div class="w-full z-50 border-zinc-900 h-auto space-y-4 px-2">
        <div class="w-full relative p-10 flex justify-between px-2 pt-4">
          <div
            class="flex w-full justify-center space-x-3 pr-3 items-center pt-3"
          >
            <h1 class="h-20 flex justify-center items-center">
              <div class="text-2xl">Santim Crypto</div>
            </h1>
          </div>
          <button @click="emit('close')" class="z-50 absolute right-2 p-2 rounded-lg text-black ">
            <!-- fill="black" -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              class="bi bi-x-lg"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"
              />
              <path
                fill-rule="evenodd"
                d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"
              />
            </svg>
          </button>
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

          <router-link
            data-tippy-content="Transactions"
            data-tippy-placement="right"
            class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4"
            :class="[
              $route.name === 'transactions' ? activeClass : inactiveClass,
            ]"
            to="/transactions"
          >
            <font-awesome-icon :icon="['fass', 'comments-dollar']" size="lg" />
            <span class="mx-4">Transactions</span>
          </router-link>

          <router-link
            data-tippy-content="Orders"
            data-tippy-placement="right"
            class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4"
            :class="[$route.name === 'orders' ? activeClass : inactiveClass]"
            to="/orders"
          >
            <font-awesome-icon :icon="['fas', 'money-check-dollar']" />
            <span class="mx-4">Token Orders</span>
          </router-link>
          <router-link
            data-tippy-content="withdrawal"
            data-tippy-placement="right"
            class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4"
            :class="[
              $route.name === 'withdrawal' ? activeClass : inactiveClass,
            ]"
            to="/withdrawal"
          >
            <font-awesome-icon :icon="['fas', 'money-check-dollar']" />
            <span class="mx-4">Withdrawal</span>
          </router-link>
          <router-link
            data-tippy-content="Utitlities"
            data-tippy-placement="right"
            class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4"
            :class="[$route.name === 'utilities' ? activeClass : inactiveClass]"
            to="/utilities"
          >
            <font-awesome-icon
              :icon="['fass', 'screwdriver-wrench']"
              size="lg"
            />
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
          </router-link>
        </nav>
      </div>
    </div>
  </div>
</template>
<script setup>
import { defineEmits, ref, onMounted } from "vue";

import "tippy.js/dist/tippy.css";
import tippy from "tippy.js";

onMounted(() => {
  tippy("[data-tippy-content]");
});
const emit = defineEmits(["close"]);
const activeClass = ref(
  "bg-gray-600 font-bold  text-lg bg-opacity-25 text-[#EF4104] border-[#EF4104]"
);
const inactiveClass = ref(
  "border-gray-900 text-lg font-bold   text-[#9197B3] hover:text-[#FBB919] border-[#9197B3] hover:border-[#FBB919]"
);
</script>
<style scoped>
.overlay {
  position: fixed;
  background-color: rgb(0, 0, 0, 0.3);
}
</style>
