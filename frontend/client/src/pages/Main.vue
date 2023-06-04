<template>
  <div class="sm:mx-4 mx-2">
    <carousel :items-to-show="1.5" >
      <slide v-for="slide in slides" :key="slide">
        <div class="carousel__item">
          <img :src="slide.image" class="w-full h-96" alt="" />
        </div>
      </slide>

      <template #addons>
        <navigation />
        <pagination />
      </template>
    </carousel>
  </div>

  <!-- <div><img src="remittance.jpg" alt=""></div> -->
  <div v-if="error">{{ error }}</div>
  <div v-else-if="loading">
    <div>
      <div>
        <div class="fixed inset-0 flex justify-center items-center">
          <div class="flex items-center justify-center">
            <div
              class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"
            >
              <span
                class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                >Loading...
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else classs="bg-gray-100 overflow-hidden p1-10 shadow-md sm:rounded-lg">
    <table class="w-full divide-gray-200">
      <thead class="bg-gray-50">
        <tr>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Name
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Price
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Price Change
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Market Cap
          </th>

          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Balance
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Actions
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="exchange in exchanges" class="hover:bg-gray-100">
          <td class="px-6 py-3 whitespace-nowrap">
            <div v-if="exchange.FROMSYMBOL === 'BTC'" class="flex space-x-1 items-center">
              <BTC class="text-4xl" />
              <div>{{ coin_detail[exchange.FROMSYMBOL] }}</div>
              <div>({{ exchange.FROMSYMBOL }})</div>
            </div>
            <div v-else-if="exchange.FROMSYMBOL === 'ETH'" class="flex space-x-1 items-center">
              <ETH class="text-4xl" />
              <div>{{ coin_detail[exchange.FROMSYMBOL] }}</div>
              <div>({{ exchange.FROMSYMBOL }})</div>
            </div>
            <div v-else-if="exchange.FROMSYMBOL === 'ADA'" class="flex space-x-1 items-center">
              <ADA class="text-4xl" />
              <div>{{ coin_detail[exchange.FROMSYMBOL] }}</div>
              <div>({{ exchange.FROMSYMBOL }})</div>
            </div>
            <div v-else-if="exchange.FROMSYMBOL === 'USDT'" class="flex space-x-1 items-center">
              <USDT class="text-4xl" />
              <div>{{ coin_detail[exchange.FROMSYMBOL] }}</div>
              <div>({{ exchange.FROMSYMBOL }})</div>
            </div>
            <div v-else-if="exchange.FROMSYMBOL === 'XLM'" class="flex space-x-1 items-center">
              <XLM class="text-4xl" />
              <div>{{ coin_detail[exchange.FROMSYMBOL] }}</div>
              <div>({{ exchange.FROMSYMBOL }})</div>
            </div>
          </td>
          <td class="px-6 py-3 font-bold whitespace-nowrap">US${{ exchange.PRICE }}</td>
          <td
            :class="[round(exchange.CHANGEPCT24HOUR) >= 0 ? 'text-[#18B5B4]' : 'text-[#CF1726]']"
            class="px-6 py-3 whitespace-nowrap"
          >
            {{ round(exchange.CHANGEPCT24HOUR) }}%
          </td>
          <td class="px-6 py-3 whitespace-nowrap">$ {{ exchange.MKTCAP }}</td>
          <td class="px-6 py-3 whitespace-nowrap">0.0000 {{ exchange.FROMSYMBOL }}</td>
          <td class="px-6 py-3 whitespace-nowrap">
            <button class="text-white font-semibold py-2 px-4 rounded" @click="send">Send</button>

            <button class="text-white font-bold py-2 px-4 rounded" @click="send">Withdraw</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup>
import { ref, onMounted, computed, reactive, watchEffect } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import Web3 from 'web3'
import { Tegera_Address, Tegera_ABI } from '../constants/Tegera.ABI.js'
import { Tether_Address, Tether_ABI } from '../constants/Tether.ABI.js'
import apolloclient from '../apollo.config.js'
import ADA from './icons/ADA.vue'
import BTC from './icons/BTC.vue'
import ETH from './icons/ETH.vue'
import XLM from './icons/XLM.vue'
import USDT from './icons/USDT.vue'
import { nextTick } from 'vue'
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
const slides = ref([
  {
    image: 'remittance.jpg',
    caption: 'Fast and secure remittance'
  },
  {
    image: 'crypto.jpg',
    caption: 'Caption 2'
  }
  // Add more slides as needed
])

const activeIndex = ref(0)

function nextSlide() {
  activeIndex.value = (activeIndex.value + 1) % slides.value.length
}

function previousSlide() {
  activeIndex.value = (activeIndex.value - 1 + slides.value.length) % slides.value.length
}

const QUERY = gql`
  query MyQuery {
    get_exchange {
      exchanges
    }
  }
`
const { error, loading, refetch, result } = useQuery(QUERY)
const exchanges = computed(() => result.value?.get_exchange?.exchanges || [])
const coin_detail = reactive({
  ETH: 'Ethereum',
  BTC: 'Bitcoin',
  USDT: 'Tether',
  XLM: 'Stellar',
  ADA: 'Cardano'
})
const round = (number) => {
  return Math.round((number + Number.EPSILON) * 100) / 100
}

const settings = ref({
  itemsToShow: 1,
  snapAlign: 'center'
})
const breakpoints = ref({
  700: {
    itemsToShow: 3.5,
    snapAlign: 'center'
  },
  // 1024 and up
  1024: {
    itemsToShow: 5,
    snapAlign: 'start'
  }
})
</script>
<style>
.carousel__item {
  min-height: 200px;
  width: 100%;
  background-color: var(--vc-clr-primary);
  color: var(--vc-clr-white);
  font-size: 20px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.carousel__slide {
  padding: 10px;
}

.carousel__prev,
.carousel__next {
  box-sizing: content-box;
  border: 5px solid white;
}
</style>
