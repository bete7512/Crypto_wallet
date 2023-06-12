<template>
  <div
    class="overlay top-0  z-50 lg:hidden md:w-1/3 w-1/2  left-0 flex items-center justify-center"
  >
    <!-- <div class="w-72 fixed bg-white z-10 h-screen border-r border-black">
    <div class="flex justify-center space-x-3 pr-3 items-center pt-3">
      <img src="../../assets/logo.png" alt="" class="w-56 h-60" />
    </div> -->

    <div
      class="space-y-80 z-50 w-full bg-white shadow-black shadow-2xl h-screen border-black rounded-md"
    >
      <div class="w-full z-50 border-zinc-900 h-auto space-y-4 px-2">
        <div class="w-full relative p-10 flex justify-between  px-2 pt-4">
          <!-- <div
            class="flex w-full justify-center space-x-3 pr-3 items-center pt-3"
          > -->
            <img src="../../../assets/logo.png" alt="" class="w-40 h-40" />
          <!-- </div> -->
          <button @click="emit('close')" class="z-50  absolute right-2 top-1">

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="black"
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
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22 20H11V13H22V20ZM9 20H2V13H9V20ZM22 11H2V4H22V11Z"
              fill="black"
            />
          </svg>

          <span class="mx-4">Dasboard </span>
        </router-link>
        <router-link
          data-tippy-content="Services requests"
          data-tippy-placement="right"
          class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4"
          :class="[$route.name === 'services' ? activeClass : inactiveClass]"
          to="/services"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <polygon
              points="18,16 16,16 16,15 8,15 8,16 6,16 6,15 2,15 2,20 22,20 22,15 18,15"
            />
            <path
              d="M20,8h-3V6c0-1.1-0.9-2-2-2H9C7.9,4,7,4.9,7,6v2H4c-1.1,0-2,0.9-2,2v4h4v-2h2v2h8v-2h2v2h4v-4C22,8.9,21.1,8,20,8z M15,8 H9V6h6V8z"
            />
          </svg>

          <span class="mx-4">Service Requests</span>
        </router-link>

        <router-link
          data-tippy-content="Technicians"
          data-tippy-placement="right"
          class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4"
          :class="[$route.name === 'technicians' ? activeClass : inactiveClass]"
          to="/technicians"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <polygon
              points="18,16 16,16 16,15 8,15 8,16 6,16 6,15 2,15 2,20 22,20 22,15 18,15"
            />
            <path
              d="M20,8h-3V6c0-1.1-0.9-2-2-2H9C7.9,4,7,4.9,7,6v2H4c-1.1,0-2,0.9-2,2v4h4v-2h2v2h8v-2h2v2h4v-4C22,8.9,21.1,8,20,8z M15,8 H9V6h6V8z"
            />
          </svg>
          <span class="mx-4">Technicians</span>
        </router-link>
        <router-link
          data-tippy-content="Customers"
          data-tippy-placement="right"
          class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4"
          :class="[$route.name === 'accessory' ? activeClass : inactiveClass]"
          to="/accessory"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            class="bi bi-gear"
            viewBox="0 0 24 24"
          >
            <path
              d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"
            />
            <path
              d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"
            />
          </svg>
          <span class="mx-4">Acessory</span>
        </router-link>

        <router-link
          data-tippy-content="Technician complain"
          data-tippy-placement="right"
          class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4"
          :class="[
            $route.name === 'technician-complain' ? activeClass : inactiveClass,
          ]"
          to="/technician-complain"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
            <path
              fill-rule="evenodd"
              d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
              clip-rule="evenodd"
            />
          </svg>

          <span class="mx-4 ">Technician complain</span>
        </router-link>

        <router-link
          data-tippy-content="Manage User Account"
          data-tippy-placement="right"
          class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4"
          :class="[
            $route.name === 'manage-user-account' ? activeClass : inactiveClass,
          ]"
          to="/manage-user-account"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              d="M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z"
            />
            <path
              d="M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z"
            />
            <path
              d="M17 5c0 1.657-3.134 3-7 3S3 6.657 3 5s3.134-3 7-3 7 1.343 7 3z"
            />
          </svg>
          <span class="mx-4">Manage users</span>
        </router-link>
        <router-link
          data-tippy-content="Invoices"
          data-tippy-placement="right"
          class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4"
          :class="[$route.name === 'invoices' ? activeClass : inactiveClass]"
          to="/invoices"
        >
          <svg
            class="w-5 h-5"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 3C6.44772 3 6 3.44772 6 4C6 4.55228 6.44772 5 7 5H13C13.5523 5 14 4.55228 14 4C14 3.44772 13.5523 3 13 3H7Z"
              fill="currentColor"
            />
            <path
              d="M4 7C4 6.44772 4.44772 6 5 6H15C15.5523 6 16 6.44772 16 7C16 7.55228 15.5523 8 15 8H5C4.44772 8 4 7.55228 4 7Z"
              fill="currentColor"
            />
            <path
              d="M2 11C2 9.89543 2.89543 9 4 9H16C17.1046 9 18 9.89543 18 11V15C18 16.1046 17.1046 17 16 17H4C2.89543 17 2 16.1046 2 15V11Z"
              fill="currentColor"
            />
          </svg>

          <span class="mx-4">Invoices</span>
        </router-link>

        <router-link
          data-tippy-content="Service Payment"
          data-tippy-placement="right"
          class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4"
          :class="[
            $route.name === 'service-payment' ? activeClass : inactiveClass,
          ]"
          to="/service-payment"
        >
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"
            />
            <path
              fill-rule="evenodd"
              d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
              clip-rule="evenodd"
            />
          </svg>

          <span class="mx-4">Service Payment</span>
        </router-link>

        <router-link
          data-tippy-content="Setting"
          data-tippy-placement="right"
          class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4"
          :class="[$route.name === 'setting' ? activeClass : inactiveClass]"
          to="/setting"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              d="M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z"
            />
            <path
              d="M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z"
            />
            <path
              d="M17 5c0 1.657-3.134 3-7 3S3 6.657 3 5s3.134-3 7-3 7 1.343 7 3z"
            />
          </svg>
          <span class="mx-4  text-[#9197B3]">Setting</span>
        </router-link>
    </nav>
      </div>
    </div>
  </div>
</template>
<script setup>
import { defineEmits, ref,onMounted } from "vue";

import "tippy.js/dist/tippy.css";
import tippy from "tippy.js";

onMounted(() => {
  tippy("[data-tippy-content]");
});
const emit = defineEmits(["close"]);
const activeClass = ref("bg-gray-600 font-bold  text-lg bg-opacity-25 text-[#EF4104] border-[#EF4104]");
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
