<template>
    <div class="overlay top-0 left-0 bottom-0 right-0 flex items-center justify-center">
      <div class="py-2 h-auto w-auto bg-white rounded-md flex-col justify-center">
        <div class="inline-flex w-auto border-zinc-900 h-auto justify-center">
          <div class="space-y-2 h-auto p-5">
            <div class="flex justify-end">
              <button @click="discard" class="text-gray-400 hover:text-gray-500 focus:outline-none">
                <span class="sr-only">Close</span>
                <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <div class="flex justify-center items-center">
              <font-awesome-icon :icon="['fat', 'rotate-exclamation']" />        </div>
            <div class="text-center text-gray-600">
              <h3 class="text-2xl font-bold mb-4">
                Are you sure you want to delete?
              </h3>
              <p class="text-sm">This action cannot be undone</p>
            </div>
            <div class="flex space-x-4 justify-center items-center">
              <button
                @click="discard"
                class="w-24 h-10 bg-sky-600 rounded-md text-white hover:bg-emerald-400"
              >
                Cancel
              </button>
              <div>
                <button
                 @click="delete_item"
                  @keyup.enter="delete_item"
                  class="w-24 h-10 bg-red-500 rounded-md text-white hover:bg-red-800"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </template>
    <script setup>
    import { onMounted } from "vue";
    const emit = defineEmits(["cancel", "delete"]);
    const delete_item = (event) => {
      emit("delete");
    };
    const discard = (event) => {
      emit("cancel");
    };
    </script>
    <style scoped>
    .overlay {
      position: fixed;
      background-color: rgb(0, 0, 0, 0.3);
      z-index: 100;
    }
    </style>
    Footer
    