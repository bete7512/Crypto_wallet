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
          <h3 class="text-lg leading-6 font-bold text-gray-900">Buy Crypto</h3>
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
            class="bg-[#46C40F] hover:bg-[#123503] flex space-x-2 text-white font-bold py-2 px-4 rounded-lg"
          >
            <p v-if="!spinner">Buy</p>
            <p v-else>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                <path
                  fill="#231515"
                  d="M12,23a9.63,9.63,0,0,1-8-9.5,9.51,9.51,0,0,1,6.79-9.1A1.66,1.66,0,0,0,12,2.81h0a1.67,1.67,0,0,0-1.94-1.64A11,11,0,0,0,12,23Z"
                >
                  <animateTransform
                    attributeName="transform"
                    dur="0.75s"
                    repeatCount="indefinite"
                    type="rotate"
                    values="0 12 12;360 12 12"
                  />
                </path>
              </svg>
            </p>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { assetStore } from '../../stores/asset'
import detectEthereumProvider from '@metamask/detect-provider'
import Web3 from 'web3'
import { notify } from '@kyvg/vue3-notification'
import { Tether_ABI, Tether_Address } from '../../constants/Tether.ABI'
import { Tegera_ABI, Tegera_Address } from '../../constants/Tegera.ABI'
import apolloclient from '../../apollo.config'
import gql from 'graphql-tag'
const Mutate = gql`
  mutation MyMutation($amount: Int = 10, $token_id: Int = 10) {
    token_order(token_id: $token_id, amount: $amount) {
      check_out
    }
  }
`
const spinner = ref(false)
const emit = defineEmits(['close', 'submit'])
const asset = assetStore()
const token_id = ref('')
const send_type = ref('')
const amount = ref('')
const address = ref('')
const error_message = ref('')
const tokens = ref([])
onMounted(async () => {
  await asset.get_tokens()
  await asset.get_networks()
  tokens.value = asset.tokens
})
const discard = () => {
  emit('close')
}

async function submitForm() {
  if(amount.value == '' || token_id.value == '') {
    notify({
      type: 'error',
      text: 'Please fill all the fields'
    })  
    error_message.value = 'Please fill all the fields'
    return
  }     
  try {
    spinner.value = true
    const { data } = await apolloclient.mutate({
      mutation: Mutate,
      variables: {
        amount: amount.value,
        token_id: token_id.value
      }
    })
    console.log(data);
    notify({
      type: 'success',
      text: 'Order Placed Successfully'
    })
    location.replace(data.token_order.check_out)
  } catch (error) {
    notify({
      type: 'error',
      text: 'Order Failed'
    })
  }
  spinner.value = false
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
