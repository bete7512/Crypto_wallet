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
        <h1>Service Requests and Technicians Analytics</h1>
        <BarChart class="" :chartData="chartData" />
      </div>
      <div
        class="xl:w-[28.5%] h-full bottom-3 block text-white bg-[#ffffff] rounded-lg shadow-sm p-4"
      >
        <h1 class="text-black">Service Request Analytics By Status</h1>
        <DoughnutChart :chartData="chartDonut" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { BarChart, DoughnutChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";
import { useQuery } from "@vue/apollo-composable";
import { ref, reactive, onMounted, watch, watchEffect } from "vue";
import gql from "graphql-tag";

Chart.register(...registerables);

const { result, loading, error } = useQuery(
  gql`
    query MyQuery {
      technician {
        bios
        created_at
      }
      service_request {
        id
        created_at
        status
      }
    }
  `
);

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
      label: "Registered Technicians",
      data: [],
      backgroundColor: "#FF7E00",
    },
    {
      label: "Service Requests",
      data: [],
      backgroundColor: "#84BD3A",
    },
  ],
});

const chartDonut = reactive({
  labels: ["In Progress", "Opened", "Completed"],
  datasets: [
    {
      label: "Service Requests By Status",
      data: [],
      backgroundColor: ["#84BD3A", "#FDBA1E", "#FF7E00"],
    },
  ],
});

const countByMonth = reactive({});
const countByStatus = reactive({});
watch(
  result,
  (newResult, oldResult) => {
    console.log(newResult, oldResult);
    if (newResult && !loading.value) {
      console.log("from inside");
      countByMonth.value = newResult?.technician?.reduce((acc, technician) => {
        const month = new Date(technician.created_at).getMonth();
        acc[month] = acc[month] || [0, 0];
        acc[month][0]++;
        return acc;
      }, {});

      newResult?.service_request?.forEach((request) => {
        const month = new Date(request.created_at).getMonth();
        countByMonth.value[month] = countByMonth.value[month] || [0, 0];
        countByMonth.value[month][1]++;
      });
      newResult?.service_request?.forEach((request) => {
        console.log(request.status);
        const status = request.status;
        if (!countByStatus[status]) {
          countByStatus[status] = 0;
        }
        countByStatus[status]++;
      });

      chartData.datasets[0].data = Object.values(countByMonth.value || {}).map(
        (counts) => counts[0]
      );
      chartData.datasets[1].data = Object.values(countByMonth.value || {}).map(
        (counts) => counts[1]
      );
      chartDonut.datasets[0].data = Object.values(countByStatus || {});
      console.log(chartDonut);
    }
    console.log(chartData);
  },
  { immediate: true }
);
</script>
