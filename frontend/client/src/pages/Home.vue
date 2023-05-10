<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="flex justify-center items-center h-screen">
      <button @click="connectWallet" class="bg-blue-500 text-white py-2 px-4 rounded">Connect Metamask</button>
    </div>
    <!-- <send></send> -->
    <router-link to="/test">test</router-link>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import detectEthereumProvider from '@metamask/detect-provider'
  // import send from '../components/send.vue';
  const isConnected = ref(false)
  
  async function connectWallet() {
    try {
      const provider = await detectEthereumProvider()
      if (provider) {
        await provider.request({ method: 'eth_requestAccounts' })
        isConnected.value = true
      } else {
        console.log('Please install Metamask')
      }
    } catch (error) {
      console.error(error)
    }
  }
  </script>
  
  <style>
  /* Add your Tailwind CSS styles here */
  </style>
  