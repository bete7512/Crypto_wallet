<template>
  <div v-if="error">
    {{ error }}
  </div>
  <div v-else-if="loading" class="flex justify-center items-center">
    <div class="flex items-center justify-center">
      <div
        class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      >
        <span
          class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
          >Loading...
        </span>
      </div>
    </div>
  </div>
  <div v-else-if="result.service_request.length < 0">No Data</div>
  <div v-else class="mx-2 pb-5 space-y-2">
    <div class="px-2">
      <h1 class="font-bold text-2xl text-gray-700">Overview</h1>
    </div>
    <div
      class="flex px-1 justify-center flex-wrap items-center space-y-3 sm:space-x-3 2xl:space-y-0"
    >
      <Aggregate :aggregate="technicianCountProps" />
      <Aggregate :aggregate="serviceRequestCountProps" />
      <Aggregate :aggregate="serviceRequestDistinctProductCountProps" />
      <Aggregate :aggregate="Subscription" />
    </div>
    <div class="">
      <Chart />
    </div>
    <Recent></Recent>
  </div>
</template>
<script setup>
import Aggregate from "../components/cards/Aggregate.vue";
import Chart from "../components/cards/Chart.vue";
import { useQuery } from "@vue/apollo-composable";
import { ref, onMounted, watchEffect, reactive, watch } from "vue";
import gql from "graphql-tag";
import Recent from "../components/cards/Recent.vue";
const { result, loading, error } = useQuery(gql`
  query MyQuery {
    service_request {
      id
    }
    service_request_aggregate(where: {}, distinct_on: product_id) {
      aggregate {
        count(distinct: false)
      }
    }
    technician_aggregate {
      aggregate {
        count(distinct: false)
      }
    }
    subscription_aggregate {
      aggregate {
        count(columns: id)
      }
    }
  }
`);

const technicianCountProps = reactive({
  title: "Total Registered Technicians",
  value: 0,
  subtitle: "",
  color: "bg-white",
});

const serviceRequestCountProps = reactive({
  title: "Total Service Requests",
  value: 0,
  color: "bg-[#ffffff]",
});

const serviceRequestDistinctProductCountProps = reactive({
  title: "Total Serviced Products",
  value: 0,
  color: "bg-[#ffffff]",
});
const Subscription = reactive({
  title: "Total Subscriptions",
  value: 0,
  color: "bg-[#ffffff]",
});

watchEffect(() => {
  if (result.value) {
    technicianCountProps.value =
      result.value.technician_aggregate.aggregate.count;
    serviceRequestCountProps.value = result.value.service_request.length;
    serviceRequestDistinctProductCountProps.value =
      result.value.service_request_aggregate.aggregate.count;
    Subscription.value = result.value.subscription_aggregate.aggregate.count;
  }
});

//   const technicianCount = technicianCountProps.title;
//   const serviceRequestCount = serviceRequestCountProps.title;
//   const serviceRequestDistinctProductCount = serviceRequestDistinctProductCountProps.title;
</script>
<style scoped>
.overlay {
  position: fixed;
  background-color: rgba(0, 0, 0, 0.3);
}
</style>
