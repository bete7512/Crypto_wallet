<template>
  <div
    class="overlay w-full top-0 left-0 bottom-0 right-0 flex items-center justify-center"
  >
    <div class="py-2 h-auto w-full bg-white rounded-md flex-col justify-center">
      <div class="inline-flex w-full border-zinc-900 h-auto justify-center">
        <div class="space-y-2 w-full h-auto m-5 p-5">
          <div class="flex justify-end">
            <button
            @click=" $router.go(-1)"
              
              class="text-gray-400 hover:text-gray-500 mt-10 focus:outline-none"
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
          <div class="h-screen w-full">
            <maps></maps>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useMutation } from "@vue/apollo-composable";
import gql from "graphql-tag";
import { onMounted, defineProps, defineEmits } from "vue";
import maps from "../../pages/maps.vue";
// const props = defineProps({
//   id: Number,
//   query: String,
// });
const emit = defineEmits(["cancel", "delete"]);
const delete_item = (event) => {
  console.log("delxgffffffffffffffffffffffffffete");
  emit("delete");
};
const discard = (event) => {
  emit("cancel");
};

// console.log(props.query);
// const { mutate: delete_dta } = useMutation(props.query, () => ({
//   variables: {
//     id: props.id,
//   },
// }));
</script>
<style scoped>
.overlay {
  position: fixed;
  background-color: rgb(0, 0, 0, 0.3);
  z-index: 100;
}
</style>
Footer
