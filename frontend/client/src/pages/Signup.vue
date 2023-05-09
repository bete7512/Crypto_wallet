<template>
  <div class="py-5 h-screen flex justify-center items-center px-6 bg-[#121D33]">
    <div>
      <div class="text-white flex justify-center items-center py-4 text-xl font-bold">Santim Crypto</div>
      <div class="flex h-full justify-center items-center">
        <div class="p-6 sm:w-[500px] w-full bg-[#FFFFFF] rounded-md shadow-md">
          <div class="flex items-center justify-center">
            <span class="text-sm font-bold text-gray-700 "
              >Create Your Santim Crypto Account</span
            >
          </div>
          <Form
            class="justify-center  py-4 bg-white items-center  px-10"
            @submit.preventDefault="onSubmit"
            :validation-schema="schema"
            v-slot="{ errors }"
          >
            <div class="space-y-1">
              <div class="space-y-3">
                <label class="font-bold text-sm text-[#353F52]">First Name</label>
                <Field
                  name="fname"
                  type="text"
                  v-model="fname"
                  placeholder="Enter Your First Name"
                  class="block w-full px-5 py-2  border-gray-700 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                  :class="{ 'is-invalid': errors.fname }"
                />
                <div class="text-red-700">{{ errors.fname }}</div>
              </div>
              <div class="space-y-3">
                <label class="font-bold text-sm text-[#353F52]">Last name</label>
                <Field
                  name="lname"
                  type="lname"
                  v-model="lname"
                  placeholder="Enter Your Last Name"
                  class="block w-full px-5 py-2  border-gray-700 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                  :class="{ 'is-invalid': errors.lname }"
                />
                <div class="text-red-700">{{ errors.lname }}</div>
              </div>
  
              <div class="space-y-3 w-full">
                <label class="font-bold text-sm text-[#353F52]">Email</label>
                <Field
                  name="phone"
                  type="text"
                  v-model="phone"
                  placeholder="Enter Your Email"
                  class="block w-full px-5 py-2  border-gray-700 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                  :class="{ 'is-invalid': errors.phone }"
                />
                <div class="text-red-700">{{ errors.phone }}</div>
              </div>
  
              <div class="space-y-3">
                <label class="font-bold text-sm text-[#353F52]">Password</label>
                <Field
                  name="password"
                  type="password"
                  v-model="password"
                  placeholder="Enter Your Password"
                  class="block w-full px-5 py-2  border-gray-700 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                  :class="{ 'is-invalid': errors.password }"
                />
                <div class="text-red-700">{{ errors.password }}</div>
              </div>
              <div class="space-y-3">
                <label class="font-bold text-sm text-[#353F52]">Confirm Password</label>
                <Field
                  name="cpassword"
                  type="password"
                  v-model="cpassword"
                  placeholder="Confirm Your Password"
                  class="block w-full px-5 py-2  border-gray-700 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                  :class="{ 'is-invalid': errors.cpassword }"
                />
                <div class="text-red-700">{{ errors.cpassword }}</div>
              </div>
            </div>
            <div class="text-red-600">{{ returnmessage }}</div>
            <div class="pt-2">
              <button
                type="submit"
                class="flex items-center justify-center w-full px-10 py-2 text-base font-medium text-center text-white transition duration-500 ease-in-out transform bg-blue-600 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <div v-if="processing" class="text-sm">
                  <svg
                    role="status"
                    class="inline mr-3 w-4 h-4 text-white animate-spin"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="#E5E7EB"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentColor"
                    />
                  </svg>
                  registering...
                </div>
                <div v-else>Signup</div>
              </button>
              <div>
                <span class="txt1"> Already have an account? </span>
                <router-link class="text-blue-400" to="/login">login</router-link>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { Form, Field } from 'vee-validate'
import * as Yup from 'yup'
import { ref, onMounted } from 'vue'
import { UserStore } from '../stores/user_store'
const username = ref('')
const password = ref('')
const fname = ref('')
const lname = ref('')
const phone = ref('')
const cpassword = ref('')
const address = ref('')
const schema = Yup.object().shape({
  fname: Yup.string().required('First Name is required'),
  lname: Yup.string().required('Last name is required'),
  // username: Yup.string()
  //     .required('username is required'),
  phone: Yup.string().required('Phone is required'),
  // .phone('phone is invalid'),
  password: Yup.string()
    .min(4, 'Password must be at least 4 characters')
    .required('Password is required'),
  cpassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required')
  // address: Yup.string()
  //     .required('address is required'),
  // acceptTerms: Yup.string()
  //     .required('Accept Ts & Cs is required')
})
const user = UserStore()
const returnmessage = ref('')
console.log(user)
const processing = ref(false)
// onMounted(() => {
//     console.log("jknkkkkkkkkkkkkkkkkkkkkk");
//     let response =  user.signup({
//             fname: 'fname.value',
//             lname: 'lname.value',
//             phone: 'phone.value',
//             password:'password.value',
//             address:'address.value'
//         })
// })
const onSubmit = async () => {
  console.log('jknkkkkkkkkkkkkkkkkkkkkk')
  localStorage.removeItem('Apollotoken')
  try {
    processing.value = true
    returnmessage.value = await user.signup(
      fname.value,
      lname.value,
      phone.value,
      password.value,
      address.value,
      username.value
    )
    processing.value = false
  } catch (error) {
    console.log(error)
    returnmessage.value = error
  }
}
</script>
<style scoped>
.overlay {
  position: fixed;
  background-color: rgb(0, 0, 0, 0.3);
}
</style>
