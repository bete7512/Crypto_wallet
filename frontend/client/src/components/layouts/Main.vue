<template>
  <div class="flex justify-center items-center">
    <div class="w-full">
      <div class="sticky z-50 top-0">
        <Nav class="lg:block hidden z-50"></Nav>
        <Mobile class="block sm:hidden"></Mobile>
      </div>
      <div class="bg-white">
        <slot></slot>
      </div>
    </div>
  </div>
  <Footer v-if="!user.userLoggedin"></Footer>
</template>

<script setup>
import Footer from './Footer.vue'
import Nav from './nav/Nav.vue'
import Mobile from './nav/Mnav.vue'
import { UserStore } from '../../stores/user_store'
import { ref, onMounted } from 'vue'
const user = UserStore()
onMounted(async () => {
  if (!user.userLoggedin) router.push('/login')
  if (user.userLoggedin) await user.user_profile()
  console.log(user.user);
})
</script>

<style>
.sticky {
  position: sticky;
  top: 0;
  z-index: 999;
}</style>

