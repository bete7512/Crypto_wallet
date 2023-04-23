<template>
  <div class="bg-[#121D33] z-50  border-b border-gray-400  flex justify-center items-center">
    <div class="flex container mx-auto justify-center items-center z-50">
      <div class="flex    justify-between items-center text-white w-full px-10 h-20">
        <div class="flex justify-center items-center space-x-3">
          <router-link to="/" class="text-2xl font-bold tex-[#A0A5AD]">Santim Crypto</router-link>
          <router-link to="/" class="text-lg px-4 py-1 text-[#9CA1B2] hover:bg-gray-600 rounded-lg duration-300 font-bold">Exchange </router-link>
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

<script setup></script>
<style></style>
