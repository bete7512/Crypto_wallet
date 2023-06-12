<template>
    <div v-if="error">{{ error }}</div>
    <div v-else-if="loading">loading API</div>
    <div class="space-y-1 mx-4" v-else>
      <div class="sm:flex block w-full space-y-4 justify-between items-center">
        <Technician data=""></Technician>
        <Technician></Technician>
        <Technician></Technician>
        <Technician></Technician>
      </div>
      <div>
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
  
      <div class="md:flex justify-between items-center mb-4 mr-2 space-x-3">
        <div
          class="md:flex space-x-3 space-y-3 z-0 ml-3 items-center justify-center"
        >
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
                class="bg-gray-50 border h-12 text-lg cursor-text z-10 w-full border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block pl-10 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search"
                v-model="search"
                required
              />
            </div>
            <button
              type="button"
              @click="searchQuery"
              class="px-10 h-12 ml-2 cursor-pointer text-sm font-medium z-0 text-white bg-[#EF4104] hover:bg-[#621c02] rounded-lg focus:outline-none focus:ring-[#862603cc]"
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
                    : "Filter By Region"
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
                    : "Filter By Zone"
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
                    : "Filter By Woreda"
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
          <div class="flex items-center z-10">
            <select
              name=""
              id=""
              v-model="statuses"
              @change="searchQuery"
              class="flex h-12 items-center cursor-pointer justify-center w-full sm:px-4 px-3 sm:py-3 py-2 text-sm font-medium text-black border-gray-800 border bg-[#E2E8F0] focus:outline-none rounded-lg transition duration-150 ease-in-out"
            >
              <option value="">Filter by Status</option>
              <option value="opened">Opened</option>
              <option value="progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div class="flex items-center z-10">
            <select
              name=""
              id=""
              v-model="is_warranty"
              @change="searchQuery"
              class="flex h-12 items-center cursor-pointer justify-center w-full sm:px-4 px-3 sm:py-3 py-2 text-sm font-medium text-black border-gray-800 border bg-[#E2E8F0] focus:outline-none rounded-lg transition duration-150 ease-in-out"
            >
              <option value="">Filter by Status</option>
              <option value="true">With Warranty</option>
              <option value="false">Without Warranty</option>
            </select>
          </div>
        </div>
        <div class="sm:flex block justify-center items-center space-x-2">
          <div class="mr-2 py-3 text-lg">
            <button
              @click="is_registering_serivce_request = true"
              class="bg-[#EF4104] hover:bg-[#a02f05] text-white px-8 py-4 h-12 flex justify-center items-center rounded-lg text-sm"
              data-tippy-content="Register New Service Request"
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
              <span class="text-white"> Export to pdf </span>
            </button>
          </div>
  
          <div class="mr-2 py-3 text-lg">
            <button
              @click="is_registering_serivce_request = true"
              class="bg-[#EF4104] hover:bg-[#a02f05] text-white px-8 py-4 h-12 flex justify-center items-center rounded-lg text-sm"
              data-tippy-content="Register New Service Request"
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
              <span class="text-white"> Register </span>
            </button>
          </div>
        </div>
      </div>
      <!-- <div class="">
        {{ search_count > 0 ? search_count : result.service_request.length }}
      </div> -->
      <div class="overflow-x-scroll mr-2">
        <table
          class="w-full mx-2 pt-2 text-sm text-left text-gray-500 dark:text-gray-400"
        >
          <thead
            class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
          >
            <tr>
              <th class="py-3 px-2">Index</th>
              <th class="py-3 px-2">Customer Name</th>
              <th class="py-3 px-2">Customer Phone</th>
              <th class="py-3 px-2">Technician Name</th>
              <th class="py-3 px-2">Product Name</th>
              <th class="py-3 px-2">Request Date</th>
              <th class="py-3 px-2">Status</th>
              <th class="py-3 px-2">actions</th>
            </tr>
          </thead>
          <tbody class="px-2">
            <tr
              v-for="(service_request, i) in result.service_request"
              :key="service_request.id"
              class="bg-white border-b text-lg dark:bg-gray-900 dark:border-gray-700"
            >
              <!-- {{ customers[service_request.id].customer_phone + " " + customers[service_request.id].selling_phone }} -->
              <td class="py-3 px-3">{{ i + 1 }}</td>
              <td class="py-3 px-3">name</td>
              <td class="py-3 px-2">{{ service_request.customer_phone }}</td>
              <td class="py-3 px-2">
                {{
                  service_request.techncian_id
                    ? service_request.techncian_id
                    : "Not assigned yet"
                }}
              </td>
              <!-- {{ products[service_request.product_id].name }} -->
              <td class="py-3 px-2">pname</td>
              <td class="py-3 px-2">{{ dates[service_request.id] }}</td>
              <td class="py-3 px-2">{{ service_request.status }}</td>
              <td class="py-3 px-2">
                <div class="flex space-x-2">
                  <button @click="view_service_request(service_request.id)">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-eye"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"
                      />
                      <path
                        d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"
                      />
                    </svg>
                  </button>
                  <!-- @click="edit_product" -->
                  <button>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="green"
                      class="bi bi-pencil"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"
                      />
                    </svg>
                  </button>
  
                  <button @click="delete_service_request(service_request.id)">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="red"
                      class="bi bi-trash"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
                      />
                      <path
                        fill-rule="evenodd"
                        d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                      />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="flex justify-end mr-2 mt-1 pb-5">
        <div class="inline-flex space-x-1">
          <button
            @click="prev_page()"
            class="bg-[#EF4104] hover:bg-[#a02f05] text-white font-bold py-2 px-4 rounded-l"
          >
            Prev
          </button>
          <button
            class="bg-[#EF4104] hover:bg-[#a02f05] text-white font-bold py-2 px-4 rounded-l"
          >
            1
          </button>
          <button
            class="bg-[#EF4104] hover:bg-[#a02f05] text-white font-bold py-2 px-4 rounded-l"
          >
            2
          </button>
          <button
            @click="next_page()"
            class="bg-[#EF4104] hover:bg-[#a02f05] text-white font-bold py-2 px-4 rounded-r"
          >
            Next
          </button>
        </div>
      </div>
      <Delete
        v-if="is_delete_modal_open"
        @delete="deleter"
        v-on:cancel="is_delete_modal_open = false"
      >
      </Delete>
      <Notify
        v-if="isNotify"
        :notify="notify"
        v-on:success="clear_notify()"
      ></Notify>
      <register_service_request
        v-if="is_registering_serivce_request"
        v-on:done="refetcher()"
        v-on:cancel="is_registering_serivce_request = false"
      ></register_service_request>
    </div>
  </template>
  
  <script setup>
  import axios from "axios";
  import { useQuery, useMutation } from "@vue/apollo-composable";
  import { ref, reactive, computed, watchEffect, onMounted, watch } from "vue";
  import Technician from "../components/cards/Technician.vue";
  import register_service_request from "./register_service_request.vue";
  import Notify from "../components/modal/Notify.vue";
  
  import {
    QUERY_ALL_SERVICE_REQUEST,
    DELETE_SERVICE_REQUEST,
  } from "../constants/queries";
  import tippy from "tippy.js";
  import "tippy.js/dist/tippy.css";
  import Delete from "../components/modal/Delete.vue";
  import gql from "graphql-tag";
  import router from "../router/router";
  import { addressStore } from "../stores/address";
  onMounted(() => {
    tippy("[data-tippy-content]");
  });
  const SALES_API = "https://apiforensys.hasura.app/api/rest/users";
  /**
   * offset: 0
   * limit: 10
   */
  const search_count = ref(0);
  const selected_region = reactive([]);
  const region = reactive({
    is_region: false,
    sample_region_to_display: {},
    select_region: (reg) => {
      if (selected_region.includes(reg)) {
        // selected_region.splice(selected_region.indexOf(reg), 1);
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
  
  const selected_zone = reactive([]);
  const zone = reactive({
    is_zone: false,
    sample_zone_to_display: {},
    select_zone: (zo) => {
      if (selected_zone.includes(zo)) {
        // selected_zone.splice(selected_zone.indexOf(zo), 1);
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
  
  const selected_woreda = reactive([]);  
  const woreda = reactive({
    is_woreda: false,
    sample_woreda_to_display: {},
    select_woreda: (reg) => {
      if (selected_woreda.includes(reg)) {
        // selected_woreda.splice(selected_woreda.indexOf(reg), 1);
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
  watchEffect(() => {
    console.log(region.sample_region_to_display, region.is_sample_region);
  });
  const is_registering_serivce_request = ref(false);
  const order_by = ref("");
  const offset = ref(0);
  const limit = ref(10);
  const prev_page = () => {
    if (offset.value <= 0) return;
    offset.value -= limit.value;
    refetch({
      offset: offset.value,
      limit: limit.value,
    });
  };
  
  const { error, result, loading, refetch } = useQuery(
    QUERY_ALL_SERVICE_REQUEST,
    {
      offset: offset.value,
      limit: limit.value,
    }
  );
  console.log("loading:", loading.value);
  console.log("error:", error.value);
  console.log("result:", result.value);
  
  const next_page = () => {
    if (result && result.length < limit.value) return;
    offset.value += limit.value;
    refetch({
      offset: offset.value,
      limit: limit.value,
    });
  };
  const isNotify = ref(false);
  const notify = ref("");
  const refetcher = () => {
    is_registering_serivce_request.value = false;
    notify.value = "Service Request Added";
    isNotify.value = true;
    refetch({
      offset: offset.value,
      limit: limit.value,
    });
  };
  
  const clear_notify = () => {
    isNotify.value = false;
    notify.value = "";
  };
  const dates = ref({});
  watchEffect(() => {
    result.value?.service_request.forEach((service_request) => {
      console.log(service_request);
      const dateString = service_request.created_at;
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      const readableDate = `${year}-${month}-${day}`;
      dates.value[service_request.id] = readableDate;
    });
  });
  const is_delete_modal_open = ref(false);
  const delete_id = ref(null);
  const delete_service_request = async (id) => {
    delete_id.value = id;
    is_delete_modal_open.value = true;
  };
  const { mutate: delete_service_request_by_id } = useMutation(
    DELETE_SERVICE_REQUEST,
    () => ({
      variables: {
        id: delete_id.value,
      },
  
      update: (cache, { data }) => {
        const existingServiceRequests = cache.readQuery({
          query: QUERY_ALL_SERVICE_REQUEST,
        });
        const newServiceRequests = existingServiceRequests.service_request.filter(
          (service_request) => service_request.id !== delete_id.value
        );
        cache.writeQuery({
          query: QUERY_ALL_SERVICE_REQUEST,
          data: { service_request: newServiceRequests },
        });
      },
    })
  );
  
  const deleter = async () => {
    await delete_service_request_by_id();
    isNotify.value = true;
    notify.value = "Service Request Deleted Successfully";
    refetch();
    is_delete_modal_open.value = false;
  };
  const service_requests = computed(() => result.value?.service_request ?? []);
  
  const id_param = ref(0);
  const zone_id = ref("");
  const region_id = ref("");
  const woreda_id = ref("");
  const statuses = ref("");
  const address = addressStore();
  const regions = ref([]);
  const zones = ref([]);
  const woredas = ref([]);
  const search = ref("");
  const is_warranty = ref('');
  const filter = reactive({
    _and: [
      {
        address: {
          _and: [
          regions.value.length > 0
              ? { region_id: { _in: [] } }
              : { region_id: {} },
              zones.value.length > 0
              ? { zone_id: { _in: [] } }
              : { zone_id: {} },
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
        ],
      },
      {
        status: statuses.value ? { _eq: statuses.value } : {},
      },
      {
        is_in_warranty_request: is_warranty.value ? { _eq: is_warranty.value } : {}, 
      }
    ],
  });
  const searchQuery = () => {
    if (search.value) {
      filter._and[1]._or[0].customer_phone._ilike = `%${search.value}%`;
      filter._and[1]._or[1].selling_phone._ilike = `%${search.value}%`;
    } else {
      filter._and[1]._or[0].customer_phone._ilike = "%%";
      filter._and[1]._or[1].selling_phone._ilike = "%%";
    }
    refetch({
      offset: offset.value,
      limit: limit.value,
      filter: filter,
    });
  
    search_count.value = result.value?.service_request_aggregate.aggregate.count;
  };
  
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
  watch(is_warranty, (val) => {
    if (val) {
      filter._and[3].is_in_warranty_request._eq = val;
    } else {
      filter._and[3].is_in_warranty_request = {};
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
  
  watch(statuses, (val) => {
    if (val) {
      filter._and[2].status._eq = val;
    } else {
      filter._and[2].status = {};
    }
    searchQuery();
  });
  watchEffect(async () => {
    // let requests = result.value?.service_request;
    // requests.forEach(async (service_request) => {
    //   console.log(service_request);
    //   try {
    //     const customer = await axios.post(
    //       "https://apiforensys.hasura.app/api/rest/users",
    //       {
    //         phone: service_request.selling_phone,
    //       }
    //     );
    //     customers.value[service_request.id] = customer.data.customers[0];
    //     console.log(customer);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // });
  });
  watchEffect(async () => {
    // let requests = result.value?.service_request;
    // requests.forEach(async (service_request) => {
    //   console.log(service_request);
    //   try {
    //     const product = await axios.post(
    //       "https://apiforensys.hasura.app/api/rest/products",
    //       {
    //         id: service_request.product_id,
    //       }
    //     );
    //     products.value[service_request.id] = product.data.products[0];
    //     console.log(product);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // });
  });
  
  const view_service_request = (id) => {
    id_param.value = id;
    router.push({
      name: "service_request_detail",
      params: { id: id_param.value },
    });
  };
  
  
  </script>
  
  <style></style>
  