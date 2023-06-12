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
                Add New User
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
                  First Name
                </label>
                <input
                  v-model="user.first_name"
                  class="block w-full px-5 py-3 h-12 text-base text-neutral-600 placeholder-gray-500 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-200 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                  id="customerName"
                  type="text"
                  placeholder="first name"
                  required
                />
              </div>
              <div class="mb-4">
                <label
                  class="block text-gray-700 font-bold mb-2"
                  for="customerName"
                >
                  Last Name
                </label>
                <input
                  v-model="user.last_name"
                  class="block w-full px-5 py-3 h-12 text-base text-neutral-600 placeholder-gray-500 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-200 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                  id="customerName"
                  type="text"
                  placeholder="last name"
                  required
                />
              </div>
              <div class="mb-4">
                <label
                  class="block text-gray-700 font-bold mb-2"
                  for="customerName"
                >
                  Phone Number
                </label>
                <input
                  v-model="user.phone_number"
                  class="block w-full px-5 py-3 h-12 text-base text-neutral-600 placeholder-gray-500 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-200 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                  id="customerName"
                  type="text"
                  placeholder="Phone Number"
                  required
                />
              </div>
              <div class="mb-4">
                <label
                  class="block text-gray-700 font-bold mb-2"
                  for="customerName"
                >
                  User Name
                </label>
                <input
                  v-model="user.user_name"
                  class="block w-full px-5 py-3 h-12 text-base text-neutral-600 placeholder-gray-500 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-200 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                  id="customerName"
                  type="text"
                  placeholder="User Name"
                  required
                />
              </div>
              <div class="flex items-center">
                <select
                  v-model="user.role_id"
                  class="flex h-11 items-center cursor-pointer justify-center w-full sm:px-3 px-3 sm:py-3 py-2 text-sm font-medium text-black border-gray-800 border bg-[#E2E8F0] focus:outline-none rounded-lg transition duration-150 ease-in-out"
                >
                  <option value="">Select Roles</option>
                  <option
                    v-for="role in user.roles"
                    :key="role.id"
                    :value="role.id"
                  >
                    {{ role.name }}
                  </option>
                </select>
              </div>
              <div class="flex space-x-2 py-2 items-center">
                <input
                  v-model="user.status"
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
import { onMounted } from "vue";
import { userStore } from "../../stores/user";
const emit = defineEmits(["cancel", "failed", "success"]);
const discard = (event) => {
  emit("cancel");
};
const props = defineProps({
  user_id: {
    type: String,
    required: true,
  },
});
const user = userStore();
onMounted(async () => {
  await user.get_roles();
  await user.get_user(props.user_id);
});
async function onSubmit() {
  try {
    const response = await user.insert_user();
    if (typeof response == "string") {
      let data = "User Added successfully";
      emit("success", data);
    } else {
      let data = "Failed to Add User";
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
