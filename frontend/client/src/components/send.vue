<template>
  <div class="flex justify-center items-center bg-gray-100">
    <h1 class="text-3xl font-bold mb-4">MetaMask Demo</h1>
    <form @submit.prevent="sendTransaction">
      <label class="block font-bold mb-2">Amount to Send:</label>
      <input
        v-model="amount"
        type="text"
        class="w-64 p-2 rounded border border-gray-400 mb-4"
        required
      />
      <label class="block font-bold mb-2">Recipient Address:</label>
      <input
        v-model="recipient"
        type="text"
        class="w-64 p-2 rounded border border-gray-400 mb-4"
        required
      />
      <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Send
      </button>
    </form>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import Web3 from 'web3'
const amount = ref('')
const recipient = ref('')
const sendTransaction = async () => {
  try {
    if (typeof window.ethereum === 'undefined') {
      throw new Error('Please install MetaMask to use this feature')
    }
    await window.ethereum.request({ method: 'eth_requestAccounts' })
    const accounts = await window.ethereum.request({ method: 'eth_accounts' })
    const account = accounts[0]
    const web3 = new Web3(window.ethereum)
    const weiAmount = web3.utils.toWei(amount.value, 'ether')
    const hexAmount = '0x' + weiAmount.toString('hex')
    await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [
        {
          from: account,
          to: recipient.value,
          value: hexAmount
        }
      ]
    })
    amount.value = ''
    recipient.value = ''
  } catch (error) {
    console.error(error)
  }
}
</script>

<style>
/* Add your custom styles here */
</style>
