<template>
  <!-- <div v-if="error">{{ error }}</div>
  <div v-else-if="loading">{{ loading }}</div> -->
  <div class="mx-3 space-y-1">
    <div class="px-1">
      <h1 class="font-bold text-2xl text-gray-700">Subscriptions</h1>
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
            @click="searchQuery()"
            class="px-6 h-11 ml-2 cursor-pointer text-sm font-medium z-0 text-white bg-[#0080FE] hover:bg-[#242840] rounded-lg focus:outline-none focus:ring-[#862603cc]"
          >
            search
          </button>
        </div>
        <div class="flex items-center z-10">
          <select
            name=""
            id=""
            v-model="subscription_plan_id"
            class="flex h-auto items-center cursor-pointer justify-center w-full sm:px-4 px-3 sm:py-3 py-2 text-sm font-medium text-black bg-[#f8fafd] border-gray-800 border focus:outline-none rounded-lg transition duration-150 ease-in-out"
          >
            <option value="">Select Subscriptions</option>
            <option
              v-for="subscription in subscription_store.subscription_plans"
              :key="subscription.id"
              :value="subscription.id"
            >
              {{ subscription.name }}
            </option>
          </select>
        </div>
        <div class="">
          <select
            name=""
            id=""
            v-model="status"
            class="flex h-12 items-center cursor-pointer justify-center w-full sm:px-4 px-3 sm:py-3 py-2 text-sm font-medium text-black bg-[#f8fafd] border-gray-800 border focus:outline-none rounded-lg transition duration-150 ease-in-out"
          >
            <option value="">Filter By status</option>
            <option value="false">Pending</option>
            <option value="true">Verified</option>
          </select>
        </div>
      </div>
      <div class="sm:flex block justify-center items-center space-x-2">
        <div class="mr-2 py-3 text-lg">
          <button
            data-tippy-content="Download to Excel"
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

        <div class="mr-2 md:flex block w-full py-3 text-lg">
          <button
            @click="is_adding_subscription = true"
            class="bg-[#309107] hover:bg-[#0c2501] text-white px-8 py-4 h-12 flex justify-center items-center rounded-lg text-sm"
            data-tippy-content="Add new Subscription"
            data-tippy-placement="bottom"
          >
            <svg
              style="color: white"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-plus"
              viewBox="0 0 16 16"
            >
              <path
                d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
                fill="white"
              ></path>
            </svg>
            <span class="text-white"> Add </span>
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
    <div v-else-if="subscriptions.length == 0">
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
              Subscription Plan
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
            v-for="(subscription, index) in subscriptions"
            :key="subscription.id"
            class="hover:bg-gray-100"
          >
            <td class="px-6 py-4 whitespace-nowrap">
              {{ subscription.technician.first_name }}
              {{ subscription.technician.last_name }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              {{ subscription.created_at.split("T")[0] }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              {{ subscription.subscription_plan.name }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              {{ subscription.amount }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              {{ subscription.status ? "verified" : "pending" }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              {{ subscription.receipt_number }}
            </td>

            <td class="py-3 px-1 text-left flex space-x-3 items-center">
             
              <button @click="edit_subscription_id(subscription.id)">
                <font-awesome-icon
                  icon="fa-solid fa-pen"
                  size="lg"
                  style="color: #005eff"
                />
              </button>
              <button
                @click="
                  is_delete_modal_open = true;
                  deleteFunction = async () => {
                    try {
                      let res = await subscription_store.delet_subscription(
                        subscription.id
                      );
                      if (typeof res == 'string') {
                        notify({
                          title: 'Subscription Deleted Successfully',
                          type: 'success',
                        });
                        is_delete_modal_open = false;
                        refetch();
                      } else {
                        notify({
                          title: 'Subscription Not Deleted',
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
                  };"
               
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
              offset + page_size > subscription_aggregates
                ? technician_aggregate
                : offset + page_size
            }}</span>
            of
            <span class="font-semibold text-gray-900 dark:text-white">{{
              subscription_aggregates
            }}</span>
            Subscriptions in total
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
  <add_subscription
    v-if="is_adding_subscription"
    @failed="failer_notifier"
    @success="success_notifier"
    v-on:cancel="is_adding_subscription = false"
  ></add_subscription>
  <edit_subscription :subscription_id="subscription_id" v-if="is_updating_subscription" 
  @failed="failer_notifier"
    @success="success_notifier"
    v-on:cancel="is_updating_subscription = false"
  ></edit_subscription>
  <Delete v-if="is_delete_modal_open" @delete="deleteFunction()" v-on:cancel="is_delete_modal_open = false"></Delete>

</template>
<script setup>
import { reactive, ref, computed, onMounted, watch } from "vue";
import { useQuery } from "@vue/apollo-composable";
import { QUERY_SUBSCRIPTIONS } from "../constants/queries";
import { notify } from "@kyvg/vue3-notification";
import { subscriptionStore } from "../stores/subscription_store";
import * as XLSX from "xlsx";
import add_subscription from "../components/modal/add_subscription.vue";
import edit_subscription from "../components/modal/edit_subscription.vue"; 
import Delete from "../components/modal/Delete.vue";
const search = ref("");
const page_size = ref(12);
const offset = ref(0);
const status = ref("");
const subscription_store = subscriptionStore();
let deleteFunction =null
const subscription_plan_id = ref(subscription_store.subscription_plan_id);
const is_adding_subscription = ref(false);
const is_delete_modal_open = ref(false);
const is_updating_subscription = ref(false);
const subscription_id = ref("");   
const filter = reactive({
  _and: [
    {
      _or: [
        {
          technician: {
            first_name: {
              _ilike: `%${search.value}%`,
            },
          },
        },
        {
          technician: {
            last_name: {
              _ilike: `%${search.value}%`,
            },
          },
        },
        {
          technician: {
            phone_number: {
              _ilike: `%${search.value}%`,
            },
          },
        },
        {
          subscription_plan: {
            name: {
              _ilike: `%${search.value}%`,
            },
          },
        },
        {
          receipt_number: {
            _ilike: `%${search.value}%`,
          },
        },
      ],
    },
    {
      status: status.value ? { _eq: status.value } : {},
    },
    {
      subscription_plan_id: subscription_plan_id.value
        ? { _eq: subscription_plan_id.value }
        : {},
    },
  ],
});
const { result, loading, error, refetch } = useQuery(QUERY_SUBSCRIPTIONS, {
  limit: page_size.value,
  offset: offset.value,
  filter: filter,
});
const subscriptions = computed(() => {
  return result.value?.subscription;
});
const subscription_aggregates = computed(() => {
  return result.value?.subscription_aggregate.aggregate.count ?? 0;
});
const number_of_pages = computed(() =>
  Math.ceil(subscription_aggregates.value / page_size.value)
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
onMounted(async () => {
  await subscription_store.get_subscription_plan_list();
});
watch(search, () => {
  if (search.value) {
    filter._and[0]._or[0].technician.first_name._ilike = `%${search.value}%`;
    filter._and[0]._or[1].technician.last_name._ilike = `%${search.value}%`;
    filter._and[0]._or[2].technician.phone_number._ilike = `%${search.value}%`;
    filter._and[0]._or[3].subscription_plan.name._ilike = `%${search.value}%`;
    filter._and[0]._or[4].receipt_number._ilike = `%${search.value}%`;
  } else {
    filter._and[0]._or[0].technician.first_name._ilike = `%%`;
    filter._and[0]._or[1].technician.last_name._ilike = `%%`;
    filter._and[0]._or[2].technician.phone_number._ilike = `%%`;
    filter._and[0]._or[3].subscription_plan.name._ilike = `%%`;
    filter._and[0]._or[4].receipt_number._ilike = `%%`;
  }
});
watch(status, () => {
  if (status.value) {
    filter._and[1].status._eq = status.value;
  } else {
    filter._and[1].status = {};
  }
  searchQuery();
});
watch(subscription_plan_id, () => {
  if (subscription_plan_id.value) {
    filter._and[2].subscription_plan_id._eq = subscription_plan_id.value;
  } else {
    filter._and[2].subscription_plan_id = {};
  }
  searchQuery();
});
const tasker = () => {
  if (search.value) {
    filter._and[0]._or[0].technician.first_name._ilike = `%${search.value}%`;
    filter._and[0]._or[1].technician.last_name._ilike = `%${search.value}%`;
    filter._and[0]._or[2].technician.phone_number._ilike = `%${search.value}%`;
    filter._and[0]._or[3].subscription_plan.name._ilike = `%${search.value}%`;
    filter._and[0]._or[4].receipt_number._ilike = `%${search.value}%`;
  } else {
    filter._and[0]._or[0].technician.first_name._ilike = `%%`;
    filter._and[0]._or[1].technician.last_name._ilike = `%%`;
    filter._and[0]._or[2].technician.phone_number._ilike = `%%`;
    filter._and[0]._or[3].subscription_plan.name._ilike = `%%`;
    filter._and[0]._or[4].receipt_number._ilike = `%%`;
  }
  if (status.value) {
    filter._and[1].status._eq = status.value;
  } else {
    filter._and[1].status = {};
  }
  if (subscription_plan_id.value) {
    filter._and[2].subscription_plan_id._eq = subscription_plan_id.value;
  } else {
    filter._and[2].subscription_plan_id = {};
  }
};
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
  tasker();
  refetchData();
};

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
    title: data,
    type: "error",
  });
  is_adding_subscription.value = false;
  is_delete_modal_open.value = false;
  is_updating_subscription.value = false;
};
const success_notifier = (data) => {
  notify({
    title: data,
    type: "success",
  });
  is_adding_subscription.value = false;
  is_delete_modal_open.value = false;
  is_updating_subscription.value = false
  refetchData();
};

const downloadCSV = () => {
  const workbook = XLSX.utils.book_new();
  const data = [
    [
      "Technician Name",
      "Technician Phone Number",
      "Subscription Plan",
      "Receipt Number",
      "Status",
      "Amount",
      "Date",
    ],
    ...subscriptions.value.map((item) => [
      `${item.technician.first_name} ${item.technician.last_name}`,
      item.technician.phone_number,
      item.subscription_plan.name,
      item.receipt_number,
      item.status,
      item.amount,
      item.created_at.split("T")[0],
    ]),
  ];
  const sheet = XLSX.utils.aoa_to_sheet(data);
  XLSX.utils.book_append_sheet(workbook, sheet, "Data");
  XLSX.writeFile(workbook, "my_data.xlsx");
};

const edit_subscription_id = (id) => {
  is_updating_subscription.value = true;
  subscription_id.value = id;
}
</script>

<style></style>
