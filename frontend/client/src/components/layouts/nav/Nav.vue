<template>
  <div class="bg-[#121D33] z-50 border-b border-gray-400 flex justify-center items-center">
    <div class="flex container mx-auto justify-center items-center z-50">
      <div class="flex justify-between items-center text-white w-full px-10 h-20">
        <div class="flex justify-center items-center space-x-3">
          <router-link to="/" class="text-2xl font-bold tex-[#A0A5AD]">Santim Crypto</router-link>
          <router-link
            to="/"
            class="text-lg px-4 py-1 text-[#9CA1B2] hover:bg-gray-600 rounded-lg duration-300 font-bold"
            >Exchange
          </router-link>
        </div>
        <div v-if="user.userLoggedin" class="flex items-center space-x-2">
          <div class="flex h-full justify-center items-center space-x-1">
            <button
              @click="sending = true"
              class="flex h-10 px-6 justify-center rounded-lg items-center bg-white text-black border border-gray-700 hover:bg-slate-200 hover:border-blue-700 hover:text-blue-700 space-x-2"
            >
              Send
            </button>
          </div>
          <div class="flex h-full justify-center items-center space-x-1">
            <button
              @click="recieving = true"
              class="flex h-10 justify-center items-center border border-gray-700 hover:bg-slate-200 hover:border-blue-700 hover:text-blue-700 bg-white text-black rounded-lg px-3 space-x-2"
            >
              Recieve
            </button>
          </div>
          <div class="relative z-50">
            <button
              @click="dropdownOpen = !dropdownOpen"
              class="relative z-10 block w-16 h-16 overflow-hidden rounded-full shadow focus:outline-none focus:outline-offset-1 focus:ring-gray-600 focus:ring-4"
              data-tippy-content="Profile"
            >
              <img
                src="../../../assets/man.png"
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
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-green-600 hover:text-white"
                  >Profile</a
                >
                <a
                  href="#"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-green-600 hover:text-white"
                  >Setting</a
                >

                <button
                  @click="logout"
                  class="px-4 py-2 w-full flex justify-start text-sm text-gray-700 hover:bg-green-600 hover:text-white"
                >
                  Log out
                </button>
              </div>
            </transition>
          </div>
        </div>
        <div v-else class="flex h-full justify-between items-center space-x-3">
          <div class="flex h-full justify-center items-center space-x-1">
            <router-link
              to="/login"
              class="flex h-1/2 justify-center rounded-lg items-center bg-[#121D33] border border-white hover:text-white px-3 space-x-2"
            >
              Login
            </router-link>
          </div>
          <div class="flex h-full justify-center items-center space-x-1">
            <router-link
              to="/signup"
              class="flex h-1/2 justify-center items-center bg-white text-black rounded-lg px-3 space-x-2"
            >
              Signup
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
  <send v-if="sending == true" v-on:close="sending = false"></send>
  <recieve v-if="recieving == true" v-on:close="recieving = false"></recieve>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { UserStore } from '../../../stores/user_store'
import router from '../../../router'
import recieve from '../../modals/recieve.vue'
import send from '../../modals/send.vue'
const dropdownOpen = ref(false)
const sending = ref(false)
const recieving = ref(false)
const show_notification = ref(false)
const user = UserStore()
onMounted(async () => {
  if (!user.userLoggedin) router.push('/login')
  if (user.userLoggedin) await user.user_profile()
  console.log(user.user);
})
const logout = () => {
  user.logout()
  router.push('/login')
}
</script>
<style></style>
