<template>
  <div v-if="error">{{error}}</div>
  <div
    v-else-if="loading"
    class="h-full inset-0 flex justify-center items-center"
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
  <div v-else ref="pdfContent" class="mx-2 bg-white">
    <div class="flex flex-col bg-white w-full p-4">
      <div class="flex justify-start items-center space-x-3 mb-5">
        <div>
          <button @click="$router.go(-1)">
            <button
              class="bg-[#0080FE] hover:bg-[#242840] text-white rounded-full p-2"
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
          </button>
        </div>
        <h1 class="text-2xl font-bold">Service Request Details</h1>
      </div>

      <div
        class="bg-white relative rounded-lg shadow-lg p-6 mb-6 border py-6 border-gray-300"
      >
        <h1 class="font-bold">General Information About Service Request</h1>
        <div class="absolute top-2 right-0 flex">
          <div class="flex justify-center items-center space-x-2">
            <div
              class="flex space-x-1 items-center"
              v-if="service_request_by_pk.is_in_warranty_request"
            >
              <p class="text-gray-600">Process Payment</p>
              <button
                v-if="service_request_by_pk.service_payments.length == 0"
                @click="
                  async () => {
                    try {
                      let res =
                        await service_request.insert_service_request_to_payment(
                          service_request_by_pk.technician_id,
                          service_request_by_pk.id
                        );
                      if (typeof res == 'string') {
                        notify({
                          type: 'success',
                          title: 'Service Payment is added',
                        });
                        refetch();
                      } else {
                        notify({ type: 'error', title: res.error.message });
                      }
                    } catch (error) {
                      notify({
                        type: 'error',
                        title: 'Service Payment is not added',
                      });
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
              <button v-else>
                <font-awesome-icon
                  :icon="['fas', 'toggle-on']"
                  style="color: #44d70f"
                  size="xl"
                />
              </button>
            </div>
            <div
              class="flex space-x-1 items-center"
              v-if="service_request_by_pk.status == 'completed'"
            >
              <p class="text-gray-600">Set as Not Completed</p>
              <button
                @click="
                  async () => {
                    try {
                      let res =
                        await service_request.make_service_request_completed(
                          service_request_by_pk.id,
                          'progress',
                          service_request_by_pk.technician_id
                        );
                      if (typeof res == 'string') {
                        notify({
                          type: 'success',
                          title: 'Service Request Set as Completed',
                        });
                        refetch();
                      } else {
                        notify({ type: 'error', title: res.error.message });
                      }
                    } catch (error) {
                      notify({
                        type: 'error',
                        title: 'Service Request Not Set as Completed',
                      });
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
            </div>

            <div v-else class="flex space-x-2 items-center">
              <p class="text-gray-600">Set as Completed</p>
              <button
                @click="
                  async () => {
                    try {
                      if (!service_request_by_pk.technician_id) {
                        notify({
                          type: 'error',
                          title: 'No Technician Assigned',
                        });
                        return;
                      }
                      let res =
                        await service_request.make_service_request_completed(
                          service_request_by_pk.id,
                          'completed',
                          service_request_by_pk.technician_id
                        );
                      if (typeof res == 'string') {
                        notify({
                          type: 'success',
                          title: 'Service Request Set to Not Completed',
                        });
                        refetch();
                      } else {
                        notify({ type: 'error', title: res.error.message });
                      }
                    } catch (error) {
                      notify({ type: 'error', title: 'Error Occured' });
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

          <button
            @click="is_updating_service_request = true"
            class="flex items-center justify-center w-9 h-9 rounded-full hover:shadow-transparent hover:bg-slate-800"
          >
            <font-awesome-icon
              :icon="['fas', 'pen-to-square']"
              style="color: #13a300"
            />
          </button>
          <button
            class="flex items-center justify-center w-9 h-9 rounded-full hover:shadow-transparent hover:bg-slate-800"
          >
            <font-awesome-icon
              :icon="['fas', 'trash']"
              style="color: #c70505"
            />
          </button>
        </div>
        <div class="flex flex-wrap">
          <div class="w-[45%]">
            <div class="">
              <label
                class="text-gray-500 font-bold text-lg"
                for="customerPhone"
              >
                Customer Name
              </label>
              <p class="text-lg capitalize">
                {{ customers.first_name }} {{ customers.last_name }}  
              </p>
            </div>
            <div class="">
              <label
                class="text-gray-500 font-bold text-lg"
                for="customerPhone"
              >
                Customer Phone
              </label>
              <p class="space-x-2">
                <font-awesome-icon
                  :icon="['fas', 'phone']"
                  style="color: #64686d"
                />
                <span>{{ service_request_by_pk.customer_phone }}</span>
              </p>
            </div>
            <div class="">
              <label
                class="text-gray-500 font-bold text-lg"
                for="customerPhone"
              >
                Service Class
              </label>
              <p class="space-x-2">
                <font-awesome-icon
                  :icon="['fas', 'screwdriver-wrench']"
                  style="color: #64686d"
                />
                <span>
                  {{ service_request_by_pk?.problem_class?.name }}
                </span>
              </p>
            </div>
            <div class="">
              <label class="text-gray-500 font-bold text-lg" for="requestDate">
                Request Date
              </label>
              <div class="flex space-x-2 items-center">
                <font-awesome-icon
                  class="text-gray-800"
                  :icon="['fas', 'calendar-alt']"
                  style="color: #545454"
                />
                <p class="text-gray-600">
                  {{ service_request_by_pk.created_at.split("T")[0] }}
                </p>
              </div>
            </div>
            <div class="">
              <label class="text-gray-500 font-bold text-lg" for="requestDate">
                Is Warranty Product
              </label>
              <div class="flex space-x-2 items-center">
                <p
                  v-if="service_request_by_pk.is_in_warranty_request"
                  class="bg-green-200 text-green-600 font-bold px-2 py-1 rounded-md"
                >
                  Warranty
                </p>
                <p
                  v-else
                  class="bg-yellow-200 text-yellow-600 font-bold px-2 py-1 rounded-md"
                >
                  Non-Warranty
                </p>
              </div>
            </div>
          </div>
          <div class="w-[45%]">
            <div class="">
              <label
                class="text-gray-500 font-bold text-lg"
                for="problemDescription"
              >
                Problem Description
              </label>
              <p class="">
                {{ service_request_by_pk.problem_description }}
              </p>
            </div>
            <div class="">
              <h1 class="text-gray-500 font-bold text-lg">Location</h1>
              <div class="flex space-x-1 items-center">
                <font-awesome-icon
                  class="text-gray-800"
                  :icon="['fas', 'location-dot']"
                />
                <p class="text-black">
                  {{ service_request_by_pk.address?.kebele?.name }},
                  {{ service_request_by_pk.address?.woreda?.name }},
                  {{ service_request_by_pk.address?.zone?.name }},
                  {{ service_request_by_pk.address?.region?.name }}, Ethiopia
                </p>
              </div>
            </div>

            <div class="">
              <label class="text-gray-500 font-bold text-lg" for="status">
                Status
              </label>
              <div>
                <span
                  class="text-center"
                  :class="
                    service_request_by_pk.status === 'progress'
                      ? 'bg-yellow-200 capitalize text-yellow-800 rounded-full px-2 py-1'
                      : service_request_by_pk.status === 'opened'
                      ? 'bg-blue-200 text-blue-900 rounded-full px-2 py-1'
                      : service_request_by_pk.status === 'completed'
                      ? 'bg-green-200 text-green-800 rounded-full px-2 py-1'
                      : 'bg-gray-200 text-gray-800 rounded-full px-2 py-1'
                  "
                >
                  {{ service_request_by_pk.status }}
                </span>
              </div>
            </div>
            <div class="">
              <label class="text-gray-500 font-bold text-lg" for="status">
                Assigned Technician
              </label>
              <div class="flex items-center space-x-2">
                <font-awesome-icon
                  :icon="['fas', 'user']"
                  style="color: #595b5f"
                />
                <p class="">
                  {{
                    service_request_by_pk.technician
                      ? service_request_by_pk.technician.first_name +
                        " " +
                        service_request_by_pk.technician.last_name
                      : "Not Assigned yet"
                  }}
                </p>
              </div>
            </div>
          </div>
          <div class="w-full">
            <div class="text-gray-500 font-bold text-lg" for="status">
              Serivice Cost
            </div>
            <div class="flex space-x-2">
              <div>
                Accessory Cost:
                <span>
                  {{
                    service_request_by_pk?.accessory_requests.reduce(
                      (sum, accessory) =>
                        sum + accessory.accessory.price,
                      0
                    )
                  }}</span
                >
              </div>
              <div>
                Service Cost:
                <span>{{
                  service_request_by_pk?.service_payments[0]?.amount || 0 
                }}</span>
              </div>
            </div>
            <div>
              Total cost:{{
                service_request_by_pk?.accessory_requests.reduce(
                  (sum, accessory) =>
                    sum + accessory.accessory?.price,
                  0
                ) + service_request_by_pk?.service_payments[0]?.amount || 0
              }}
            </div>
          </div>
        </div>
      </div>
      <div
        class="bg-white rounded-lg shadow-lg p-6 mb-6 border py-6 border-gray-300 overflow-x-scroll"
      >
        <div class="flex justify-between px-2">
          <h2 class="text-lg font-bold mb-4">System Recommeded Technicians</h2>
          <div class="sm:flex block justify-center items-center space-x-2">
            <div class="mr-2 py-3 text-lg">
              <router-link
                to="/map-technician"
                class="bg-[#0080FE] hover:bg-[#242840] text-white px-8 py-4 h-12 flex justify-center items-center rounded-lg text-sm"
                data-tippy-content="Register New Service Request"
                data-tippy-placement="bottom"
              >
                <span class="text-white"> Map </span>
              </router-link>
            </div>
          </div>
        </div>
        <table class="w-full">
          <thead>
            <tr class="border-b">
              <th class="text-left font-bold py-2 px-4">Name</th>
              <th class="text-left font-bold py-2 px-4">Rate</th>
              <th class="text-left font-bold py-2 px-4">Proximity</th>
              <th class="text-left font-bold py-2 px-4">Location</th>
              <th class="text-left font-bold py-2 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="job in service_request_by_pk.jobs"
              :key="job.id"
              class="border-b hover:bg-gray-100"
            >
              <td class="py-2 px-4">
                {{ (job.technician.first_name, job.technician.first_name) }}
              </td>
              <td class="py-2 px-4">3.5</td>
              <td class="py-2 px-4">16km</td>
              <td class="py-2 px-4">
                {{ job.technician.address?.kebele?.name }} ,
                {{ job.technician.address?.woreda?.name }} ,
                {{ job.technician.address?.zone?.name }} ,
                {{ job.technician.address?.region?.name }}
              </td>
              <td class="py-2 px-4">
                <di class="mt-4 md:mt-0 md:ml-4 flex space-x-3">
                  <button
                    v-if="
                      job.technician.id == service_request_by_pk.technician_id
                    "
                    class="text-white rounded-lg px-4 py-2 bg-[#640000] hover:bg-[#b0370b]"
                    @click="unassign_technician(job.technician.id)"
                  >
                    Retract
                  </button>
                  <button
                    v-else
                    class="text-white rounded-lg px-4 py-2 bg-[#079915] hover:bg-[#044b10]"
                    @click="
                      assign_technician(
                        job.technician.id,
                        service_request_by_pk.is_in_warranty_request
                      )
                    "
                  >
                    Assign
                  </button>
                  <button
                    class="text-white rounded-lg px-4 py-2 bg-[#EF4104] hover:bg-[#621c02]"
                    @click="
                      async () => {
                        try {
                          let res =
                            await service_request.remove_technicians_from_jobs(
                              service_request_by_pk.id,
                              job.technician.id
                            );
                          if (typeof res === 'string') {
                            notify({
                              title:
                                'Technician Removed from Jobs list successfully',
                              type: 'success',
                            });
                            refetch();
                          } else {
                            notify({
                              title: 'Technician Not Removed from Jobs list',
                              type: 'error',
                            });
                          }
                        } catch (error) {
                          notify({
                            title: 'Technician Not Removed from Jobs list',
                            type: 'error',
                          });
                        }
                      }
                    "
                  >
                    Remove
                  </button>
                </di>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div
        class="bg-white rounded-lg shadow-lg p-6 border border-gray-300 mb-10 overflow-x-scroll"
      >
        <h2 class="text-lg font-bold mb-4">
          Search Technicians For This Service Request
        </h2>
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
                class="px-10 h-12 ml-2 cursor-pointer text-sm font-medium z-0 text-white bg-[#0080FE] hover:bg-[#242840] rounded-lg focus:outline-none focus:ring-[#862603cc]"
              >
                search
              </button>
            </div>
            <div class="flex items-center z-10">
              <select
                name=""
                id=""
                v-model="region_id"
                @change="searchQuery"
                class="flex h-12 items-center cursor-pointer justify-center w-full sm:px-4 px-3 sm:py-3 py-2 text-sm font-medium text-black border-gray-800 border bg-[#E2E8F0] focus:outline-none rounded-lg transition duration-150 ease-in-out"
              >
                <option value="">Filter by Regions</option>
                <option
                  v-for="(region, index) in regions"
                  :key="region.id"
                  :value="region.id"
                >
                  {{ region.name }}
                </option>
              </select>
            </div>
            <div class="flex items-center z-10">
              <select
                name=""
                id=""
                v-model="zone_id"
                @change="searchQuery"
                class="flex h-12 items-center cursor-pointer justify-center w-full sm:px-4 px-3 sm:py-3 py-2 text-sm font-medium text-black border-gray-800 border bg-[#E2E8F0] focus:outline-none rounded-lg transition duration-150 ease-in-out"
              >
                <option value="">Filter by Zones</option>
                <option
                  v-for="(zone, index) in zones"
                  :key="zone.id"
                  :value="zone.id"
                >
                  {{ zone.name }}
                </option>
              </select>
            </div>
            <div class="flex items-center z-10">
              <select
                name=""
                id=""
                v-model="woreda_id"
                @change="searchQuery"
                class="flex h-12 items-center cursor-pointer justify-center w-full sm:px-4 px-3 sm:py-3 py-2 text-sm font-medium text-black border-gray-800 border bg-[#E2E8F0] focus:outline-none rounded-lg transition duration-150 ease-in-out"
              >
                <option value="">Filter by Woreda</option>
                <option
                  v-for="(woreda, index) in woredas"
                  :key="woreda.id"
                  :value="woreda.id"
                >
                  {{ woreda.name }}
                </option>
              </select>
            </div>
          </div>
          <div class="sm:flex block justify-center items-center space-x-2">
            <div class="mr-2 py-3 text-lg">
              <router-link
                to="/map-technician"
                class="bg-[#0080FE] hover:bg-[#242840] text-white px-8 py-4 h-12 flex justify-center items-center rounded-lg text-sm"
                data-tippy-content="Register New Service Request"
                data-tippy-placement="bottom"
              >
                <span class="text-white"> Map </span>
              </router-link>
            </div>
          </div>
        </div>
        <div v-if="errors">{{ errors }}</div>
        <div
          v-else-if="loader"
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
        <div v-else>
          <table class="w-full mt-3">
            <thead>
              <tr class="border-b border-t">
                <th class="text-left font-bold py-2 px-4">Name</th>
                <th class="text-left font-bold py-2 px-4">Rate</th>
                <th class="text-left font-bold py-2 px-4">Proximity</th>
                <th class="text-left font-bold py-2 px-4">Location</th>
                <th class="text-left font-bold py-2 px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="technician in technicians"
                :key="technician.id"
                class="border-b hover:bg-gray-100"
              >
                <td class="py-2 px-4">
                  {{ technician.first_name }}
                  {{ technician.last_name }}
                </td>
                <td class="py-2 px-4">3.5</td>
                <td class="py-2 px-4">16km</td>
                <td class="py-2 px-4">
                  {{ technician.address?.kebele?.name }},
                  {{ technician.address?.woreda?.name }},
                  {{ technician.address?.zone?.name }},
                  {{ technician.address?.region?.name }}
                </td>
                <td class="py-2 px-4">
                  <div class="mt-4 md:mt-0 md:ml-4 flex space-x-3">
                    <button
                      v-if="
                        technician.id === service_request_by_pk.technician_id
                      "
                      class="text-white rounded-lg px-4 py-2 bg-[#640000] hover:bg-[#621c02]"
                      @click="unassign_technician(technician.id)"
                    >
                      Retract
                    </button>
                    <button
                      v-else
                      class="text-white rounded-lg px-4 py-2 bg-[#079915] hover:bg-[#044b10]"
                      @click="
                        assign_technician(
                          technician.id,
                          service_request_by_pk.is_in_warranty_request
                        )
                      "
                    >
                      Assign
                    </button>
                    <button
                      v-if="
                        !service_request_by_pk.jobs?.some(
                          (job) => job?.technician?.id === technician.id
                        )
                      "
                      class="text-white rounded-lg px-4 py-2 bg-green-500 hover:bg-green-700"
                      @click="
                        async () => {
                          try {
                            let res = await service_request.insert_jobs(
                              service_request_by_pk.id,
                              technician.id
                            );
                            if (typeof res === 'string') {
                              notify({
                                title: 'Technician Recommended Successfully',
                                type: 'success',
                              });
                            } else {
                              notify({
                                title: 'Failed to Recommend Technician ',
                                type: 'error',
                              });
                            }
                          } catch (error) {
                            notify({
                              title: 'Failed to Recommend Technician ',
                              type: 'warning',
                            });
                          }
                          refetch({ id: $route.params.id });
                        }
                      "
                    >
                      Recommend
                    </button>
                    <button
                      v-else
                      disabled
                      class="text-white rounded-lg px-4 py-2 bg-gray-700"
                    >
                      Recommended
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div
        class="bg-white rounded-lg shadow-lg border border-gray-300 space-y-3 p-6 text-base mb-6"
      >
        <h2 class="text-lg font-bold mb-4">Product Information</h2>
        <div class="flex flex-wrap w-full justify-between space-x-3">
          <div class="">
            <label
              class="text-gray-500 font-bold text-lg mb-2"
              for="customerPhone"
            >
              Product Name
            </label>
            <p class="p-2">
              {{ products.product.brand }}
            </p>
          </div>
          <div class="">
            <label
              class="text-gray-500 font-bold text-lg mb-2"
              for="customerPhone"
            >
              Purchase Date
            </label>
            <p class="p-2">
              {{ products.order.pickup_date }}
            </p>
          </div>
          <div class="">
            <label
              class="text-gray-500 font-bold text-lg mb-2"
              for="customerPhone"
            >
             Model
            </label>
            <p class="p-2">
              {{ products.product.model }}
            </p>
          </div>

          <div class="">
            <label
              class="text-gray-500 font-bold text-lg mb-2"
              for="customerPhone"
            >
              Warranty Status
            </label>
            <p class="p-2">Not Yet</p>
          </div>
          <!-- <p class="font-medium mb-2">Warranty Status</p>
            <p class="mb-4">not yet</p> -->
          <div class="">
            <label
              class="text-gray-500 font-bold text-lg mb-2"
              for="customerPhone"
            >
              Warranty Expiry Date
            </label>
            <p class="p-2">
              {{warranty_end_date(products.order.pickup_date) }}
            </p>
          </div>
        </div>
      </div>
      <div
        class="bg-white rounded-lg shadow-lg border border-gray-300 p-6 mb-6"
      >
        <div class="flex justify-between mb-2">
          <h1 class="text-2xl font-bold mb-4">Accessory Request</h1>
          <button
            class="text-white rounded-lg px-4 py-2 bg-[#079915] hover:bg-[#044b10]"
            @click="is_accessory_requesting = true"
          >
            Add Accessory request
          </button>
        </div>
        <div
          v-for="accessory in service_request_by_pk.accessory_requests"
          :key="accessory.id"
          class="border border-gray-300 rounded-lg shadow-md mb-4"
        >
          <div class="flex justify-between bg-gray-100 p-4 rounded-t-lg">
            <div>
              <label
                class="text-gray-500 font-bold text-lg mb-2"
                for="requestDate"
              >
                Request Date
              </label>
              <p class="font-bold">
                {{ accessory.created_at.split("T")[0] }}
              </p>
            </div>
            <div>
              <label class="text-gray-500 font-bold text-lg mb-2" for="status">
                Status
              </label>
              <p class="font-bold">
                {{ accessory.is_verified ? "Verified" : "Not Verified" }}
              </p>
            </div>
          </div>
          <div class="p-4">
            <div
              class="flex flex-col sm:space-x-2 sm:flex-row md:items-center mb-4"
            >
              <div class="">
                <label
                  class="text-gray-500 font-bold text-lg mb-2"
                  for="customerPhone"
                >
                  Accessory Name
                </label>
                <p class="p-2">
                  {{ accessory.accessory.name }}
                </p>
              </div>
              <div class="">
                <label
                  class="text-gray-500 font-bold text-lg mb-2"
                  for="customerPhone"
                >
                  Quantity
                </label>
                <p class="p-2">
                  {{ accessory.quantity }}
                </p>
              </div>
              <div class="">
                <label
                  class="text-gray-500 font-bold text-lg mb-2"
                  for="customerPhone"
                >
                  Accessory Price
                </label>
                <p class="p-2">
                  {{ accessory.accessory.price }}
                </p>
              </div>
            </div>
            <div class="flex flex-col md:flex-row md:items-center mb-4">
              <div class="">
                <label
                  class="text-gray-500 font-bold text-lg mb-2"
                  for="status"
                >
                  Reason
                </label>
                <p class="p-2">
                  {{ accessory.reason }}
                </p>
              </div>
            </div>
            <div class="flex justify-end">
              <button
                class="text-white rounded-lg px-4 py-2 bg-[#0080FE] hover:bg-[#242840] mr-2"
              >
                Edit
              </button>
              <button
                @click="
                  is_delete_modal_open = true;
                  deleteFunction = async () => {
                    try {
                      let res = await accessory_store.delete_accessory_request(
                        accessory.id
                      );
                      if (typeof res == 'string') {
                        notify({
                          title: 'Accessory Request Successfully Deleted',
                          type: 'success',
                        });
                        is_delete_modal_open = false;
                        refetch({
                          id: service_request_by_pk.id,
                        });
                      } else {
                        notify({
                          title: 'Accessory Request Not Successfully Deleted',
                          type: 'error',
                        });
                        is_delete_modal_open = false;
                      }
                    } catch (error) {
                      notify({
                        title: 'Accessory Request Not Successfully Deleted',
                        type: 'error',
                      });
                      is_delete_modal_open = false;
                    }
                    return;
                  };
                "
                class="text-white rounded-lg px-4 py-2 bg-red-500 hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        class="bg-white rounded-lg shadow-lg border border-gray-300 p-6 mb-6"
      >
        <div class="flex justify-between">
          <h1 class="text-2xl font-bold mb-4">Service Request Reports</h1>
          <button
            class="bg-[#079915] hover:bg-[#044b10] text-white rounded-lg px-4 py-2 mb-4"
            @click="is_technician_report_requesting = true"
          >
            Add Report
          </button>
        </div>

        <div
          v-for="report in service_request_by_pk.technician_reports"
          :key="report.id"
          class="border rounded-lg shadow-lg mb-4 p-4"
        >
          <div class="flex flex-wrap justify-between">
            <div class="mb-4">
              <label
                class="text-gray-500 font-bold text-lg mb-2"
                for="customerPhone"
                >Reported By</label
              >
              <p class="p-2">
                {{
                  report.technician_id
                    ? report.technician.first_name +
                      " " +
                      report.technician.last_name
                    : "Admin"
                }}
              </p>
            </div>
            <div class="mb-4 md:ml-4">
              <label
                class="text-gray-500 font-bold text-lg mb-2"
                for="requestDate"
                >Report Date</label
              >
              <p class="p-2">
                {{ report.created_at.split("T")[0] }}
              </p>
            </div>
            <div class="mb-4 md:ml-4">
              <label
                class="text-gray-500 font-bold text-lg mb-2"
                for="problemDescription"
                >Service Status</label
              >
              <p class="border-gray-400 p-2">
                {{
                  report.is_service_completed ? "Completed" : "Not Completed"
                }}
              </p>
            </div>
          </div>
          <div class="flex flex-col md:flex-row">
            <div class="mb-4 md:mr-4 md:w-1/2">
              <label
                class="text-gray-500 font-bold text-lg mb-2"
                for="customerPhone"
                >Existing Problem</label
              >
              <p class="p-2">
                {{ report.problem_diagnosis }}
              </p>
            </div>
            <div class="md:w-1/2">
              <label
                class="text-gray-500 font-bold text-lg mb-2"
                for="customerPhone"
                >Provided Solution</label
              >
              <p class="p-2">
                {{ report.solution_provided }}
              </p>
            </div>
          </div>
          <div class="flex justify-end mt-4">
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded-lg"
              @click="editReport(report)"
            >
              Edit
            </button>
            <button
              class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
              @click="
                is_delete_modal_open = true;
                deleteFunction = async () => {
                  try {
                    let res = await technician_report_store.delete_report(
                      report.id
                    );
                    if (typeof res == 'string') {
                      notify({
                        title: 'Report Successfully Deleted',
                        type: 'success',
                      });
                      is_delete_modal_open = false;
                      refetch({
                        id: service_request_by_pk.id,
                      });
                    } else {
                      notify({
                        title: 'Report Not Successfully Deleted',
                        type: 'error',
                      });
                      is_delete_modal_open = false;
                    }
                  } catch (error) {
                    notify({
                      title: 'Report Not Successfully Deleted',
                      type: 'error',
                    });
                    is_delete_modal_open = false;
                  }
                  return;
                };
              "
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      <div
        class="bg-white rounded-lg shadow-lg border border-gray-300 p-6 mb-6"
      >
        <div class="flex justify-between mb-4">
          <h1 class="text-2xl font-bold">Service Feedback</h1>
          <button
            class="text-white rounded-lg px-4 py-2 bg-[#079915] hover:bg-[#044b10]"
            @click="is_adding_survey = true"
          >
            Add Survey
          </button>
        </div>
        <div
          v-for="survey in service_request_by_pk.feed_back_surveys"
          :key="survey.id"
          class="border rounded-lg shadow-lg mb-4 p-4"
        >
          <div class="flex justify-between">
            <div class="mb-4">
              <p class="p-2">
                {{ survey.survey_date }}
              </p>
            </div>
            <div class="">
              <p class="border-gray-400 p-2">
                {{
                  survey.is_service_completed ? "Completed" : "Not Completed"
                }}
              </p>
            </div>
          </div>

          <div class="flex flex-col space-x-3 md:flex-row">
            <div class="mb-4 md:mr-4 md:w-1/2">
              <label
                class="text-gray-500 font-bold text-lg mb-2"
                for="customerPhone"
                >Service Details</label
              >
              <p class="p-2">
                {{ survey.service_detail }}
              </p>
            </div>
            <div class="md:w-1/2">
              <label
                class="text-gray-500 font-bold text-lg mb-2"
                for="customerPhone"
              >
                Service Quality</label
              >
              <p class="p-2">
                {{ survey.service_quality }}
              </p>
            </div>
            <div class="md:w-1/2">
              <label
                class="text-gray-500 font-bold text-lg mb-2"
                for="customerPhone"
              >
                Suggestion</label
              >
              <p class="p-2">
                {{ survey.suggession }}
              </p>
            </div>
          </div>
          <div class="flex justify-end mt-4">
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded-lg"
              @click=""
            >
              Edit
            </button>
            <button
              class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
              @click="
                is_delete_modal_open = true;
                deleteFunction = async () => {
                  try {
                    let res = await feedback_store.delete_feedback(survey.id);
                    if (typeof res == 'string') {
                      notify({
                        title: 'Survey Successfully Deleted',
                        type: 'success',
                      });
                      is_delete_modal_open = false;
                      refetch({
                        id: service_request_by_pk.id,
                      });
                    } else {
                      notify({
                        title: 'Survey Not Successfully Deleted',
                        type: 'error',
                      });
                      is_delete_modal_open = false;
                    }
                  } catch (error) {
                    notify({
                      title: 'Survey Not Successfully Deleted',
                      type: 'error',
                    });
                    is_delete_modal_open = false;
                  }
                  return;
                };
              "
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      <div
        class="bg-white rounded-lg shadow-lg border border-gray-300 p-6 mb-6"
      >
        <div class="flex justify-between mb-4">
          <h1 class="text-2xl font-bold">Customer Complain</h1>
          <button
            class="text-white rounded-lg px-4 py-2 bg-[#079915] hover:bg-[#044b10]"
            @click="is_adding_complain = true"
          >
            Add Complain
          </button>
        </div>
        <div
          v-for="complain in service_request_by_pk.customer_complains"
          :key="complain.id"
          class="border rounded-lg shadow-lg mb-4 p-4"
        >
          <div class="flex justify-between">
            <div class="mb-4">
              <p class="p-2">
                {{ complain.created_at.split("T")[0] }}
              </p>
            </div>
            <div v-if="!complain.resolved">
              <button
                class="text-white rounded-lg px-4 py-2 bg-green-500 hover:bg-green-700"
                @click="resolveComplain(complain)"
              >
                Resolve
              </button>
            </div>
          </div>

          <div class="flex flex-col space-x-3 md:flex-row">
            <div class="mb-4 md:mr-4 w-full">
              <label
                class="text-gray-500 font-bold text-lg mb-2"
                for="customerPhone"
                >Complain</label
              >
              <p class="p-2">
                {{ complain.complain }}
              </p>
            </div>
          </div>
          <div class="flex justify-end mt-4">
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded-lg"
              @click="editReport(complain)"
            >
              Edit
            </button>
            <button
              class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
              @click="
                is_delete_modal_open = true;
                deleteFunction = async () => {
                  try {
                    let res = await complain_store.delete_complain(complain.id);
                    if (typeof res == 'string') {
                      notify({
                        title: 'Complain Deleted Successfully',
                        type: 'success',
                      });
                      is_delete_modal_open = false;
                      refetch({
                        id: service_request_by_pk.id,
                      });
                    } else {
                      notify({
                        title: 'Complain Not Deleted Successfully',
                        type: 'error',
                      });
                      is_delete_modal_open = false;
                    }
                  } catch (error) {
                    notify({
                      title: 'Complain Not Deleted Successfully',
                      type: 'error',
                    });
                    is_delete_modal_open = false;
                  }
                  return;
                };
              "
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <accessory_request
    :service_req_id="route.params.id"
    v-if="is_accessory_requesting"
    v-on:cancel="is_accessory_requesting = false"
    v-on:failed="failer_notifier"
    v-on:success="success_notifier"
  ></accessory_request>
  <add_technician_report
    :service_req_id="route.params.id"
    v-if="is_technician_report_requesting"
    v-on:cancel="is_technician_report_requesting = false"
    v-on:failed="failer_notifier"
    v-on:success="success_notifier"
  ></add_technician_report>
  <add_survey
    :service_req_id="route.params.id"
    v-if="is_adding_survey"
    v-on:failed="failer_notifier"
    v-on:success="success_notifier"
    v-on:cancel="is_adding_survey = false"
  ></add_survey>

  <add_complain
    :service_req_id="route.params.id"
    v-if="is_adding_complain"
    @failed="failer_notifier"
    @success="success_notifier"
    v-on:cancel="is_adding_complain = false"
  >
  </add_complain>
  <div class="h-3/4 w-full">
    <map></map>
  </div>
  <update_service_request
    v-if="is_updating_service_request"
    :id="$route.params.id"
    @failed="failer_notifier"
    @success="success_notifier"
    v-on:cancel="is_updating_service_request = false"
  ></update_service_request>
  <Delete
    v-if="is_delete_modal_open"
    @delete="deleteFunction"
    v-on:cancel="is_delete_modal_open = false"
  >
  </Delete>
</template>

<script setup>
import { useRoute } from "vue-router";
import { ref, onMounted, watchEffect, reactive, computed, watch } from "vue";
import { useQuery } from "@vue/apollo-composable";
import { serviceRequestStore } from "../stores/service_request_store";
import { addressStore } from "../stores/address";
import {
  QUESRY_SERVICE_REQUEST_DETAIL,
  QUERY_ALL_TECHNICIAN,
} from "../constants/queries";
import update_service_request from "../components/modal/update_service_request.vue";
import accessory_request from "../components/modal/accessory_request.vue";
import axios from "axios";
import add_technician_report from "../components/modal/add_technician_report.vue";
import add_complain from "../components/modal/add_complain.vue";
import add_survey from "../components/modal/add_survey.vue";
import map from "../components/modal/map.vue";
import Delete from "../components/modal/Delete.vue";
import { accessoryStore } from "../stores/accessory_store";
import { technicianReportStore } from "../stores/technician_report";
import { feedbackStore } from "../stores/feedback_store";
import { complainStore } from "../stores/complain_store";
import { notify } from "@kyvg/vue3-notification";
import apolloclient from "../apollo.config";
import gql from "graphql-tag";
const SALES_API = "https://apiforensys.hasura.app/api/rest/users";
const accessory_store = accessoryStore();
const technician_report_store = technicianReportStore();
const complain_store = complainStore();
const feedback_store = feedbackStore();
const is_updating_service_request = ref(false);
const is_delete_modal_open = ref(false);
const route = useRoute();
const service_request = serviceRequestStore();
const failer_notifier = (data) => {
  notify({
    title: data,
    type: "error",
  });
  is_updating_service_request.value = false;
  is_accessory_requesting.value = false;
  is_technician_report_requesting.value = false;
  is_adding_survey.value = false;
  is_adding_complain.value = false;
};
const success_notifier = (data) => {
  notify({
    title: data,
    type: "success",
  });
  is_updating_service_request.value = false;
  is_accessory_requesting.value = false;
  is_technician_report_requesting.value = false;
  is_adding_survey.value = false;
  is_adding_complain.value = false;
  refetch({
    id: route.params.id,
  });
};

const { error, loading, result, refetch } = useQuery(
  QUESRY_SERVICE_REQUEST_DETAIL,
  {
    id: route.params.id,
  }
);

const offset = ref(0);
const limit = ref(7);
const prev_page = () => {
  if (offset.value <= 0) return;
  offset.value -= limit.value;
  refetch({
    offset: offset.value,
    limit: limit.value,
  });
};
const next_page = () => {
  offset.value += limit.value;
  refetch({
    offset: offset.value,
    limit: limit.value,
  });
};
const zone_id = ref("");
const region_id = ref("");
const woreda_id = ref("");
const availability = ref(true);
const is_verified = ref(true);
const address = addressStore();
const regions = ref([]);
const zones = ref([]);
const woredas = ref([]);
const search = ref("");
const error_customer = ref("");
const customer_name = ref("");
const customer_id = ref("");
const customer_products = ref([]);
const customers = ref([]);
const products = ref({});
const is_accessory_requesting = ref(false);
const is_technician_report_requesting = ref(false);
const is_adding_survey = ref(false);
const is_adding_complain = ref(false);
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
        {
          address: {
            kebele: {
              name: { _ilike: search.value ? `%${search.value}%` : "%%" },
            },
          },
        },
        {
          address: {
            woreda: {
              name: { _ilike: search.value ? `%${search.value}%` : "%%" },
            },
          },
        },
        {
          address: {
            zone: {
              name: { _ilike: search.value ? `%${search.value}%` : "%%" },
            },
          },
        },
        {
          address: {
            region: {
              name: { _ilike: search.value ? `%${search.value}%` : "%%" },
            },
          },
        },
      ],
    },
    { availability: { _eq: availability.value } },
    { is_verified: { _eq: is_verified.value } },
  ],
});
onMounted(async () => {
  regions.value = await address.get_regions();
});
watchEffect(() => {
  address.get_zones(region_id.value);
  zones.value = address.zones;
});

watchEffect(() => {
  address.get_woredas(zone_id.value);
  woredas.value = address.woredas;
});
watch(region_id, (val) => {
  console.log("region_id", val);
  filter._and[0].address._and[0].region_id._in = [val];
  searchQuery();
});
watch(zone_id, (val) => {
  console.log("zone_id", val);
  filter._and[0].address._and[1].zone_id._in = [val];
  searchQuery();
});
watch(woreda_id, (val) => {
  console.log("woreda_id", val);
  filter._and[0].address._and[2].woreda_id._in = [val];
  searchQuery();
});
watch(search, (val) => {
  console.log("search", val);
  filter._and[1]._or[0].first_name._ilike = `%${val}%`;
  filter._and[1]._or[1].last_name._ilike = `%${val}%`;
  filter._and[1]._or[2].phone_number._ilike = `%${val}%`;
  filter._and[1]._or[3].address.kebele.name._ilike = `%${val}%`;
  filter._and[1]._or[4].address.woreda.name._ilike = `%${val}%`;
  filter._and[1]._or[5].address.zone.name._ilike = `%${val}%`;
  filter._and[1]._or[6].address.region.name._ilike = `%${val}%`;
});
const {
  error: errors,
  result: response,
  loading: loader,
  refetch: refetcher,
} = useQuery(QUERY_ALL_TECHNICIAN, {
  offset: offset.value,
  limit: limit.value,
  filter: filter,
  refetchOnMount: false,
  refetchOnReactiveChange: false,
});

// watchEffect(() => {
//   if (response.value) {
//     technicians.value = response.value?.technician;
//   }
// });
const technicians = computed(() => response.value?.technician ?? []);

const searchQuery = () => {
  console.log("searching");
  refetcher({
    offset: offset.value,
    limit: limit.value,
    filter: filter,
  });
};

const service_request_by_pk = computed(() => {
  return result.value?.service_request_by_pk;
});
const assign_technician = async (id, status) => {
  try {
    let res = await service_request.assign_technician({
      technician_id: id,
      id: route.params.id,
      is_in_warranty_request: status,
    });
    // notify({
    //   title: error.message || "Error",
    //   type: "waring",
    // });
    console.log("from the component", res);
  } catch (error) {
    notify({
      title: error.message || "Error",
      type: "error",
    });
  }
  await refetch();
};

const unassign_technician = async () => {
  try {
    await service_request.unassign_technician({
      id: route.params.id,
    });

    // notify({
    //   title: "Technician Retracted Successfully",
    //   type: "success",
    // });
  } catch (error) {
    notify({
      title: "Error",
      type: "error",
    });
    console.log(error);
  }
  await refetch();
};

watchEffect(async () => {
  let customer_id = result.value?.service_request_by_pk.customer_id;
  let order_item_id = result.value?.service_request_by_pk.order_item_id;
  console.log("customer_id", customer_id);  
  if (customer_id) {
    let res = await apolloclient.query({
      query: gql`
        query MyQuery($user_id: String = "") {
          get_customer_by_id(user_id: $user_id) {
            customer
          }
        }
      `,
      variables: {
        user_id: customer_id,
      },
    });
    customers.value = res.data.get_customer_by_id.customer;
  }
  if (order_item_id) {
  try {
      let res = await apolloclient.query({
        query: gql`
          query MyQuery($order_item_id: String = "") {
            get_product_by_id(order_item_id: $order_item_id) {
              product
            }
          }
        `,
        variables: {
          order_item_id: order_item_id,
        },      
      });
      products.value = res.data.get_product_by_id.product; 
  } catch (error) {
    console.log(error);
  } 
  }
});



const warranty_end_date = (pickup_date) => {
  let warranty_end_date = new Date(pickup_date);
  warranty_end_date.setFullYear(warranty_end_date.getFullYear() + 2);
  warranty_end_date = warranty_end_date.toISOString().slice(0, 10);
  return warranty_end_date;
};
</script>

<style></style>
