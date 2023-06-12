<template>
    <div class="flex flex-col justify-start">
      <div
        class="px-2 flex justify-start items-center dark:bg-neutral-700 dark:text-neutral-200"
      ></div>
      <div
        class="w-full flex justify-center space-x-0 xl:space-x-3 xl:space-y-0 space-y-3 items-center flex-wrap"
      >
        <div
          class="xl:w-[68.5%] w-full block shadow-sm bg-[#ffffff] text-black rounded-lg p-4"
        >
          <h1>Santim Crypto Dat Analytics</h1>
          <BarChart class="" :chartData="chartData" />
        </div>
        <div
          class="xl:w-[28.5%] h-full bottom-3 block text-white bg-[#ffffff] rounded-lg shadow-sm p-4"
        >
          <h1 class="text-black">Crypt Token Orders</h1>
          <DoughnutChart :chartData="chartDonut" />
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { BarChart, DoughnutChart } from "vue-chart-3";
  import { Chart, registerables } from "chart.js";
  import { ref, reactive, onMounted, watch, watchEffect } from "vue";
  import gql from "graphql-tag";
  
  Chart.register(...registerables);
  
  const chartData = reactive({
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Customers",
        data: [1, 2, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
        backgroundColor: "#FF7E00",
      },
      {
        label: "Order Transactions",
        data: [3, 2, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
        backgroundColor: "#84BD3A",
      },
    ],
  });
  
  const chartDonut = reactive({
    labels: ["Completed", "Pending"],
    datasets: [
      {
        label: "Crypto Status",
        data: [20, 10],
        backgroundColor: ["#84BD3A", "#FDBA1E"],
      },
    ],
  });
  
  const countByMonth = reactive({});
  const countByStatus = reactive({});
  </script>
  