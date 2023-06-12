<template>
  <div class="lg:flex block justify-center w-full lg:space-x-2 lg:space-y-0 space-y-3 mb-4">
    <div
      class="flex bg-white relative rounded-lg shadow-lg border py-6 border-gray-300 p-3 mx-2 w-full justify-center"
    >
      <div class="space-y-2 w-full px-4">
        <div class="w-full flex justify-center items-center">
          <img
            src="../assets/man.png"
            alt="technician.first_name"
            class="w-32 -m-px h-32 rounded-full object-cover bg-slate-200"
          />
        </div>
        <div class="space-y-2">
          <div class="flex justify-between">
            <h1 class="font-bold text-2xl">
              {{ user.user.first_name + ' ' + user.user.last_name }}
            </h1>
            <div class="flex space-x-2 justify-center items-center">
              <h1 class="text-gray-700 font-bold">Status</h1>
            </div>
          </div>
          <div class="flex space-x-2">
            <div v-if="user.two_step" class="flex space-x-1 text-gray-700 items-center">
              <div>Disable Two Factor Authentication</div>
              <button @click="manage_two_factor(user.two_step)">
                <font-awesome-icon :icon="['fas', 'toggle-on']" style="color: #44d70f" size="xl" />
              </button>
            </div>
            <div v-else class="flex space-x-1 text-gray-700 items-center">
              <div>Enable Two Factor Authentication</div>
              <button @click="manage_two_factor(user.two_step)">
                <font-awesome-icon :icon="['fas', 'toggle-off']" size="xl" style="color: #b71010" />
              </button>
            </div>
          </div>

          <div class="space-y-1">
            <!-- <div class="flex space-x-1 items-center">
              <font-awesome-icon class="text-gray-600" :icon="['fas', 'briefcase']" />
              <p class="text-gray-600">Technician</p>
            </div> -->
            <div class="flex space-x-1 items-center">
              <font-awesome-icon class="text-gray-600" :icon="['fas', 'location-dot']" />
              <p class="text-gray-600">{{ user.address }}</p>
            </div>
          </div>
          <div class="flex justify-between">
            <div class="flex space-x-1 text-gray-700 items-center">
              <div>
                <h1 class="text-black font-bold">
                  <span class="">Email</span>
                </h1>
                <p class="space-x-2">
                  <span><font-awesome-icon :icon="['fas', 'envelope']" /></span>
                  <span>
                    {{ user.user.email }}
                  </span>
                </p>
              </div>
            </div>
            <div class="flex justify-between items-center">
              <div class="flex space-x-1 text-gray-700 items-center">
                <div>
                  <h1 class="text-black font-bold">Registration Date</h1>
                  <p>{{ user.created_at.split('T')[0] }}</p>
                </div>
              </div>
            </div>
          </div>

          <div class="flex space-x-2">
            <select name="" id="" v-model="address" class="overflow-scroll">
              <option value="">Select countries</option>
              <option :value="country.name" v-for="country in countries">{{ country.name }}</option>
            </select>
            <button @click="updateUser" class="px-2 py-2 bg-blue-900 text-stone-50 rounded-lg">
              <p v-if="!country_spinner">Send</p>
            <p  v-else>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                <path
                  fill="#ffff"
                  d="M12,23a9.63,9.63,0,0,1-8-9.5,9.51,9.51,0,0,1,6.79-9.1A1.66,1.66,0,0,0,12,2.81h0a1.67,1.67,0,0,0-1.94-1.64A11,11,0,0,0,12,23Z"
                >
                  <animateTransform
                    attributeName="transform"
                    dur="0.75s"
                    repeatCount="indefinite"
                    type="rotate"
                    values="0 12 12;360 12 12"
                  />
                </path>
              </svg>
            </p>
            </button>
          </div>
          <div>
            <button
              class="px-2 py-2 bg-blue-900 text-stone-50 rounded-lg"
              @click="show_recovery_phrase = !show_recovery_phrase"
            >
              Export Wallet
            </button>
            <div v-if="recoveryPhrase || private_key">
              <div class="p-4 mt-2 flex justify-between px-3 rounded-lg bg-slate-200">
                <div>
                  {{ recoveryPhrase }}
                </div>
                <button @click="copy(recoveryPhrase)">
                  <span v-if="!copied">
                    <font-awesome-icon :icon="['fas', 'copy']" />
                  </span>
                  <span v-else>Copied!</span>
                </button>
              </div>
              <div class="p-4 mt-2 flex justify-between px-3 rounded-lg bg-slate-200">
                <div>
                  {{ private_key }}
                </div>
                <button @click="private_copy(private_key)">
                  <span v-if="!private_copied">
                    <font-awesome-icon :icon="['fas', 'copy']" />
                  </span>
                  <span v-else>Copied!</span>
                </button>
              </div>
            </div>
          </div>
          <div>
            <button
              class="px-2 py-2 bg-blue-900 text-stone-50 rounded-lg"
              @click="new_recovery_phrase_importing = !new_recovery_phrase_importing"
            >
              Import Wallet
            </button>
            <div v-if="new_recovery_phrase_importing">
              <div class="flex mt-2 justify-between px-2 py-2 rounded-lg space-x-2">
                <div class="w-48">Recovery Phrase</div>
                <textarea
                  class="w-full rounded-lg border outline-none p-1 text-black"
                  type="text"
                  v-model="new_recovery_phrase"
                ></textarea>

                <button
                  @click="updatePhrase"
                  class="px-4 py-1 bg-blue-900 text-stone-50 rounded-lg"
                >
                  <p v-if="!update_rephrase_spinner">Recover</p>
                  <p v-else>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="#ffff"
                        d="M12,23a9.63,9.63,0,0,1-8-9.5,9.51,9.51,0,0,1,6.79-9.1A1.66,1.66,0,0,0,12,2.81h0a1.67,1.67,0,0,0-1.94-1.64A11,11,0,0,0,12,23Z"
                      >
                        <animateTransform
                          attributeName="transform"
                          dur="0.75s"
                          repeatCount="indefinite"
                          type="rotate"
                          values="0 12 12;360 12 12"
                        />
                      </path>
                    </svg>
                  </p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted, watchEffect } from 'vue'
