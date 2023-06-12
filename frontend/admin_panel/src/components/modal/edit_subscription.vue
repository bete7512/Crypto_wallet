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
                Update Subscription
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
                <p>
                  {{
                    subscription_store.subscription_plans.find(
                      (plan) =>
                        plan.id == subscription_store.subscription_plan_id
                    ).number_of_service
                  }}
                </p>
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
import { ref, watchEffect, onMounted,onBeforeMount, reactive, computed } from "vue";
import { subscriptionStore } from "../../stores/subscription_store";
import gql from "graphql-tag";
import apolloclient from "../../apollo.config";
const props = defineProps({
  subscription_id: {
    type: String,
    required: true,
  },
});
const emit = defineEmits(["cancel", "success", "failed"]);
const discard = (event) => {
  emit("cancel");
};
const searching_technician = ref(false);
const subscription_store = subscriptionStore();
const TECHNICIAN_QUERY = gql`
query MyQuery($id: uuid = "") {
  technician_by_pk(id: $id) {
    first_name
    last_name
  }
}
`;

const full_name = ref("");

const amount = ref(subscription_store.amount);
const plan_id = ref(subscription_store.subscription_plan_id);
onBeforeMount(async () => {
  await subscription_store.get_subscription_by_id(props.subscription_id);
  await subscription_store.get_subscription_plan_list();
  await find_technician();
  plan_id.value = subscription_store.subscription_plan_id;    
});
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
    let res = await apolloclient.query({
      query: TECHNICIAN_QUERY,
      variables: {
        id: subscription_store.technician_id,
      },
    });
    full_name.value =
      res.data.technician_by_pk.first_name +
      " " +
      res.data.technician_by_pk.last_name;
  } catch (error) {
    full_name.value = "Not Found";
    console.log(error);
    return error;
  }
}

async function onSubmit() {
  try {
    const response = await subscription_store.update_subscription(props.subscription_id);
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
