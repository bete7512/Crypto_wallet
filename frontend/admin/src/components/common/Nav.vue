<template>
  <Mdrawer
    class="lg:hidden block"
    v-if="isNav"
    v-on:close="isNav = false"
  ></Mdrawer>
  <div class="space-x-0 w-full z-10 flex justify-between">
    <div class="lg:block bg-blue-600 z-20 fixed w-1/6 hidden">
      <Drawer class=""></Drawer>
    </div>
    <div class="ml-10 flex-1 bg-slate-200">
      <!-- <div class="  bg-slate-400"> -->
      <div class="w-full right-0 z-10 fixed h-20 bg-white border-black">
        <div
          class="flex mr-1 justify-between space-x-4 text-3xl px-5 items-center pt-0 h-full"
        >
          <div
            class="mx-3"
            data-tippy-content="Menu"
            data-tippy-placement="right"
          >
            <button
              @click="nav()"
              v-if="!isNav"
              class="lg:hidden block p-2 hover:ring-red-400 w-40 h-40"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="42"
                height="42"
                fill="currentColor"
                class="bi bi-list"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                />
              </svg>
            </button>
          </div>
          <div class="flex items-center space-x-7">
            <!-- <button data-tippy-content="night mode " class="focus:outline-offset-1 w-12 h-12 rounded-full flex justify-center items-center ">
              <font-awesome-icon :icon="['fas', 'moon']" />
            
            </button> -->

            <div class="relative z-50">
              <button
                @click="dropdownOpen = !dropdownOpen"
                class="relative z-10 block w-16 h-16 overflow-hidden rounded-full shadow focus:outline-none focus:outline-offset-1 focus:ring-gray-600 focus:ring-4"
                data-tippy-content="Profile"
              >
                <img
                  src="../../assets/man.png"
                  class="w-16 bg-slate-200 h-16 rounded-full"
                  alt=""
                />
              </button>
              <div
                v-show="dropdownOpen"
                @click="dropdownOpen = false"
                class="fixed inset-0 z-10 w-full h-full"
              ></div>

              <transition
                class="z-50"
                enter-active-class="transition duration-150 ease-out transform"
                enter-from-class="scale-95 opacity-0"
                enter-to-class="scale-100 opacity-100"
                leave-active-class="transition duration-150 ease-in transform"
                leave-from-class="scale-100 opacity-100"
                leave-to-class="scale-95 opacity-0"
              >
                <div
                  v-show="dropdownOpen"
                  class="absolute right-0 z-20 w-64 py-2 mt-2 bg-white rounded-md shadow-xl"
                >
                  <a
                    href="#"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-[#EF4104] hover:text-white"
                    >Profile</a
                  >
                  <a
                    href="#"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-[#EF4104] hover:text-white"
                    >Setting</a
                  >

                  <button
                    @click="logout()"
                    class="px-4 py-2 w-full flex justify-start text-sm text-gray-700 hover:bg-[#EF4104] hover:text-white"
                  >
                    Log out
                  </button>
                </div>
              </transition>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full lg:pl-72 bg-slate-200 pl-0 mt-10">
        <div
          class="sm:w-1/6 w-full sm:px-0 px-5 h-14 lg:pl-12 pl-5 pt-5 space-x-2 mt-2 rounded-lg"
        ></div>
        <slot class="bg-slate-600"></slot>
      </div>
    </div>
  </div>
</template>
<script setup>
import Drawer from "./Drawer.vue";
import Mdrawer from "./Mobile/Drawer.vue";
import Header from "./Header.vue";
import { ref } from "vue";
import router from "../../router";
const isNav = ref(false);
const nav = () => {
  isNav.value = true;
  console.log(isNav.value);
};
const dropdownOpen = ref(false);
//   const { isOpen } = useSidebar();
const isOpen = ref(false);
//array of numbers
const logout = () => {
  localStorage.removeItem("cryptoAdminToken");
  router.push("/login");
};
</script>
<style lang=""></style>
