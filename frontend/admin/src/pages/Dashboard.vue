<template>
    <div v-if="error">
      {{ error }}
    </div>
    <div v-else-if="loading" class="h-screen flex justify-center items-center">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="72"
      height="72"
      viewBox="0 0 24 24"
    >
      <circle cx="4" cy="12" r="3" fill="#231515">
        <animate
          id="svgSpinners3DotsFade0"
          fill="freeze"
          attributeName="opacity"
          begin="0;svgSpinners3DotsFade1.end-0.25s"
          dur="0.75s"
          values="1;.2"
        />
      </circle>
      <circle cx="12" cy="12" r="3" fill="#231515" opacity=".4">
        <animate
          fill="freeze"
          attributeName="opacity"
          begin="svgSpinners3DotsFade0.begin+0.15s"
          dur="0.75s"
          values="1;.2"
        />
      </circle>
      <circle cx="20" cy="12" r="3" fill="#231515" opacity=".3">
        <animate
          id="svgSpinners3DotsFade1"
          fill="freeze"
          attributeName="opacity"
          begin="svgSpinners3DotsFade0.begin+0.3s"
          dur="0.75s"
          values="1;.2"
        />
      </circle>
    </svg>
  </div>
    <div v-else class="mx-2 pb-5 space-y-2">
      <div class="px-2">
        <h1 class="font-bold text-2xl text-gray-700">Overview</h1>
      </div>
      <div
        class="flex px-1 justify-center flex-wrap items-center space-y-3 sm:space-x-3 2xl:space-y-0"
      >
        <Aggregate :aggregate="NetworkProps" />
        <Aggregate :aggregate="OrderProps" />
        <Aggregate :aggregate="Crypto" />
        <Aggregate :aggregate="Customers" />
      </div>
      <div class="">
        <Chart />
      </div>
      <Recent></Recent>
    </div>
  </template>
  <script setup>
  import Aggregate from "./Utils/Aggregate.vue";
  import Chart from "./Utils/Chart.vue";
  import { useQuery } from "@vue/apollo-composable";
  import { ref, onMounted, watchEffect, reactive, watch } from "vue";
  import gql from "graphql-tag";
  import Recent from "./Utils/Recent.vue";
  const { result, loading, error } = useQuery(gql`
  query MyQuery {
  users_aggregate {
    aggregate {
      count(columns: id)
    }
  }
  tokens_aggregate {
    aggregate {
      count(columns: id)
    }
  }
  token_orders_aggregate {
    aggregate {
      count(columns: id)
    }
  }
  network_aggregate {
    aggregate {
      count(columns: id)
    }
  }
}
  `);
  
  const NetworkProps = reactive({
    title: "Total Utilized Networks",
    value: 0,
    subtitle: "",
    color: "bg-white",
  });
  
  const OrderProps = reactive({
    title: "Total Orders",
    value: 0,
    color: "bg-[#ffffff]",
  });
  
  const Crypto = reactive({
    title: "Total Used Cryptos",
    value: 0,
    color: "bg-[#ffffff]",
  });
  const Customers = reactive({
    title: "Total Customers",
    value: 0,
    color: "bg-[#ffffff]",
  });
  
  watchEffect(() => {
    if (result.value) {
      NetworkProps.value =
        result.value.network_aggregate.aggregate.count;
      OrderProps.value = result.value.token_orders_aggregate.aggregate.count;
      Crypto.value =
        result.value.tokens_aggregate.aggregate.count;
      Customers.value = result.value.users_aggregate.aggregate.count;
    }
  });

  </script>
  <style scoped>
  .overlay {
    position: fixed;
    background-color: rgba(0, 0, 0, 0.3);
  }
  </style>
  