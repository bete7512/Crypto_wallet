<template>
  <div class="bg-[#121D33] z-50 border-b border-gray-400 flex justify-center items-center">
    <div class="flex container mx-auto justify-center items-center z-30">
      <div class="flex justify-between items-center text-white w-full mt-0 px-10 h-20">
        <div class="flex justify-center items-center space-x-3">
          <router-link to="/" class="text-2xl font-bold tex-[#A0A5AD]">Santim Crypto</router-link>
          <router-link
            to="/"
            class="text-lg px-4 py-1 text-[#9CA1B2] hover:bg-gray-600 rounded-lg duration-300 font-bold"
            >Exchange
          </router-link>
        </div>

        <div class="flex h-full justify-between items-center space-x-3">
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
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { UserStore } from '../../../stores/user_store'
import Mobile from './Mobile.vue'
import router from '../../../router'
import recieve from '../../modals/recieve.vue'
import send from '../../modals/send.vue'
const dropdownOpen = ref(false)
const sending = ref(false)
const recieving = ref(false)
const show_notification = ref(false)
const user = UserStore()
const isNav = ref(false)
onMounted(async () => {
  if (user.userLoggedin) await router.push('/home')
  if (user.userLoggedin) await user.user_profile()
  console.log(user.user)
})
const logout = () => {
  user.logout()
  router.push('/login')
}
</script>
<style></style>
