<template>
  <div v-if="error">{{ error }}</div>
  <div v-else-if="loading">{{ loading }}</div>
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
      <div v-if="loading">Loading</div>
      <table class="w-full divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Transaction Hash
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Method
            </th>
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
              {{ truncate(transaction.node.hash) }}
            </td>
            <td class="px-6 py-3 whitespace-nowrap">
              <span v-if="to_lower_tring(transaction.fromAddress) === to_lower_tring(user.public_key)">Out</span>
              <span v-else>In</span>
            </td>
            <td class="px-6 py-3 whitespace-nowrap">
              <a :href="'https://sepolia.etherscan.io/block/' + transaction.node.blockNumber">
                {{ transaction.node.blockNumber }}
              </a>
            </td>
            <td class="px-6 py-3 whitespace-nowrap">
              {{ convertToRelativeTime(transaction.node.blockTimestamp) }}
            </td>
            <td class="px-6 py-3 whitespace-nowrap">
              <a :href="'https://sepolia.etherscan.io/address/' + transaction.node.fromAddress">
                {{ truncate(transaction.node.fromAddress) }}
              </a>
            </td>
            <td class="px-6 py-3 whitespace-nowrap">
              <a :href="'https://sepolia.etherscan.io/address/' + transaction.node.toAddress">
                {{ truncate(transaction.node.toAddress) }}
              </a>
            </td>
            <td class="px-6 py-3 whitespace-nowrap">
              {{ transaction.node.value }}
            </td>

            <td class="px-6 py-3 whitespace-nowrap">
              {{ convertGasToEther(transaction.node.gas) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="activeTab == 'tokenTransfers'">
      <div v-if="token_transfer_loading">Loading</div>
      <table class="w-full divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Transaction Hash
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Method
            </th>
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
              {{ truncate(transaction.blockHash) }}
            </td>
            <td class="px-6 py-3 whitespace-nowrap">
              <span v-if="transaction.to === user.public_key">Out</span>
              <span v-else>In</span>
            </td>
            <td class="px-6 py-3 whitespace-nowrap">
              <a :href="'https://sepolia.etherscan.io/block/' + transaction.blockNumber">
                {{ transaction.blockNumber }}
              </a>
            </td>
            <td class="px-6 py-3 whitespace-nowrap">
              {{ formatTimeAgo(transaction.timeStamp) }}
            </td>
            <td class="px-6 py-3 whitespace-nowrap">
              <a :href="'https://sepolia.etherscan.io/address/' + transaction.from">
                {{ truncate(transaction.from) }}
              </a>
            </td>
            <td class="px-6 py-3 whitespace-nowrap">
              <a :href="'https://sepolia.etherscan.io/address/' + transaction.to">
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
              {{ transaction.value }}
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
import { Tegera_Address, Tegera_ABI } from '../../constants/Tegera.ABI.js'
import { Tether_Address, Tether_ABI } from '../../constants/Tether.ABI.js'
import apolloclient from '../../apollo.config.js'
import { UserStore } from '../../stores/user_store.js'
const user = UserStore()
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
function convertWeiToEther(weiValue) {
  const web3 = new Web3()
  const etherValue = web3.utils.fromWei(String(weiValue), 'ether')
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

  // if (years > 0) {
  //   timeAgo.push(`${years} yr${years > 1 ? 's' : ''}`);
  // }
  // if (months > 0) {
  //   timeAgo.push(`${months} month${months > 1 ? 's' : ''}`);
  // }
  // if (weeks > 0) {
  //   timeAgo.push(`${weeks} wk${weeks > 1 ? 's' : ''}`);
  // }
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
    await fetchTokenTransactions()
    console.log(token_transactions.value)
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
    console.log(error)
  }
}
onMounted(async () => {
  await user.user_profile()
})

function to_lower_tring(value) {
  let str = value || ''
  str = str.toLowerCase()
  return str
}
</script>
<style></style>
