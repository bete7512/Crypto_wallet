<template>
  <div
    id="overlay"
    class="fixed overlay top-0 left-0 right-0 bottom-0 flex z-10 overflow-y-auto mx-2"
  >
    <div class="m-auto sm:w-1/2 w-full">
      <div class="fixed inset-0 transition-opacity">
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
      <div
        class="bg-white p-3 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:w-full"
      >
        <div class="mb-4">
          <div class="flex justify-between pl-7 items-center">
            <div class="flex text-center justify-center items-center">
              <h3
                class="text-lg font-bold pt-4 leading-6 text-gray-900 flex justify-center items-center text-center"
              >
                Technician Registration Form
              </h3>
            </div>
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
        </div>

        <div class="bg-white rounded w-full h-auto pt-4 pb-2 mb-4">
          <div class="flex flex-wrap justify-center w-full space-x-4">
            <div class="sm:w-1/2 w-full">
              <div class="mb-4">
                <label class="block text-gray-700 font-bold mb-2" for="phone">
                  First Name
                </label>
                <input
                  v-model="technician.first_name"
                  class="block w-full px-5 py-3 h-12 text-base text-neutral-600 placeholder-gray-500 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-200 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                  id="phone"
                  type="tel"
                  placeholder="Enter First Name"
                  required
                />
              </div>
              <div class="mb-4">
                <label
                  class="block text-gray-700 font-bold mb-2"
                  for="customerName"
                >
                  Last Name
                </label>
                <input
                  v-model="technician.last_name"
                  class="block w-full px-5 py-3 h-12 text-base text-neutral-600 placeholder-gray-500 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-200 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                  id="customerName"
                  type="text"
                  placeholder="Last name"
                  required
                />
              </div>
              <div class="mb-4">
                <label class="block text-gray-700 font-bold mb-2" for="phone">
                  Phone
                </label>
                <div class="flex space-x-2 justify-center items-center">
                  <input
                    v-model="technician.phone_number"
                    class="block w-full px-5 py-3 h-12 text-base text-neutral-600 placeholder-gray-500 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-200 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                    id="phone"
                    type="tel"
                    placeholder="Enter phone number"
                    required
                  />
                </div>
              </div>
              <div class="mb-4">
                <label
                  class="block text-gray-700 font-bold mb-2"
                  for="problemClass"
                >
                  Verification
                </label>
                <select
                  v-model="technician.verified"
                  class="block w-full px-5 py-3 h-12 text-base text-neutral-600 placeholder-gray-500 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-200 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300 form-select focus:shadow-outline"
                  id="problemClass"
                >
                  <option value="" disabled>Set status</option>
                  <option value="verified">Verify</option>
                  <option value="wait">Let it unverified</option>
                </select>
              </div>

              <div class="mb-4">
                <label
                  class="block text-gray-700 font-bold mb-2"
                  for="problem_description"
                >
                  About Technician
                </label>
                <textarea
                  v-model="technician.bios"
                  class="shadow appearance-none border h-24 text-base bg-gray-200 rounded w-full py-2 px-3 placeholder-gray-500 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="problem_description"
                  placeholder="Enter about technician"
                  required
                ></textarea>
              </div>
            </div>
            <div class="sm:w-[45%] w-full space-y-3">
              <div class="space-y-4">
                <div class="relative">
                  <h1>Regions</h1>
                  <button
                    @click="region.is_region = !region.is_region"
                    class="block px-5 h-10 text-base text-neutral-600 placeholder-gray-500 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-200 focus:border-transparent f-300 form-select focus:shadow-outline py-2 pl-3 pr-10 text-left w-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {{
                      technician.region_id
                        ? `${
                            regions.find(
                              (region) => region.id === technician.region_id
                            )?.name ?? "Unknown region"
                          }`
                        : "Select region"
                    }}
                    <svg
                      :class="{ 'transform rotate-180': region.is_region }"
                      class="absolute inset-y-0 right-0 w-5 h-5 mt-2 mr-3 pointer-events-none text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M10 12a1 1 0 0 1-.7-.3l-4-4a1 1 0 1 1 1.4-1.4l3.3 3.3 3.3-3.3a1 1 0 1 1 1.4 1.4l-4 4A1 1 0 0 1 10 12z"
                      />
                    </svg>
                  </button>
                  <transition name="fade">
                    <div
                      v-if="region.is_region"
                      class="overflow-y-scroll max-h-60 z-10 w-full mt-2 bg-gray-200 rounded-md shadow-lg absolute"
                    >
                      <div
                        v-for="reg in regions"
                        :key="reg.id"
                        @click="region.select_region(reg)"
                        class="cursor-pointer hover:bg-blue-50 px-4 py-2"
                      >
                        {{ reg.name }}
                      </div>
                      <div
                        v-if="region.show_add_region_option"
                        class="px-4 py-1 space-y-2"
                      >
                        <input
                          v-model="new_region"
                          placeholder="Enter a new option"
                          class="block w-full px-5 py-2 h-10 text-base text-neutral-600 placeholder-gray-500 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-white focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                        />
                        <button
                          @click="region.add_new_region"
                          class="text-white h-8 bg-[#EF4104] hover:bg-[#a02f05] focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm py-1 px-5 text-center"
                        >
                          Save
                        </button>
                      </div>
                      <div v-else class="px-4 py-1">
                        <button
                          @click="region.show_add_region_option = true"
                          class="text-white h-8 bg-[#EF4104] hover:bg-[#a02f05] focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm py-1 px-5 text-center"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </transition>
                </div>

                <div class="relative">
                  <h1>Zones</h1>
                  <button
                    @click="zone.is_zone = !zone.is_zone"
                    class="block px-5 h-10 text-base text-neutral-600 placeholder-gray-500 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-200 focus:border-transparent f-300 form-select focus:shadow-outline py-2 pl-3 pr-10 text-left w-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <span>
                      {{
                        technician.zone_id
                          ? `${
                              zones.find(
                                (zone) => zone.id === technician.zone_id
                              )?.name ?? "Unknown zone"
                            }`
                          : "Select zone"
                      }}
                    </span>
                    <svg
                      :class="{ 'transform rotate-180': zone.is_zone }"
                      class="absolute inset-y-0 right-0 w-5 h-5 mt-2 mr-3 pointer-events-none text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M10 12a1 1 0 0 1-.7-.3l-4-4a1 1 0 1 1 1.4-1.4l3.3 3.3 3.3-3.3a1 1 0 1 1 1.4 1.4l-4 4A1 1 0 0 1 10 12z"
                      />
                    </svg>
                  </button>
                  <transition name="">
                    <div
                      v-if="zone.is_zone"
                      class="overflow-y-scroll max-h-60 z-10 w-full mt-2 bg-gray-200 rounded-md shadow-lg absolute"
                    >
                      <div
                        v-for="zo in zones"
                        :key="zo.id"
                        @click="zone.select_zone(zo)"
                        class="cursor-pointer hover:bg-blue-50 px-4 py-2"
                      >
                        {{ zo.name }}
                      </div>
                      <div
                        v-if="zone.show_add_zone_option"
                        class="px-4 py-2 space-y-2"
                      >
                        <input
                          v-model="new_zone"
                          placeholder="Enter a new option"
                          class="block w-full px-5 py-2 h-10 text-base text-neutral-600 placeholder-gray-500 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-white focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                        />
                        <button
                          @click="zone.add_new_zone"
                          class="text-white h-8 bg-[#EF4104] hover:bg-[#a02f05] focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm py-1 px-5 text-center"
                        >
                          Save
                        </button>
                      </div>
                      <div v-else class="px-4 py-2">
                        <button
                          @click="zone.show_add_zone_option = true"
                          class="text-white h-8 bg-[#EF4104] hover:bg-[#a02f05] focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm py-1 px-5 text-center"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </transition>
                </div>

                <div class="relative">
                  <h1>Woredas</h1>
                  <button
                    @click="woreda.is_woreda = !woreda.is_woreda"
                    class="block px-5 h-10 text-base text-neutral-600 placeholder-gray-500 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-200 focus:border-transparent f-300 form-select focus:shadow-outline py-2 pl-3 pr-10 text-left w-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <span>
                      {{
                        technician.woreda_id
                          ? `${
                              woredas.find(
                                (zone) => zone.id === technician.woreda_id
                              )?.name ?? "Unknown woreda"
                            }`
                          : "Select woreda"
                      }}
                    </span>
                    <svg
                      :class="{ 'transform rotate-180': woreda.is_woreda }"
                      class="absolute inset-y-0 right-0 w-5 h-5 mt-2 mr-3 pointer-events-none text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M10 12a1 1 0 0 1-.7-.3l-4-4a1 1 0 1 1 1.4-1.4l3.3 3.3 3.3-3.3a1 1 0 1 1 1.4 1.4l-4 4A1 1 0 0 1 10 12z"
                      />
                    </svg>
                  </button>
                  <div
                    v-if="woreda.is_woreda"
                    class="overflow-y-scroll max-h-60 z-10 w-full mt-2 bg-gray-200 rounded-md shadow-lg absolute"
                  >
                    <div
                      v-for="wo in woredas"
                      :key="wo.id"
                      @click="woreda.select_woreda(wo)"
                      class="cursor-pointer hover:bg-blue-50 px-4 py-2"
                    >
                      {{ wo.name }}
                    </div>
                    <div
                      v-if="woreda.show_add_woreda_option"
                      class="px-4 py-1 space-y-2"
                    >
                      <input
                        v-model="new_woreda"
                        placeholder="Enter a new option"
                        class="block w-full px-5 py-2 h-10 text-base text-neutral-600 placeholder-gray-500 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-white focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                      />
                      <button
                        @click="woreda.add_new_woreda"
                        class="text-white h-8 bg-[#EF4104] hover:bg-[#a02f05] focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm py-1 px-5 text-center"
                      >
                        Save
                      </button>
                    </div>
                    <div v-else class="px-4 py-2">
                      <button
                        @click="woreda.show_add_woreda_option = true"
                        class="text-white h-8 bg-[#EF4104] hover:bg-[#a02f05] focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm py-1 px-5 text-center"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div class="mb-4">
                <label
                  class="block text-gray-700 font-bold mb-2"
                  for="problem_description"
                >
                  Enter Kebele Detail
                </label>
                <textarea
                  v-model="technician.k_name"
                  class="shadow appearance-none border h-24 text-base bg-gray-200 rounded w-full py-2 px-3 placeholder-gray-500 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="problem_description"
                  placeholder="Enter Kebele Detail"
                  required
                ></textarea>
              </div>
            </div>
          </div>
          <div class="flex justify-center items-center text-red-800">
            {{ error }}
          </div>
          <div class="bg-gray-50 px-4 space-x-3 py-3 flex justify-end">
            <button
              @click="clear"
              class="bg-[#F23207] hover:bg-[#711702] text-white font-bold py-2 px-4 rounded-lg mr-2"
            >
              Cancel
            </button>
            <button
              @click="onSubmit"
              class="bg-[#46C40F] hover:bg-[#123503] text-white font-bold py-2 px-4 rounded-lg"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, watchEffect, onMounted, reactive, defineEmits } from "vue";
