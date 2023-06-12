<template>
  <div v-if="error">error loading api</div>
  <div v-else-if="loading">loading API</div>
  <div v-else class="mx-3">
    <div class=" ">
      <h1 class="font-bold text-2xl text-gray-700">Manage Users</h1>
    </div>
    <div :class="is_scrolled ? 'top-20 fixed' : ''">
      <div class="flex justify-between space-x-2">
        <div class="md:flex space-y-0 z-0 space-x-2 items-center justify-start">
          <div class="flex items-center">
            <div class="relative w-full">
              <div
                class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
              >
                <svg
                  aria-hidden="true"
                  class="w-5 absolute h-5 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
                type="text"
                id="simple-search"
                class="bg-gray-50 border h-11 text-lg cursor-text z-10 w-full border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block pl-10 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search"
                v-model="search"
                required
              />
            </div>
            <button
              type="button"
              @click="searchQuery()"
              class="px-6 h-11 ml-2 cursor-pointer text-sm font-medium z-0 text-white bg-[#0080FE] hover:bg-[#242840] rounded-lg focus:outline-none focus:ring-[#862603cc]"
            >
              search
            </button>
          </div>
          <div class="flex items-center z-10">
            <select
              name=""
              id=""
              v-model="role"
              class="flex h-12 items-center cursor-pointer justify-center w-full sm:px-4 px-3 sm:py-3 py-2 text-sm font-medium text-black border-gray-800 border bg-[#E2E8F0] focus:outline-none rounded-lg transition duration-150 ease-in-out"
            >
              <option value="">Filter By Roles</option>
              <option value="admins">Admins</option>
              <option value="technician">Techncians</option>
              <option value="operator">Operators</option>
            </select>
          </div>
          <div class="">
            <select
              name=""
              id=""
              v-model="status"
              class="flex h-12 items-center cursor-pointer justify-center w-full sm:px-4 px-3 sm:py-3 py-2 text-sm font-medium text-black bg-[#E2E8F0] border-gray-800 border focus:outline-none rounded-lg transition duration-150 ease-in-out"
            >
              <option value="">Filter By</option>
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
          </div>
        </div>
        <div class="sm:flex block justify-center items-center space-x-2">
          <div class="py-3 text-lg">
            <button
              @click="is_adding_user = true"
              class="bg-[#309107] hover:bg-[#0c2501] text-white px-4 py-3  flex justify-center items-center rounded-lg text-sm"
              data-tippy-content="Register New Service Request"
              data-tippy-placement="bottom"
            >
              <svg
                style="color: white"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-plus"
                viewBox="0 0 16 16"
              >
                <path
                  d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
                  fill="white"
                ></path>
              </svg>
              <span class="text-white"> Add User</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="">
      <div class="">
        <div class="overflow-x-scroll">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Index
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  First Name
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Last Name
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Phone
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  User Name
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Roles
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="text-sm font-normal">
              <tr
                v-for="(user, i) in users"
                :key="user.id"
                class="bg-white border-b hover:bg-gray-100"
              >
                <td class="py-3 px-1 pl-4 text-left">{{ i + 1 }}</td>
                <td class="py-3 px-1 text-left">{{ user.first_name }}</td>
                <td class="py-3 px-1 text-left">{{ user.last_name }}</td>
                <td class="py-3 px-1 text-left">{{ user.phone_number }}</td>
                <td class="py-3 px-1 text-left">
                  {{ user.username || "N/A" }}
                </td>
                <td class="py-3 px-1 text-left">
                  {{ user.status ? "Active" : "Not Active" }}
                </td>
                <td class="py-3 px-1 text-left">
                  {{ user.user_roles[0].role.name }}
                </td>
                <td class="py-3 px-1 text-left flex space-x-3 items-center">
                  <button
                    v-if="user.status"
                    @click="
                      async () => {
                        try {
                          let res = await user_store.update_user(
                            user.id,
                            false
                          );
                          if (typeof res == 'string') {
                            notify({
                              title: 'User Deactivated Successfully',
                              type: 'success',
                            });
                            refetch();
                          } else {
                            notify({
                              title: 'User Deactivation Failed',
                              type: 'error',
                            });
                            refetch();
                          }
                        } catch (error) {
                          notify({
                            title: 'User Deactivation Failed',
                            type: 'error',
                          });
                          refetch();
                        }
                      }
                    "
                    title="View Technician Details"
                  >
                    <font-awesome-icon
                      :icon="['fas', 'toggle-on']"
                      style="color: #44d70f"
                      size="xl"
                    />
                  </button>
                  <button
                    v-else
                    @click="
                      async () => {
                        try {
                          let res = await user_store.update_user(user.id, true);
                          if (typeof res == 'string') {
                            notify({
                              title: 'User Activated Successfully ',
                              type: 'success',
                            });
                            refetch();
                          } else {
                            notify({
                              title: 'User Activation Failed',
                              type: 'error',
                            });
                            refetch();
                          }
                        } catch (error) {
                          notify({
                            title: 'User Activation Failed',
                            type: 'error',
                          });
                          refetch();
                        }
                      }
                    "
                    title="View Technician Details"
                  >
                    <font-awesome-icon
                      :icon="['fas', 'toggle-off']"
                      size="xl"
                      style="color: #b71010"
                    />
                  </button>
                  <button @click="user_store.reset_user_password(user.id)">
                    <svg
                      version="1.1"
                      id="Layer_1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      x="0px"
                      y="0px"
                      width="24px"
                      height="24px"
                      viewBox="0 0 106.079 122.879"
                      enable-background="new 0 0 106.079 122.879"
                      xml:space="preserve"
                    >
                      <g>
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M43.146,62.341L32.389,81.274l2.012,7.505l7.452-1.997l-1.512-5.642l6.174-1.654 l-1.654-6.175l5.191-0.34l0.217-6.023c3.206,1.086,6.791,1.265,10.349,0.312c9.315-2.496,14.919-11.806,12.512-20.789 c-2.407-8.984-11.915-14.244-21.23-11.749c-9.314,2.496-14.918,11.806-12.51,20.79C40.093,58.141,41.407,60.451,43.146,62.341 L43.146,62.341L43.146,62.341z M63.191,118.729c0.936,0.983,0.896,2.539-0.086,3.474c-0.983,0.936-2.539,0.896-3.475-0.087 l-7.876-8.298c-0.897-0.943-0.897-2.413-0.028-3.357l7.876-8.576c0.919-0.999,2.475-1.063,3.474-0.145s1.063,2.475,0.145,3.474 l-3.315,3.609c15.661-2.799,26.639-10.495,33.299-20.363c4.664-6.911,7.231-14.897,7.822-23.016 c0.593-8.152-0.798-16.427-4.05-23.878c-5.176-11.862-15.08-21.651-29.21-25.526c-1.308-0.356-2.079-1.704-1.723-3.012 c0.355-1.307,1.704-2.079,3.012-1.723C84.753,15.61,95.745,26.46,101.48,39.603c3.573,8.188,5.102,17.262,4.453,26.187 c-0.652,8.957-3.49,17.778-8.649,25.422c-7.653,11.338-20.372,20.068-38.58,22.79L63.191,118.729L63.191,118.729z M43.065,4.15 c-0.936-0.983-0.896-2.539,0.087-3.474c0.982-0.935,2.538-0.896,3.474,0.087l7.876,8.299c0.897,0.943,0.898,2.414,0.028,3.357 l-7.875,8.576c-0.92,0.999-2.476,1.064-3.475,0.145c-0.998-0.919-1.063-2.475-0.145-3.474l3.563-3.879 c-13.063,1.565-23.924,8.677-31.28,18.435c-5.057,6.708-8.457,14.652-9.783,22.898c-1.32,8.217-0.581,16.738,2.635,24.634 c4.656,11.434,14.555,21.591,30.976,27.67c1.275,0.467,1.93,1.881,1.462,3.156c-0.467,1.275-1.881,1.93-3.156,1.463 C19.582,105.427,8.757,94.242,3.609,81.602C0.048,72.856-0.773,63.43,0.686,54.351C2.141,45.3,5.862,36.595,11.392,29.259 c8.384-11.12,20.924-19.129,36.044-20.505L43.065,4.15L43.065,4.15z M57.285,45.128c-1.662,0.446-2.65,2.156-2.204,3.819 c0.445,1.663,2.156,2.65,3.819,2.205s2.65-2.156,2.204-3.819C60.659,45.67,58.949,44.683,57.285,45.128L57.285,45.128z"
                        />
                      </g>
                    </svg>
                  </button>
                  <button
                    @click="
                      is_delete_modal_open = true;
                      deleteFunction = async () => {
                        try {
                          let res = await user_store.delete_users(
                            user.id,
                            user.user_roles[0].role.name
                          );
                          if (typeof res == 'string') {
                            notify({
                              title: 'User Deleted Successfully',
                              type: 'success',
                            });
                            refetch();
                            is_delete_modal_open = false;
                          } else {
                            notify({
                              title: 'User Deletion Failed',
                              type: 'error',
                            });
                            is_delete_modal_open = false;
                            refetch();
                          }
                        } catch (error) {
                          notify({
                            title: 'User Deletion Failed',
                            type: 'error',
                          });
                          is_delete_modal_open = false;
                          refetch();
                        }
                      };
                    "
                  >
                    <font-awesome-icon
                      :icon="['fas', 'trash']"
                      size="xl"
                      style="color: #ff0000"
                    />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="flex justify-end mr-2 mt-1 pb-5">
      <div class="flex flex-col items-center">
        <span class="text-sm text-gray-700 dark:text-gray-400">
          Showing
          <span class="font-semibold text-gray-900 dark:text-white">1</span>
          to
          <span class="font-semibold text-gray-900 dark:text-white">10</span>
          of
          <span class="font-semibold text-gray-900 dark:text-white">100</span>
          Entries
        </span>
        <div class="inline-flex mt-2 xs:mt-0">
          <!-- Buttons -->
          <button
            class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <font-awesome-icon class="px-2" :icon="['fas', 'arrow-left']" />
            Prev
          </button>
          <button
            class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-800 border-0 border-l border-gray-700 rounded-r hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Next
            <font-awesome-icon class="px-2" :icon="['fas', 'arrow-right']" />
          </button>
        </div>
      </div>
    </div>
  </div>
  <Delete
    v-if="is_delete_modal_open"
    v-on:delete="deleteFunction()"
    v-on:cancel="is_delete_modal_open = false"
  >
  </Delete>
  <add_user
    v-if="is_adding_user"
    @failed="failer_notifier"
    @success="success_notifier"
    v-on:cancel="is_adding_user = false"
  >
  </add_user>
