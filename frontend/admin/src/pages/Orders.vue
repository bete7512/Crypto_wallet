<template>
  <!-- <div class="mt-20"></div> -->
  <div v-if="error">{{ error }}</div>
  <div v-else-if="loading" class="h-screen flex justify-center items-center">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="72"
      height="72"
      viewBox="0 0 24 24"
    >
      <circle cx="4" cy="12" r="3" fill="#231515">
        <animate
          id="svgSpinners3DotsFade0"
          fill="freeze"
          attributeName="opacity"
          begin="0;svgSpinners3DotsFade1.end-0.25s"
          dur="0.75s"
          values="1;.2"
        />
      </circle>
      <circle cx="12" cy="12" r="3" fill="#231515" opacity=".4">
        <animate
          fill="freeze"
          attributeName="opacity"
          begin="svgSpinners3DotsFade0.begin+0.15s"
          dur="0.75s"
          values="1;.2"
        />
      </circle>
      <circle cx="20" cy="12" r="3" fill="#231515" opacity=".3">
        <animate
          id="svgSpinners3DotsFade1"
          fill="freeze"
          attributeName="opacity"
          begin="svgSpinners3DotsFade0.begin+0.3s"
          dur="0.75s"
          values="1;.2"
        />
      </circle>
    </svg>
  </div>
  <div v-else class="mx-2">
    <div class="px-2">
      <h1 class="font-bold text-2xl text-gray-700">Crypto Token Orders</h1>
    </div>
    <div class="flex justify-between">
      <div class="flex items-center">
        <div class="relative">
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
            class="bg-gray-50 border text-sm cursor-text z-10 w-full border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block pl-8 p-1 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search..."
            v-model="search"
            required
          />
        </div>
        <button
          type="button"
          @click="searchQuery()"
          class="px-3 py-2 ml-2 cursor-pointer text-sm font-medium z-0 text-white bg-[#0080FE] hover:bg-[#242840] rounded-lg focus:outline-none focus:ring-[#862603cc]"
        >
          search
        </button>
      </div>
      <div class="mr-2 py-1 text-lg">
        <button
          @click="exportToExcel"
          class="bg-[#242840] hover:bg-[#131522] text-white font-bold py-1 px-4 rounded inline-flex items-center"
        >
          <svg
            class="fill-current w-4 h-4 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
          </svg>
          <span>Download</span>
        </button>
      </div>
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
            Token Name
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Total Price
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Amount
          </th>
          <!-- <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Status
            </th> -->
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Status
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Register Date
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Action
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
            {{ order.user.first_name }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            {{ order.user.last_name }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            {{ order.user.email }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap capitalize">
            {{ order.token.name }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            {{ order.token.price.price * order.amount }} ETB
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            {{ order.amount }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <span
              :class="
                order.payment_status
                  ? 'bg-green-200 text-green-800 rounded-full px-2 py-1'
                  : 'bg-yellow-200 text-yellow-800 rounded-full px-2 py-1'
              "
            >
              {{ order.payment_status ? "Completed" : "Pending" }}
            </span>
          </td>

          <td class="px-6 py-4 whitespace-nowrap">
            {{ order.created_at.split("T")[0] }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="flex space-x-1">
              <button
                @click="update_order(order.id, order.payment_status)"
                v-if="order.payment_status"
                class="hover:bg-gray-400 bg-none rounded-lg p-2 hover:shadow-lg"
                data-tippy-content="View Detail of this Service Request"
                data-tippy-placement="bottom"
              >
                <font-awesome-icon
                  :icon="['fas', 'toggle-on']"
                  style="color: #44d70f"
                  size="xl"
                />
              </button>
              <button
                @click="update_order(order.id, order.payment_status)"
                v-else
                class="hover:bg-gray-400 bg-none rounded-lg p-2 hover:shadow-lg"
                data-tippy-content="View Detail of this Service Request"
                data-tippy-placement="bottom"
              >
                <font-awesome-icon
                  :icon="['fas', 'toggle-off']"
                  size="xl"
                  style="color: #b71010"
                />
              </button>
              <button
                @click="
                  is_delete_modal_open = true;
                  deleteFunction = async () => {
                    await delete_user(order.id);
                  };
                "
                class="hover:bg-gray-400 bg-none rounded-lg p-2 hover:shadow-lg"
              >
                <font-awesome-icon
                  :icon="['fas', 'trash']"
                  size="xl"
                  style="color: #ff0000"
                />
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="flex justify-end">
      <div class="flex flex-col items-center">
        <div>
          <span class="text-sm text-gray-700 dark:text-gray-400">
            Showing
            <span class="font-semibold text-gray-900 dark:text-white">{{
              offset
            }}</span>
            to
            <span class="font-semibold text-gray-900 dark:text-white">{{
              offset + page_size > service_request_aggregate
                ? user_aggregate
                : offset + page_size
            }}</span>
            of
            <span class="font-semibold text-gray-900 dark:text-white">{{
              service_request_aggregate
            }}</span>
            Service Requests in total
          </span>
        </div>
      </div>

      <div class="inline-flex mt-2 xs:mt-0">
        <button
          @click="prev_page"
          :class="
            offset == 0 ? 'bg-slate-600' : 'bg-gray-800 hover:bg-gray-900'
          "
          class="inline-flex items-center px-4 py-2 text-sm font-medium text-white rounded-l dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          <font-awesome-icon class="px-2" :icon="['fas', 'arrow-left']" />
          Prev
        </button>
        <button
          @click="next_page"
          :class="
            current_page_number == number_of_pages
              ? 'bg-slate-600'
              : 'bg-gray-800 hover:bg-gray-900'
          "
          class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-r dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          Next
          <font-awesome-icon class="px-2" :icon="['fas', 'arrow-right']" />
        </button>
      </div>
    </div>
  </div>
  <Delete
    v-if="is_delete_modal_open"
    v-on:delete="deleteFunction()"
    v-on:cancel="is_delete_modal_open = false"
  >
  </Delete>
</template>
<script setup>
import { useQuery } from "@vue/apollo-composable";
import gql from "graphql-tag";
import { ref, computed } from "vue";
import apolloclient from "../apollo.config";
import Delete from "./Utils/Delete.vue";
import * as XLSX from "xlsx";
import { notify } from "@kyvg/vue3-notification";
const search = ref(""); // search input value
let deleteFunction;
let is_delete_modal_open = ref(false);
const DELETE_ORDER = gql`
  mutation MyMutation($id: Int = 10) {
    delete_token_orders_by_pk(id: $id) {
      id
    }
  }
`;
const { result, loading, error, refetch } = useQuery(
  gql`
    query MyQuery($search: String = "%%") {
      token_orders(
        where: {
          _or: [
            { user: { first_name: { _ilike: $search } } }
            { user: { email: { _ilike: $search } } }
            { user: { last_name: { _ilike: $search } } }
          ]
        }
      ) {
        amount
        created_at
        payment_status
        status
        token {
          name
          price {
            price
          }
          symbol
        }
        user {
          email
          first_name
          last_name
          id
        }
        id
      }
    }
  `,
  {
    search: search.value ? `%${search.value}%` : "%%",
  }
);
const token_orders = computed(() => result.value?.token_orders ?? []);
const searchQuery = async () => {
  refetch({ search: `%${search.value}%` });
};

const exportToExcel = () => {
  const workbook = XLSX.utils.book_new();
  const data = [
    [
      "First Name",
      "Last Name",
      "Email",
      "Amount",
      "Token",
      "Payment Status",
      "Total Price",
      "Reg Date",
    ],
    ...token_orders.value.map((order) => [
      order.user.first_name,
      order.user.last_name,
      order.user.email,
      order.amount,
      order.token.name,
      order.payment_status ? "Paid" : "Unpaid",
      order.token.price.price * order.amount,
      order.created_at.split("T")[0],
    ]),
  ];
  const sheet = XLSX.utils.aoa_to_sheet(data);
  XLSX.utils.book_append_sheet(workbook, sheet, "Data");
  XLSX.writeFile(workbook, "data.xlsx");
};

async function update_order(id, status) {
  try {
    const response = await apolloclient.mutate({
      mutation: gql`
        mutation MyMutation($id: Int!, $status: Boolean!) {
          update_token_orders(
            where: { id: { _eq: $id } }
            _set: { payment_status: $status }
          ) {
            affected_rows
          }
        }
      `,
      variables: {
        id,
        status: !status,
      },
    });
    refetch({ search: `%${search.value}%` });
    notify({
      type: "success",
      text: "Order Updated Successfully",
    });
  } catch (error) {
    notify({
      type: "error",
      text: "Error Updating User",
    });
  }
}

async function delete_user(id) {
  try {
    const response = await apolloclient.mutate({
      mutation: DELETE_ORDER,
      variables: {
        id,
      },
    });
    console.log(response);
    refetch({ search: `%${search.value}%` });
    notify({
      type: "success",
      text: "Crypto Order Deleted Successfully",
    });
  } catch (error) {
    notify({
      type: "error",
      text: error.message,
    });
  }
  is_delete_modal_open.value = false;
}
</script>

<style></style>
