<template>
  <div
    id="overlay"
    class="fixed overlay top-0 left-0 right-0 bottom-0 flex z-10 overflow-y-auto mx-2"
  >
    <div class="m-auto sm:w-[60%] lg:w-[40%] xl:w-[35%] w-full">
      <div class="fixed inset-0 transition-opacity">
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
      <div
        class="bg-white p-3 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:w-full"
      >
        <div class="mb-4">
          <div class="flex justify-between items-center">
            <div class="flex text-center justify-center items-center">
              <h3
                class="text-lg font-bold pt-4 leading-6 text-gray-900 flex justify-center items-center text-center"
              >
                Add New Subscription
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
            <div class="w-full">
              <div class="mb-4">
                <label
                  class="block font-bold text-gray-700 text-base mb-2"
                  for="phone"
                >
                  Phone
                </label>
                <div class="flex space-x-2 justify-center items-center">
                  <input
                    v-model="subscription_store.technician_phone"
                    class="block w-full px-5 py-2 h-10 text-base text-neutral-600 placeholder-gray-500 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-200 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                    id="phone"
                    type="tel"
                    placeholder="Enter phone number"
                    required
                  />
                  <button
                    @click="find_technician"
                    type="button"
                    class="text-white h-10 bg-[#0080FE] hover:bg-[#242840] focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm py-2 px-8 text-center"
                  >
                    <span v-if="!searching_technician"> search </span>
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
              <div class="mb-4">
                <label
                  class="block text-gray-700 font-bold mb-2"
                  for="customerName"
                >
                  Technician Name
                </label>
                <p>{{ full_name }}</p>
              </div>
              <div class="mb-4">
                <label
                  class="block text-gray-700 font-bold mb-2"
                  for="customerName"
                >
                  Amount
                </label>
                <input
                  v-model="amount"
                  class="block w-full px-5 py-3 h-12 text-base text-neutral-600 placeholder-gray-500 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-200 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                  id="customerName"
                  type="text"
                  placeholder="Amount"
                  required
                />
              </div>
              <div class="mb-4">
                <label
                  class="block text-gray-700 font-bold mb-2"
                  for="customerName"
                >
                  Receipt Number
                </label>
                <input
                  v-model="subscription_store.receipt_number"
                  class="block w-full px-5 py-3 h-12 text-base text-neutral-600 placeholder-gray-500 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-200 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                  id="customerName"
                  type="text"
                  placeholder="Reciept Number"
                  required
                />
              </div>
              <div class="flex items-center">
                <select
                  v-model="plan_id"
                  class="flex h-11 items-center cursor-pointer justify-center w-full sm:px-3 px-3 sm:py-3 py-2 text-sm font-medium text-black border-gray-800 border bg-[#E2E8F0] focus:outline-none rounded-lg transition duration-150 ease-in-out"
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
              <div v-if="plan_id">
                <h1>Number of service</h1>
                <p>{{ subscription_store.subscription_plans.find((plan)=>plan.id==subscription_store.subscription_plan_id).number_of_service }}</p>
              </div>
              <div class="flex space-x-2 py-2 items-center">
                <input
                  v-model="subscription_store.status"
                  type="checkbox"
                  id="verify"
                  value="true"
                />
                <label class="block text-lg text-black" for="verify">
                  Verify
                </label>
              </div>
            </div>
          </div>

          <div class="flex justify-center items-center text-red-800">
            {{ error }}
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
import { ref, watchEffect, onMounted, reactive, computed } from "vue";
import { subscriptionStore } from "../../stores/subscription_store";
import gql from "graphql-tag";

import apolloclient from "../../apollo.config";
const emit = defineEmits(["cancel", "success", "failed"]);
const discard = (event) => {
  emit("cancel");
};
const searching_technician = ref(false);
const subscription_store = subscriptionStore();
onMounted(async () => {
  await subscription_store.get_subscription_plan_list();
});
const TECHNICIAN_QUERY = gql`
  query FindTechnician($phone: String = "") {
    technician(where: { phone_number: { _eq: $phone } }) {
      first_name
      last_name
      id
    }
  }
`;

const full_name = ref("");

const amount = ref(subscription_store.amount);
const plan_id = ref(subscription_store.subscription_plan_id);
watchEffect(() => {
  subscription_store.amount = amount.value;
  subscription_store.subscription_plan_id = plan_id.value;
});
watchEffect(() => {
  if (plan_id.value) {
    amount.value = subscription_store.subscription_plans.find(
      (plan) => plan.id == subscription_store.subscription_plan_id
    ).price;
  }
});

async function find_technician() {
  try {
    searching_technician.value = true;
    let res = await apolloclient.query({
      query: TECHNICIAN_QUERY,
      variables: {
        phone: subscription_store.technician_phone,
      },
    });
    full_name.value =
      res.data.technician[0].first_name +
      " " +
      res.data.technician[0].last_name;
    subscription_store.technician_id = res.data.technician[0].id;
    searching_technician.value = false;
  } catch (error) {
    full_name.value = "Not Found";
    searching_technician.value = false;
    return error;
  }
}

async function onSubmit() {
  try {
    const response = await subscription_store.insert_subscription();
    if (typeof response == "string") {
      let data = "Subscription Added successfully";
      emit("success", data);
    } else {
      let data = "Failed to Add Subscription";
      emit("failed", data);
    }
  } catch (error) {
    let data = error.message;
    emit("failed", data);
    return error;
  }
}
</script>
<style></style>
