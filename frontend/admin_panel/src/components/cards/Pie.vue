<template>
    <div class="overflow-hidden rounded-lg shadow-lg">
      <div class="bg-neutral-50 py-3 px-5 dark:bg-neutral-700 dark:text-neutral-200">
        Pie Chart
      </div>
      <canvas ref="chart" class="p-10"></canvas>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import Chart from "chart.js/auto";
  
  const chart = ref(null);
  
  onMounted(() => {
    const data = {
      labels: ["Red", "Blue", "Yellow"],
      datasets: [
        {
          label: "My First Dataset",
          data: [30, 20, 50],
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
          hoverOffset: 4,
        },
      ],
    };
  
    const config = {
      type: "pie",
      data,
      options: {},
    };
  
    chart.value = new Chart(chart.value, config);
  });
  </script>
  
  <style>
  /* Optional styles to center the chart */
  canvas {
    width:100px;
    height:100px;
  }
  </style>
  