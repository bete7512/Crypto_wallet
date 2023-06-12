<template>
  <div
    class="fixed overlay top-0 left-0 right-0 bottom-0 flex z-10 overflow-y-auto mx-2"
  >
    <div class="m-auto sm:w-1/3 w-full">
      <div class="fixed inset-0 transition-opacity">
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
      <div
        class="bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:w-full"
      >
        <div class="flex justify-between p-3 pt-4 items-center">
          <h3 class="text-lg leading-6 font-bold text-gray-900">
            Technician Report Form
          </h3>
          <button
            @click="discard"
            class="text-gray-400 hover:text-gray-500 focus:outline-none"
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
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="space-y-1 text-base">
            <label class="block text-lg  text-black">
              Problem Diagnosis
            </label>
            <textarea
              v-model="technician_report.problem_diagnosis"
              class="shadow appearance-none border h-20 text-base bg-[#E5E7EB] rounded w-full py-2 px-3 placeholder-gray-500 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            ></textarea>
          </div>

          <div class="space-y-1 text-base">
            <label class="block text-lg  text-black">
              Solution Provided
            </label>
            <textarea
              v-model="technician_report.solution_provided"
              class="shadow appearance-none border h-20 text-base bg-[#E5E7EB] rounded w-full py-2 px-3 placeholder-gray-500 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            ></textarea>
          </div>
          <div class="space-y-1 text-base">
            <div class="flex space-x-3">
              <div class="flex items-center">
                <input
                  v-model="technician_report.is_service_completed"
                  type="checkbox"
                  class="form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out"
                />
              </div>
              <div>
                <label class="block text-lg  text-black">
                  Is Sevice Completed
                </label>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-gray-50 px-4 space-x-3 py-3 flex justify-end">
          <button
            @click="discard"
            class="bg-[#F23207] hover:bg-[#711702] text-white font-bold py-2 px-4 rounded-lg mr-2"
          >
            Cancel
          </button>
          <button
            @click="submitForm"
            class="bg-[#46C40F] hover:bg-[#123503] text-white font-bold py-2 px-4 rounded-lg"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, defineProps, defineEmits, ref, reactive } from "vue";
import { technicianReportStore } from "../../stores/technician_report";
const emit = defineEmits(["cancel", "failed", "success"]);
const discard = (event) => {
  emit("cancel");
};

const props = defineProps({
  service_req_id: String,
});
const technician_report = technicianReportStore();

const submitForm = async () => {
  technician_report.service_req_id = props.service_req_id;
  try {
    const response = await technician_report.insert_technician_report();
    if (typeof response == "string") {
      let data = "Report Submitted Successfully";
      emit("success", data);
    } else {
      let data = "Report Submission Failed";
      emit("failed", data);
    }
  } catch (error) {
    let data = "Report Submission Failed";
    emit("failed", data);
    console.log(error);
  }
};
</script>
<style scoped>
.overlay {
  position: fixed;
  background-color: rgba(0, 0, 0, 0);
  z-index: 100;
}
</style>
Footer
