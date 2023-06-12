<template>
  <div class="mx-3">
    <div class="py-1">
      <h1 class="font-bold text-2xl text-gray-700">Technicians</h1>
    </div>
    <div class="sticky z-50 top-16">
      <div>
        <div class="flex space-x-2">
          <div
            v-for="reg in selected_region"
            :key="reg.id"
            class="flex border border-gray-300 rounded-lg overflow-hidden bg-white"
          >
            <div class="flex items-center px-3 py-1">{{ reg.name }}</div>
            <button
              @click="region.remove_region(reg)"
              class="text-gray-400 hover:text-gray-500 focus:outline-none flex items-center px-3 py-1 bg-gray-100"
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
            <div class="flex items-center px-3 py-1">{{ zo.name }}</div>
            <button
              @click="zone.remove_zone(zo)"
              class="text-gray-400 hover:text-gray-500 focus:outline-none flex items-center px-3 py-1 bg-gray-100"
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
            <div class="flex items-center px-3 py-1">{{ wo.name }}</div>
            <button
              @click="woreda.remove_woreda(wo)"
              class="text-gray-400 hover:text-gray-500 focus:outline-none flex items-center px-3 py-1 bg-gray-100"
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
      <div class="md:flex justify-between items-center space-x-1">
        <div
          class="flex flex-wrap space-x-1 space-y-3 z-0 mb-2 items-center justify-center"
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
                class="bg-gray-50 border text-sm  cursor-text z-10 w-full border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block pl-8 p-1 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
          <div class="relative pb-2">
            <button
              class="flex items-center justify-between w-full py-1 px-2 text-sm font-medium text-left text-neutral-600 bg-white border border-transparent rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-500 ease-in-out"
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
                  class="px-4 py-1 cursor-pointer hover:bg-blue-50"
                >
                  {{ reg.name }}
                </div>
              </div>
            </transition>
          </div>
          <div class="relative">
            <button
              class="flex items-center justify-between w-full py-1 px-2 text-sm font-medium text-left text-neutral-600 bg-white border border-transparent rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-500 ease-in-out"
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
                  class="px-4 py-1 cursor-pointer hover:bg-blue-50"
                >
                  {{ zo.name }}
                </div>
              </div>
            </transition>
          </div>

          <div class="relative">
            <button
              class="flex items-center justify-between w-full py-1 px-2 text-sm font-medium text-left text-neutral-600 bg-white border border-transparent rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-500 ease-in-out"
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
                  class="px-4 py-1 cursor-pointer hover:bg-blue-50"
                >
                  {{ wo.name }}
                </div>
              </div>
            </transition>
          </div>
          <div class="flex items-center">
            <select
              v-model="availability"
              @change="searchQuery"
              class="flex  items-center cursor-pointer justify-center w-full sm:px-3 px-3 py-2 text-sm font-medium text-black border-gray-800 border bg-[#E2E8F0] focus:outline-none rounded-lg transition duration-150 ease-in-out"
            >
              <option value="">Availability</option>
              <option value="true">Available</option>
              <option value="false">Not Available</option>
            </select>
          </div>
          <div class="flex items-center">
            <select
              v-model="is_verified"
              @change="searchQuery"
              class="flex  items-center cursor-pointer justify-center w-full sm:px-3 px-2 py-2 text-sm font-medium text-black border-gray-800 border bg-[#E2E8F0] focus:outline-none rounded-lg transition duration-150 ease-in-out"
            >
              <option value="">Status</option>
              <option value="true">Verified</option>
              <option value="false">Not Verified</option>
            </select>
          </div>
        </div>
        <div class="sm:flex block justify-center items-center space-x-2">
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

          <div class="mr-2 flex w-full py-1 text-lg">
            <button
              @click="is_register_technician_modal_open = true"
              class="bg-[#309107] hover:bg-[#0c2501] text-white px-4 py-2 flex justify-center items-center rounded-lg text-sm"
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
    <div v-else-if="technicians.length == 0">
      <div>
        <span class="text-sm text-gray-700 dark:text-gray-400">
          Showing
          <span class="font-semibold text-gray-900 dark:text-white">{{
            offset
          }}</span>
          to
          <span class="font-semibold text-gray-900 dark:text-white">{{
            offset + page_size > technician_aggregate
              ? technician_aggregate
              : offset + page_size
          }}</span>
          of
          <span class="font-semibold text-gray-900 dark:text-white">{{
            technician_aggregate
          }}</span>
          Technicians
        </span>
      </div>
      <div class="flex justify-center items-center">
        <div class="">
          <img src="../assets/search.png" alt="" />
          <div
            class="flex text-center text-gray-700 justify-center items-center font-bold text-2xl"
          >
            No Search Result Found
          </div>
        </div>
      </div>
    </div>
    <div v-else class="">
      <div>
        <span class="text-sm text-gray-700 dark:text-gray-400">
          Showing
          <span class="font-semibold text-gray-900 dark:text-white">{{
            offset + 1
          }}</span>
          to
          <span class="font-semibold text-gray-900 dark:text-white">{{
            offset + page_size > technician_aggregate
              ? technician_aggregate
              : offset + page_size
          }}</span>
          of
          <span class="font-semibold text-gray-900 dark:text-white">{{
            technician_aggregate
          }}</span>
          Technicians
        </span>
      </div>
      <div classs="bg-white overflow-hidden shadow-md sm:rounded-lg">
        <table class="w-full divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <!-- <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Index
              </th> -->
              <!-- <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Avator
              </th> -->
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Full Name
              </th>
              <!-- <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Last Name
              </th> -->
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Phone
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                NTasks
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Availablity
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                status
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Registered at
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                action
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr
              v-for="(technician, i) in technicians"
              :key="technician.id"
              class="hover:bg-gray-100"
            >
              <!-- <td class="px-6 py-3 whitespace-nowrap">
             
              </td> -->
              <td
                class="px-6 py-3 whitespace-nowrap flex space-x-3 items-center"
              >
                <img
                  v-if="technician.avator"
                  :src="technician.avator"
                  :alt="technician.first_name"
                  class="w-12 h-12 rounded-full"
                />
                <img
                  v-else
                  src="../assets/man.png"
                  :alt="technician.first_name"
                  class="w-10 bg-slate-200 h-10 rounded-full"
                />
                <span>
                  {{ technician.first_name + " " + technician.last_name }}
                </span>
              </td>
              <!-- <td class="px-6 py-3 whitespace-nowrap">
                {{ technician.last_name }}
              </td> -->
              <td class="px-6 py-3 whitespace-nowrap">
                {{ technician.phone_number }}
              </td>
              <td class="px-6 py-3 whitespace-nowrap">
                {{ technician.service_requests_aggregate.aggregate.count }}
              </td>
              <td class="px-6 py-3 whitespace-nowrap">
              <div v-if="technician.availability">
                <font-awesome-icon :icon="['fas', 'circle']" size="xs" style="color: #078332;" /> <span>Available</span>
              </div>
              <div v-else>
                <font-awesome-icon :icon="['fas', 'circle']" size="xs" style="color: #ff0000;" /> <span>Not Available</span>
              </div>
              </td>
              <td class="px-6 py-3 whitespace-nowrap">
                <div v-if="technician.is_verified">
                  <font-awesome-icon
                    :icon="['fas', 'circle-check']"
                    size="xl"
                    style="color: #14ab12"
                  />
                  
                </div>
                <div v-else>
                  <font-awesome-icon :icon="['fas', 'person-circle-xmark']" style="color: #ff0000;" size="xl" />
                </div>
              </td>

              <td class="px-6 py-3 whitespace-nowrap">
                {{ technician.created_at.split("T")[0] }}
              </td>

              <td class="px-6 py-3 whitespace-nowrap">
                <div class="flex space-x-1">
                  <router-link
                    :to="{
                      name: 'technician_detail',
                      params: { id: technician.id },
                      props: {
                        name:
                          technician.first_name + ' ' + technician.last_name,
                      },
                    }"
                    class="hover:bg-gray-400 bg-none rounded-lg p-1 hover:shadow-lg"
                    data-tippy-content="See detail of this Technician  "
                    data-tippy-placement="bottom"
                  >
                    <!-- @click="view_technician_detail(technician.id,technician.first_name + ' ' + technician.last_name)" -->
                    <font-awesome-icon
                      :icon="['fass', 'eye']"
                      style="color: #2a511f"
                      size="lg"
                    />
                  </router-link>
                  <button
                    @click="edit_technician(technician.id)"
                    class="hover:bg-gray-400 bg-none rounded-lg p-1 hover:shadow-lg"
                    data-tippy-content="Edit This Technician  "
                    data-tippy-placement="bottom"
                  >
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
                          if (
                            typeof (await technician_store.delete_technician(
                              technician.id
                            )) === 'string'
                          ) {
                            notify({
                              title: 'Technician Deleted Successfully',
                              type: 'success',
                            });
                            is_delete_modal_open = false;
                            refetchData();
                          } else {
                            notify({
                              title: 'Technician Not Deleted Successfully',
                              type: 'error',
                            });
                            is_delete_modal_open = false;
                          }
                        } catch (error) {
                          notify({
                            title: 'Technician Not Deleted Successfully',
                            type: 'error',
                          });
                          is_delete_modal_open = false;
                        }
                      };
                    "
                    class="hover:bg-gray-400 bg-none rounded-lg p-1 hover:shadow-lg"
                    data-tippy-content="Delete This Technician  "
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
          <span class="text-sm text-gray-700 dark:text-gray-400">
            Showing
            <span class="font-semibold text-gray-900 dark:text-white">{{
              offset + 1
            }}</span>
            to
            <span class="font-semibold text-gray-900 dark:text-white">{{
              offset + page_size > technician_aggregate
                ? technician_aggregate
                : offset + page_size
            }}</span>
            of
            <span class="font-semibold text-gray-900 dark:text-white">{{
              technician_aggregate
            }}</span>
            Technicians
          </span>
          <div class="inline-flex mt-2 xs:mt-0">
            <!-- Buttons -->
            <button
              @click="prev_page"
              :class="
                offset == 0 ? 'bg-slate-600' : 'bg-gray-800 hover:bg-gray-900'
              "
              class="inline-flex items-center px-4 py-1 text-sm font-medium text-white rounded-l dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
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
              class="inline-flex items-center px-4 py-1 text-sm font-medium text-white bg-gray-800 border-0 border-l rounded-r dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Next
              <font-awesome-icon class="px-2" :icon="['fas', 'arrow-right']" />
            </button>
          </div>
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
  <!-- <Notify v-if="isNotify" :notify="notify" v-on:success="clear_notify()">
  </Notify>

  <Failed v-if="isFailed" :notify="fail" v-on:success="clear_notify()">
  </Failed> -->
  <register_technician
    @failed="failer_notifier"
    @success="success_notifier"
    v-on:clear="()=>{
      is_register_technician_modal_open = false;
      refetch()
      technician_store.clear_state()
    }"
    v-on:cancel="()=>{
      is_register_technician_modal_open = false;
    }"
    v-if="is_register_technician_modal_open"
  >
  </register_technician>

  <update_technician
    v-if="is_updating_technician"
    :technician_id="technician_id"
    @failed="failer_notifier"
    @success="success_notifier"
    v-on:cancel="is_updating_technician = false"
  >
  </update_technician>
