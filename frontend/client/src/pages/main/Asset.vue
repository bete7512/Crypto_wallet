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
          <td class="px-6 py-4 whitespace-nowrap">
            <!-- {{ balance[token.name] }} {{ token.symbol }} -->

            {{
              balance[token.name].length < 5
                ? balance[token.name]
                : balance[token.name].substring(0, 5)
            }}
            {{ token.symbol }}
          </td>

          <td class="px-6 py-4 whitespace-nowrap">{{ token.symbol }}</td>
          <td class="px-6 py-4 whitespace-nowrap">
            <a :href="token?.url_address">link</a>
          </td>
          <td class="px-6 py-4 whitespace-nowrap">{{ token.total_supply.substring(0,5) }}</td>
          <td class="px-6 py-4 whitespace-nowrap">
            {{ token.created_at.split('T')[0] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup>
import { ref, onMounted, watch, computed, reactive, watchEffect } from 'vue'
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

const web3 = new Web3(window.ethereum)

const tether = new web3.eth.Contract(Tether_ABI, Tether_Address)
const tegera = new web3.eth.Contract(Tegera_ABI, Tegera_Address)
const balance = reactive({})
onMounted(async () => {
  await getBalance()
})
const getBalance = async () => {
  balance['Tether'] = await tether.methods.balanceOf(user.public_key).call()
  balance['ጠገራ'] = await tegera.methods.balanceOf(user.public_key).call()
  balance['Ether'] = await web3.eth.getBalance(user.public_key)
  console.log(balance)
}

// watchEffect(() => {
//   if (balance['Ether']) {
//     balance['Ether'] = convertWeiToEther(user.balance)
//   }
// })

async function convertWeiToEther(weiValue) {
  const web3 = new Web3()
  const etherValue = web3.utils.fromWei(String(weiValue), 'ether')
  if (etherValue.length > 5) {
    return etherValue.slice(0, 5)
  }
  return etherValue
}
</script>
<style></style>
