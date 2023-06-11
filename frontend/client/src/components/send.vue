<template>
  <div class="flex justify-center items-center bg-gray-100">
    <h1 class="text-3xl font-bold mb-4">MetaMask Demo</h1>
    <form @submit.prevent="send_token">
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
import {Tether_ABI} from '../constants/Tether.ABI'
import apolloclient from '../apollo.config';
import gql  from 'graphql-tag' 
const contract_address = '0x222fB5507acD3Da78351Be60271fa9537b07Cdc3'
const amount = ref('')
const recipient = ref('')
// const sendTransaction = async () => {
//   try {
//     if (typeof window.ethereum === 'undefined') {
//       throw new Error('Please install MetaMask to use this feature')
//     }
//     await window.ethereum.request({ method: 'eth_requestAccounts' })
//     const accounts = await window.ethereum.request({ method: 'eth_accounts' })
//     const account = accounts[0]
//     const web3 = new Web3(window.ethereum)
//     const weiAmount = web3.utils.toWei(amount.value, 'ether')
//     const hexAmount = '0x' + weiAmount.toString('hex')
//     await window.ethereum.request({
//       method: 'eth_sendTransaction',
//       params: [
//         {
//           from: account,
//           to: recipient.value,
//           value: hexAmount
//         }
//       ]
//     })
//     amount.value = ''
//     recipient.value = ''
//   } catch (error) {
//     console.error(error)
//   }
// }
const Mutate = gql`
mutation MyMutation($amount: Int = 10, $to: String = "", $token_type: String = "") {
  send_token(amount: $amount, token_type: $token_type, to: $to) {
    success
  }
}

`
const send_token = async () => {
  try {

    if (typeof window.ethereum === 'undefined') {
      throw new Error('Please install MetaMask to use this feature')
    }
    await window.ethereum.request({ method: 'eth_requestAccounts' })
    const accounts = await window.ethereum.request({ method: 'eth_accounts' })
    const account = accounts[0]
    const web3 = new Web3(window.ethereum)
    const contract = new web3.eth.Contract(Tether_ABI, contract_address)
    const decimals = await contract.methods.decimals().call()
    const amountInDecimal = Number(amount.value)
    const weiAmount = BigInt(Math.floor(amountInDecimal * 10 ** decimals))
    await contract.methods.transfer(recipient.value, weiAmount.toString()).send({ from: account })
    amount.value = ''
    recipient.value = ''
  } catch (error) {
    console.error(error)
  }
}


const send_from_my_token = async ()=>{
  try {
    const {data} = await apolloclient.mutate({
      mutation: Mutate,
      variables: {
        amount: 10,
        to: "0x222fB5507acD3Da78351Be60271fa9537b07Cdc3",
        token_type: "Tether"
      }
    })
    console.log(data)
  } catch (error) {
    console.log(error)
  }
}
</script>

<style>
/* Add your custom styles here */
</style>
