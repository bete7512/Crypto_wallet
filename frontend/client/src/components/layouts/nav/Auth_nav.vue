<template>
  <Mobile v-if="isNav" v-on:close="isNav = false" class="block lg:hidden"></Mobile>

  <div class="w-full bg-slate-100 flex">
    <div class="w-64 bg-slate-500  fixed h-full lg:block hidden">
      <Sider></Sider>
    </div>
    <div
      class="bg-slate-200 lg:hidden fixed h-20 block w-full"
      data-tippy-content="Menu"
      data-tippy-placement="right"
    >
      <button @click="isNav = true" class="p-2 hover:ring-red-400 w-40 ">
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
    <div class="w-full lg:ml-64  ml-0">
        <div class="flex justify-center items-center">
            <div class="py-8 h-10 px-2 sticky z-50 top-16  flex space-x-2 container justify-end">
            <div class="flex h-full justify-center items-center space-x-1">
            <button
              @click="sending = true"
              class="flex h-10 z-0 px-6 justify-center rounded-lg items-center bg-white text-black border border-gray-700 hover:bg-slate-200 hover:border-blue-700 hover:text-blue-700 space-x-2"
            >
              Send
            </button>
          </div>
          <div class="flex z-0 h-full justify-center items-center space-x-1">
            <button
              @click="recieving = true"
              class="flex h-10 justify-center items-center border border-gray-700 hover:bg-slate-200 hover:border-blue-700 hover:text-blue-700 bg-white text-black rounded-lg px-3 space-x-2"
            >
              Recieve
            </button>
          </div>
        </div>   
        </div>
     
      <slot></slot>
    </div>
  </div>
  <send v-if="sending == true" v-on:close="sending = false"></send>
  <recieve v-if="recieving == true" v-on:close="recieving = false"></recieve>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Mnav from './Mnav.vue'
import { UserStore } from '../../../stores/user_store'
import Mobile from './Mobile.vue'
import router from '../../../router'
import recieve from '../../modals/recieve.vue'
import send from '../../modals/send.vue'
import Sider from './Sider.vue'
const dropdownOpen = ref(false)
const sending = ref(false)
const recieving = ref(false)
const show_notification = ref(false)
const user = UserStore()
const isNav = ref(false)
onMounted(async () => {
  if (user.userLoggedin) await user.user_profile()
  console.log(user.user)
})
const logout = () => {
  user.logout()
  router.push('/login')
}
</script>
<style>
.sticky {
  position: sticky;
  top: 64px;
  z-index: 999;
}
</style>
