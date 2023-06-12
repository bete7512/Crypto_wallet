<template>
  <div
    id="overlay"
    class="fixed overlay top-0 left-0 right-0 bottom-0 flex z-10 overflow-y-scroll mx-2"
  >
    <div class="m-auto sm:w-4/6 w-full">
      <div class="fixed inset-0 transition-opacity">
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
      <div
        class="bg-white p-3 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:w-full"
      >
        <div class="mb-4">
          <div class="flex justify-between pl-7 items-center">
            <div class="flex text-center justify-center items-center">
              <h3
                class="text-lg font-bold pt-4 leading-6 text-gray-900 flex justify-center items-center text-center"
              >
                Service Request Registration Form
              </h3>
            </div>
            <button
              @click="discard"
              class="text-gray-400 hover:text-gray-500 focus:outline-none"
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

        <div class="bg-white rounded w-full h-auto pt-4 pb-2 mb-4">
          <div class="flex flex-wrap justify-center w-full space-x-4">
            <div class="sm:w-1/2 w-full">
              <div>Customer Information</div>
              <div class="mb-4">
                <label
                  class="block font-bold text-gray-700 text-base mb-2"
                  for="phone"
                >
                  Phone
                </label>
                <div class="flex space-x-2 justify-center items-center">
                  <!-- <input type="text" id="disabled-input" aria-label="disabled input" class="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Customer Name" disabled> -->

                  <input
                    v-model="service_request.customer_phone"
                    class="block w-full px-5 py-2 h-10 text-base text-neutral-600 placeholder-gray-500 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-200 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                    id="phone"
                    type="tel"
                    placeholder="Enter phone number"
                    required
                  />
                  <button
                    @click="findCustomer"
                    type="button"
                    class="text-white h-10 bg-[#0080FE] hover:bg-[#242840] focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm py-2 px-8 text-center"
                  >
                    <span v-if="!searching_customer"> search </span>
                    <span v-else
                      ><svg
                        aria-hidden="true"
                        role="status"
                        class="inline w-4 h-4 text-white animate-spin"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="#E5E7EB"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentColor"
                        />
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
              <div class="flex justify-between w-full">
                <!-- <div class="mb-4 sm:w-[47%]"> -->
                <!-- <label
                    class="block text-gray-700 font-bold mb-2"
                    for="customerName"
                  >
                    Customer Name
                  </label>
                  <input
                    v-model="customer_name"
                    class="block w-full px-5 py-2 h-10 text-base text-neutral-600 placeholder-gray-500 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-200 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300 shadow cursor-not-allowed appearance-none leading-tight focus:shadow-outline"
                    id="customerName"
                    type="text"
                    placeholder="Customer Name"
                    required
                    disabled
                  /> -->
                <!-- </div> -->
                <div class="mb-4 w-full">
                  <label class="block text-gray-700 font-bold mb-2" for="phone">
                    Phone 2
                  </label>
                  <div class="flex space-x-2 justify-center items-center">
                    <input
                      v-model="service_request.phone_two"
                      class="block w-full px-5 py-2 h-10 text-base text-neutral-600 placeholder-gray-500 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-200 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                      id="phone"
                      type="tel"
                      placeholder="Enter Phone Number"
                      required
                    />
                  </div>
                </div>
              </div>
              <div class="lg:flex flex-wrap py-2 items-center space-x-3">
                <div class="relative w-fit z-50">
                  <label class="block text-gray-700 text-sm font-bold">
                    Problem Classes
                  </label>
                  <button
                    @click="problem.is_problem = !problem.is_problem"
                    class="block px-5 h-10 text-base text-neutral-600 placeholder-gray-500 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-200 focus:border-transparent f-300 form-select focus:shadow-outline py-2 pl-3 pr-10 text-left w-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <span>
                      {{
                        service_request.problem_class_id
                          ? `${
                              problems.find(
                                (problem) =>
                                  problem.id ===
                                  service_request.problem_class_id
                              )?.name ?? "Unknown problem class"
                            }`
                          : " Service Class"
                      }}
                    </span>
                    <svg
                      :class="{ 'transform rotate-180': problem.is_problem }"
                      class="absolute inset-y-0 right-0 w-5 h-5 mt-2 mr-3 pointer-events-none text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M10 12a1 1 0 0 1-.7-.3l-4-4a1 1 0 1 1 1.4-1.4l3.3 3.3 3.3-3.3a1 1 0 1 1 1.4 1.4l-4 4A1 1 0 0 1 10 12z"
                      />
                    </svg>
                  </button>
                  <div
                    v-if="problem.is_problem"
                    id="modal"
                    class="absolute z-50 overflow-y-scroll max-h-60 w-full mt-2 bg-gray-200 rounded-md shadow-lg scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
                  >
                    <div
                      v-for="pro in problems"
                      :key="pro.id"
                      @click="problem.select_problem(pro)"
                      class="cursor-pointer hover:bg-blue-50 px-4 py-2"
                    >
                      {{ pro.name }}
                    </div>
                    <div
                      v-if="problem.show_add_problem_option"
                      class="px-4 py-1 space-y-2"
                    >
                      <input
                        v-model="new_problem"
                        placeholder="Enter a new option"
                        class="block w-full px-5 py-2 h-10 text-base text-neutral-600 placeholder-gray-500 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-white focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                      />
                      <button
                        @click="problem.add_new_problem()"
                        class="text-white h-8 bg-[#EF4104] hover:bg-[#a02f05] focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm py-1 px-5 text-center"
                      >
                        Save
                      </button>
                    </div>
                    <div v-else class="px-4 py-2">
                      <button
                        @click="problem.show_add_problem_option = true"
                        class="text-white h-8 bg-[#EF4104] hover:bg-[#a02f05] focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm py-1 px-5 text-center"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
                <div class="relative w-fit">
                  <h1>Regions</h1>
                  <button
                    @click="region.is_region = !region.is_region"
                    class="block px-5 h-10 text-base text-neutral-600 placeholder-gray-500 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-200 focus:border-transparent f-300 form-select focus:shadow-outline py-2 pl-3 pr-10 text-left w-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <span class="text-sm">
                      {{
                        service_request.region_id
                          ? `${
                              regions.find(
                                (region) =>
                                  region.id === service_request.region_id
                              )?.name ?? "Unknown region"
                            }`
                          : "Region"
                      }}
                    </span>
                    <svg
                      :class="{ 'transform rotate-180': region.is_region }"
                      class="absolute inset-y-0 right-0 w-5 h-5 mt-2 mr-3 pointer-events-none text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M10 12a1 1 0 0 1-.7-.3l-4-4a1 1 0 1 1 1.4-1.4l3.3 3.3 3.3-3.3a1 1 0 1 1 1.4 1.4l-4 4A1 1 0 0 1 10 12z"
                      />
                    </svg>
                  </button>
                  <transition name="fade">
                    <div
                      v-if="region.is_region"
                      class="overflow-y-scroll max-h-60 z-10 w-fit mt-2 bg-gray-200 rounded-md shadow-lg absolute"
                    >
                      <div
                        v-for="reg in regions"
                        :key="reg.id"
                        @click="region.select_region(reg)"
                        class="cursor-pointer hover:bg-blue-50 px-4 py-2"
                      >
                        {{ reg.name }}
                      </div>
                      <div
                        v-if="region.show_add_region_option"
                        class="px-4 py-1 space-y-2"
                      >
                        <input
                          v-model="new_region"
                          placeholder="Enter a new option"
                          class="block w-full px-5 py-2 h-10 text-base text-neutral-600 placeholder-gray-500 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-white focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                        />
                        <button
                          @click="region.add_new_region"
                          class="text-white h-8 bg-[#EF4104] hover:bg-[#a02f05] focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm py-1 px-5 text-center"
                        >
                          Save
                        </button>
                      </div>
                      <div v-else class="px-4 py-1">
                        <button
                          @click="region.show_add_region_option = true"
                          class="text-white h-8 bg-[#EF4104] hover:bg-[#a02f05] focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm py-1 px-5 text-center"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </transition>
                </div>

                <div class="relative w-fit">
                  <h1>Zones</h1>
                  <button
                    @click="zone.is_zone = !zone.is_zone"
                    class="block px-5 h-10 text-base text-neutral-600 placeholder-gray-500 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-200 focus:border-transparent f-300 form-select focus:shadow-outline py-2 pl-3 pr-10 text-left w-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <span>
                      {{
                        service_request.zone_id
                          ? `${
                              zones.find(
                                (zone) => zone.id === service_request.zone_id
                              )?.name ?? "Zone"
                            }`
                          : "Zone"
                      }}
                    </span>
                    <svg
                      :class="{ 'transform rotate-180': zone.is_zone }"
                      class="absolute inset-y-0 right-0 w-5 h-5 mt-2 mr-3 pointer-events-none text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M10 12a1 1 0 0 1-.7-.3l-4-4a1 1 0 1 1 1.4-1.4l3.3 3.3 3.3-3.3a1 1 0 1 1 1.4 1.4l-4 4A1 1 0 0 1 10 12z"
                      />
                    </svg>
                  </button>
                  <transition name="">
                    <div
                      v-if="zone.is_zone"
                      class="overflow-y-scroll max-h-60 z-10 w-fit mt-2 bg-gray-200 rounded-md shadow-lg absolute"
                    >
                      <div
                        v-for="zo in zones"
                        :key="zo.id"
                        @click="zone.select_zone(zo)"
                        class="cursor-pointer hover:bg-blue-50 px-4 py-2"
                      >
                        {{ zo.name }}
                      </div>
                      <div
                        v-if="zone.show_add_zone_option"
                        class="px-4 py-2 space-y-2"
                      >
                        <input
                          v-model="new_zone"
                          placeholder="Enter a new option"
                          class="block w-full px-5 py-2 h-10 text-base text-neutral-600 placeholder-gray-500 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-white focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                        />
                        <button
                          @click="zone.add_new_zone"
                          class="text-white h-8 bg-[#EF4104] hover:bg-[#a02f05] focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm py-1 px-5 text-center"
                        >
                          Save
                        </button>
                      </div>
                      <div v-else class="px-4 py-2">
                        <button
                          @click="zone.show_add_zone_option = true"
                          class="text-white h-8 bg-[#EF4104] hover:bg-[#a02f05] focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm py-1 px-5 text-center"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </transition>
                </div>

                <div class="relative w-fit">
                  <h1>Woredas</h1>
                  <button
                    @click="woreda.is_woreda = !woreda.is_woreda"
                    class="block px-5 h-10 text-base text-neutral-600 placeholder-gray-500 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-200 focus:border-transparent f-300 form-select focus:shadow-outline py-2 pl-3 pr-10 text-left w-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <span>
                      {{
                        service_request.woreda_id
                          ? `${
                              woredas.find(
                                (woreda) =>
                                  woreda.id === service_request.woreda_id
                              )?.name ?? "Unknown"
                            }`
                          : " woreda"
                      }}
                    </span>
                    <svg
                      :class="{ 'transform rotate-180': woreda.is_woreda }"
                      class="absolute inset-y-0 right-0 w-5 h-5 mt-2 mr-3 pointer-events-none text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M10 12a1 1 0 0 1-.7-.3l-4-4a1 1 0 1 1 1.4-1.4l3.3 3.3 3.3-3.3a1 1 0 1 1 1.4 1.4l-4 4A1 1 0 0 1 10 12z"
                      />
                    </svg>
                  </button>
                  <div
                    v-if="woreda.is_woreda"
                    class="overflow-y-scroll max-h-60 z-10 w-full mt-2 bg-gray-200 rounded-md shadow-lg absolute"
                  >
                    <div
                      v-for="wo in woredas"
                      :key="wo.id"
                      @click="woreda.select_woreda(wo)"
                      class="cursor-pointer hover:bg-blue-50 px-4 py-2"
                    >
                      {{ wo.name }}
                    </div>
                    <div
                      v-if="woreda.show_add_woreda_option"
                      class="px-4 py-1 space-y-2"
                    >
                      <input
                        v-model="new_woreda"
                        placeholder="Enter a new option"
                        class="block w-full px-5 py-2 h-10 text-base text-neutral-600 placeholder-gray-500 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-white focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                      />
                      <button
                        @click="woreda.add_new_woreda"
                        class="text-white h-8 bg-[#EF4104] hover:bg-[#a02f05] focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm py-1 px-5 text-center"
                      >
                        Save
                      </button>
                    </div>
                    <div v-else class="px-4 py-2">
                      <button
                        @click="woreda.show_add_woreda_option = true"
                        class="text-white h-8 bg-[#EF4104] hover:bg-[#a02f05] focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm py-1 px-5 text-center"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div class="mb-4">
                <label
                  class="block text-gray-700 font-bold mb-2"
                  for="service_request.problem_description"
                >
                  Enter Kebele Detail
                </label>
                <textarea
                  v-model="service_request.k_name"
                  class="shadow appearance-none border h-12 text-base bg-gray-200 rounded w-full py-2 px-3 placeholder-gray-500 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="service_request.k_name"
                  placeholder="Enter Kebele Detail"
                  required
                ></textarea>
              </div>
              <div class="mb-4">
                <label
                  class="block text-gray-700 font-bold mb-2"
                  for="service_request.problem_description"
                >
                  Problem Description
                </label>
                <textarea
                  v-model="service_request.problem_description"
                  class="shadow appearance-none border h-24 text-base bg-gray-200 rounded w-full py-2 px-3 placeholder-gray-500 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="service_request.problem_description"
                  placeholder="Enter problem description"
                  required
                ></textarea>
              </div>
            </div>

            <div class="sm:w-[45%] w-full space-y-3">
              <div>
                <label class="block text-gray-700 font-bold mb-2">
                  Customers Product
                </label>
              </div>
              <div class="mb-4">
                <div class="overflow-y-scroll max-h-screen">
                  Orders
                  <div class="bg-gray-200 rounded-lg mx-2 p-3">
                    <h3 class="text-md font-bold py-1">User Information:</h3>
                    <p class="py-1 capitalize">
                      Name: {{ customers?.first_name }}
                      {{ customers?.last_name }}
                    </p>
                    <p class="py-1">
                      Phone Number: {{ customers?.phone_number }}
                    </p>
                    <!-- <h3 class="text-md font-bold mb-2">Shop Information:</h3>
                      <p class="mb-4">Shop ID: {{ order.shop.id }}</p>
                      <p class="mb-4">Kebele: {{ order.shop.kebele }}</p>
                      <p class="mb-4">Latitude: {{ order.shop.latitude }}</p>
                      <p class="mb-4">Longitude: {{ order.shop.longitude }}</p> -->
                  </div>
                  <div
                    v-if="customer_products.length > 0"
                    v-for="(order, index) in customer_products.filter(
                      (item) => item.order_status.status_name === 'completed'
                    )"
                    :key="order.id"
                    class="overflow-y-scroll h-full"
                  >
                    <div class="mt-4 mx-2" v-if="order.order_items.length > 0">
                      <h3 class="text-md font-bold mb-2">Product Items:</h3>
                      <div class="flex justify-end">
                        <div
                          class="sm:flex block justify-center items-center space-x-2"
                        >
                          <div class="mr-2 py-2 text-lg">
                            <router-link
                              to="/map-technician"
                              class="bg-[#0080FE] hover:bg-[#242840] text-white px-6 py-4 h-10 flex justify-center items-center rounded-lg text-sm"
                              data-tippy-content="Register New Service Request"
                              data-tippy-placement="bottom"
                            >
                              <span class="text-white"> Map </span>
                            </router-link>
                          </div>
                        </div>
                      </div>

                      <div
                        v-for="(item, i) in order.order_items"
                        :key="item.id"
                        class="p-4 relative shadow-md bg-slate-300 rounded-lg mb-4"
                      >
                        <div class="absolute mx-2 top-2 text-xl right-0 flex">
                          <input
                            v-model="tempo_order_items[i].is_selected"
                            class="h-4 w-4"
                            value="true"
                            type="checkbox"
                          />
                        </div>

                        <div class="flex justify-between mt-2">
                          <p class="">Pickup Date: {{ order.pickup_date }}</p>
                          <p class="">
                            Warranty End Date:
                            {{ warranty_end_date(order.pickup_date) }}
                          </p>
                        </div>
                        <div class="flex items-center gap-2">
                          <input
                            value="true"
                            v-model="tempo_order_items[i].is_warranty"
                            class="h-4 w-4"
                            type="checkbox"
                          />
                          <p
                            :class="[
                              warranty_end_date(
                                order.pickup_date.getSeconds >
                                  new Date().getSeconds
                              )
                                ? 'text-green-800'
                                : 'text-red-600',
                            ]"
                          >
                            Is Warranty Product
                          </p>
                        </div>
                        <p class="mb-2">Brand: {{ item.product.brand }}</p>
                        <p class="mb-2">Product: {{ item.product.model }}</p>
                        <p class="mb-2">Quantity: {{ item.quantity }}</p>
                        <p class="mb-2">Unit Price: {{ item.unit_price }}</p>
                        <p class="mb-2">
                          Total Price: {{ item.quantity * item.unit_price }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="flex justify-center items-center text-center text-red-900"
          >
            {{ errorMessage }}
          </div>
          <div class="bg-gray-50 px-4 space-x-3 py-3 flex justify-end">
            <button
              @click="discard"
              class="bg-[#F23207] hover:bg-[#711702] text-white font-bold py-2 px-4 rounded-lg mr-2"
            >
              Cancel
            </button>
            <button
              @click="onSubmit"
              class="bg-[#46C40F] hover:bg-[#123503] text-white font-bold py-2 px-4 rounded-lg"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import {
  ref,
  computed,
  watchEffect,
  reactive,
  onMounted,
  onBeforeMount,
  defineEmits,
  watch,
} from "vue";
import { addressStore } from "../../stores/address";
import { problemStore } from "../../stores/problem_class";
import axios from "axios";
import { serviceRequestStore } from "../../stores/service_request_store";
import apolloclient from "../../apollo.config";
import {
  GET_CUSTOMER_BY_ID,
  GET_CUSTOMER_BY_PHONE,
  GET_CUSTOMER_PRODUCTS,
} from "../../constants/queries";
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});
const errorMessage = ref("");
const emit = defineEmits(["cancel", "success", "failed"]);
const discard = (event) => {
  emit("cancel");
};
const address = addressStore();
const problem_store = problemStore();
const service_request = serviceRequestStore();
const problems = ref([]);
const add_service_request_process = ref(false);
const new_region = ref("");
const customer_name = ref("");
const customer_products = ref([]);
const error_customer = ref("");
const customers = ref({});
const searching_customer = ref(false);
const regions = ref([]);
const zones = ref([]);
const woredas = ref([]);
const user_id = ref("");
const customer_phone = ref("");
const customer_id = ref("");
const tempo_order_items = ref([]); //temporary order items
const region = reactive({
  is_region: false,
  selected_region: {},
  show_add_region_option: false,
  select_region: (reg) => {
    if (reg == null) return;
    console.log("select region");
    region.selected_region = reg;
    service_request.region_id = reg.id;
    region.is_region = false;
  },
  add_new_region: async () => {
    let hold = await address.insert_region(new_region.value);
    if (typeof hold == "string") {
      regions.value.push({ id: hold, name: new_region.value });
    }
  },
});
const new_problem = ref("");
const problem = reactive({
  is_problem: false,
  selected_problem: {},
  show_add_problem_option: false,
  select_problem: async (pro) => {
    console.log("select problem");
    problem.selected_problem = pro;
    service_request.problem_class_id = pro.id;
    problem.is_problem = false;
  },
  add_new_problem: async () => {
    let hold = await problem_store.insert_problem_class(new_problem.value);
    problems.value.push(hold);
    problem.show_add_problem_option = false;
  },
});
const new_zone = ref("");
const zone = reactive({
  is_zone: false,
  selected_zone: {},
  show_add_zone_option: false,
  select_zone: (zo) => {
    if (zo == null) return;
    console.log("select zone");
    zone.selected_zone = zo;
    service_request.zone_id = zo.id;
    zone.is_zone = false;
  },
  add_new_zone: async () => {
    let hold = await address.insert_zone(
      new_zone.value,
      region.selected_region.id
    );
    if (typeof hold == "string") {
      zones.value.push({ id: hold, name: new_zone.value });
      zone.show_add_zone_option = false;
    }
  },
});
const new_woreda = ref("");
const woreda = reactive({
  is_woreda: false,
  selected_woreda: {},
  show_add_woreda_option: false,
  select_woreda: (wo) => {
    if (wo == null) return;
    woreda.selected_woreda = wo;
    service_request.woreda_id = wo.id;
    woreda.is_woreda = false;
  },
  add_new_woreda: async () => {
    let hold = await address.insert_woreda(
      new_woreda.value,
      zone.selected_zone.id
    );
    if (typeof hold == "string") {
      woredas.value.push({ id: hold, name: new_woreda.value });
      woreda.show_add_woreda_option = false;
    }
  },
});