import { addressStore } from "../stores/address";
import { technicianStore } from "../stores/technician";
import { notify } from "@kyvg/vue3-notification";
const emit = defineEmits(["cancel", "success", "failed","clear"]);
const discard = (event) => {
  emit("cancel");
};

const clear = (event) => {
  emit("clear");
}; 
const address = addressStore();
const regions = ref([]);
const zones = ref([]);
const woredas = ref([]);
const technician = technicianStore();
const new_woreda = ref("");
const region = reactive({
  is_region: false,
  selected_region: {},
  show_add_region_option: false,
  select_region: (reg) => {
    console.log("select region");
    region.selected_region = reg;
    technician.region_id = reg.id;
    region.is_region = false;
  },
  add_new_region: async () => {
    let hold = await address.insert_region(new_region.value);
    if (typeof hold == "string") {
      regions.value.push({ id: hold, name: new_region.value });
    }
  },
});
const new_zone = ref("");
const zone = reactive({
  is_zone: false,
  selected_zone: {},
  show_add_zone_option: false,
  select_zone: (zo) => {
    console.log("select zone");
    zone.selected_zone = zo;
    technician.zone_id = zo.id;
    zone.is_zone = false;
  },
  add_new_zone: async () => {
    let hold = await address.insert_zone(
      new_zone.value,
      region.selected_region.id
    );
    if (typeof hold == "string") {
      zones.value.push({ id: hold, name: new_zone.value });
      zone.show_add_zone_option = false;
    }
  },
});
const woreda = reactive({
  is_woreda: false,
  selected_woreda: {},
  show_add_woreda_option: false,
  select_woreda: (wo) => {
    woreda.selected_woreda = wo;
    technician.woreda_id = wo.id;
    woreda.is_woreda = false;
  },
  add_new_woreda: async () => {
    let hold = await address.insert_woreda(
      new_woreda.value,
      zone.selected_zone.id
    );
    if (typeof hold == "string") {
      woredas.value.push({ id: hold, name: new_woreda.value });
      woreda.show_add_woreda_option = false;
    }
  },
});

