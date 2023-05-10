<template>
<div class="w-full space-y-4 ">
    <Gradient></Gradient>
    <Promote class=""></Promote>
    <Promote class=""></Promote>
</div>
</template>
</template>
<script setup>
import { ref,onMounted } from 'vue'
import send from '../components/send.vue'
import Gradient from '../components/Home/Gradient.vue'
import Promote from '../components/Home/Promote.vue'
import detectEthereumProvider from '@metamask/detect-provider'
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

async function disconnectWallet() {
  try {
    const provider = await detectEthereumProvider()
    if (provider) {
      await provider.request({ method: 'wallet_requestPermissions', params: [{ eth_accounts: {} }] })
      isConnected.value = false
    } else {
      console.log('Please install Metamask')
    }
  } catch (error) {
    console.error(error)
  }
}
</script>
<style>
</style>