watchEffect(async () => {
  await address.get_zones(service_request.region_id);
  if (service_request.region_id) {
    address.get_zones(service_request.region_id);
  }
  zones.value = [...address.zones];
});

watchEffect(() => {
  address.get_woredas(service_request.zone_id);
  if (service_request.zone_id) {
    address.get_woredas(service_request.zone_id);
  }
  woredas.value = [...address.woredas];
});

watchEffect(async () => {
  await address.get_zones(service_request.region_id);
  if (service_request.region_id) {
    address.get_zones(service_request.region_id);
  }
  zones.value = [...address.zones];
});
watchEffect(async () => {
  if (service_request.problem_class_id) {
    await problem_store.get_problem_class(service_request.problem_class_id);
  }
});
watchEffect(() => {
  if (!service_request.region_id) {
    address.zones = [];
  }
  if (!service_request.zone_id && !service_request.woreda_id) {
    address.woredas = [];
  }
});

onMounted(async () => {
  regions.value = [...(await address.get_regions())];
  // await problem_store.get_problem_class();
  // problems.value = [...problem_store.problems];
});
onMounted(async () => {
  regions.value = [...(await address.get_regions())];
  // await problem_store.get_problem_class();
  problems.value = [...(await problem_store.get_problem_class())];
  await service_request.get_service_request_by_id(props.id);
  // region.selected_region.
  customers.value = await findCustomer();
});


