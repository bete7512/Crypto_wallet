<template>
  <div v-if="error">{{error}}</div>
  <div v-if="loading">{{ loading }}</div>
  <div v-else class="mx-3">
    <div class="px-1">
      <h1 class="font-bold text-2xl text-gray-700">Accessories</h1>
    </div>
    <div class="flex justify-start mr-4 mb-3">
      <form class="flex justify-end sm:w-1/3 w-full ">
        <label for="simple-search" class="sr-only">Search</label>
        <div class="relative w-full">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg
              aria-hidden="true"
              class="w-5 h-7 text-gray-500 dark:text-gray-400"
              fill="black"
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
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search"
            required
            style="position: relative"
          />
        </div>
        <button
          type="button"
          @click="searchQuery"
          class="px-6 h-11 ml-2 cursor-pointer text-sm font-medium z-0 text-white bg-[#0080FE] hover:bg-[#242840] rounded-lg focus:outline-none focus:ring-[#862603cc]"
        >
          search
        </button>
      </form>
    </div>

    <div
      class="lg:flex lg:flex-wrap bl justify-center items-ceneter lg:space-y-0 lg:space-x-0 gap-3 space-x-0 space-y-2"
    >
      <!-- {{ accessories[0] }} -->
      <div
        class="pt-5 px-4 flex flex-col justify-between sm:flex-row md:items-center rounded-lg bg-white lg:w-full xl:w-[49.5%] space-x-3"
        v-for="accessory in accessories"
        :key="accessory.id"
      >
        <img
          :src="accessory.images.split(',')[0]"
          class="h-1/2 sm:w-72 w-full md:w-1/3 xl:w-1/4 md:mr-4 lg:mr-6 mb-4 md:mb-0"
          alt=""
        />
        <div class="flex flex-col flex-grow">
          <div
            class="text-2xl font-semibold text-gray-700 flex justify-between"
          >
            <span>
              {{ accessory.name }}
            </span>
            <span class="font-mono text-gray-700 text-base">
              {{ accessory.created_at.split("T")[0] }}
            </span>
          </div>
          <div class="text-base text-gray-700 mb-4">
            {{ accessory.description }}
          </div>
          <div class="text-base text-gray-700 mb-4">
            <span class="font-bold">Price:</span>
            {{ accessory.price }}
          </div>
          <div class="text-base text-gray-700 mb-4">
            <span class="font-bold">Quantity In Stock:</span>
            {{ accessory.quantity_in_stock }}
          </div>
          <div class="flex justify-end mt-auto mb-2">
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
                deleter = async () => {
                  try {
                    let res = await accessory_store.delete_accessory(
                      accessory.id
                    );
                    if (typeof res == 'string') {
                      
                     notify({
                        title: 'Accessory Deleted Successfully ',
                        type: 'success',      
                      
                     });   
                     is_delete_modal_open = false;
                     refetch();

                    } else {
                      notify({
                        title: 'Accessory Deletion Failed',
                        type: 'error',      
                      
                     });     
                      is_delete_modal_open = false;     
                    }
            
                    refetch();
                  } catch (error) {
                    notify({
                      title: 'Accessory Deletion Failed',
                      type: 'error',
                    });      
                  }
                };
              "
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-end mr-2 mt-1 pb-5">
      <div class="flex flex-col items-center">
        <span class="text-sm text-gray-700 dark:text-gray-400">
          Showing
          <span class="font-semibold text-gray-900 dark:text-white">1</span>
          to
          <span class="font-semibold text-gray-900 dark:text-white">10</span>
          of
          <span class="font-semibold text-gray-900 dark:text-white">100</span>
          Entries
        </span>
        <div class="inline-flex mt-2 xs:mt-0">
          <!-- Buttons -->
          <button
            class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <font-awesome-icon class="px-2" :icon="['fas', 'arrow-left']" />
            Prev
          </button>
          <button
            class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-800 border-0 border-l border-gray-700 rounded-r hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Next
            <font-awesome-icon class="px-2" :icon="['fas', 'arrow-right']" />
          </button>
        </div>
      </div>
    </div>
    <button
      class="flex justify-end sticky mb-10"
      data-tippy-content="Add new Accessory"
      data-tippy-placement="left"
    >
      <button
        @click="is_adding_accessory = true"
        id="myButton"
        class="bottom-5 text-white font-extrabold text-4xl rounded-full bg-[#079915] hover:bg-[#044b10] w-16 h-16 right-10 fixed"
      >
        +
      </button>
    </button>
  </div>
  <add_accessory
    @failed="failer_notifier"
    @success="success_notifier"
    v-if="is_adding_accessory"
    v-on:cancel="is_adding_accessory = false"
  ></add_accessory>


  <Delete
    v-if="is_delete_modal_open"
    @delete="deleter"
    v-on:cancel="is_delete_modal_open = false"
  >
  </Delete>
</template>
<script setup>
import { ref, onMounted, computed } from "vue";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";
import add_accessory from "../components/modal/add_accessory.vue";
import { QUERY_ALL_ACCESSORY } from "../constants/queries.js";
import { useQuery } from "@vue/apollo-composable";
import { notify } from "@kyvg/vue3-notification";
import Delete from "../components/modal/Delete.vue";
import { accessoryStore } from "../stores/accessory_store";

onMounted(() => {
  tippy("[data-tippy-content]");
});
const search = ref(""); // search query
const limit = ref(10);
const offset = ref(0);
const is_adding_accessory = ref(false);
const complain_id = ref("");
const failer_notifier = (data) => {
  notify({
    type: "error",
    title:data, 
  })
  is_adding_accessory.value = false;
  refetch();
};
const success_notifier = (data) => {
 
  notify({
    type: "success",
    title:data, 
  })
  is_adding_accessory.value = false;
  refetch();
};


const is_delete_modal_open = ref(false);
let deleter = null;
const { result, loading, error, refetch } = useQuery(QUERY_ALL_ACCESSORY);

const accessories = computed(() => result.value?.accessory ?? []);
const accessory_store = accessoryStore();
</script>
<style scoped>
.overlay {
  position: fixed;
  background-color: rgb(0, 0, 0, 0.3);
}
#myButton {
  cursor: pointer;
}
</style>
