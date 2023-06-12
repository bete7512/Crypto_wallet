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
                Add Payment for Service
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
          <div class="w-full">
            <div class="mb-4">
              <label
                class="block text-gray-700 font-bold mb-2"
                for="customerName"
              >
                Technician Name
              </label>
              <router-link
                class="text-blue-700"
                :to="{
                  name: 'technician_detail',
                  params: { id: payment_store?.technician_id },
                }"
              >
                {{ payment_store.first_name + " " + payment_store.last_name }}
              </router-link>
            </div>
            <div class="mb-4">
              <label
                class="block text-gray-700 font-bold mb-2"
                for="customerName"
              >
                Amount
              </label>
              <input
                v-model="payment_store.amount"
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
                v-model="payment_store.reciept_code"
                class="block w-full px-5 py-3 h-12 text-base text-neutral-600 placeholder-gray-500 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-200 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                id="customerName"
                type="text"
                placeholder="Receipt Number"
                required
              />
            </div>
          </div>
          
          <div class="flex space-x-2 items-center py-2">
            <input
              v-model="payment_store.is_paid"
              type="checkbox"
              id="is_paid"
              value="true"
              class="form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out"
            />
            <label class="block text-lg text-black" for="is_paid"> Is Paid </label>
          </div>
    
        </div>
        <router-link
          class="text-blue-700"
          :to="{
            name: 'service_request_detail',
            params: { id: payment_store?.service_req_id },
          }"
        >
          Look Service Detail
        </router-link>
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
</template>
<script setup>
import { ref, watchEffect, onMounted,onBeforeMount, reactive } from "vue";
import { servicePaymentStore } from "../../stores/service_payment";
const emit = defineEmits(["cancel", "success", "failed"]);
const payment_store = servicePaymentStore();
const discard = (event) => {
  emit("cancel");
};
onBeforeMount(async () => await payment_store.get_payment_by_id(props.payment_id));     
// onMounted(async () => await payment_store.get_payment_by_id(props.payment_id));
const props = defineProps({
  payment_id: {
    type: String,
    required: true,
  },
});
const error = ref("");
async function onSubmit() {
  if (payment_store.amount == "" || payment_store.reciept_code == "") {
    error.value = "Please fill all the fields";
    return;
  }
  try {
    const response = await payment_store.update_payment();
    console.log(response, "am the tester");
    if (typeof response == "string") {
      let data = "Payment Added successfully";
      emit("success", data);
    } else {
      let data = "Failed to add payment";
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
