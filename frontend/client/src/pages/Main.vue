<template>
  <div v-if="error">{{ error }}</div>
  <div v-else-if="loading">{{ loading }}</div>
  <div v-else classs="bg-gray-100 overflow-hidden p1-10 shadow-md sm:rounded-lg">
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
            {{ transaction.node.type }}
          </td>
          <td class="px-6 py-3 whitespace-nowrap">
            {{ transaction.node.blockNumber }}
          </td>
          <td class="px-6 py-3 whitespace-nowrap">
            {{ convertToRelativeTime(transaction.node.blockTimestamp) }}
          </td>
          <td class="px-6  py-3 whitespace-nowrap">
            <a :href="'https://sepolia.etherscan.io/address/'+ transaction.node.fromAddress">
                {{ truncate(transaction.node.fromAddress) }}
            </a>
          </td>
          <td class="px-6 py-3 whitespace-nowrap">
            <a :href="'https://sepolia.etherscan.io/address/'+transaction.node.toAddress">
            {{ truncate(transaction.node.toAddress) }}
            </a>
          </td>

          <td class="px-6 py-3 whitespace-nowrap">
            {{ convertWeiToEther(transaction.node.value) }}
          </td>

          <td class="px-6 py-3 whitespace-nowrap">{{ convertGasToEther(transaction.node.gas) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup>
import { ref, onMounted, computed } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import Web3 from 'web3';
import { Tegera_Address,Tegera_ABI } from '../constants/Tegera.ABI.js'; 
import { Tether_Address,Tether_ABI } from '../constants/Tether.ABI.js';
import apolloclient from '../apollo.config.js'
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

function convertWeiToEther(weiValue) {
  const web3 = new Web3();
  const etherValue = web3.utils.fromWei(String(weiValue), 'ether');
  return etherValue;
}
const truncate = (address) => {
  return `${address.slice(0, 6)}...${address.slice(-6)}`
}
function convertToRelativeTime(timestamp) {
  const currentTimestamp = Date.now();
  const targetTimestamp = Date.parse(timestamp);
  const elapsedMilliseconds = currentTimestamp - targetTimestamp;

  const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);
  const elapsedMinutes = Math.floor(elapsedSeconds / 60);
  const elapsedHours = Math.floor(elapsedMinutes / 60);

  if (elapsedHours >= 24) {
    const daysAgo = Math.floor(elapsedHours / 24);
    return `${daysAgo} day${daysAgo > 1 ? 's' : ''} ago`;
  } else if (elapsedHours >= 1) {
    return `${elapsedHours} hr ${elapsedMinutes % 60} min ago`;
  } else if (elapsedMinutes >= 1) {
    return `${elapsedMinutes} min ago`;
  } else {
    return 'Just now';
  }
}

function convertGasToEther(gasValue) {
  const web3 = new Web3();
  const gas = web3.utils.toBN(gasValue);
  const weiValue = gas.mul(web3.utils.toBN(web3.utils.toWei('1', 'gwei')));
  const etherValue = web3.utils.fromWei(weiValue, 'ether');
  return etherValue;
}


onMounted(async () => {
  
  
})
// const web3 = new Web3(window.ethereum)
// const contract = new web3.eth.Contract(Tether_ABI, Tether_Address)
// const totalSupply = await contract.methods.totalSupply().call()   
// console.log(totalSupply) 
// const contract = new web3.eth.Contract(Tegera_ABI, Tegera_Address)      
// const totalSupply = await contract.methods.totalSupply().call()       
// console.log(totalSupply)      
//write a code to return the transaxtion made by the GIVEN address from these two contracts  
// let address = '0x2709Ae17403096A516b86ad4f39c463CD9b92aF2'  
// //give the ALL TYPES OF TRANSACTION MADE BY THE GIVEN ADDRESS  FOR THE GIVEN CONTRACT ADDRESS      
// const transactions = await contract.getPastEvents('Transfer', {
//   filter: {from: address, to: address},
//   fromBlock: 0,
// })
// console.log(transactions);        
// const transactions = await contract.getPastEvents('Transfer', {
//   fromBlock: 0,
//   toBlock: 'latest',
// })
// console.log(transactions)  
</script>
<style></style>