async function findCustomer() {
  searching_customer.value = true;
  if (service_request.customer_phone.length < 10) {
    error_customer.value = "phone number should be 10 digits";
    searching_customer.value = false;
    return;
  }
  customers.value = await fetch_customer_data();
  if (!customers.value) {
    error_customer.value = "customer doesnot exist";
    searching_customer.value = false;
    return;
  }
  console.log(customers.value.first_name);
  customer_name.value =
    customers.value.first_name + " " + customers.value.last_name;
  service_request.customer_id = customers.value.id;
  searching_customer.value = false;
}

async function fetch_customer_data() {
  let response;
  try {
    const res = await apolloclient.query({
      query: GET_CUSTOMER_BY_PHONE,
      variables: {
        phone: service_request.customer_phone,
      },
    });
    response = res.data.get_customer_by_phone.customer;
    user_id.value = response.id;
    if (user_id.value) {
      try {
        const res2 = await apolloclient.query({
          query: GET_CUSTOMER_PRODUCTS,
          variables: {
            user_id: user_id.value.toString(),
          },
        });
        customer_products.value = res2.data.get_customer_product.product;
        tempo_order_items.value = [].concat(
          ...res2.data.get_customer_product.product.map((product) => {
            const items = product.order_items.map((order_item) => {
              if (service_request.order_item_id == order_item.id) {
                return {
                  product_id: product.id,
                  order_id: order_item.id,
                  is_selected: true,
                  is_warranty: service_request.is_in_warranty_request,
                };
              } else {
                return {
                  product_id: product.id,
                  order_id: order_item.id,
                  is_selected: false,
                  is_warranty: false,
                };
              }
            });
            return items;
          })
        );

        console.log("All Over the World", customer_products.value);
        console.log("It was very amazing" + typeof customer_products);
      } catch (error) {
        console.error("Error:", error);
      }
    }
    return response;
  } catch (error) {
    error_customer.value = "customer doesnot exist";
    console.log(error);
    return;
  }
}

