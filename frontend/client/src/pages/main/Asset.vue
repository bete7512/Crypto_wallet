<template>
  <div v-if="error">{{ error }}</div>
  <div v-else-if="loading">{{ loading }}</div>

  <div v-else>
    <table class="w-full divide-gray-200">
      <thead class="bg-gray-50">
        <tr>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Token Name
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            NETWORK
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Market Cap
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Price
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            your balance
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            symbol
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Link
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Total Supply
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Created at
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="token in result.tokens" :key="token.id" class="hover:bg-gray-100">
          <td class="px-6 py-4 whitespace-nowrap">{{ token.name }}</td>
          <td class="px-6 py-4 whitespace-nowrap">{{ token?.network?.name }}</td>
          <td class="px-6 py-4 whitespace-nowrap">333000$</td>
          <td class="px-6 py-4 whitespace-nowrap">333000$</td>
          <td class="px-6 py-4 whitespace-nowrap">333000$</td>
          <!-- <td class="px-6 py-4 whitespace-nowrap"></td> -->
          <td class="px-6 py-4 whitespace-nowrap">{{ token.symbol }}</td>
          <td class="px-6 py-4 whitespace-nowrap">
            <a :href="token?.url_address">link</a>
          </td>
          <td class="px-6 py-4 whitespace-nowrap">{{ token.total_supply }}</td>
          <td class="px-6 py-4 whitespace-nowrap">
            {{ token.created_at.split('T')[0] }}
          </td>
        </tr>
      </tbody>
    </table>
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
const token_transfer_loading = ref(false)
const QUERY_TOKEN = gql`
  query MyQuery {
    tokens {
      created_at
      name
      id
      network_id
      symbol
      total_supply
      url_address
      network {
        name
        id
      }
    }
  }
`

const { result, loading, error } = useQuery(QUERY_TOKEN)

const tokens = computed(() => result.value?.tokens || [])
</script>
<style></style>