</template>
<script setup>
import { useQuery } from "@vue/apollo-composable";
import { ref, reactive, computed, onMounted, watchEffect, watch } from "vue";
import { USER } from "../constants/queries";
import tippy from "tippy.js";
import Delete from "../components/modal/Delete.vue";
import "tippy.js/dist/tippy.css";
import { notify } from "@kyvg/vue3-notification";
import { userStore } from "../stores/user";
import add_user from "../components/modal/add_user.vue";
onMounted(() => {
  tippy("[data-tippy-content]");
});
const user_store = userStore();
const is_delete_modal_open = ref(false);
const role = ref("");
const status = ref(null);
const is_adding_user = ref(false);
let deleteFunction = null;
const failer_notifier = (data) => {
  notify({
    title: data,
    type: "error",
  });

  refetch();
  is_adding_user.value = false;
};
const success_notifier = (data) => {
  notify({
    title: data,
    type: "success",
  });
  is_adding_user.value = false;
  refetch();
};

const { error, result, loading, refetch } = useQuery(USER, {
  limit: 15,
  offset: 0,
});
const users = computed(() => result.value?.users ?? []);
const order_by = ref("");
const search = ref("");

const filter = reactive({
  _and: [
    {
      _or: [
        {
          first_name: {
            _ilike: search.value ? `%${search.value}%` : "%%",
          },
        },
        {
          last_name: {
            _ilike: search.value ? `%${search.value}%` : "%%",
          },
        },
        {
          phone_number: {
            _ilike: search.value ? `%${search.value}%` : "%%",
          },
        },
        {
          username: {
            _ilike: search.value ? `%${search.value}%` : "%%",
          },
        },
      ],
    },
    {
      user_roles: {
        role: {
          name: {
            _eq: role.value,
          },
        },
      },
    },
    {
      status: {
        _eq: status.value,
      },
    },
  ],
});

