<template>
  <div class="mx-3 space-y-1">
    <div class="px-1 py-1">
      <h1 class="font-bold text-2xl text-gray-700">Service Payments</h1>
    </div>
    <div class="md:flex justify-between">
      <div class="md:flex space-y-0 z-0 space-x-2 items-center justify-center">
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
        <div class="flex items-center z-10">
          <select
            v-model="_is_paid"
            class="flex h-12 items-center cursor-pointer justify-center w-full sm:px-4 px-3 sm:py-3 py-2 text-sm font-medium text-black border-gray-800 border bg-[#f6f9fc] focus:outline-none rounded-lg transition duration-150 ease-in-out"
          >
            <option value="">Filter By Status</option>
            <option value="true">Paid</option>
            <option value="false">Not Paid</option>
          </select>
        </div>
      </div>
      <div class="sm:flex block justify-center items-center space-x-2">
        <div class="mr-2 py-3 text-lg">
          <button
            data-tippy-content="Download To Excel"
            data-tippy-placement="bottom"
            @click="downloadCSV"
            class="bg-[#242840] hover:bg-[#131522] text-white font-bold py-2 px-4 rounded inline-flex items-center"
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
    </div>
    <div v-if="error">error loading api</div>
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
    <div v-else-if="service_payments.length == 0">
      <div class="flex justify-center items-center">
        <div class="">
          <img src="../assets/search.png" alt="" />
          <div
            class="flex text-center justify-center items-center font-bold text-2xl"
          >
            No Search Result Found
          </div>
        </div>
      </div>
    </div>
    <div v-else class="bg-white overflow-hidden shadow-md sm:rounded-lg">
      <table class="w-full divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Technician
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Date
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Status
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Amount
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Receipt Number
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr
            v-for="(payment, index) in service_payments"
            :key="payment.id"
            class="hover:bg-gray-100"
          >
            <td class="px-6 py-4 whitespace-nowrap">
              {{ payment.technician.first_name }}
              {{ payment.technician.last_name }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              {{ payment.created_at.split("T")[0] }}
            </td>
            <td class="px-6 py-4 capitalize whitespace-nowrap">
              <span
                :class="
                  payment.is_paid === false
                    ? 'bg-yellow-200 text-yellow-800 rounded-full px-2 py-1'
                    : 'bg-green-200 text-green-800 rounded-full px-2 py-1'
                "
              >
                {{ payment.is_paid ? "paid" : "pending" }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              {{ payment.amount }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              {{
                payment?.reciept_code
                  ? payment?.reciept_code
                  : "Not Inserted Yet"
              }}
            </td>

            <td class="py-3 px-1 text-left flex space-x-3 items-center">
              <button @click="edit_payment(payment.id)">
                <font-awesome-icon
                  icon="fa-solid fa-pen"
                  size="lg"
                  class="text-green-500"
                />
              </button>
              <button
                @click="
                  is_delete_modal_open = true;
                  deleteFunction = async () => {
                    try {
                      let res = await payment_store.delete_payment_by_id(
                        payment.id
                      );
                      if (typeof res == 'string') {
                        notify({
                          title: 'Payment Deleted Successfully',
                          type: 'success',
                        });
                        is_delete_modal_open = false;
                        refetch();
                      } else {
                        notify({
                          title: 'Payment Not Deleted',
                          type: 'error',
                        });
                        is_delete_modal_open = false;
                        refetch();
                      }
                    } catch (error) {
                      notify({
                        title: error.message,
                        type: 'error',
                      });
                      is_delete_modal_open = false;
                    }
                  };
                "
              >
                <font-awesome-icon
                  :icon="['fas', 'trash']"
                  size="xl"
                  style="color: #ff0000"
                />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="flex justify-end mr-2 mt-1 pb-5">
      <div class="flex flex-col items-center">
        <div>
          <span class="text-sm text-gray-700 dark:text-gray-400">
            Showing
            <span class="font-semibold text-gray-900 dark:text-white">{{
              offset
            }}</span>
            to
            <span class="font-semibold text-gray-900 dark:text-white">{{
              offset + page_size > service_payment_aggregates
                ? service_payment_aggregates
                : offset + page_size
            }}</span>
            of
            <span class="font-semibold text-gray-900 dark:text-white">{{
              service_payment_aggregates
            }}</span>
            Service Payment in total
          </span>
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
  </div>
  <edit_service_payment
    v-if="is_adding_payment"
    @failed="failer_notifier"
    @success="success_notifier"
    :payment_id="payment_id"
    v-on:cancel="is_adding_payment = false"
  ></edit_service_payment>
  <Delete v-if="is_delete_modal_open" @delete="deleteFunction()" v-on:cancel="is_delete_modal_open = false"></Delete>
</template>
<script setup>
import { reactive, ref, computed, watch, watchEffect } from "vue";
import { useQuery } from "@vue/apollo-composable";
import { QUERY_SERVICE_PAYMENT } from "../constants/queries";
import tippy from "tippy.js";
import Delete from "../components/modal/Delete.vue";
import { notify } from "@kyvg/vue3-notification";
import edit_service_payment from "../components/modal/edit_service_payment.vue";
import "tippy.js/dist/tippy.css";
import * as XLSX from "xlsx";
import { servicePaymentStore } from "../stores/service_payment";
const payment_store = servicePaymentStore();
const offset = ref(0);
const limit = ref(12);
const payment_id = ref(null);
const _is_paid = ref("");
const search = ref("");
const page_size = ref(11);
let deleteFunction = null;
const is_adding_payment = ref(false);
const is_delete_modal_open = ref(false);
const filter = reactive({
  _and: [
    {
      _or: [
        { technician: { first_name: { _ilike: "%%" } } },
        { technician: { last_name: { _ilike: "%%" } } },
        { technician: { phone_number: { _ilike: "%%" } } },
        { reciept_code: { _ilike: "%%" } },
      ],
    },
    {
      is_paid: _is_paid.value ? { _eq: _is_paid } : {},
    },
  ],
});
watchEffect(() => {
  filter._and[0]._or[0].technician.first_name._ilike = `%${search.value}%`;
  filter._and[0]._or[1].technician.last_name._ilike = `%${search.value}%`;
  filter._and[0]._or[2].technician.phone_number._ilike = `%${search.value}%`;
});

const { result, loading, error, refetch } = useQuery(QUERY_SERVICE_PAYMENT, {
  offset: offset.value,
  limit: limit.value,
  filter: filter,
});
const service_payments = computed(() => {
  return result.value?.service_payment;
});

const service_payment_aggregates = computed(() => {
  return result.value?.service_payment_aggregate.aggregate.count ?? 0;
});

const number_of_pages = computed(() =>
  Math.ceil(service_payment_aggregates.value / page_size.value)
);
const current_page_number = computed(
  () => Math.floor(offset.value / page_size.value) + 1
);

const prev_page_offset = computed(() =>
  Math.max(offset.value - page_size.value, 0)
);
const next_page_offset = computed(() =>
  Math.min(
    offset.value + page_size.value,
    (number_of_pages.value - 1) * page_size.value
  )
);
const refetchData = () => {
  refetch({
    offset: offset.value,
    limit: page_size.value,
    filter: filter,
  });
};

const prev_page = () => {
  if (prev_page_offset.value < 0) return;

  if (current_page_number.value == 1) return;
  offset.value = prev_page_offset.value;
  refetchData();
};
const searchQuery = () => {
  if (search.value) {
    filter._and[0]._or[0].technician.first_name._ilike = `%${search.value}%`;
    filter._and[0]._or[1].technician.last_name._ilike = `%${search.value}%`;
    filter._and[0]._or[2].technician.phone_number._ilike = `%${search.value}%`;
    filter._and[0]._or[3].reciept_code._ilike = `%${search.value}%`;
  } else {
    filter._and[0]._or[0].technician.first_name._ilike = `%%`;
    filter._and[0]._or[1].technician.last_name._ilike = `%%`;
    filter._and[0]._or[2].technician.phone_number._ilike = `%%`;
    filter._and[0]._or[3].reciept_code._ilike = `%%`;
  }
  if (_is_paid.value) {
    filter._and[1].is_paid = { _eq: _is_paid.value };
  } else {
    filter._and[1].is_paid = {};
  }

  refetchData();
};
watch(_is_paid, () => {
  if (_is_paid.value == null) {
    filter._and[1].is_paid = {};
  } else {
    filter._and[1].is_paid = { _eq: _is_paid.value };
  }
  searchQuery();
});
const next_page = () => {
  if (next_page_offset.value > (number_of_pages.value - 1) * page_size.value)
    return;
  if (current_page_number.value == number_of_pages.value) return;
  console.log(next_page_offset.value);
  offset.value = next_page_offset.value;
  refetchData();
};

const failer_notifier = (data) => {
  notify({
    title: "Error",
    text: data,
    type: "error",
  });
  is_delete_modal_open.value = false;
  is_adding_payment.value = false;
};
const success_notifier = (data) => {
  notify({
    title: "Success",
    text: data,
    type: "success",
  });
  is_delete_modal_open.value = false;
  is_adding_payment.value = false;
  refetchData();
};

const downloadCSV = () => {
  const workbook = XLSX.utils.book_new();
  const data = [
    [
      "Name",
      "Phone Number",
      "Region",
      "Zone",
      "Woreda",
      "Kebele",
      "Number of Tasks Accomplished",
      "Status",
      "Registered At",
    ],
    ...service_requests.value.map((service_request) => [
      service_request.first_name + " " + technician.last_name,
      service_request.phone_number,
      service_request.address.region.name,
      service_request.address.zone.name,
      service_request.address.woreda.name,
      service_request.address.kebele.name,
      service_request.service_requests_aggregate.aggregate.count,
      service_request.is_verified ? "Verified" : "Not Verified",
      technician.created_at.split("T")[0],
    ]),
  ];
  const sheet = XLSX.utils.aoa_to_sheet(data);
  XLSX.utils.book_append_sheet(workbook, sheet, "Data");
  XLSX.writeFile(workbook, "my_data.xlsx");
};

const edit_payment = (payment) => {
  is_adding_payment.value = true;
  payment_id.value = payment;
};
</script>

<style>
/* You can add custom styles here */
</style>
