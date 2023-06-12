<template>
    <div class="w-full  min-h-max 2xl:w-[48%]">
   <div class="p-2 space-y-1 w-full bg-white rounded-lg shadow">
     <h2 class="text-xl font-bold mb-4 text-gray-400">Zones</h2>
     <div class="flex justify-between">
       <div class="flex items-center">
         <div class="relative w-full">
           <div
             class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
           >
             <svg
               aria-hidden="true"
               class="w-5 absolute h-5 text-gray-500 dark:text-gray-400"
               fill="currentColor"
               viewBox="0 0 20 20"
               xmlns="http://www.w3.org/2000/svg"
             >
               <path
                 fill-rule="evenodd"
                 d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                 clip-rule="evenodd"
               ></path>
             </svg>
           </div>
           <input
             type="text"
             id="simple-search"
             class="bg-gray-50 border h-11 text-lg cursor-text z-10 w-full border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block pl-10 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
             placeholder="Search"
             v-model="search"
             required
           />
         </div>
         <button
           type="button"
           @click="searchQuery()"
           class="px-6 h-11 ml-2 cursor-pointer text-sm font-medium z-0 text-white bg-[#0080FE] hover:bg-[#242840] rounded-lg focus:outline-none focus:ring-[#862603cc]"
         >
           search
         </button>
       </div>
       <button
         class="bg-green-600 hover:bg-green-900 text-white font-bold py-2 px-2 text-sm rounded focus:outline-none focus:shadow-outline"
         @click="showAddProblemClassModal = true"
       >
         Add New
       </button>
     </div>

     <div class="overflow-x-scroll w-full">
       <table class="table-fixed w-full sm:px-2 text-gray-700">
         <thead class="bg-gray-100 text-xs uppercase font-medium">
           <tr>
             <th class="py-3 px-1 text-left">Index</th>
             <th class="py-3 px-1 text-left">Name</th>
             <th class="py-3 px-1 text-left"> Description</th>
             <th class="py-3 px-1 text-left">Registered Date</th>
             <th class="py-3 px-1">Actions</th>
           </tr>
         </thead>
         <tbody class="text-sm font-normal">
           <tr
             v-for="(zone,i) in zones"
             :key="i"
             class="bg-white border-b hover:bg-gray-100"
           >
             <td class="py-3 px-1 text-left">{{ i + 1 }}</td>
             <td class="py-3 px-1 text-left">{{zone.name}}</td>
             <td class="py-3 px-1 text-left line-clamp-1">{{ zone?.description ?? "no Descrition" }}</td>
             <td class="py-3 px-1 text-left">{{ zone.created_at.split('T')[0] }}</td>

             <td class="px-6 py-4 whitespace-nowrap">
               <div class="flex space-x-3">
                     <button
                 @click="update_service_request_by_id(service_request.id)"
               >
                 <font-awesome-icon
                   icon="fa-solid fa-pen"
                   size="lg"
                   style="color: #005eff"
                 />
               </button>
               <button @click="delete_service_request(service_request.id)">
                 <font-awesome-icon
                   icon="fa-solid fa-trash"
                   size="lg"
                   style="color: #c20f0f"
                 />
               </button>
               </div>
           
             </td>
           </tr>
         </tbody>
       </table>
     </div>
     <div class="flex justify-end mr-2 mt-1 pb-5">
       <div class="flex flex-col items-center">

         <span class="text-sm text-gray-700 dark:text-gray-400">
           Showing
           <span class="font-semibold text-gray-900 dark:text-white"
             >1</span
           >
           to
           <span class="font-semibold text-gray-900 dark:text-white"
             >10</span
           >
           of
           <span class="font-semibold text-gray-900 dark:text-white"
             >100</span
           >
           Entries
         </span>
         <div class="inline-flex mt-2 xs:mt-0">
           <!-- Buttons -->
           <button
             class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
           >
             <font-awesome-icon class="px-2" :icon="['fas', 'arrow-left']" />
             Prev
           </button>
           <button
             class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-800 border-0 border-l border-gray-700 rounded-r hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
           >
             Next
             <font-awesome-icon class="px-2" :icon="['fas', 'arrow-right']" />
           </button>
         </div>
       </div>
     </div>
   </div>
 </div>
</template>
<script setup>
import gql from 'graphql-tag';
import {computed,ref,reactive,watch,watchEffect} from 'vue'
import { useQuery } from '@vue/apollo-composable';

const {error,loading,result} = useQuery(gql`
query MyQuery($limit: Int = 6, $offset: Int = 0, $search: String = "%%") {
  zone(limit: $limit, offset: $offset, where: {name: {_ilike: $search}}) {
    created_at
    id
    name
  }
}
`)

const zones = computed(()=>result.value?.zone ?? [])

</script>
<style >

</style>