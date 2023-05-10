<template>
  <div class="w-64  z-50 fixed h-full space-x-2 bg-slate-100">
    <div class="flex py-8 justify-center items-center">
      <div class="text-2xl font-extrabold">Santim Crypto</div>
    </div>
    <div class="flex flex-col justify-between h-full">
      <div>
        <router-link
          data-tippy-content="Home"
          data-tippy-placement="right"
          class="flex items-center hover:bg-slate-500 focus:bg-slate-500  focus:text-white focus:rounded-lg  hover:rounded-lg px-6 py-2 mt-4 duration-200 "
          :class="[$route.name === 'home' ? activeClass : inactiveClass]"
          to="/home"
        >
          <font-awesome-icon :icon="['fas', 'house']" />
          <span class="mx-4">Home</span>
        </router-link>
        <router-link
          data-tippy-content="Transaction"
          data-tippy-placement="right"
          class="flex items-center hover:bg-slate-500 focus:bg-slate-500   focus:text-white focus:rounded-lg  hover:rounded-lg px-6 py-2 mt-4 duration-200 "
          :class="[$route.name === 'transaction' ? activeClass : inactiveClass]"
          to="/transaction"
        >
          <font-awesome-icon :icon="['fas', 'arrow-right-arrow-left']" size="xl" />
          <span class="mx-4">Transaction</span>
        </router-link>
        <router-link
          data-tippy-content="Crypto Currency"
          data-tippy-placement="right"
          class="flex items-center hover:bg-slate-500 focus:bg-slate-500  focus:text-white focus:rounded-lg  hover:rounded-lg px-4 py-2 mt-4 duration-200 "
          :class="[$route.name === 'asset' ? activeClass : inactiveClass]"
          to="/crypto-currency"
        >
          <font-awesome-icon :icon="['fab', 'bitcoin']" size="xl" />
          <span class="mx-2">Crypto currency</span>
        </router-link>
        <router-link
          data-tippy-content="Crypto Currency"
          data-tippy-placement="right"
          class="flex items-center hover:bg-slate-500 focus:bg-slate-500  focus:text-white focus:rounded-lg  hover:rounded-lg px-4 py-2 mt-4 duration-200 "
          :class="[$route.name === 'asset' ? activeClass : inactiveClass]"
          to="/crypto-currency"
        >
          <font-awesome-icon :icon="['fab', 'bitcoin']" size="xl" />
          <span class="mx-2">Exchange</span>
        </router-link>
      </div>
      <div class="w-full z-10 border-black mb-32">
        <div class="flex items-center hover:bg-slate-500 focus:bg-slate-500  focus:text-white focus:rounded-lg  hover:rounded-lg px-4 py-2 mt-4 duration-200">
          <img src="../../../assets/man.png" class="w-8 bg-slate-200 h-8 rounded-full" alt="" />
          <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:text-white">Profile</a>
        </div>
        <a href="#" class="flex items-center hover:bg-slate-500 focus:bg-slate-500  focus:text-white focus:rounded-lg  hover:rounded-lg px-4 py-2 mt-4 duration-200">Setting</a>
        <button
          @click="user.logout"
          class="flex items-center hover:bg-slate-500 w-full focus:bg-slate-500  focus:text-white focus:rounded-lg  hover:rounded-lg px-4 py-2 mt-4 duration-200"
        >
          Log out
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import '@fortawesome/fontawesome-free/css/all.css'
import 'tippy.js/dist/tippy.css'
import tippy from 'tippy.js'
import { UserStore } from '../../../stores/user_store'
const user = UserStore() 
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