import { notify } from '@kyvg/vue3-notification'
import { countries } from '../constants/countries'
import { UserStore } from '../stores/user_store'
import gql from 'graphql-tag'
import { useMutation } from '@vue/apollo-composable'
import apolloclient from '../apollo.config'
import { useClipboard } from '@vueuse/core'
import { useQRCode } from '@vueuse/integrations/useQRCode'
const user = UserStore()
const new_recovery_phrase = ref('') //
const new_recovery_phrase_importing = ref(false) //
const new_private_key = ref('')
const country_spinner = ref(false) 
const source = ref(user.recovery_phrase)
const recoveryPhrase = ref('')
const show_recovery_phrase = ref(false)
const private_key = ref('')
const { text, copy, copied, isSupported } = useClipboard({ source })
const {
  text: private_text,
  copy: private_copy,
  copied: private_copied,
  isSupported: private_supported
} = useClipboard({ source })
watchEffect(() => {
  if (show_recovery_phrase.value) {
    private_key.value = user.private_key
  } else {
    private_key.value = ''
  }
})

const UPDATE_KEY = gql`
  mutation MyMutation($private_key: String = "", $recovery_phrase: String = "") {
    update_user_wallet(private_key: $private_key, recovery_phrase: $recovery_phrase) {
      success
    }
  }
`
watchEffect(() => {
  if (show_recovery_phrase.value) {
    recoveryPhrase.value = user.recovery_phrase
  } else {
    recoveryPhrase.value = ''
  }
})
// watchEffect(() => {
//   if (new_recovery_phrase_importing.value) {
//     new_recovery_phrase.value = user.recovery_phrase
//   } else {
//     new_recovery_phrase.value = ''
//   }
// })
const address = ref('')
watchEffect(() => {
  address.value = user.user.address
})
const UPDATE_USER = gql`
  mutation MyMutation($address: String = "Ethiopia") {
    update_users(where: {}, _set: { address: $address }) {
      returning {
        address

      }
    }
  }
`

async function updateUser() {
  country_spinner.value = true
  try {
    const { data } = await apolloclient.mutate({
      mutation: UPDATE_USER,
      variables: {
        address: address.value
      }
    })
    console.log(data)
    if (data.update_users.returning.length > 0) {
      notify({
        type: 'success',
        text: 'Address updated successfully'
      })
    } else {
      notify({
        type: 'error',
        text: 'User not updated'
      })
    }
    country_spinner.value = false
  } catch (error) {
    console.log(error)
    notify({
      type: 'error',
      text: error
    })
    country_spinner.value  = false
  }
  // location.reload()
}
const update_two = gql`
  mutation MyMutation($two_step: Boolean = false) {
    update_users(where: {}, _set: { two_step: $two_step }) {
      returning {
        id
      }
    }
  }
`
const manage_two_factor = async (two_step) => {
  try {
    const res = await apolloclient.mutate({
      mutation: update_two,
      variables: {
        two_step: !two_step
      }
    })
    if (res.data.update_users.returning.length > 0) {
      notify({
        type: 'success',
        text: 'Two factor updated successfully'
      })
      user.two_step = !two_step
    } else {
      notify({
        type: 'error',
        text: 'User not updated'
      })
    }
  } catch (error) {
    console.log(error)
    notify({
      type: 'error',
      text: error
    })
  }
}

const update_rephrase_spinner = ref(false) 
async function updatePhrase() {
  update_rephrase_spinner.value = true      
  try {
    const { data } = await apolloclient.mutate({
      mutation: UPDATE_KEY,
      variables: {
        private_key: '',
        recovery_phrase: new_recovery_phrase.value
      }
    })
    console.log(data)
    if (data.update_user_wallet.success) {
      notify({
        type: 'success',
        text: 'Wallet updated successfully'
      })
    } else {
      notify({
        type: 'error',
        text: 'Wallet not updated'
      })
    }
    update_rephrase_spinner.value = false 
  } catch (error) {
    console.log(error)
    notify({
      type: 'error',
      text: error
    })
  }
  update_rephrase_spinner.value = false 

  // location.reload()
}
</script>
<style></style>
