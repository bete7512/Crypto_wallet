<template>
  <div v-if="error">{{ error }}</div>
  <div v-else-if="loading">error</div>
  <div v-else-if="technician == null">No Technician Found With This ID</div>
  <div v-else>
    <div
      class="flex flex-col w-full p-4 scrollbar-w-1 scrollbar-thumb-gray-900 scrollbar-track-gray-100 overflow-y-scroll"
    >
      <div class="bg-white rounded-lg shadow-lg p-6 mb-6 space-y-2">
        <div class="flex space-x-2">
          <button
            @click="$router.go(-1)"
            class="bg-[#0080FE] hover:bg-[#0362c0] text-white mb-2 rounded-full p-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-white"
              fill="white"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </button>
        </div>

        <div
          class="lg:flex block justify-center w-full lg:space-x-2 lg:space-y-0 space-y-3 mb-4"
        >
          <div
            class="flex bg-white relative rounded-lg shadow-lg border py-6 border-gray-300 p-3 lg:w-[35%] w-full justify-center"
          >
            <div class="absolute top-5 right-0 flex">
              <button
                @click="is_updating_technician = true"
                class="flex items-center justify-center w-9 h-9 rounded-full hover:shadow-transparent hover:bg-slate-800"
              >
                <font-awesome-icon
                  :icon="['fas', 'pen-to-square']"
                  style="color: #13a300"
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
                class="flex items-center justify-center w-9 h-9 rounded-full hover:shadow-transparent hover:bg-slate-800"
              >
                <font-awesome-icon
                  :icon="['fas', 'trash']"
                  style="color: #c70505"
                />
              </button>
            </div>

            <div class="space-y-2 w-full px-4">
              <div class="w-full flex justify-center items-center">
                <img
                  src="../assets/man.png"
                  alt="technician.first_name"
                  class="w-32 -m-px h-32 rounded-full object-cover bg-slate-200"
                />
              </div>
              <div class="flex justify-between">
                <h1 class="font-bold text-2xl">
                  {{ technician.first_name + " " + technician.last_name }}
                </h1>
                <div class="flex space-x-2 justify-center items-center">
                  <h1 class="text-gray-700 font-bold">Status</h1>
                  <button
                    v-if="technician.is_verified"
                    @click="
                      async () => {
                        try {
                          let res = await technician_store.verify_technician(
                            technician.id,
                            false
                          );
                          if (typeof res == 'string') {
                            notify({
                              title: 'Technician Verified Successfully',
                              type: 'success',
                            });
                            refetch();
                          } else {
                            notify({
                              title: 'Technician Verification Failed',
                              type: 'error',
                            });
                            refetch();
                          }
                        } catch (error) {
                          notify({
                            title: 'Technician Verification Failed',
                            type: 'error',
                          });
                          refetch();
                        }
                      }
                    "
                    title="View Technician Details"
                  >
                    <font-awesome-icon
                      :icon="['fas', 'toggle-on']"
                      style="color: #44d70f"
                      size="xl"
                    />
                  </button>
                  <button
                    v-else
                    @click="
                      async () => {
                        try {
                          let res = await technician_store.verify_technician(
                            technician.id,
                            true
                          );
                          if (typeof res == 'string') {
                            notify({
                              title: 'Technician Verification Stopped',
                              type: 'success',
                            });
                            refetch();
                          } else {
                            notify({
                              title: 'Technician Verification Failed',
                              type: 'error',
                            });
                            refetch();
                          }
                        } catch (error) {
                          notify({
                            title: 'Technician Verification Failed',
                            type: 'error',
                          });
                          refetch();
                        }
                      }
                    "
                    title="View Technician Details"
                  >
                    <font-awesome-icon
                      :icon="['fas', 'toggle-off']"
                      size="xl"
                      style="color: #b71010"
                    />
                  </button>
                </div>
              </div>
              <div class="space-y-1">
                <div class="flex space-x-1 items-center">
                  <font-awesome-icon
                    class="text-gray-600"
                    :icon="['fas', 'briefcase']"
                  />
                  <p class="text-gray-600">Technician</p>
                </div>
                <div class="flex space-x-1 items-center">
                  <font-awesome-icon
                    class="text-gray-600"
                    :icon="['fas', 'location-dot']"
                  />
                  <p class="text-gray-600">
                    {{ technician.address?.kebele?.name }},
                    {{ technician.address?.woreda?.name }},
                    {{ technician.address?.zone?.name }},
                    {{ technician.address?.region?.name }}, Ethiopia
                  </p>
                </div>
              </div>
              <div class="flex space-x-1 text-gray-700 items-center">
                <div>
                  <h1 class="text-black font-bold">
                    <span class="">Phone Number</span>
                  </h1>
                  <p class="space-x-2">
                    <span><font-awesome-icon :icon="['fas', 'phone']" /></span>
                    <span>
                      {{ technician.phone_number }}
                    </span>
                  </p>
                </div>
              </div>
              <div class="flex justify-between items-center">
                <div class="flex space-x-1 text-gray-700 items-center">
                  <div>
                    <h1 class="text-black font-bold">Availability</h1>
                    <button
                      v-if="technician.availability"
                      @click="
                        async () => {
                          try {
                            let res =
                              await technician_store.availability_technician(
                                technician.id,
                                false
                              );
                            if (typeof res == 'string') {
                              notify({
                                title:
                                  'Technician Availability Offed Successfully',
                                type: 'success',
                              });
                              refetch();
                            } else {
                              notify({
                                title:
                                  'Technician Availability Not Offed Successfully',
                                type: 'error',
                              });
                              refetch();
                            }
                          } catch (error) {
                            notify({
                              title:
                                'Technician Availability Not Offed Successfully',
                              type: 'error',
                            });
                            refetch();
                          }
                        }
                      "
                    >
                      <font-awesome-icon
                        :icon="['fas', 'toggle-on']"
                        style="color: #44d70f"
                        size="xl"
                      />
                    </button>
                    <button
                      v-else
                      @click="
                        async () => {
                          try {
                            let res =
                              await technician_store.availability_technician(
                                technician.id,
                                true
                              );
                            if (typeof res == 'string') {
                              notify({
                                title:
                                  'Technician Availability Offed Successfully',
                                type: 'success',
                              });
                              refetch();
                            } else {
                              notify({
                                title:
                                  'Technician Availability Not Offed Successfully',
                                type: 'error',
                              });
                              refetch();
                            }
                          } catch (error) {
                            notify({
                              title:
                                'Technician Availability Not Offed Successfully',
                              type: 'error',
                            });
                            refetch();
                          }
                        }
                      "
                    >
                      <font-awesome-icon
                        :icon="['fas', 'toggle-off']"
                        size="xl"
                        style="color: #b71010"
                      />
                    </button>
                  </div>
                </div>
                <div class="flex space-x-1 text-gray-700 items-center">
                  <div>
                    <h1 class="text-black font-bold">Registration Date</h1>
                    <p>{{ technician.created_at.split("T")[0] }}</p>
                  </div>
                </div>
              </div>
              <div class="flex space-x-1 text-gray-700 items-center">
                <div>
                  <h1 class="text-black font-bold">
                    About {{ technician.first_name }}
                  </h1>
                  <p>{{ technician.bios }}</p>
                </div>
              </div>
              <div class="flex space-x-1 text-gray-700 items-center">
                <div>
                  <h1 class="text-black font-bold">
                    Remaininging Service Number
                  </h1>
                  <p>{{ technician.packages }}</p>
                </div>
              </div>
              <div class="flex justify-between">
                <div class="flex space-x-1 text-gray-700 items-center">
                  <div class="space-y-1">
                    <h1 class="text-black">Banks</h1>
                    <div class="flex items-center">
                      <select
                        name=""
                        id=""
                        v-model="utility.bank_id"
                        class="flex h-auto items-center cursor-pointer justify-center w-full sm:px-3 px-2 text-sm font-medium text-black py-2 bg-[#E2E8F0] focus:outline-none rounded-lg transition duration-150 ease-in-out"
                      >
                        <option value="">Select Bank</option>
                        <option
                          v-for="bank in utility.banks"
                          :key="bank.id"
                          :value="bank.id"
                        >
                          {{ bank.name }}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="flex space-x-1 text-gray-700 items-center">
                  <div class="space-y-1">
                    <h1 class="text-black font-bold">Account Number</h1>
                    <div class="flex space-x-1">
                      <p class="text-gray-700 px-2">
                        {{
                          technician.bank_accounts.find(
                            (account) => account.bank_id == utility.bank_id
                          )?.account_number
                        }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="bg-white rounded-lg shadow-lg lg:w-[62%] w-full overflow-y-scroll border py-8 border-gray-300 p-3"
          >
            <h2 class="text-lg font-bold mb-4">Delivered Service Requests</h2>
            <table v-if="technician.service_requests.length > 0" class="w-full">
              <thead>
                <tr class="border-b uppercase">
                  <th class="text-left font-bold py-2 px-4"></th>
                  <th class="text-left font-bold py-2 px-4">phone</th>
                  <!-- <th class="text-left font-bold py-2 px-4">Location</th> -->
                  <th class="text-left font-bold py-2 px-4">Status</th>
                  <th class="text-left font-bold py-2 px-4">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="job in technician.service_requests"
                  :key="job.id"
                  class="border-b hover:bg-gray-100"
                >
                  <td class="py-2 px-4 capitalize">   {{ customers[job.id].first_name }} {{ customers[job.id].last_name }}  </td>
                  <td class="py-2 px-4"> {{job.customer_phone}} </td>
                  <!-- <td class="py-2 px-4">Addiss Abeba Ethiopia</td> -->
                  <td class="py-2 px-4">

                    <span
                  :class="
                    job.status === 'progress'
                      ? 'bg-yellow-200 text-yellow-800 rounded-full px-2 py-1'
                      : job.status === 'opened'
                      ? 'bg-blue-200 text-blue-900 rounded-full px-2 py-1'
                      : job.status === 'completed'
                      ? 'bg-green-200 text-green-800 rounded-full px-2 py-1'
                      : 'bg-gray-200 text-gray-800 rounded-full px-2 py-1'
                  "
                >
                  {{ job.status }}
                </span>
                  </td>
                  <td class="py-2 px-4">
                    <div class="mt-4 md:mt-0 md:ml-4 py-2">
                      <router-link
                        :to="{
                          name: 'service_request_detail',
                          params: { id: job.id },
                        }"
                        class="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-700"
                      >
                      See Details
                      </router-link>
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
        <div class="lg:px-4 px-0 w-full">
          <div
            class="bg-white rounded-lg shadow-lg w-full overflow-x-scroll border py-8 border-gray-300 p-3"
          >
            <h2 class="text-lg font-bold mb-4">Service Payment History</h2>
            <table v-if="technician.service_requests.length > 0" class="w-full">
              <thead>
                <tr class="border-b">
                  <th class="text-left font-bold py-2 px-4">customer Name</th>
                  <th class="text-left font-bold py-2 px-4">phone</th>
                  <th class="text-left font-bold py-2 px-4">Location</th>
                  <th class="text-left font-bold py-2 px-4">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="job in technician.service_requests"
                  :key="job.id"
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
        <div class="lg:px-4 px-0 w-full">
          <div
            class="bg-white rounded-lg shadow-lg w-full overflow-x-scroll border py-8 border-gray-300 p-3"
          >
            <h2 class="text-lg font-bold mb-4">Subscription History</h2>
            <table v-if="technician.service_requests.length > 0" class="w-full">
              <thead>
                <tr class="border-b">
                  <th class="text-left font-bold py-2 px-4">customer Name</th>
                  <th class="text-left font-bold py-2 px-4">phone</th>
                  <th class="text-left font-bold py-2 px-4">Location</th>
                  <th class="text-left font-bold py-2 px-4">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="job in technician.service_requests"
                  :key="job.id"
                  class="border-b hover:bg-gray-100"
                >
                  <td class="py-2 px-4">   {{ customers.first_name }} {{ customers.last_name }}  </td>
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
      </div>
    </div>
    <Delete
      v-if="is_delete_modal_open"
      v-on:delete="deleteFunction()"
      v-on:cancel="is_delete_modal_open = false"
    >
    </Delete>
    <update_technician
      v-if="is_updating_technician"
      :technician_id="technician.id"
      @failed="failer_notifier"
      @success="success_notifier"
      v-on:cancel="is_updating_technician = false"
    >
    </update_technician>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { ref, onMounted, computed, watch,watchEffect } from "vue";