async function onSubmit() {
  if (!service_request.customer_id) {
    error_customer.value = "customer does not exist";
    return;
  }
  if (!service_request.problem_class_id) {
    errorMessage.value = "problem is required";
    return;
  }
  try {
    add_service_request_process.value = true;
    const response = await service_request.update_service_request_by_id(
      props.id
    );
    add_service_request_process.value = false;
    // if (typeof response == "string") {
    //   let data = "Service Request Registered successfully";
    //   emit("success", data);
    // } else {
    //   let data = "Failed to register Service Request";
    //   emit("failed", data);
    // }
  } catch (error) {
    let data = "Failed to To register Service Request";
    emit("failed", data);
    add_service_request_process.value = false;
  }
}
const warranty_end_date = (pickup_date) => {
  let warranty_end_date = new Date(pickup_date);
  warranty_end_date.setFullYear(warranty_end_date.getFullYear() + 2);
  warranty_end_date = warranty_end_date.toISOString().slice(0, 10);
  return warranty_end_date;
};
// import { ref, watchEffect, reactive, onMounted } from "vue";
// import { addressStore } from "../../stores/address";
// import { problemStore } from "../../stores/problem_class";
// import axios from "axios";
// import { serviceRequestStore } from "../../stores/service_request_store";
// const emit = defineEmits(["cancel", "success", "failed"]);
// const discard = (event) => {
//   emit("cancel");
// };
// const props = defineProps({
//   id: {
//     type: String,
//     required: true,
//   },
// });
// const customer_name = ref("");
// const customer_products = ref([]);
// const error_customer = ref("");
// const customers = ref({});
// const searching_customer = ref(false);
// const regions = ref([]);
// const zones = ref([]);
// const woredas = ref([]);
// const errorMessage = ref("");
// const services = ref([]);
// const address = addressStore();
// const problem_store = problemStore();
// const service_request = serviceRequestStore();
// const problems = ref([]);
// const add_service_request_process = ref(false);
// const new_region = ref("");
// const region = reactive({
//   is_region: false,
//   selected_region: {},
//   show_add_region_option: false,
//   select_region: (reg) => {
//     console.log("select region");
//     region.selected_region = reg;
//     service_request.region_id = reg.id;
//     region.is_region = false;
//   },
//   add_new_region: async () => {
//     let hold = await address.insert_region(new_region.value);
//     if (typeof hold == "string") {
//       regions.value.push({ id: hold, name: new_region.value });
//     }
//   },
// });
// const new_problem = ref("");
// const problem = reactive({
//   is_problem: false,
//   selected_problem: {},
//   show_add_problem_option: false,
//   select_problem: async (pro) => {
//     console.log("select problem");
//     problem.selected_problem = pro;
//     service_request.problem_class_id = pro.id;
//     problem.is_problem = false;
//   },
//   add_new_problem: async () => {
//     let hold = await problem_store.insert_problem_class(new_problem.value);
//     problems.value.push(hold);
//     problem.show_add_problem_option = false;
//   },
// });
// const new_woreda = ref("");
// const new_zone = ref("");
// const zone = reactive({
//   is_zone: false,
//   selected_zone: {},
//   show_add_zone_option: false,
//   select_zone: (zo) => {
//     zone.selected_zone = zo;
//     service_request.zone_id = zo.id;
//     zone.is_zone = false;
//   },
//   add_new_zone: async () => {
//     let hold = await address.insert_zone(
//       new_zone.value,
//       service_request.region_id
//     );
//     if (typeof hold == "string") {
//       zones.value.push({ id: hold, name: new_zone.value });
//       zone.show_add_zone_option = false;
//     }
//   },
// });
// const woreda = reactive({
//   is_woreda: false,
//   selected_woreda: {},
//   show_add_woreda_option: false,
//   select_woreda: (wo) => {
//     woreda.selected_woreda = wo;
//     service_request.woreda_id = wo.id;
//     woreda.is_woreda = false;
//   },
//   add_new_woreda: async () => {
//     let hold = await address.insert_woreda(
//       new_woreda.value,
//       service_request.zone_id
//     );
//     if (typeof hold == "string") {
//       woredas.value.push({ id: hold, name: new_woreda.value });
//       woreda.show_add_woreda_option = false;
//     }
//   },
// });

