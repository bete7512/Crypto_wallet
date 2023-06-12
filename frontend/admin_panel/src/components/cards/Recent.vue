<template>
  <div v-if="error">{{ error }}</div>
  <div
    v-else-if="loading"
    class="fixed inset-0 flex justify-center items-center"
  >
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
  <div v-else-if="result.service_request.length == 0">
    <div class="flex justify-center items-center">
      <div class="">
        <img src="../../assets/search.png" alt="" />
        <div
          class="flex text-center justify-center items-center font-bold text-2xl"
        >
          No Search Result Found
        </div>
      </div>
    </div>
  </div>
  <div v-else class=" lg:px-4">
    <div
      class="bg-white shadow-xl sm:rounded-lg scrollbar-thin scrollbar-thumb-gray-900 scrollbar-track-gray-100 overflow-x-scroll"
    >
    <div class="flex justify-between p-3">
      <div class="">Recent Service Requests</div>
      <router-link to="/services" class="text-blue-700">See More</router-link>
    </div>
      <table class="w-full divide-gray-200">
        <thead class="bg-gray-100">
          <tr>
            <!-- <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Index
            </th> -->
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Customer Name
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Customer Phone
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Technician Name
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Product Name
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Request Date
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Status
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr
            v-for="(service_request, i) in result.service_request"
            :key="service_request.id"
            class="hover:bg-gray-100"
          >
            <td class="px-6 py-4 whitespace-nowrap capitalize"> {{
                  customers[service_request.id]?.first_name +
                  " " +
                  customers[service_request.id]?.last_name
                }}</td>
            <td class="px-6 py-4 whitespace-nowrap">
              {{ service_request.customer_phone }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap capitalize">
                 {{
                  service_request.technician_id
                    ? service_request?.technician?.first_name +
                      " " +
                      service_request?.technician?.last_name       
                    : "Not assigned yet"
                }}
     
            </td>
            <td class="px-6 py-4 whitespace-nowrap capitalize">{{ products[service_request.id]?.product?.brand }}</td>
            <td class="px-6 py-4 whitespace-nowrap">
              {{ service_request.created_at.split("T")[0] }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span :class="service_request.status === 'progress' ? 'bg-yellow-200 text-yellow-800 rounded-full px-2 py-1' 
                          : service_request.status === 'opened' ? 'bg-blue-200 text-blue-900 rounded-full px-2 py-1' 
                          : service_request.status === 'completed' ? 'bg-green-200 text-green-800 rounded-full px-2 py-1' 
                          : 'bg-gray-200 text-gray-800 rounded-full px-2 py-1'">
              {{ service_request.status }}

                </span>
            </td>
      
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script setup>
import { QUERY_ALL_SERVICE_REQUEST } from '../../constants/queries';
import { useQuery } from '@vue/apollo-composable';    
import { ref, watch,watchEffect } from 'vue';
import apolloclient from '../../apollo.config'; 
import gql from 'graphql-tag';
const offset = ref(0); 
const page_size = ref(7);
const filter = ref({}); 
const customers = ref({}); 
const products = ref({});    
const refetchData = () => {
  refetch();
};
const { error, result, loading, refetch } = useQuery(
  QUERY_ALL_SERVICE_REQUEST,
  {
    offset: offset.value,
    limit: page_size.value,
    filter: filter,
  }
);

watchEffect(
  async () => {
    console.log("am here");
    for (const request of result.value?.service_request || []) {
      const customer_id = request.customer_id;
      const { data } = await apolloclient.query({
        query: gql`
          query MyQuery($user_id: String = "") {
            get_customer_by_id(user_id: $user_id) {
              customer
            }
          }
        `,
        variables: { user_id: customer_id },
      });
      customers.value[request.id] = data.get_customer_by_id.customer;
      console.log("am here", customers.value);
    }
  },
  {
    deep: true,
  }
);
watchEffect(
  async () => {
    console.log("am here");
    for (const request of result.value?.service_request || []) {
      const product_id = request.product_id;
      const order_item_id = request.order_item_id;
      const { data } = await apolloclient.query({
        query: gql`
          query MyQuery($order_item_id: String = "") {
            get_product_by_id(order_item_id: $order_item_id) {
              product
            }
          }
        `,
        variables: { order_item_id: order_item_id },
      });
      products.value[request.id] = data.get_product_by_id?.product;
      console.log("am here", products.value);
    }
  },
  {
    deep: true,
  }
);
</script>
<style></style>
