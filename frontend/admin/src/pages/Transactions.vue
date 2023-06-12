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
      <div class="flex space-x-2">
        <button
          :class="[
            activeTab === 'transactions'
              ? 'bg-slate-500 p-2 rounded-lg'
              : 'bg-slate-300 rounded-lg p-2'
          ]"
          @click="activeTab = 'transactions'"
        >
          Transactions
        </button>
        <button
          :class="[
            activeTab === 'tokenTransfers'
              ? 'bg-slate-500 p-2 rounded-lg'
              : 'bg-slate-300 rounded-lg p-2'
          ]"
          @click="activeTab = 'tokenTransfers'"
        >
          Token Transfers
        </button>
      </div>
      <div v-if="activeTab == 'transactions'">
        <table class="w-full divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Transaction Hash
              </th>
              <!-- <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Method
              </th> -->
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Block
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Age
              </th>
  
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                From
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                To
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Value
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Tx Fee
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="transaction in transactions" :key="transaction.hash" class="hover:bg-gray-100">
              <td class="px-6 py-3 whitespace-nowrap">
                <a
                  class="text-[#1786D3]"
                  :href="'https://sepolia.etherscan.io/tx/' + transaction.node.hash"
                >
                  {{ truncate(transaction.node.hash) }}
                </a>
                <button @click="copy(transaction.node.hash)">
                  <span v-if="!copied">
                    <font-awesome-icon :icon="['fas', 'copy']" />
                  </span>
                  <span v-else>Copied!</span>
                </button>
              </td>
              <!-- <td class="px-6 py-3 uppercase whitespace-nowrap">
                <span
                  v-if="
                    check_direction(transaction.node.fromAddress, transaction.node.toAddress) == 'Out'
                  "
                  class="border rounded-md text-xs border-[#D6A40D] shadow-sm text-[#D6A40D] px-1 bg-[#FFF6DA]"
                  >{{
                    check_direction(transaction.node.fromAddress, transaction.node.toAddress)
                  }}</span
                >
                <span
                  v-else
                  class="border border-[#42A286] rounded-md shadow-sm text-xs px-3 bg-[#E5F5F3] text-[#42A286]"
                  >{{
                    check_direction(transaction.node.fromAddress, transaction.node.toAddress)
                  }}</span
                >
              </td> -->
              <td class="px-6 py-3 whitespace-nowrap">
                <a
                  :data-tippy-content="transaction.node.blockNumber"
                  data-tippy-placement="bottom"
                  class="text-[#1786D3]"
                  :href="'https://sepolia.etherscan.io/block/' + transaction.node.blockNumber"
                >
                  {{ transaction.node.blockNumber }}
                </a>
              </td>
              <td class="px-6 py-3 whitespace-nowrap">
                {{ convertToRelativeTime(transaction.node.blockTimestamp) }}
              </td>
              <td class="px-6 py-3 whitespace-nowrap">
                <a
                  :data-tippy-content="transaction.node.fromAddress"
                  data-tippy-placement="bottom"
                  class="text-[#1786D3]"
                  :href="'https://sepolia.etherscan.io/address/' + transaction.node.fromAddress"
                >
                  {{ truncate(transaction.node.fromAddress) }}
                </a>
              </td>
              <td class="px-6 py-3 whitespace-nowrap">
                <a
                  :data-tippy-content="transaction.node.toAddress"
                  data-tippy-placement="bottom"
                  class="text-[#1786D3]"
                  :href="'https://sepolia.etherscan.io/address/' + transaction.node.toAddress"
                >
                  {{ truncate(transaction.node.toAddress) }}
                </a>
              </td>
              <td class="px-6 py-3 whitespace-nowrap">
                {{ transaction.node.value === '0' ? '0' : convertWeiToEther(transaction.node.value) }}
              </td>
  
              <td class="px-6 py-3 whitespace-nowrap">
                {{ convertGasToEther(transaction.node.gas) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="activeTab == 'tokenTransfers'">
        <div v-if="token_transaction_loading">
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
        <table class="w-full divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Transaction Hash
              </th>
              <!-- <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Method
              </th> -->
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Block
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Age
              </th>
  
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                From
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                To
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Token Name
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Symbol
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Value
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Tx Fee
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr
              v-for="transaction in token_transactions"
              :key="transaction.blockHash"
              class="hover:bg-gray-100"
            >
              <td class="px-6 py-3 whitespace-nowrap">
                <!-- {{ truncate(transaction.blockHash) }} -->
                <a
                  class="text-[#1786D3]"
                  :href="'https://sepolia.etherscan.io/tx/' + transaction.blockHash"
                >
                  {{ truncate(transaction.blockHash) }}
                </a>
              </td>
              
              <td class="px-6 py-3 whitespace-nowrap">
                <a
                  class="text-[#1786D3]"
                  :href="'https://sepolia.etherscan.io/block/' + transaction.blockNumber"
                >
                  {{ transaction.blockNumber }}
                </a>
              </td>
              <td class="px-6 py-3 whitespace-nowrap">
                {{ formatTimeAgo(transaction.timeStamp) }}
              </td>
              <td class="px-6 py-3 whitespace-nowrap">
                <a
                  class="text-[#1786D3]"
                  :href="'https://sepolia.etherscan.io/address/' + transaction.from"
                >
                  {{ truncate(transaction.from) }}
                </a>
              </td>
              <td class="px-6 py-3 whitespace-nowrap">
                <a
                  class="text-[#1786D3]"
                  :href="'https://sepolia.etherscan.io/address/' + transaction.to"
                >
                  {{ truncate(transaction.to) }}
                </a>
              </td>
              <td class="px-6 py-3 whitespace-nowrap">
                {{ transaction.tokenName }}
              </td>
              <td class="px-6 py-3 whitespace-nowrap">
                {{ transaction.tokenSymbol }}
              </td>
  
              <td class="px-6 py-3 whitespace-nowrap">
                {{
                  transaction.value.length < 5 ? transaction.value : transaction.value.substring(0, 5)
                }}
              </td>
  
              <td class="px-6 py-3 whitespace-nowrap">{{ convertGasToEther(transaction.gas) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  <script setup>
  import { ref, onMounted, watch, computed, watchEffect } from 'vue'
  import { useQuery } from '@vue/apollo-composable'
  import gql from 'graphql-tag'
  import Web3 from 'web3'
  import apolloclient from '../apollo.config'
  import tippy from 'tippy.js'
  import 'tippy.js/dist/tippy.css'
  import { useClipboard } from '@vueuse/core'
  import { useQRCode } from '@vueuse/integrations/useQRCode'
  
  const source = ref('')
  const { text, copy, copied, isSupported } = useClipboard({ source })
  onMounted(() => {
    tippy('[data-tippy-content]')
  })
  const activeTab = ref('transactions')
  const token_transfer_loading = ref(false)
  const QUERY = gql`
    query MyQuery {
      get_transaction {
        transactions
      }
    }
  `
  const QUERY_TOKEN_TRANSACTIONS = gql`
    query MyQuery($token_type: String = "") {
      token_transaction(token_type: $token_type) {
        transaction
      }
    }
  `
  
  const { error, loading, refetch, result } = useQuery(QUERY)
  const transactions = computed(() => result.value?.get_transaction?.transactions || [])
  const token_transactions = ref([])
  
  const token_transaction_loading = ref(true) // loading.value
  function convertWeiToEther(weiValue) {
    const web3 = new Web3()
    const etherValue = web3.utils.fromWei(String(weiValue), 'gwei')
    if (etherValue.length > 5) {
      return etherValue.slice(0, 5)
    }
    return etherValue
  }
  const truncate = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-6)}`
  }
  function convertToRelativeTime(timestamp) {
    const currentTimestamp = Date.now()
    const targetTimestamp = Date.parse(timestamp)
    const elapsedMilliseconds = currentTimestamp - targetTimestamp
  
    const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000)
    const elapsedMinutes = Math.floor(elapsedSeconds / 60)
    const elapsedHours = Math.floor(elapsedMinutes / 60)
  
    if (elapsedHours >= 24) {
      const daysAgo = Math.floor(elapsedHours / 24)
      return `${daysAgo} day${daysAgo > 1 ? 's' : ''} ago`
    } else if (elapsedHours >= 1) {
      return `${elapsedHours} hr ${elapsedMinutes % 60} min ago`
    } else if (elapsedMinutes >= 1) {
      return `${elapsedMinutes} min ago`
    } else {
      return 'Just now'
    }
  }
  function formatTimeAgo(timestamp) {
    const currentTime = Math.floor(Date.now() / 1000) // Get the current Unix timestamp in seconds
    const difference = currentTime - timestamp // Calculate the difference in seconds
  
    const years = Math.floor(difference / 31536000) // Convert seconds to years
    const months = Math.floor((difference % 31536000) / 2592000) // Convert remaining seconds to months
    const weeks = Math.floor((difference % 2592000) / 604800) // Convert remaining seconds to weeks
    const days = Math.floor((difference % 604800) / 86400) // Convert remaining seconds to days
    const hours = Math.floor((difference % 86400) / 3600) // Convert remaining seconds to hours
    const minutes = Math.floor((difference % 3600) / 60) // Convert remaining seconds to minutes
  
    const timeAgo = []

    if (weeks > 0) {
      timeAgo.push(`${weeks} wk${weeks > 1 ? 's' : ''}`)
      return timeAgo.join(' ') + ' ago'
    }
    if (days > 0) {
      timeAgo.push(`${days} day${days > 1 ? 's' : ''}`)
      return timeAgo.join(' ') + ' ago'
    }
    if (hours > 0) {
      timeAgo.push(`${hours} hr${hours > 1 ? 's' : ''}`)
    }
    if (minutes > 0) {
      timeAgo.push(`${minutes} min${minutes > 1 ? 's' : ''}`)
    }
  
    if (timeAgo.length === 0) {
      return 'Just now'
    }
  
    return timeAgo.join(' ') + ' ago'
  }
  watchEffect(async () => {
    if (activeTab.value == 'tokenTransfers') {
      token_transaction_loading.value = true
      await fetchTokenTransactions()
      console.log(token_transactions.value)
      token_transaction_loading.value = false
    }
  })
  
  function convertGasToEther(gasValue) {
    const web3 = new Web3()
    const gas = web3.utils.toBN(gasValue)
    const weiValue = gas.mul(web3.utils.toBN(web3.utils.toWei('1', 'gwei')))
    const etherValue = web3.utils.fromWei(weiValue, 'ether')
    return etherValue
  }
  
  async function fetchTokenTransactions() {
    try {
      const response1 = await apolloclient.query({
        query: QUERY_TOKEN_TRANSACTIONS,
        variables: {
          token_type: 'Tegera'
        }
      })
  
      const response2 = await apolloclient.query({
        query: QUERY_TOKEN_TRANSACTIONS,
        variables: {
          token_type: 'Tether'
        }
      })
      token_transactions.value = response1.data?.token_transaction?.transaction.concat(
        response2.data?.token_transaction?.transaction
      )
    } catch (error) {
    }
  }

  
  </script>
  <style></style>
  