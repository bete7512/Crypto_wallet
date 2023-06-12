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
          <h3 class="text-lg leading-6 font-bold text-gray-900">Recieve Crypto</h3>
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
        <div class="pb-6">
          <div class="px-4">
            <h1 class="text-lg font-bold">Address</h1>
            <div class="flex space-x-3">
              <div>{{ user.user.wallets[0].public_key }}</div>

              <button @click="copy(source)">
                <span v-if="!copied">
                  <font-awesome-icon :icon="['fas', 'copy']" />
                </span>
                <span v-else>Copied!</span>
              </button>
            </div>
          </div>
          <div class="w-full flex justify-center items-center h-full">
            <div class="w-full text-center">
              <div class="flex justify-center items-center">
                <img :src="qrcode" alt="QR Code"  />
              </div>
              <div class="flex justify-center text-left">Scan</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import apolloclient from '../../apollo.config'
import { ref, onMounted } from 'vue'
import { assetStore } from '../../stores/asset'
import { UserStore } from '../../stores/user_store'
import { useClipboard } from '@vueuse/core'
import { useQRCode } from '@vueuse/integrations/useQRCode'

const user = UserStore()
const source = ref(user.user.wallets[0].public_key)
const { text, copy, copied, isSupported } = useClipboard({ source })
const qrcode = useQRCode(source)
const emit = defineEmits(['close'])
const asset = assetStore()
const discard = () => {
  emit('close')
}
</script>
<style></style>