const error = ref("");
const new_region = ref("");

const register_technician_processing = ref(false);

watchEffect(async () => {
  await address.get_zones(region.selected_region.id);
  if (technician.region_id) {
    address.get_zones(technician.region_id);
  }
  zones.value = [...address.zones];
});

watchEffect(() => {
  address.get_woredas(zone.selected_zone.id);
  if (technician.zone_id) {
    address.get_woredas(technician.zone_id);
  }
  woredas.value = [...address.woredas];
});
watchEffect(async () => {
  await address.get_zones(region.selected_region.id);
  if (service_request.region_id) {
    address.get_zones(service_request.region_id);
  }
  zones.value = [...address.zones];
});
watchEffect(() => {
  if (!region.selected_region.id && !technician.region_id) {
    address.zones = [];
  }
  if (!zone.selected_zone.id && !technician.zone_id && !technician.woreda_id) {
    address.woredas = [];
  }
});

onMounted(async () => {
  regions.value = [...(await address.get_regions())];
});

async function onSubmit() {
  if (
    technician.first_name == "" ||
    technician.last_name == "" ||
    technician.phone == "" ||
    technician.bios == "" ||
    technician.region_id == null ||
    technician.zone_id == null
  ) {
    error.value = "All fields are required";
    return;
  }
  try {
    const response = await technician.register_technician();
    if (typeof response == "string") {
      let data = "Technician Registered successfully";
      notify({
        type: "success",
        text: data,
      })
      // emit("success", data);
    } else {
      let data = "Failed to register technician";
      emit("failed", data);
      notify({
        type: "error",
        text: data,
      })
    }
  } catch (error) {
    console.log("mkvddddddddddddddd", error);
    let data = error.message;
    // emit("failed", data);
    notify({
      type: "error",
      text: data,
    })
    return error;
  }
}
</script>
<style></style>
