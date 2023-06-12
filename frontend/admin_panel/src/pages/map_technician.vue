<template>
    <div
      class="overlay top-0 left-0 bottom-0 right-0 flex items-center justify-center"
    >
      <div class="py-2 h-auto w-auto bg-white rounded-md flex-col justify-center">
        <div class="inline-flex w-auto border-zinc-900 h-auto justify-center">
          <div class="space-y-2 h-auto p-5">
            <div class=" w-full">
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
  import maps from "../components/modal/map.vue";
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
  