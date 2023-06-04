<template>
  <div class="lg:flex block justify-center w-full lg:space-x-2 lg:space-y-0 space-y-3 mb-4">
    <div
      class="flex bg-white relative rounded-lg shadow-lg border py-6 border-gray-300 p-3 mx-2 w-full justify-center"
    >
      <div class="space-y-2 w-full px-4">
        <div class="w-full flex justify-center items-center">
          <img
            src="../assets/man.png"
            alt="technician.first_name"
            class="w-32 -m-px h-32 rounded-full object-cover bg-slate-200"
          />
        </div>
        <div class="">
          <div class="flex justify-between">
            <h1 class="font-bold text-2xl">
              {{ technician.first_name + ' ' + technician.last_name }}
            </h1>
            <div class="flex space-x-2 justify-center items-center">
              <h1 class="text-gray-700 font-bold">Status</h1>
            </div>
          </div>

          <div class="space-y-1">
            <div class="flex space-x-1 items-center">
              <font-awesome-icon class="text-gray-600" :icon="['fas', 'briefcase']" />
              <p class="text-gray-600">Technician</p>
            </div>
            <div class="flex space-x-1 items-center">
              <font-awesome-icon class="text-gray-600" :icon="['fas', 'location-dot']" />
              <p class="text-gray-600">
                {{ technician.address?.kebele?.name }}, {{ technician.address?.woreda?.name }},
                {{ technician.address?.zone?.name }}, {{ technician.address?.region?.name }},
                Ethiopia
              </p>
            </div>
          </div>
          <div class="flex justify-between">
            <div class="flex space-x-1 text-gray-700 items-center">
              <div>
                <h1 class="text-black font-bold">
                  <span class="">Email</span>
                </h1>
                <p class="space-x-2">
                  <span><font-awesome-icon :icon="['fas', 'envelope']" /></span>
                  <span>
                    {{ technician.phone_number }}
                  </span>
                </p>
              </div>
            </div>
            <div class="flex justify-between items-center">
              <div class="flex space-x-1 text-gray-700 items-center">
                <div>
                  <h1 class="text-black font-bold">Registration Date</h1>
                  <p>{{ technician.created_at.split('T')[0] }}</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <select name="" id="" class="overflow-scroll ">
                <option value="">Select countries </option>
                    <option value="" v-for="country in countries">{{ country.name }}</option>
               
            </select>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue'
import { notify } from '@kyvg/vue3-notification'
import {countries} from '../constants/countries'
const technician = ref({
  first_name: 'Bete',
  last_name: 'Alemu',
  phone_number: '0912345678',
  address: {
    kebele: {
      name: 'kebele'
    },
    woreda: {
      name: 'woreda'
    },
    zone: {
      name: 'zone'
    },
    region: {
      name: 'region'
    }
  },
  created_at: '2021-09-01T00:00:00.000000Z'
})
</script>
<style></style>
