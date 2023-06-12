<template>
    <div
      class="fixed overlay top-0 left-0 right-0 bottom-0 flex z-10 overflow-y-auto mx-2"
    >
      <div class="m-auto sm:w-1/3 w-full">
        <div class="fixed inset-0 transition-opacity">
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <div
          class="bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:w-full"
        >
          <div class="flex justify-between p-4 pt-6 items-center">
            <h3 class="text-lg leading-6 font-bold text-gray-900">
              Accessory Request Form
            </h3>
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
          <div class="bg-white px-4 space-y-3 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="space-y-2">
              <label class="block text-lg  text-black">
                Accessory Name
              </label>
              <select
                v-model="accessory_id"
              class="flex h-12 items-center outline-2 text-gray-600 bg-[#E5E7EB] cursor-pointer justify-center w-full sm:px-4 px-3 text-lg text-boldborder-gray-800 border  focus:outline-none rounded-lg transition duration-150 ease-in-out"
              >
                <option disabled value="" class="">Select an accessory</option>
                <option class=""
                  v-for="accessory in accessories"
                  :key="accessory.id"
                  :value="accessory.id"
                >
                  {{ accessory.name }}
                </option>
              </select>
            </div>
            <div class="space-y-2">
              <label class="block text-lg  text-black">
                Quantity Needed
              </label>
              <input
                v-model="quantity"
                type="number"
                min="1"
                class="bg-[#E5E7EB] block w-full px-5 py-2 h-12 text-base text-neutral-600 placeholder-gray-500 transition duration-500 ease-in-out transform border border-transparent rounded-lg focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
              />
            </div>
            <div class="space-y-2">
              <label class="block text-lg  text-black">
                Reason Needed
              </label>
              <textarea
                v-model="reason"
                class="shadow appearance-none border h-20 text-base bg-[#E5E7EB] rounded w-full py-2 px-3 placeholder-gray-500 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              ></textarea>
            </div>
            <div class="flex space-x-2 space-y-2">
               <div class="flex space-x-2 items-center">
                <input
                  v-model="isVerified"
                  type="checkbox"
                  class="form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out"
                />
                <label class="block text-lg  text-black"> Verify </label>
              </div>
             
            </div>
          </div>
          <div class="flex justify-center items-center text-center text-red-500">{{ error_message }}</div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              @click="submitForm"
              type="button"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base leading-6 font-medium text-white hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo transition ease-in-out duration-150 sm:text-lg sm:lebold5 sm:ml-3 sm:w-auto sm:order-0"
            >
              Submit
            </button>
            <button
              @click="discard"
              type="button"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base leading-6 font-medium text-black hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:mt-0 sm:ml-3 sm:w-auto sm:text-lg sm:lebold5"
            >
              Cancel
            </button>
          </div>
          
        </div>
        
      </div>
    </div>
  </template>
  <script setup>
  import { accessoryStore } from "../../stores/accessory_store";
  import { onMounted, defineProps, defineEmits, ref } from "vue";
  const emit = defineEmits(["cancel", "success", "failed"]);
  const discard = (event) => {
    emit("cancel");
  };
  const props = defineProps({
    service_req_id: {
      type: String,
      required: true,
    },
  });
  const accessory = accessoryStore();
  const accessories = ref([]);
  const accessory_id = ref("");
  onMounted(async () => {
    await accessory.get_all_accessories();
    accessories.value = accessory.accessories;
  });
  const error_message = ref("");
  const quantity = ref(1);
  const reason = ref("");
  const isVerified = ref(false);
  const submitForm = async () => {
    try {
      if (accessory_id.value == "") {
        error_message.value = "Please select an accessory";
        return;
      }
      if (quantity.value == "") {
        error_message.value = "Please enter a quantity";
        return;
      }
      if (reason.value == "") {
        error_message.value = "Please enter a reason";
        return;
      }
      const response = await accessory.insert_accessory_request({
        accessory_id: accessory_id.value,
        quantity: quantity.value,
        service_req_id: props.service_req_id,
        reason: reason.value,
        is_verified: isVerified.value,
      });
      console.log(response + "response");
      let data = "Accessory request added successfully";
      emit("success", data);
    } catch (error) {
      console.log(error);
      let data = "Failed to add accessory request"
      emit("failed", data);
    }
  };
  </script>
  <style scoped>
  .overlay {
    position: fixed;
    background-color: rgba(0, 0, 0, 0);
    z-index: 100;
  }
  </style>
  Footer
  