<template>
  <div class="lg:px-4 px-0 w-full">
    <div
      class="bg-white rounded-lg shadow-lg w-full overflow-x-scroll border py-8 border-gray-300 p-3"
    >
      <h2 class="text-lg font-bold mb-4">Subscription History</h2>
      <table v-if="result.subscription.length > 0" class="w-full">
        <thead>
          <tr class="border-b">
            <th class="text-left font-bold py-2 px-4">Customer Name</th>
            <th class="text-left font-bold py-2 px-4">phone</th>
            <th class="text-left font-bold py-2 px-4">Location</th>
            <th class="text-left font-bold py-2 px-4">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="payment in result.subscription"
            :key="payment.id"
            class="border-b hover:bg-gray-100"
          >
            <td class="py-2 px-4">customer name</td>
            <td class="py-2 px-4">3.5</td>
            <td class="py-2 px-4">0923456</td>
            <td class="py-2 px-4">BahirDar,Amhara</td>
            <td class="py-2 px-4">
              <div class="mt-4 md:mt-0 md:ml-4">
                <button
                  class="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-700"
                  @click="assignTechnician"
                >
                  detail
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-else class="">
        <h1 class="text-center flex justify-center text-2xl font-bold">
          No Service Delivered Yet
        </h1>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import apolloclient from '../../apollo.config';
const props = defineProps({
  technician_id: {
    type: Object,
    required: true,
  },
});

const { error, loading, result } = useQuery(gql`
query MyQuery($technician_id: uuid = "") {
  subscription(where: {technician_id: {_eq: $technician_id}}) {
    receipt_number
    status
    technician_id
    technician {
      first_name
      last_name
    }
    subscription_plan {
      name
      id
    }
    amount
    id
  }
}

`, {
  variables: {
    technician_id: props.technician_id
  }
});

</script>
<style></style>
