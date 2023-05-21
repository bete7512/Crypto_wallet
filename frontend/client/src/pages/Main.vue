<template>
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
    {{ exchanges }}
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
            <!-- <font-awesome-icon :icon="['fab', 'bitcoin']" style="color: #e38e16;" /> -->
            {{ exchange.FROMSYMBOL }}
          </td>
          <td class="px-6 py-3 font-bold whitespace-nowrap">US${{ exchange.PRICE }}</td>
          <td class="px-6 py-3 whitespace-nowrap">
            {{ exchange.CHANGEPCT24HOUR }}
          </td>
          <td class="px-6 py-3 whitespace-nowrap">
            {{ exchange.MKTCAP }}
          </td>
          <td class="px-6 py-3 whitespace-nowrap">0</td>
          <td class="px-6 py-3 whitespace-nowrap">
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              @click="send"
            >
              Send
            </button>

            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              @click="send"
            >
              Withdraw
            </button>
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
const QUERY = gql`
  query MyQuery {
    get_exchange {
      exchanges
    }
  }
`

const { error, loading, refetch, result } = useQuery(QUERY)
const exchanges = computed(() => result.value?.get_exchange?.exchanges || [])

const conin_detail = reactive([
  {
    name: 'Ethereum',
    symbol: 'ETH',
    icon: 'ethereum',
    id: ''
  },
  {
    name: 'Bitcoin',
    symbol: 'BTC',
    icon: 'bitcoin',
    id : ''
  },
  {
    name: 'Tether',
    symbol: 'USDT',
    icon: '',
    id: ''
  },
  {
    name: 'Stellar',
    symbol: 'XLM',
    icon: '',
    id: ''

  },
  {
    name: 'Cardano',
    symbol: 'ADA',
    icon: '',
    id: ''
  }
])

watchEffect(
  () => {
    if (exchanges.value.length > 0) {
      exchanges.value.forEach((exchange) => {
        conin_detail.forEach((coin) => {
          if (exchange.FROMSYMBOL === coin.symbol) {
            coin.name = exchange.FROMSYMBOL
            coin.icon = exchange.IMAGEURL
          }
        })
      })
    }
  },
  { immediate: true }
)

</script>
<style></style>
