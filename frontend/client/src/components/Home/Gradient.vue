<template>
  <div>
    <div
      class="bg-gradient-to-r z-0 h-[500px] from-[#121D33] via-[#322779] to-green-400 flex justify-center items-center"
    >
      <div class="flex container mx-auto justify-center items-center z-50">
        <div class="space-y-8">
          <h1 class="text-white text-5xl font-bold z-0">Be early to the future of finance</h1>
          <div class="text-white text-xl font-bold z-0">
            <div class="text-white text-xl font-bold z-0">Buy Crypto Tokens from Ethereum,</div>
            <div class="text-white text-xl font-bold z-0">
              and other leading cryptocurrencies on Santim Platform.
            </div>
          </div>
          <div class="">
            <div class="flex items-center">
              <label for="simple-search" class="sr-only">Search</label>
              <div class="relative w-full">
                <input
                  type="text"
                  id="simple-search"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter your Email address "
                  required
                />
              </div>
              <router-link
                to="/signup"
                class="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <span class="">Signup</span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="h-20"></div> -->
    <div class="-mt-20 space-x-4 flex container mx-auto justify-center items-center">
        <card name="Bitcoin" symbol="BTC" price="49000.00"></card>
        <card name="Bitcoin" symbol="BTC" price="49000.00"></card>
        <card name="Bitcoin" symbol="BTC" price="49000.00"></card>

    </div>
  </div>

</template>
<script setup>
import card from './card.vue'
</script>
<style></style>