import { useQuery } from "@vue/apollo-composable";
import { QUERY_TECHNICIAN_DETAIL } from "../constants/queries";
import { technicianStore } from "../stores/technician";
import { notify } from "@kyvg/vue3-notification";
import Delete from "../components/modal/Delete.vue";
import update_technician from "../components/modal/update_technician.vue";
import { utilityStore } from "../stores/utility_store";
import apolloclient from "../apollo.config";
import gql from "graphql-tag";
const utility = utilityStore();
const is_delete_modal_open = ref(false);
const is_updating_technician = ref(false);

const route = useRoute();
const { error, loading, result, refetch } = useQuery(QUERY_TECHNICIAN_DETAIL, {
  id: route.params.id,
});
const technician = computed(() => {
  return result.value?.technician_by_pk;
});
let deleteFunction = null;
const technician_store = technicianStore();

const customers = ref({})
const technicianName = computed(() => {
  return technician.value?.first_name + " " + technician.value?.last_name;
});

watch(technicianName, (name) => {
  document.title = name;
});

onMounted(() => {
  document.title = technicianName.value;
  utility.get_banks_list();
});

const failer_notifier = (data) => {
  notify({
    title: data,
    type: "error",
  });
  is_delete_modal_open.value = false;
  is_updating_technician.value = false;
};
const success_notifier = (data) => {
  notify({
    title: data,
    type: "success",
  });
  is_updating_technician.value = false;
  refetchData();
};
watchEffect(
  async () => {
    console.log("am here");
    for (const request of result.value?.technician_by_pk.service_requests || []) {
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
const refetchData = () => {
  refetch();
};
</script>

<style></style>
