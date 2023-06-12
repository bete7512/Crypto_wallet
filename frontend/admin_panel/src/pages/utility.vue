<template>
  <!-- <region></region>
  <zone></zone>
  <woreda></woreda> -->
  <div class="mx-2 space-y-1 w-full">
    <h1 class="text-2xl font-bold text-gray-600 px-5">
      Utility Management
    </h1>
    <div class="flex flex-wrap w-full gap-4 mb-3 justify-center items-center">
      <service_classes></service_classes>
      <sub_plan></sub_plan>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import service_classes from "../components/utility_cards/service_classes.vue";
import region from "../components/utility_cards/region.vue";
import zone from "../components/utility_cards/zone.vue";
import sub_plan from "../components/utility_cards/sub_plan.vue";
import woreda from "../components/utility_cards/woreda.vue";
const showAddProblemClassModal = ref(false);
const showAddWorkAreaModal = ref(false);

const view_technician_detail = (i) => {
  console.log(i);
};
const reset_technician_password = (i) => {
  console.log(i);
};

const add_problem_class = () => {
  console.log("add_problem_class");
};

const add_work_area = () => {
  console.log("add_work_area");
};

const add_problem = () => {
  console.log("add_problem");
};
</script>