// watchEffect(() => {
//   address.get_woredas(zone.selected_zone.id);
//   if (service_request.zone_id) {
//     zone.selected_zone.id = service_request.zone_id;
//     address.get_woredas(service_request.zone_id);
//   }
//   woredas.value = [...address.woredas];
// });
// watchEffect(async () => {
//   await address.get_zones(region.selected_region.id);
//   if (service_request.region_id) {
//     region.selected_region.id = service_request.region_id;
//     address.get_zones(service_request.region_id);
//   }
//   zones.value = [...address.zones];
// });

// watchEffect(() => {
//   address.get_woredas(zone.selected_zone.id);
//   if (service_request.zone_id) {
//     address.get_woredas(service_request.zone_id);
//   }
//   woredas.value = [...address.woredas];
// });
// watchEffect(async () => {
//   await address.get_zones(region.selected_region.id);
//   if (service_request.region_id) {
//     address.get_zones(service_request.region_id);
//   }
//   zones.value = [...address.zones];
// });
// watchEffect(() => {
//   if (!region.selected_region.id && !service_request.region_id) {
//     address.zones = [];
//   }
//   if (!zone.selected_zone.id && !service_request.zone_id && !service_request.woreda_id) {
//     address.woredas = [];
//   }
// });
// watchEffect(async () => {
//   if (service_request.region_id) {
//     await address.get_zones(service_request.region_id);
//   }
//   zones.value = [...address.zones];
// });