</template>

<script setup>
import { useQuery } from "@vue/apollo-composable";
import { ref, reactive, computed, onMounted, watchEffect, watch } from "vue";
import { QUERY_ALL_TECHNICIAN } from "../constants/queries";
import router from "../router/router";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";
import Delete from "../components/modal/Delete.vue";
import { addressStore } from "../stores/address";
import register_technician from "./register_technician.vue";
import { technicianStore } from "../stores/technician";
import * as XLSX from "xlsx";
import { notify } from "@kyvg/vue3-notification";
import update_technician from "../components/modal/update_technician.vue";
const technician_store = technicianStore();

onMounted(() => {
  tippy("[data-tippy-content]");
});
const selected_region = reactive([]);
const selected_zone = reactive([]);
const selected_woreda = reactive([]);
const zone_id = ref("");
const region_id = ref("");
const woreda_id = ref("");
const availability = ref("");
const is_verified = ref("");
const address = addressStore();
const regions = ref([]);
const zones = ref([]);
const woredas = ref([]);
const search = ref("");
const is_updating_technician = ref(false);
const technician_id = ref("");
const is_register_technician_modal_open = ref(false);
let deleteFunction = null;
const filter = reactive({
  _and: [
    {
      address: {
        _and: [
          region_id.value
            ? { region_id: { _in: [region_id.value] } }
            : { region_id: {} },
          zone_id.value
            ? { zone_id: { _in: [zone_id.value] } }
            : { zone_id: {} },
          woreda_id.value
            ? { woreda_id: { _in: [woreda_id.value] } }
            : { woreda_id: {} },
        ],
      },
    },
    {
      _or: [
        { first_name: { _ilike: search.value ? `%${search.value}%` : "%%" } },
        { last_name: { _ilike: search.value ? `%${search.value}%` : "%%" } },
        { phone_number: { _ilike: search.value ? `%${search.value}%` : "%%" } },
      ],
    },

    { availability: availability.value ? { _eq: availability.value } : {} },
    { is_verified: is_verified.value ? { _eq: is_verified.value } : {} },
  ],
});
const order_by = ref("");
const offset = ref(0);
const limit = ref(12);
const technician_aggregate = ref(0);
const page_size = ref(13);
const number_of_pages = computed(() =>
  Math.ceil(technician_aggregate.value / page_size.value)
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

const { error, result, loading, refetch } = useQuery(QUERY_ALL_TECHNICIAN, {
  offset: offset.value,
  limit: page_size.value,
  filter: filter,
});

watchEffect(() => {
  technician_aggregate.value =
    result.value?.technician_aggregate?.aggregate?.count ?? 0;
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
onMounted(async () => {
  regions.value = await address.get_regions();
});
watchEffect(() => {
  address.get_zones(region_id.value);
  zones.value = address.zones;
});
watch(is_verified, (val) => {
  if (val) {
    filter._and[0].is_verified = { _eq: val };
  } else {
    filter._and[0].is_verified = {};
  }
  searchQuery();
});

watch(availability, (val) => {
  if (val) {
    filter._and[0].availability = { _eq: val };
  } else {
    filter._and[0].availability = {};
  }
  searchQuery();
});
watchEffect(() => {
  address.get_woredas(zone_id.value);
  woredas.value = address.woredas;
});
watch(region_id, (val) => {
  console.log("region_id", val);
  if (val) {
    filter._and[0].address._and[0].region_id._in = [val];
  } else {
    filter._and[0].address._and[0].region_id = {};
  }
  searchQuery();
});
watch(zone_id, (val) => {
  if (val) {
    filter._and[0].address._and[1].zone_id._in = [val];
  } else {
    filter._and[0].address._and[1].zone_id = {};
  }

  searchQuery();
});
watch(woreda_id, (val) => {
  if (val) {
    filter._and[0].address._and[2].woreda_id._in = [val];
  } else {
    filter._and[0].address._and[2].woreda_id = {};
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

const technicians = computed(() => result.value?.technician ?? []);
const failer_notifier = (data) => {
  notify({
    title: data,
    type: "error",
  });
  is_delete_modal_open.value = false;
  is_register_technician_modal_open.value = false;
  is_updating_technician.value = false;
};
const success_notifier = (data) => {
  notify({
    title: data,
    type: "success",
  });
  is_register_technician_modal_open.value = false;
  is_updating_technician.value = false;
  refetchData();
};
const searchQuery = () => {
  if (search.value) {
    filter._and[1]._or[0].first_name._ilike = `%${search.value}%`;
    filter._and[1]._or[1].last_name._ilike = `%${search.value}%`;
    filter._and[1]._or[2].phone_number._ilike = `%${search.value}%`;
  } else {
    filter._and[1]._or[0].first_name._ilike = "%%";
    filter._and[1]._or[1].last_name._ilike = "%%";
    filter._and[1]._or[2].phone_number._ilike = "%%";
  }
  if (is_verified.value) {
    filter._and[0].is_verified = { _eq: is_verified.value };
  } else {
    filter._and[0].is_verified = {};
  }
  if (availability.value) {
    filter._and[0].availability = { _eq: availability.value };
  } else {
    filter._and[0].availability = {};
  }

  offset.value = 0;
  refetchData();
};
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

watchEffect(() => {
  filter._and[1]._or[0].first_name._ilike = `%${search.value}%`;
  filter._and[1]._or[1].last_name._ilike = `%${search.value}%`;
  filter._and[1]._or[2].phone_number._ilike = `%${search.value}%`;
});

// watch(selected_region, (val) => {
//   if (val.length > 0) {
//     let region_ids = [];
//     val.forEach((region) => {
//       region_ids.push(region.id);
//     });
//     filter._and[0].address._and[0].region_id._in = [...region_ids];
//   } else {
//     filter._and[0].address._and[0].region_id = {};
//   }
//   searchQuery();
// });
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
const is_delete_modal_open = ref(false);


const edit_technician = (id) => {
  is_updating_technician.value = true;
  technician_id.value = id;
};

const modal = ref(false);

const date_formatter = (new_date) => {
  const date = new Date(new_date);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate() + 10).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
};

const exportToExcel = () => {
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
    ...technicians.value.map((technician) => [
      technician.first_name + " " + technician.last_name,
      technician.phone_number,
      technician.address.region?.name,
      technician.address.zone?.name,
      technician.address.woreda?.name,
      technician.address.kebele?.name,
      technician.service_requests_aggregate.aggregate.count,
      technician.is_verified ? "Verified" : "Not Verified",
      date_formatter(technician.created_at),
    ]),
  ];
  const sheet = XLSX.utils.aoa_to_sheet(data);
  XLSX.utils.book_append_sheet(workbook, sheet, "Data");
  XLSX.writeFile(workbook, "my_data.xlsx");
};

const get_avator = "../assets/choice.png";
// (avator)=>{
// if(avator){
//   return avator
//   }else{
// return '../assets/choice.png'
// }
// }
</script>

<style>
.sticky {
  position: sticky;
  top: 64px;
  z-index: 999;
}
</style>