if (role.value) {
  filter._and = {
    user_roles: { role: { name: { _eq: role.value } } },
  };
}

if (status.value) {
  filter._and = {
    status: { _eq: status.value },
  };
}

const searchQuery = () => {
  if (search.value) {
    filter._and = {
      _or: [
        {
          first_name: {
            _ilike: search.value ? `%${search.value}%` : "%%",
          },
        },
        {
          last_name: {
            _ilike: search.value ? `%${search.value}%` : "%%",
          },
        },
        {
          phone_number: {
            _ilike: search.value ? `%${search.value}%` : "%%",
          },
        },
        {
          username: {
            _ilike: search.value ? `%${search.value}%` : "%%",
          },
        },
      ],
    };
  } else {
    filter._and = {
      _or: [
        {
          first_name: {
            _ilike: search.value ? `%${search.value}%` : "%%",
          },
        },
        {
          last_name: {
            _ilike: search.value ? `%${search.value}%` : "%%",
          },
        },
        {
          phone_number: {
            _ilike: search.value ? `%${search.value}%` : "%%",
          },
        },
        {
          username: {
            _ilike: search.value ? `%${search.value}%` : "%%",
          },
        },
      ],
    };
  }

  if (role.value) {
    filter._and = {
      user_roles: { role: { name: { _eq: role.value } } },
    };
  }
  if (status.value) {
    filter._and = {
      status: { _eq: status.value },
    };
  }
  refetch({
    filter: filter,
  });
};

watch(role, searchQuery);

watch(status, searchQuery);
</script>

<style>
.sticky {
  position: relative;
}

.sticky.fixed {
  position: fixed;
  top: 20%;
  left: 0;
  right: 0;
  z-index: 9999;
}

#sticky {
  position: relative;
}
</style>