// watchEffect(async () => {
//   if (service_request.region_id) {
//     await address.get_zones(service_request.region_id);
//   }
//   zones.value = [...address.zones];
// });
// onMounted(async () => {
//   regions.value = [...(await address.get_regions())];
//   await problem_store.get_problem_class();
//   problems.value = [...problem_store.problems];
//   await service_request.get_service_request_by_id(props.id);
//   customers.value = await findCustomer();
// });

// async function findCustomer() {
//   searching_customer.value = true;
//   if (service_request.customer_phone.length < 10) {
//     error_customer.value = "phone number must be 10 digits";
//     searching_customer.value = false;
//     return;
//   }
//   customers.value = await fetch_customer_data();
//   if (!customers.value) {
//     error_customer.value = "customer doesnot exist";
//     searching_customer.value = false;
//     return;
//   }
//   console.log(customers.value.first_name);
//   customer_name.value =
//     customers.value.first_name + " " + customers.value.last_name;
//   service_request.customer_id = customers.value.id;
//   customer_products.value = customers.value.products;
//   searching_customer.value = false;
//   console.log(customer_products);
// }

// async function fetch_customer_data() {
//   let response;
//   try {
//     response = await axios.post(
//       "https://apiforensys.hasura.app/api/rest/users",
//       {
//         phone: service_request.customer_phone,
//       }
//     );
//     console.log(response.data);
//   } catch (error) {
//     console.log(error);
//     return error;
//   }
//   return response.data.customers[0];
// }
// async function onSubmit() {
//   if (!service_request.customer_id) {
//     error_customer.value = "customer does not exist";
//     return;
//   }
//   try {
//     add_service_request_process.value = true;
//     const response = await service_request.update_service_request_by_id(
//       props.id
//     );
//     add_service_request_process.value = false;
//     if (typeof response == "string") {
//       let data = "Service Request Updated successfully";
//       emit("success", data);
//     } else {
//       let data = "Failed to To Update Service Request";
//       emit("failed", data);
//     }
//   } catch (error) {
//     let data = "Failed to To Update Service Request";
//     emit("failed", data);
//     add_service_request_process.value = false;
//   }
// }
</script>

<style>
#overlay {
  position: fixed;
  background-color: rgba(0, 0, 0, 0);
  z-index: 100;
}

#modal {
  z-index: 1000;
}
</style>
