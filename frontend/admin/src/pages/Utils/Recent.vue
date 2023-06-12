<template>
  <div v-if="error">{{ error }}</div>
  <div
    v-else-if="loading"
    class="fixed inset-0 flex justify-center items-center"
  >
  <svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 24 24"><circle cx="4" cy="12" r="3" fill="#231515"><animate id="svgSpinners3DotsFade0" fill="freeze" attributeName="opacity" begin="0;svgSpinners3DotsFade1.end-0.25s" dur="0.75s" values="1;.2"/></circle><circle cx="12" cy="12" r="3" fill="#231515" opacity=".4"><animate fill="freeze" attributeName="opacity" begin="svgSpinners3DotsFade0.begin+0.15s" dur="0.75s" values="1;.2"/></circle><circle cx="20" cy="12" r="3" fill="#231515" opacity=".3"><animate id="svgSpinners3DotsFade1" fill="freeze" attributeName="opacity" begin="svgSpinners3DotsFade0.begin+0.3s" dur="0.75s" values="1;.2"/></circle></svg> 

  </div>
  <div v-else-if="result.token_orders.length == 0">
    <div class="flex justify-center items-center">
      <div class="">
        <img src="../../assets/search.png" alt="" />
        <div
          class="flex text-center justify-center items-center font-bold text-2xl"
        >
          No Orders Added Yet
        </div>
      </div>
    </div>
  </div>
  <div v-else class="lg:px-4">
    <div
      class="bg-white shadow-xl sm:rounded-lg scrollbar-thin scrollbar-thumb-gray-900 scrollbar-track-gray-100 overflow-x-scroll"
    >
      <div class="flex justify-between p-3">
        <div class="">Recent Crypto Currency Orders</div>
        <router-link to="/orders" class="text-blue-700">See More</router-link>
      </div>
      <table class="w-full divide-gray-200">
        <thead class="bg-gray-100">
          <tr>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              First Name
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Last Name
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Email
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Crypto Currency
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Amount
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Status
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Payment Status
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Register Date
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr
            v-for="(order, i) in result.token_orders"
            :key="order.id"
            class="hover:bg-gray-100"
          >
            <td class="px-6 py-4 whitespace-nowrap capitalize">
              {{
                order.user.first_name

              }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              {{ order.user.last_name }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap capitalize">
              {{ order.user.email }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap capitalize">
              {{ order.token.name }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              {{ order.amount }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span
                :class="
                  order.status
                    ? 'bg-yellow-200 text-yellow-800 rounded-full px-2 py-1'
                    :'bg-green-200 text-green-800 rounded-full px-2 py-1' 
                "
              >
                {{ order.status ? "Pending" : "Completed" }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span
                :class="
                  order.payment_status
                    ? 'bg-green-200 text-green-800 rounded-full px-2 py-1'
                    : 'bg-yellow-200 text-yellow-800 rounded-full px-2 py-1'
                "
              >
                {{ order.payment_status ? "Paid" : "Unpaid" }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              {{ order.created_at.split("T")[0] }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script setup>
import { useQuery } from "@vue/apollo-composable";
import { ref, watch, watchEffect } from "vue";
import apolloclient from "../../apollo.config";
import gql from "graphql-tag";
const page_size = ref(7);

const { error, result, loading, refetch } = useQuery(
  gql`
    query MyQuery($limit: Int = 10, $created_at: order_by = asc) {
      token_orders(limit: $limit, order_by: { created_at: $created_at }) {
        amount
        created_at
        id
        payment_status
        reference_id
        status
        token {
          name
          id
        }
        updated_at
        user {
          first_name
          email
          last_name
        }
      }
    }
  `,
  {
    limit: page_size.value,
  }
);


watchEffect(() => {
  console.log(result.value);
});     
</script>
<style></style>
