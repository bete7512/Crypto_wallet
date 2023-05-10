<template>
  <div class="fixed overlay top-0 left-0 right-0 bottom-0 flex z-10 p-3 overflow-y-auto mx-2">
    <div class="m-auto sm:w-1/2 lg:w-1/3 w-full">
      <div class="fixed inset-0 transition-opacity">
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
      <div
        class="bg-white rounded-lg text-left overflow-hidden shadow-xl pb- transform transition-all sm:my-8 sm:align-middle sm:w-full"
      >
        <div class="flex justify-between p-4 pt-6 items-center">
          <h3 class="text-lg leading-6 font-bold text-gray-900">Send Crypto</h3>
          <button @click="discard" class="text-gray-400 hover:text-gray-500 focus:outline-none">
            <span class="sr-only">Close</span>
            <svg
              class="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
        <div class="bg-white px-4 space-y-3 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="space-y-2">
            <label class="block text-lg text-black"> Token </label>
            <select
              v-model="token_id"
              class="flex h-12 items-center outline-2 text-gray-600 bg-[#E5E7EB] cursor-pointer justify-center w-full sm:px-4 px-3 text-lg text-boldborder-gray-800 border focus:outline-none rounded-lg transition duration-150 ease-in-out"
            >
              <option disabled value="" class="">Select Tokens</option>
              <option class="" v-for="token in tokens" :key="token.id" :value="token.id">
                <!-- {{ token.symbol }} -->
                {{ token.name }}
              </option>
            </select>
          </div>
          <div class="space-y-2">
            <label class="block text-lg text-black"> Send From </label>
            <select
              v-model="send_type"
              class="flex h-12 items-center outline-2 text-gray-600 bg-[#E5E7EB] cursor-pointer justify-center w-full sm:px-4 px-3 text-lg text-boldborder-gray-800 border focus:outline-none rounded-lg transition duration-150 ease-in-out"
            >
              <option value="" class="">Select Sending Type</option>
              <option value="metamask" class="">Send From Metamask</option>
              <option value="myaccount" class="">Send From My Account</option>
            </select>
          </div>
          <div class="space-y-2">
            <label class="block text-lg text-black"> Amount </label>
            <input
              v-model="amount"
              type="number"
              min="0"
              increment="0.01"
              max="0.5"
              class="bg-[#E5E7EB] block w-full px-5 py-2 h-12 text-base text-neutral-600 placeholder-gray-500 transition duration-500 ease-in-out transform border border-transparent rounded-lg focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
            />
          </div>
          <div class="space-y-2">
            <label class="block text-lg text-black"> Adress </label>
            <input
              v-model="address"
              type="text"
              class="bg-[#E5E7EB] block w-full px-5 py-2 h-12 text-base text-neutral-600 placeholder-gray-500 transition duration-500 ease-in-out transform border border-transparent rounded-lg focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
            />
          </div>
        </div>
        <div class="flex justify-center items-center text-center text-red-500">
          {{ error_message }}
        </div>
        <div class="bg-gray-50 px-4 space-x-3 py-3 flex justify-end">
          <button
            @click="discard"
            class="bg-[#F23207] hover:bg-[#711702] text-white font-bold py-2 px-4 rounded-lg mr-2"
          >
            Cancel
          </button>
          <button
            @click="submitForm"
            class="bg-[#46C40F] hover:bg-[#123503] text-white font-bold py-2 px-4 rounded-lg"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import apolloclient from '../../apollo.config'
import { assetStore } from '../../stores/asset'
import detectEthereumProvider from '@metamask/detect-provider'
import Web3 from 'web3'
import { notify } from '@kyvg/vue3-notification'
import {Tether_ABI} from '../../constants/Tether.ABI'
const contract_address = '0x222fB5507acD3Da78351Be60271fa9537b07Cdc3'
const emit = defineEmits(['close', 'submit'])
const asset = assetStore() 
const token_id = ref('')
const send_type = ref('')
const amount = ref('')
const address = ref('')
const error_message = ref('')
const tokens = ref([])
onMounted(async()=>{
  await asset.get_tokens()
  await asset.get_networks()
  tokens.value = asset.tokens 
})
const discard = () => {
  emit('close')
}
async function submitForm(){
  if(send_type == ''){
    error_message.value = 'Please select sending type'
    return         
  }
  if(token_id == ''){
    error_message.value = 'Please select token'
    return         
  }      
  if(amount == ''){
    error_message.value = 'Please enter Amount to send'
    return         
  }
  if(address == ''){
    error_message.value = 'Please enter address to send'
    return         
  }   
  if(send_type == 'metamask'){
    await connectWallet()
    await send_token()  
  }else{     
    await send_token()  
  }      
}
async function connectWallet() {
  try {
    const provider = await detectEthereumProvider()
    if (provider) {
      await provider.request({ method: 'eth_requestAccounts' })
      isConnected.value = true
      notify({
        type: 'success',
        title: 'Success',
        text: 'Wallet Connected Successfully',
      })       
    } else {
      notify({
        type: 'error',
        title: 'Error',
        text: 'Please install Metamask',
      })
      console.log('Please install Metamask')
    }
  } catch (error) {
    notify({
      type: 'error',
      title: 'Error',
      text: error.message,
    })
    console.error(error)
  }
}
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
    await contract.methods.transfer(address.value, weiAmount.toString()).send({ from: account })
    amount.value = ''
    address.value = ''
    notify({
      type: 'success',
      title: 'Success',
      text: 'Token Sent Successfully',
    })
    emit('close')
  } catch (error) {
    notify({
      type: 'error',
      title: 'Error',
      text: error.message,
    })
    console.error(error)
  }
}
</script>
<style scoped>
.overlay {
  position: fixed;
  background-color: rgba(0, 0, 0, 0);
  z-index: 100;
}
</style>
Footer
