<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="w-full space-y-4 ">
    <Gradient></Gradient>
    <Promote class="my-8"></Promote>
    <Promote class="my-8"></Promote>
  
  </div>
</template>

<script setup>
import { ref } from 'vue'
import detectEthereumProvider from '@metamask/detect-provider'
import send from '../components/send.vue'
import Gradient from '../components/Home/Gradient.vue'
import Promote from '../components/Home/Promote.vue'
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
