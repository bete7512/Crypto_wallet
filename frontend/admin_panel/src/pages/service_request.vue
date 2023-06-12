<template>
  <div
    class="mx-3 scrollbar-w-1 scrollbar-thumb-gray-900 scrollbar-track-gray-100 overflow-y-scroll"
  >
    <div class="py-1">
      <h1 class="font-bold text-2xl text-gray-700">Service Requests</h1>
    </div>
    <div class="">
      <div class="">
        <div class="flex space-x-2">
          <div
            v-for="reg in selected_region"
            :key="reg.id"
            class="flex border border-gray-300 rounded-lg overflow-hidden bg-white"
          >
            <div class="flex items-center px-3 py-2">{{ reg.name }}</div>
            <button
              @click="region.remove_region(reg)"
              class="text-gray-400 hover:text-gray-500 focus:outline-none flex items-center px-3 py-2 bg-gray-100"
            >
              <span class="sr-only">Close</span>
              <svg
                class="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        <div class="flex space-x-2">
          <div
            v-for="zo in selected_zone"
            :key="zo.id"
            class="flex border border-gray-300 rounded-lg overflow-hidden bg-white"
          >
            <div class="flex items-center px-3 py-2">{{ zo.name }}</div>
            <button
              @click="zone.remove_zone(zo)"
              class="text-gray-400 hover:text-gray-500 focus:outline-none flex items-center px-3 py-2 bg-gray-100"
            >
              <span class="sr-only">Close</span>
              <svg
                class="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        <div class="flex space-x-2">
          <div
            v-for="wo in selected_woreda"
            :key="wo.id"
            class="flex border border-gray-300 rounded-lg overflow-hidden bg-white"
          >
            <div class="flex items-center px-3 py-2">{{ wo.name }}</div>
            <button
              @click="woreda.remove_woreda(wo)"
              class="text-gray-400 hover:text-gray-500 focus:outline-none flex items-center px-3 py-2 bg-gray-100"
            >
              <span class="sr-only">Close</span>
              <svg
                class="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div class="md:flex justify-between items-center mb-2 space-x-2">
        <div
          class="flex flex-wrap space-x-1 space-y-3 z-0 mb-2 items-center justify-center"
        >
          <div class="flex items-center mt-2">
            <div class="relative">
              <div
                class="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none"
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
                class="bg-gray-50 border h-11 text-lg cursor-text z-10 border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block pl-8 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search"
                v-model="search"
                required
              />
            </div>
            <button
              type="button"
              @click="searchQuery"
              class="px-3 h-11 ml-2 mt-1 cursor-pointer text-sm font-medium z-0 text-white bg-[#0080FE] hover:bg-[#242840] rounded-lg focus:outline-none focus:ring-[#862603cc]"
            >
              search
            </button>
          </div>
          <div class="relative">
            <button
              class="flex items-center justify-between w-full py-2 px-2 text-sm font-medium text-left text-neutral-600 bg-white border border-transparent rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-500 ease-in-out"
              @click="region.is_region = !region.is_region"
            >
              <div class="text-black pr-5">
                {{
                  region.sample_region_to_display?.name
                    ? region.sample_region_to_display.name
                    : "Region"
                }}
              </div>
              <div>
                <svg
                  :class="{ 'rotate-180': region.is_region }"
                  class="inset-y-0 right-0 w-5 h-5 mt-2 mr-3 pointer-events-none text-gray-400 transition-transform"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M10 12a1 1 0 0 1-.7-.3l-4-4a1 1 0 1 1 1.4-1.4l3.3 3.3 3.3-3.3a1 1 0 1 1 1.4 1.4l-4 4A1 1 0 0 1 10 12z"
                  />
                </svg>
              </div>
            </button>
            <transition name="fade">
              <div
                v-if="region.is_region"
                class="absolute z-10 w-full mt-2 bg-gray-200 rounded-md shadow-lg"
              >
                <div
                  v-for="reg in regions"
                  :key="reg.id"
                  @click="region.select_region(reg)"
                  class="px-4 py-2 cursor-pointer hover:bg-blue-50"
                >
                  {{ reg.name }}
                </div>
              </div>
            </transition>
          </div>
          <div class="relative">
            <button
              class="flex items-center justify-between w-full py-2 px-2 text-sm font-medium text-left text-neutral-600 bg-white border border-transparent rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-500 ease-in-out"
              @click="zone.is_zone = !zone.is_zone"
            >
              <div class="text-black pr-5">
                {{
                  zone.sample_zone_to_display?.name
                    ? zone.sample_zone_to_display.name
                    : "Zone"
                }}
              </div>

              <div>
                <svg
                  :class="{ 'rotate-180': zone.is_zone }"
                  class="inset-y-0 right-0 w-5 h-5 mt-2 mr-3 pointer-events-none text-gray-400 transition-transform"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M10 12a1 1 0 0 1-.7-.3l-4-4a1 1 0 1 1 1.4-1.4l3.3 3.3 3.3-3.3a1 1 0 1 1 1.4 1.4l-4 4A1 1 0 0 1 10 12z"
                  />
                </svg>
              </div>
            </button>
            <transition name="fade">
              <div
                v-if="zone.is_zone"
                class="absolute z-10 w-full mt-2 bg-gray-200 rounded-md shadow-lg"
              >
                <div
                  v-for="zo in zones"
                  :key="zo.id"
                  @click="zone.select_zone(zo)"
                  class="px-4 py-2 cursor-pointer hover:bg-blue-50"
                >
                  {{ zo.name }}
                </div>
              </div>
            </transition>
          </div>

          <div class="relative">
            <button
              class="flex items-center justify-between w-full py-2 px-2 text-sm font-medium text-left text-neutral-600 bg-white border border-transparent rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-500 ease-in-out"
              @click="woreda.is_woreda = !woreda.is_woreda"
            >
              <div class="text-black pr-5">
                {{
                  woreda.sample_woreda_to_display?.name
                    ? woreda.sample_woreda_to_display.name
                    : "Woreda"
                }}
              </div>

              <div>
                <svg
                  :class="{ 'rotate-180': woreda.is_woreda }"
                  class="inset-y-0 right-0 w-5 h-5 mt-2 mr-3 pointer-events-none text-gray-400 transition-transform"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M10 12a1 1 0 0 1-.7-.3l-4-4a1 1 0 1 1 1.4-1.4l3.3 3.3 3.3-3.3a1 1 0 1 1 1.4 1.4l-4 4A1 1 0 0 1 10 12z"
                  />
                </svg>
              </div>
            </button>
            <transition name="fade">
              <div
                v-if="woreda.is_woreda"
                class="absolute z-10 w-full mt-2 bg-gray-200 rounded-md shadow-lg"
              >
                <div
                  v-for="wo in woredas"
                  :key="wo.id"
                  @click="woreda.select_woreda(wo)"
                  class="px-4 py-2 cursor-pointer hover:bg-blue-50"
                >
                  {{ wo.name }}
                </div>
              </div>
            </transition>
          </div>
          <div class="flex items-center">
            <select
              name=""
              id=""
              v-model="statuses"
              @change="searchQuery"
              class="flex h-11 items-center cursor-pointer justify-center w-full px-2 sm:py-3 py-2 text-sm font-medium text-black border-gray-800 border bg-[#E2E8F0] focus:outline-none rounded-lg transition duration-150 ease-in-out"
            >
              <option class="text-sm" value="">Status</option>
              <option value="opened">Opened</option>
              <option value="progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div class="flex items-center">
            <select
              name=""
              id=""
              v-model="is_warranty"
              @change="searchQuery"
              class="flex h-11 items-center cursor-pointer justify-center w-full px-2 sm:py-3 py-2 text-sm font-medium text-black border-gray-800 border bg-[#E2E8F0] focus:outline-none rounded-lg transition duration-150 ease-in-out"
            >
              <option value="">Warranty</option>
              <option value="true">Warranty</option>
              <option value="false">No Warranty</option>
            </select>
          </div>
        </div>
        <div class="sm:flex block justify-center items-center space-x-2">
          <div class="mr-2 text-lg">
            <button
              @click="exportToExcel"
              class="bg-[#242840] hover:bg-[#030406] text-white font-bold py-2 px-3 rounded inline-flex items-center"
              data-tippy-content="Export To Excel"
              data-tippy-placement="bottom"
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

          <div class="mr-2 flex w-full text-lg">
            <button
              @click="is_registering_serivce_request = true"
              class="bg-[#309107] hover:bg-[#0c2501] text-white px-6 h-11 flex justify-center items-center rounded-lg text-sm"
              data-tippy-content="Register New Service Request"
              data-tippy-placement="bottom"
            >
              <font-awesome-icon
                :icon="['far', 'plus']"
                style="color: #c20f0f"
              />
              <span class="text-white"> Register </span>
            </button>
          </div>
        </div>
      </div>
    </div>

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
          <img src="../assets/search.png" alt="" />
          <div
            class="flex text-center justify-center items-center font-bold text-2xl"
          >
            No Search Result Found
          </div>
        </div>
      </div>
    </div>
    <div v-else class="mr-2">
      <div>
        <span class="text-sm text-gray-700 dark:text-gray-400">
          Showing
          <span class="font-semibold text-gray-900 dark:text-white">
            {{ offset }}
          </span>
          to
          <span class="font-semibold text-gray-900 dark:text-white">{{
            offset + page_size > service_request_aggregate
              ? technician_aggregate
              : offset + page_size
          }}</span>
          of
          <span class="font-semibold text-gray-900 dark:text-white">{{
            service_request_aggregate
          }}</span>
          Service Requests in Total
        </span>
      </div>
      <div
        class="bg-white shadow-xl sm:rounded-lg scrollbar-thin scrollbar-thumb-gray-900 scrollbar-track-gray-100 overflow-x-scroll"
      >
        <table class="w-full divide-gray-200">
          <thead class="bg-gray-50">
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
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr
              v-for="(service_request, i) in result.service_request"
              :key="service_request.id"
              class="hover:bg-gray-100"
            >
              <!-- <td class="px-6 py-4 whitespace-nowrap">{{ i + 1 }}</td> -->
              <td class="px-6 py-4 whitespace-nowrap capitalize">
                {{
                  customers[service_request.id]?.first_name +
                  " " +
                  customers[service_request.id]?.last_name
                }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                {{ service_request.customer_phone }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                {{
                  service_request.technician_id
                    ? service_request?.technician?.first_name +
                      " " +
                      service_request?.technician?.last_name
                    : "Not assigned yet"
                }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                {{ products[service_request.id]?.product?.brand }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                {{ service_request?.created_at.split("T")[0] }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap capitalize">
                <span
                  :class="
                    service_request.status === 'progress'
                      ? 'bg-yellow-200 text-yellow-800 rounded-full px-2 py-1'
                      : service_request.status === 'opened'
                      ? 'bg-blue-200 text-blue-900 rounded-full px-2 py-1'
                      : service_request.status === 'completed'
                      ? 'bg-green-200 text-green-800 rounded-full px-2 py-1'
                      : 'bg-gray-200 text-gray-800 rounded-full px-2 py-1'
                  "
                >
                  {{ service_request.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex space-x-1">
                  <button
                    @click="view_service_request(service_request.id)"
                    class="hover:bg-gray-400 bg-none rounded-lg p-2 hover:shadow-lg"
                    data-tippy-content="View Detail of this Service Request"
                    data-tippy-placement="bottom"
                  >
                    <font-awesome-icon
                      :icon="['fass', 'eye']"
                      style="color: #309107"
                      size="lg"
                    />
                  </button>
                  <button
                    class="hover:bg-gray-400 bg-none rounded-lg p-2 hover:shadow-lg"
                    @click="update_service_request_by_id(service_request.id)"
                    data-tippy-content="Edit Service Request"
                    data-tippy-placement="bottom"
                  >
                    <font-awesome-icon
                      icon="fa-solid fa-pen"
                      size="lg"
                      style="color: #005eff"
                    />
                  </button>

                  <button
                    class="hover:bg-gray-400 bg-none rounded-lg p-2 hover:shadow-lg"
                    @click="
                      is_delete_modal_open = true;
                      deleteFunction = async () => {
                        try {
                          let result =
                            await services_store.delete_service_request_by_id(
                              service_request.id
                            );
                          if (typeof result == 'string') {
                            notify({
                              title: 'Service Request Deleted Successfully',
                              type: 'success',
                            });
                            is_delete_modal_open = false;
                            refetchData();
                          } else {
                            notify({
                              title: 'Service Request Deletion Failed',
                              type: 'error',
                            });
                            is_delete_modal_open = false;
                            refetchData();
                          }
                        } catch (error) {
                          notify({
                            title: 'Service Request Deletion Failed',
                            type: 'error',
                          });
                          is_delete_modal_open = false;
                          refetchData();
                        }
                      };
                    "
                    data-tippy-content="Delete This Service Request "
                    data-tippy-placement="bottom"
                  >
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
          <div>
            <span class="text-sm text-gray-700 dark:text-gray-400">
              Showing
              <span class="font-semibold text-gray-900 dark:text-white">{{
                offset
              }}</span>
              to
              <span class="font-semibold text-gray-900 dark:text-white">{{
                offset + page_size > service_request_aggregate
                  ? technician_aggregate
                  : offset + page_size
              }}</span>
              of
              <span class="font-semibold text-gray-900 dark:text-white">{{
                service_request_aggregate
              }}</span>
              Service Requests in total
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

    <Delete
      v-if="is_delete_modal_open"
      v-on:delete="deleteFunction()"
      v-on:cancel="is_delete_modal_open = false"
    >
    </Delete>
    <register_service_request
      v-if="is_registering_serivce_request"
      @failed="failer_notifier"
      @success="success_notifier"
      v-on:cancel="is_registering_serivce_request = false"
    ></register_service_request>
    <update_service_request
      v-if="is_updating_service_request"
      :id="service_request_id"
      @failed="failer_notifier"
      @success="success_notifier"
      v-on:cancel="is_updating_service_request = false"
    ></update_service_request>
  </div>
</template>

<script setup>
import { ref, reactive, watchEffect, onMounted, watch, computed } from "vue";
import { useQuery } from "@vue/apollo-composable";
import { QUERY_ALL_SERVICE_REQUEST } from "../constants/queries";
import router from "../router/router";
import { addressStore } from "../stores/address";
import register_service_request from "./register_service_request.vue";
import Delete from "../components/modal/Delete.vue";
import update_service_request from "../components/modal/update_service_request.vue";
import { serviceRequestStore } from "../stores/service_request_store";
import * as XLSX from "xlsx";
import { notify } from "@kyvg/vue3-notification";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";
import gql from "graphql-tag";
import apolloclient from "../apollo.config";
const services_store = serviceRequestStore();
const selected_region = reactive([]);
const selected_zone = reactive([]);
const selected_woreda = reactive([]);
const is_registering_serivce_request = ref(false);
const is_updating_service_request = ref(false);
const service_request_id = ref(null);
const offset = ref(0);
const service_request_aggregate = ref(0);
const page_size = ref(11);
const id_param = ref(0);
const statuses = ref("");
const address = addressStore();
const regions = ref([]);
const zones = ref([]);
const woredas = ref([]);
const search = ref("");
const is_warranty = ref("");
const is_delete_modal_open = ref(false);
let deleteFunction = null;
const customers = ref({});
const products = ref({});
const filter = reactive({
  _and: [
    {
      address: {
        _and: [
          regions.value.length > 0
            ? { region_id: { _in: [] } }
            : { region_id: {} },
          zones.value.length > 0 ? { zone_id: { _in: [] } } : { zone_id: {} },
          woredas.value.length > 0
            ? { woreda_id: { _in: [] } }
            : { woreda_id: {} },
        ],
      },
    },
    {
      _or: [
        {
          customer_phone: { _ilike: search.value ? `%${search.value}%` : "%%" },
        },
        {
          selling_phone: { _ilike: search.value ? `%${search.value}%` : "%%" },
        },
        {
          technician: {
            phone_number: { _ilike: search.value ? `%${search.value}%` : "%%" },
          },
        },
      ],
    },
    {
      status: statuses.value ? { _eq: statuses.value } : {},
    },
    {
      is_in_warranty_request: is_warranty.value
        ? { _eq: is_warranty.value }
        : {},
    },
  ],
});

const region = reactive({
  is_region: false,
  sample_region_to_display: {},
  select_region: (reg) => {
    if (selected_region.includes(reg)) {
      region.sample_region_to_display =
        selected_region[selected_region.indexOf(reg)];
      region.is_region = false;
    } else {
      selected_region.push(reg);
      region.sample_region_to_display = reg;
      region.is_region = false;
    }
  },
  remove_region: (reg) => {
    console.log("am fromhere");
    selected_region.splice(selected_region.indexOf(reg), 1);
    region.sample_region_to_display =
      selected_region[selected_region.length - 1];
  },
  toggle_region: () => {
    region.is_region = !region.is_region;
  },
});

const zone = reactive({
  is_zone: false,
  sample_zone_to_display: {},
  select_zone: (zo) => {
    if (selected_zone.includes(zo)) {
      zone.sample_zone_to_display = selected_zone[selected_zone.indexOf(zo)];
      zone.is_zone = false;
    } else {
      selected_zone.push(zo);
      zone.sample_zone_to_display = zo;
      zone.is_zone = false;
    }
  },
  remove_zone: (zo) => {
    selected_zone.splice(selected_zone.indexOf(zo), 1);
    zone.sample_zone_to_display = selected_zone[selected_zone.length - 1];
  },
  toggle_zone: () => {
    zone.is_zone = !zone.is_zone;
  },
});

const woreda = reactive({
  is_woreda: false,
  sample_woreda_to_display: {},
  select_woreda: (reg) => {
    if (selected_woreda.includes(reg)) {
      woreda.sample_woreda_to_display =
        selected_woreda[selected_woreda.indexOf(reg)];
      woreda.is_woreda = false;
    } else {
      selected_woreda.push(reg);
      woreda.sample_woreda_to_display = reg;
      woreda.is_woreda = false;
    }
  },
  remove_woreda: (reg) => {
    console.log("am fromhere");
    selected_woreda.splice(selected_woreda.indexOf(reg), 1);
    woreda.sample_woreda_to_display =
      selected_woreda[selected_woreda.length - 1];
  },
  toggle_woreda: () => {
    woreda.is_woreda = !woreda.is_woreda;
  },
});

const { error, result, loading, refetch } = useQuery(
  QUERY_ALL_SERVICE_REQUEST,
  {
    offset: offset.value,
    limit: page_size.value,
    filter: filter,
  }
);

const service_requests = computed(() => result.value?.service_request ?? []);
onMounted(() => {
  tippy("[data-tippy-content]");
});
const number_of_pages = computed(() =>
  Math.ceil(service_request_aggregate.value / page_size.value)
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

watchEffect(() => {
  service_request_aggregate.value =
    result.value?.service_request_aggregate?.aggregate?.count ?? 0;
});
onMounted(async () => {
  regions.value = await address.get_regions();
});

watchEffect(() => {
  if (region.sample_region_to_display && region.sample_region_to_display.id) {
    address.get_zones(region.sample_region_to_display.id);
    zones.value = address.zones;
  }
});
watchEffect(() => {
  if (zone.sample_zone_to_display && zone.sample_zone_to_display.id) {
    address.get_woredas(zone.sample_zone_to_display.id);
    woredas.value = address.woredas;
  }
});
watch(is_warranty, (val) => {
  if (val) {
    filter._and[3].is_in_warranty_request._eq = val;
  } else {
    filter._and[3].is_in_warranty_request = {};
  }
  searchQuery();
});
watch(selected_region, (val) => {
  if (val.length > 0) {
    let region_ids = [];
    val.forEach((region) => {
      region_ids.push(region.id);
    });
    filter._and[0].address._and[0].region_id._in = [...region_ids];
  } else {
    filter._and[0].address._and[0].region_id = {};
  }
  searchQuery();
});
watch(
  selected_zone,
  (val) => {
    if (val.length > 0) {
      let zone_ids = [];
      val.forEach((zone) => {
        zone_ids.push(zone.id);
      });
      filter._and[0].address._and[1].zone_id._in = [...zone_ids];
    } else {
      filter._and[0].address._and[1].zone_id = {};
    }
    searchQuery();
  },
  { deep: true }
);
watch(selected_woreda, (val) => {
  if (val.length > 0) {
    let woreda_ids = [];
    val.forEach((woreda) => {
      woreda_ids.push(woreda.id);
    });
    filter._and[0].address._and[2].woreda_id._in = [...woreda_ids];
  } else {
    filter._and[0].address._and[2].woreda_id = {};
  }
  searchQuery();
});
watch(search, (val) => {
  if (val) {
    filter._and[1]._or[0].customer_phone._ilike = `%${val}%`;
    filter._and[1]._or[1].selling_phone._ilike = `%${val}%`;
  }
  searchQuery();
});

watch(statuses, (val) => {
  if (val) {
    filter._and[2].status._eq = val;
  } else {
    filter._and[2].status = {};
  }
  searchQuery();
});
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
const next_page = () => {
  if (next_page_offset.value > (number_of_pages.value - 1) * page_size.value)
    return;
  if (current_page_number.value == number_of_pages.value) return;
  console.log(next_page_offset.value);
  offset.value = next_page_offset.value;
  refetchData();
};

const failer_notifier = (data) => {
  is_delete_modal_open.value = false;
  is_updating_service_request.value = false;
  is_registering_serivce_request.value = false;
  notify({
    title: data,
    type: "error",
  });
};
const success_notifier = (data) => {
  notify({
    title: data,
    type: "success",
  });
  is_delete_modal_open.value = false;
  is_updating_service_request.value = false;
  is_registering_serivce_request.value = false;
  refetchData();
};
const update_service_request_by_id = async (id) => {
  is_updating_service_request.value = true;
  service_request_id.value = id;
};
const searchQuery = () => {
  if (search.value) {
    filter._and[1]._or[0].customer_phone._ilike = `%${search.value}%`;
    filter._and[1]._or[1].selling_phone._ilike = `%${search.value}%`;
    filter._and[1]._or[2].technician.phone_number._ilike = `%${search.value}%`;
  } else {
    filter._and[1]._or[0].customer_phone._ilike = "%%";
    filter._and[1]._or[1].selling_phone._ilike = "%%";
  }
  refetchData();
};

const view_service_request = (id) => {
  id_param.value = id;
  router.push({
    name: "service_request_detail",
    params: { id: id_param.value },
  });
};
const exportToExcel = () => {
  const workbook = XLSX.utils.book_new();
  const data = [
    [
      "Customer First Name",     
      "Customer Last Name",   
      "Customer Phone Number",     
      "Tech First Name",
      "Tech Last Name",        
      "Tech Phone Number",    
      "Product name",  
      "Request Type" ,
      "Status" ,
      "Region",
      "Zone",
      "Woreda",
      "Kebele", 
      "Registered At"
    ],
    ...service_requests.value.map((service_request) => [
      customers.value[service_request.id]?.first_name,   
      customers.value[service_request.id]?.last_name, 
      service_request.selling_phone,
      service_request?.technician?.first_name
        ? service_request?.technician?.first_name
        : "Not Assigned Yet", 
      service_request.technician?.last_name
        ? service_request.technician?.last_name
        : "Not Assigned Yet", 
      service_request.technician?.phone_number 
        ? service_request.technician?.phone_number
        : "Not Assigned Yet",  
      products.value[service_request.id]?.product?.brand,
      service_request.is_in_warranty_request ? "In Warranty" : "Out of Warranty",
      service_request.status,
      service_request.address?.region?.name,
      service_request.address?.zone?.name,
      service_request.address?.woreda?.name,
      service_request.address?.kebele?.name,   
      service_request.created_at.split("T")[0],
    ]),
  ];
  const sheet = XLSX.utils.aoa_to_sheet(data);
  XLSX.utils.book_append_sheet(workbook, sheet, "Data");
  XLSX.writeFile(workbook, "totalservices.xlsx");
  
};
</script>

<style>
.sticky {
  position: sticky;
  top: 64px;
  z-index: 999;
}
</style>
