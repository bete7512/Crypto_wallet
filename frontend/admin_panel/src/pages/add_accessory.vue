<template>
    <div class="flex items-center bg-white sm:mx-5 mb-4 rounded-lg justify-center">
      <div class="w-full">
        <div class="bg-white p-6 sm:p-0  w-full rounded-lg shadow-lg">
          <div class="flex justify-between p-5">
            <div class=" flex justify-start">
              <router-link to="/services" class="">
                <button
                  class="bg-[#EF4104] hover:bg-[#a02f05] text-white  mb-2  rounded-full p-3"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-9 w-9 text-white"
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
              </router-link>
            </div>
            <div class="w-1/2 flex justify-start">
  
              <h2 class="text-2xl mb-6 flex text-center justify-center items-center font-extrabold ">Service Request Form</h2>
            </div>
          </div>
          <form
            class="bg-white rounded w-full  pt-6 pb-8 mb-4"
            @submit.prevent="accessory.insert_accessory()"
          >
            <div class="flex flex-wrap justify-center w-full space-x-4">
              <div class="sm:w-[45%] w-full">
                <div class="mb-4">
                  <label class="block font-bold text-gray-700 text-lg mb-2" for="phone">
                    Phone
                  </label>
                  <div class="flex space-x-2 justify-center items-center">
                    <!-- <input type="text" id="disabled-input" aria-label="disabled input" class="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Customer Name" disabled> -->
  
                    <input
                      v-model="phone_one"
                      class="block w-full px-5 py-3  h-12 text-xl text-neutral-600 placeholder-gray-500 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-200 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                      id="phone"
                      type="tel"
                      placeholder="Enter phone number"
                      required
                    />
                    <button
                      @click="findCustomer"
                      type="button"
                      class="text-white h-12 bg-[#EF4104] hover:bg-[#a02f05] focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm py-3 px-8 text-center"
                    >
                      <span v-if="!searching_customer"> search </span>
                      <span v-else
                        ><svg
                          aria-hidden="true"
                          role="status"
                          class="inline w-4 h-4  text-white animate-spin"
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
                        </span
                      >
                    </button>
                  </div>
                </div>
                <div class="mb-4">
                  <label
                    class="block text-gray-700 font-bold mb-2"
                    for="customerName"
                  >
                    Customer Name
                  </label>
                  <input
                    v-model="customer_name"
                    class="block w-full px-5 py-3  h-12 text-xl text-neutral-600 placeholder-gray-500 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-200 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300 shadow  cursor-not-allowed appearance-none  leading-tight focus:shadow-outline"
                    id="customerName"
                    type="text"
                    placeholder=" customer name"
                    required
                    disabled
                  />
                  <span class="text-red-600">{{ error_customer }}</span>
                </div>
                <div class="mb-4">
                  <label class="block text-gray-700 font-bold mb-2" for="phone">
                    Phone 2
                  </label>
                  <div class="flex space-x-2 justify-center items-center">
                    <!-- <input type="text" id="disabled-input" aria-label="disabled input" class="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Customer Name" disabled> -->
  
                    <input
                      v-model="phone_two"
                      class="block w-full px-5 py-3  h-12 text-xl text-neutral-600 placeholder-gray-500 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-200 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                      id="phone"
                      type="tel"
                      placeholder="Enter Phone Number"
                      required
                    />
                  </div>
                </div>
                <div class="mb-4">
                  <label
                    class="block text-gray-700 font-bold mb-2"
                    for="problemClass"
                  >
                    Problem Class
                  </label>
                  <select
                    v-model="problem_class_id"
                    class="block w-full px-5 py-3  h-12 text-xl text-neutral-600 placeholder-gray-500 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-200 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300 form-select focus:shadow-outline"
                    id="problemClass"
                  >
                    <option value="" disabled>Select problem class</option>
                    <option
                      v-for="problemClassOption in problemClassOptions"
                      :key="problemClassOption"
                      :value="problemClassOption.id"
                    >
                      {{ problemClassOption.name }}
                    </option>
                  </select>
                </div>
                <div class="mb-4">
                  <label class="block text-gray-700 font-bold mb-2" for="product">
                    Product
                  </label>
                  <select
                    v-model="product_id"
                    class="block w-full px-5 py-3  h-12 text-xl text-neutral-600 placeholder-gray-500 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-200 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300 form-select focus:shadow-outline"
                    id="product"
                  >
                    <option value="" disabled>Select product</option>
                    <option
                      v-for="product in customer_products"
                      :key="product.id"
                      :value="product.id"
                    >
                      {{ product.name }}
                    </option>
                  </select>
                </div>
                <div class="mb-4">
                  <label
                    class="block text-gray-700 font-bold mb-2"
                    for="problemDescription"
                  >
                    Problem Description
                  </label>
                  <textarea
                    v-model="problemDescription"
                    class="shadow appearance-none border h-24 text-xl bg-gray-200 rounded w-full py-2 px-3 placeholder-gray-500 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="problemDescription"
                    placeholder="Enter problem description"
                    required
                  ></textarea>
                </div>
              </div>
              <div class="sm:w-[45%] w-full">
                <div class="mb-4">
                  <label
                    class="block text-gray-700 font-bold mb-2"
                    for="problemClass"
                  >
                    Region
                  </label>
                  <select
                    v-model="region_id"
                    class="block w-full px-5 py-3  h-12 text-xl text-neutral-600 placeholder-gray-500 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-200 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300 form-select focus:shadow-outline"
                    id="problemClass"
                  >
                    <option value="" disabled>Select Region</option>
                    <option
                      v-for="region in regions"
                      :key="region.id"
                      :value="region.id"
                    >
                      {{ region.name }}
                    </option>
                  </select>
                </div>
                <div class="mb-4">
                  <label
                    class="block text-gray-700 font-bold mb-2"
                    for="problemClass"
                  >
                    Zone
                  </label>
                  <select
                    v-model="zone_id"
                    class="block w-full px-5 py-3  h-12 text-xl text-neutral-600 placeholder-gray-500 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-200 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300 form-select focus:shadow-outline"
                    id="problemClass"
                  >
                    <option value="" disabled>Select Zone</option>
                    <option v-for="zone in zones" :key="zone.id" :value="zone.id">
                      {{ zone.name }}
                    </option>
                  </select>
                </div>
                <div class="mb-4">
                  <label class="block text-gray-700 font-bold mb-2" for="product">
                    Woreda
                  </label>
                  <select
                    v-model="woreda_id"
                    class="block w-full px-5 py-3  h-12 text-xl text-neutral-600 placeholder-gray-500 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-200 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300 form-select focus:shadow-outline"
                    id="product"
                  >
                    <option value="" disabled>Select woreda</option>
                    <option
                      v-for="woreda in woredas"
                      :key="woreda.id"
                      :value="woreda.id"
                    >
                      {{ woreda.name }}
                    </option>
                  </select>
                </div>
                <div class="mb-4">
                  <label
                    class="block text-gray-700 font-bold mb-2"
                    for="problemDescription"
                  >
                    Enter Kebele Detail
                  </label>
                  <textarea
                    v-model="kebele"
                    class="shadow appearance-none border h-24 text-xl bg-gray-200 rounded w-full py-2 px-3 placeholder-gray-500 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="problemDescription"
                    placeholder="Enter problem description"
                    required
                  ></textarea>
                </div>
              </div>
            </div>
            <div class="flex justify-center w-full sm:px-16 items-center">
              <button
                type="submit"
                @click="onSubmit"
                class="flex items-center py-3 rounded-lg h-12 justify-center  w-full px-10  text-base font-medium text-center text-white transition duration-500 ease-in-out transform bg-[#EF4104] hover:bg-[#a02f05] focus:outline-none focus:ring-2 focus:ring-offset-2 "
              >
                <div v-if="add_service_request_process" class="text-2xl">
                  <svg
                    role="status"
                    class="inline mr-3 w-4 h-4 text-white animate-spin"
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
                  <span class="text-lg">
  
                    Registering...
                  </span>
                </div>
                <div v-else class="text-lg font-bold">Register</div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <Notify v-if="isNotify" :notify="notify" v-on:success="isNotify = false"></Notify>
  </template>
  
  <script setup>
  import { ref, computed, watchEffect, reactive, onMounted } from "vue";
  import { addressStore } from "../stores/address";
  import { problemStore } from "../stores/problem_class";
  import axios from "axios";
  import { serviceRequestStore } from "../stores/service_request_store";
  import Notify from '../components/modal/Notify.vue'
  /**
   * insert service request
   */
  const service_request = serviceRequestStore();
  const add_service_request_process = ref(false);
  
  const zone_id = ref("");
  const region_id = ref("");
  const woreda_id = ref("");
  const kebele = ref("");
  const phone_one = ref("");
  const problem_class_id = ref("");
  const product_id = ref("");
  const phone_two = ref("");
  /**
   * Store related Things
   */
  const problemDescription = ref("");
  const address = addressStore();
  const problem = problemStore();
  const problemClassOptions = problem.problems;
  /**
   * variables for customers
   */
  
  const customer_name = ref("");
  const customer_products = ref([]);
  const error_customer = ref("");
  const customers = ref({});
  const customer_id = ref("");
  const searching_customer = ref(false);
  /**
   * 
   */
  const notify = ref('Service Request Registered successfully')
  const isNotify = ref(false)
  /**
   * variables for address
   */
  const regions = address.regions;
  const zones = ref([]);
  const woredas = ref([]);
  
  /**
   *watch effect hooks
   */
  
  watchEffect(() => {
    address.get_zones(region_id.value);
    zones.value = address.zones;
  });
  
  watchEffect(() => {
    address.get_woredas(zone_id.value);
    woredas.value = address.woredas;
  });
  
  /**
   * onMounted hooks
   */
  onMounted(() => {
    address.get_regions();
    problem.get_problem_class();
  });
  
  /**
   * API for customer data fetching
   */
  async function findCustomer() {
    searching_customer.value = true;
    if (phone_one.value.length < 10) {
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
    customer_id.value = customers.value.id;
    customer_products.value = customers.value.products;
    searching_customer.value = false;
    console.log(customer_products);
    // console.log(customers.value);
  }
  /**
   * function to call API
   */
  async function fetch_customer_data() {
    let response;
    try {
      response = await axios.post(
        "https://apiforensys.hasura.app/api/rest/users",
        {
          phone: phone_one.value,
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
      return error;
    }
    return response.data.customers[0];
  }
  
  /**
   * function to submit service request
   */
  
  /**
   * Variables for service request
   *
   */
  async function onSubmit() {
    if (!customer_id.value) {
      error_customer.value = "customer does not exist";
      return;
    }
    try {
      add_service_request_process.value = true;
      const result = await service_request.insert_service_request({
        problem_class_id: problem_class_id.value,
        product_id: product_id.value,
        woreda_id: woreda_id.value,
        k_name: kebele.value,
        customer_phone: phone_two.value,
        problem_descrition: problemDescription.value,
        woreda_id: woreda_id.value,
        customer_id: customer_id.value,
        zone_id: zone_id.value,
        region_id: region_id.value,
        phone_two: phone_one.value,
      });
      console.log();
      add_service_request_process.value = false;
      isNotify.value = true
      console.log("done");
    } catch (error) {
      console.log(error);
      add_service_request_process.value = false;
    }
  }
  </script>
  
  <style></style>
  