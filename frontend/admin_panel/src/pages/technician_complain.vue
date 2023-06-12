<template>
  <div class="min-h-screen mx-3 bg-[#E2E8F0] rounded-lg">
    <div class="flex md:w-1/3 sm:w-1/2 w-full items-center">
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
    <div class="mx-auto space-y-1">
      <h1 class="text-2xl flex font-bold text-gray-800 ">
        Technician Complain
      </h1>
      <div v-if="error">{{ error }}</div>
      <div v-else-if="loading" class="flex justify-center items-center">
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
      <div v-else-if="result.technician_complain.length == 0">
        <div class="flex justify-center items-center">
          <div class="">
            <img src="../assets/search.png" alt="">
            <div class="flex text-center justify-center items-center font-bold text-2xl">No Search Result Found</div>
          </div>
        </div>
      </div>
      <div v-else class="space-y-3">
      
        <div class="flex flex-wrap">
          <div
            class="w-full lg:w-1/2 mb-8 scrollbar-w-1 scrollbar-thumb-gray-900 scrollbar-track-gray-100 overflow-y-scroll max-h-screen"
          >
            <div class="bg-white rounded-lg shadow p-6">
              <h2 class="text-lg font-medium text-gray-800 mb-4">
                New Complains
              </h2>
              <div v-if="newComplaints.length === 0" class="text-gray-500">
                No new complaints.
              </div>
              <div v-else>
                <ul class="divide-y divide-gray-200">
                  <li
                    v-for="complaint in newComplaints"
                    :key="complaint.id"
                    class="py-4"
                  >
                    <div class="flex justify-between py-4">
                      <router-link
                        :to="`/technician-detail/${complaint.technician.id}`"
                      >
                        <h3 class="text-blue-700 hover:text-blue-700 font-bold">
                          {{ complaint.technician.first_name }}
                          {{ complaint.technician.last_name }}
                        </h3>
                      </router-link>

                      <span class="text-gray-500">{{
                        complaint.created_at.split("T")[0]
                      }}</span>
                    </div>
                    <div>
                      <h1 class="font-bold">{{ complaint.title }}</h1>
                    </div>
                    <div class="flex justify-between items-center">
                      <h3 class="text-gray-800 font-medium">
                        {{ complaint.complain }}
                      </h3>
                    </div>

                    <div class="mt-4">
                      <button
                        @click="resolveComplaint(complaint.id)"
                        class="bg-green-500 text-white py-2 px-4 rounded-md"
                      >
                        Resolve
                      </button>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div class="w-full lg:w-1/2 pl-4 mb-8 overflow-y-scroll max-h-screen">
            <div class="bg-white rounded-lg shadow p-6">
              <h2 class="text-lg font-medium text-gray-800 mb-4">
                Resolved Complaints
              </h2>
              <div v-if="resolvedComplaints.length === 0" class="text-gray-500">
                No resolved complaints.
              </div>
              <div v-else>
                <ul class="divide-y divide-gray-200">
                  <li
                    v-for="complaint in resolvedComplaints"
                    :key="complaint.id"
                    class="py-4"
                  >
                    <div class="flex justify-between items-center">
                      <h3 class="text-gray-800 font-medium">
                        {{ complaint.complain }}
                      </h3>
                      <span class="text-gray-500">{{
                        complaint.created_at.split("T")[0]
                      }}</span>
                    </div>
                    <p class="text-gray-600">{{ complaint.response }}</p>
                    <div class="mt-4">
                      <span class="text-green-500">Resolved</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <tech_complain_response
    :id="complain_id"
    v-if="is_giving_response"
    @failed="failer_notifier"
    @success="success_notifier"
    v-on:cancel="is_giving_response = false"
  ></tech_complain_response>
</template>

<script setup>
import { ref, computed, onMounted ,watch,watchEffect,reactive} from "vue";
import { useQuery } from "@vue/apollo-composable";
import { QUERY_COMPLAINS } from "../constants/queries";
import tech_complain_response from "../components/modal/tech_complain_response.vue";
import { notify } from "@kyvg/vue3-notification";
const search = ref(""); // search query
const limit = ref(10);
const offset = ref(0);
const is_giving_response = ref(false);

const complain_id = ref("");
const failer_notifier = (data) => {
  notify({
    title: "Failed",
    text: "Complaint failed to resolve", 
    type: "error",
    });
  is_giving_response.value = false;
};
const success_notifier = (data) => {
 notify({
    title: "Success",
    text: "Complaint resolved successfully", 
    type: "success",  
 })
  is_giving_response.value = false;
  refetch();
};


const { result, loading, error, refetch } = useQuery(QUERY_COMPLAINS);

const newComplaints = computed(() => {
  if (result.value) {
    return result.value.technician_complain.filter(
      (complaint) => complaint.is_resolved === false
    );
  }
});
const filter = reactive({
  _or: [
    {
      technician: {
        _or: [
          {
            first_name: {
              _ilike: search.value ? `%${search.value}%` : "%%",
            },
          },
          {
            last_name: {
              _ilike: search.value ? `%${search.value}%` : "%%",
            },
          },
          {
            phone_number: {
              _ilike: search.value ? `%${search.value}%` : "%%",
            },
          }
        ],
      },
    },
    {
      title: {
        _ilike: search.value ? `%${search.value}%` : "%%",
      },
    }
  ],
});
const searchQuery = () => {
  filter._or[0].technician._or[0].first_name._ilike = search.value
    ? `%${search.value}%`
    : "%%";
  filter._or[0].technician._or[1].last_name._ilike = search.value
    ? `%${search.value}%`
    : "%%";
  filter._or[0].technician._or[2].phone_number._ilike = search.value
    ? `%${search.value}%`
    : "%%";
  filter._or[1].title._ilike = search.value
    ? `%${search.value}%`
    : "%%";
  refetch(
    {
      filter: filter,
    }
  );
};
// watch(search, searchQuery); 
const resolvedComplaints = computed(() => {
  if (result.value) {
    return result.value.technician_complain.filter(
      (complaint) => complaint.is_resolved === true
    );
  }
});

const resolveComplaint = (id) => {
  complain_id.value = id;
  is_giving_response.value = true;
};

const date_formatter = (new_date) => {
  const date = new Date(new_date);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate() + 10).padStart(2, "0"); // add 10 days to get 2023-04-23

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
};
</script>
