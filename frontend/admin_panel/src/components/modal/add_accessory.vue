<template>
  <div
    class="fixed overlay top-0 left-0 right-0 bottom-0 flex z-10 overflow-y-auto mx-2"
  >
    <div class="m-auto sm:w-1/2 w-full">
      <div class="fixed inset-0 transition-opacity">
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
      <div
        class="bg-white p-5 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:w-full"
      >
        <div class="mb-4">
          <div class="flex justify-between pt-2 items-center">
            <h3 class="text-lg leading-6 font-bold text-gray-900">
              Accessory Registration Form
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
        </div>

        <div >
          <div class="mb-4">
            <label class="block font-semibold">Accessory Name:</label>
            <input
              v-model="accessory.name"
              type="text"
              class="border border-gray-900 rounded-lg w-full p-2"
            />
          </div>

          <div class="mb-4">
            <label class="block font-semibold">Price:</label>
            <input
              v-model="accessory.price"
              type="text"
              class="border border-gray-900 rounded-lg w-full p-2"
            />
          </div>

          <div class="mb-4">
            <label class="block font-semibold">Quantitiy In Stock:</label>
            <input
              v-model="accessory.quantity_in_stock"
              type="text"
              class="border border-gray-900 rounded-lg w-full p-2"
            />
          </div>
          <div class="mb-4">
            <label class="block font-semibold">Accessory Description:</label>
            <textarea
              v-model="accessory.description"
              class="border border-gray-900 rounded-lg w-full p-2"
            ></textarea>
          </div>
          <div class="mb-4">
            <div class="flex items-center">Add image of accessory</div>
            <div class="flex items-center justify-center">
              <div class="w-full">
                <div class="flex space-x-2 flex-wrap">
                  <div class="" v-for="(key, index) in accessory.url.length" :key="key">
                    <div class="flex">
                      <img
                        :src="accessory.url[index]"
                        class="bg-black py-2"
                        width="120"
                        height="120"
                        alt="insert image"
                      />
                      <button
                        @click="remove_image(index)"
                        class="w-8 h-8 rounded-full bg-black text-white flex justify-center items-center"
                      >
                        X
                      </button>
                    </div>
                  </div>
                </div>
                <div class="flex justify-center items-center w-64 mt-5">
                  <label
                    for="dropzone-file"
                    class="flex flex-col justify-center items-center w-full h-32 bg-gray-50 rounded-lg border border-gray-900-2 border border-gray-900-gray-300 border border-gray-900-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border border-gray-900-gray-600 dark:hover:border border-gray-900-gray-500 dark:hover:bg-gray-600"
                  >
                    <div class="flex flex-col justify-center items-center py-5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="py-auto w-10 h-10 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="{1.5}"
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 4.5v15m7.5-7.5h-15"
                        />
                      </svg>
                      <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span class="font-semibold">Click to add image</span>
                        or drag and drop
                      </p>
                    </div>
                    <input
                      @change="changefile"
                      id="dropzone-file"
                      type="file"
                      class="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div class="flex justify-end">
            <button
              @click="discard"
              class="bg-gray-300 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded-lg mr-2"
            >
              Cancel
            </button>
            <button
              @click="onSubmit"
              class="bg-[#EF4104] hover:bg-[#dc3b01] text-white font-bold py-2 px-4 rounded-lg"
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
import { useMutation } from "@vue/apollo-composable";
import gql from "graphql-tag";
import { onMounted, defineProps, defineEmits, ref, reactive } from "vue";
import { accessoryStore } from "../../stores/accessory_store";
const emit = defineEmits(["cancel", "success", "failed"]);
const discard = (event) => {
  emit("cancel");
};

const accessory = accessoryStore();
const path = reactive([]);
const remove_image = (index) => {
  accessory.url.splice(index, 1);
};

const changefile = async (e) => {
  accessory.file = e.target.files[0];
  const newurl = URL.createObjectURL(accessory.file);
  accessory.url.push(newurl);
  const reader = new FileReader();
  if (e.target.files[0]) {
    reader.readAsBinaryString(e.target.files[0]);
  }
  reader.onload = () => {
    accessory.base64str = btoa(reader.result);
    accessory.ObjectFile.push({
      file: accessory.file,
      base64str: accessory.base64str,
    });
  };
};

const onSubmit = async()=>{
  try {
    let res = await accessory.insert_accessory()
    if (typeof res == "string") {
      let data = "Accessory added successfully";
      emit("success", data);
      return;
    } else {
      let data = "Failed to add accessories";
      emit("failed", data);
    }
  } catch (error) {
    console.log(error);
    let data = "Failed to add accessory";
    emit("failed", data);
  }
}
</script>
<style scoped>
.overlay {
  position: fixed;
  background-color: rgba(0, 0, 0, 0);
  z-index: 100;
}
#myButton {
  cursor: pointer;
}
</style>
