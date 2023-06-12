<template>
    <div
      :class="[aggregate.color]"
      class="sm:w-[44%] w-full md:w-[48%] lg:w-[31%] 2xl:w-[24%] shadow-sm h-32   p-6 text-black flex justify-center items-center rounded-lg dark:bg-gray-800 dark:border-gray-700"
    >
      <div class="">
        <div>
          <div class="flex justify-center text-gray-800 items-center text-3xl font-bold">
            {{ aggregate.value }}
          </div>
          <h5
            class="mb-2 text-2xl font-semibold tracking-tight text-gray-700 dark:text-white"
          >
            {{ aggregate.title }}
          </h5>
        </div>
      </div>
    </div>
  </template>
  <script setup>
  import { ref, computed, watchEffect } from "vue";
  
  const props = defineProps({
    aggregate: {
      type: Object,
      required: true,
    },
  });
  const photo = new URL(props.aggregate.url, import.meta.url)
  </script>
  <style></style>
  