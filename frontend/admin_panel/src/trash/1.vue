<template>
    <div>
      <div
        class="loading-line top-20"
        :style="{ width: loadingProgress + '%' }"
        v-show="isLoading"
      ></div>
      <div v-if="!isLoading">
        <h1>Setting</h1>
        <p>{{ data }}</p>
      </div>
    </div>
  </template>
  <script setup>
  import { ref, onMounted } from "vue";
  import axios from "axios";
  
  const isLoading = ref(true);
  const loadingProgress = ref(0);
  const data = ref(null);
  
  const SALES_API = "https://apiforensys.hasura.app/api/rest/users";
  
  async function fetchData() {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const response = await axios.post(SALES_API, {
      phone: "0913131313",
    });
    data.value = response.data;
  }
  
  async function loadContent() {
    const increment = 5;
    const delay = 100;
    for (let i = 0; i <= 100; i += increment) {
      loadingProgress.value = i;
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
    await fetchData();
    isLoading.value = false;
  }
  
  onMounted(async () => {
    await loadContent();
  });
  </script>
  
  <style>
  .loading-line {
    height: 2px;
    position: fixed;
    top: 0;
    left: 0;
    background-color: #1a73e8;
    transition: width 0.5s ease-in-out;
    opacity: 0;
  }
  
  .loading-line.fade-in {
    opacity: 1;
  }
  </style>