<template>
  <div class="py-5 flex justify-center items-center h-screen px-6 bg-[#121D33]">
    <div class="">
      <div class="text-white flex justify-center items-center py-4 text-xl font-bold">
        Santim Crypto
      </div>
      <div class="flex justify-center items-center">
        <div class="p-6 sm:w-[500px] w-full bg-[#FFFFFF] rounded-md shadow-md">
          <div class="flex items-center justify-center">
            <span class="text-sm font-bold text-gray-700">Login to Your Santim Crypto Account</span>
          </div>
          <Form
            class="justify-center py-4 bg-white items-center px-10"
            @submit.preventDefault="onSubmit"
            :validation-schema="schema"
            v-slot="{ errors }"
          >
            <div class="space-y-1">
              <div class="space-y-3 w-full">
                <label class="font-bold text-sm text-[#353F52]">Email</label>
                <Field
                  name="email"
                  type="text"
                  v-model="email"
                  placeholder="Enter Your email Address"
                  class="block w-full px-5 py-2 border-gray-800 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                  :class="{ 'is-invalid': errors.email }"
                />
                <div class="text-red-700">{{ errors.email }}</div>
              </div>

              <div class="space-y-3">
                <label class="font-bold text-sm text-[#353F52]">Password</label>
                <Field
                  name="password"
                  type="password"
                  v-model="password"
                  placeholder="Enter Passwpord"
                  class="block w-full px-5 py-2 border-gray-800 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                  :class="{ 'is-invalid': errors.password }"
                />
                <div class="text-red-700">{{ errors.password }}</div>
              </div>
            </div>
            <div class="text-red-600">{{ loginreturn }}</div>
            <div class="pt-2">
              <button
                type="submit"
                class="flex items-center justify-center w-full px-10 py-2 text-base font-medium text-center text-white transition duration-500 ease-in-out transform bg-blue-600 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <div v-if="loginprocess" class="text-sm">
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
                  Signing in...
                </div>
                <div v-else>Signin</div>
              </button>
              <div>
                <span class="txt1"> Already have an account? </span>
                <router-link class="text-blue-400" to="/signup">Signup</router-link>
              </div>
            </div>
          </Form>
          <div class="flex justify-center items-center ">
            <button @click="signIn" type="button"
              class="flex items-center bg-white border border-gray-300 rounded-lg shadow-md max-w-xs px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              <svg
                class="h-6 w-6 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                viewBox="-0.5 0 48 48"
                version="1.1"
              >
                <g id="Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <g id="Color-" transform="translate(-401.000000, -860.000000)">
                    <g id="Google" transform="translate(401.000000, 860.000000)">
                      <path
                        d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
                        id="Fill-1"
                        fill="#FBBC05"
                      ></path>
                      <path
                        d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
                        id="Fill-2"
                        fill="#EB4335"
                      ></path>
                      <path
                        d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
                        id="Fill-3"
                        fill="#34A853"
                      ></path>
                      <path
                        d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
                        id="Fill-4"
                        fill="#4285F4"
                      ></path>
                    </g>
                  </g>
                </g>
              </svg>
              <span>Continue with Google</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { Form, Field } from 'vee-validate'
import * as Yup from 'yup'
import { ref } from 'vue'
import { UserStore } from '../stores/user_store'
import { initializeApp } from 'firebase/app'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { useAuth } from '@vueuse/firebase/useAuth'

const app = initializeApp({
  apiKey: "AIzaSyB8e24VUeTanuIexbJ7EZlbFYIqfno4IHs",
  authDomain: "auth-f5efc.firebaseapp.com",
  projectId: "auth-f5efc",
  storageBucket: "auth-f5efc.appspot.com",
  messagingSenderId: "567086431614",
  appId: "1:567086431614:web:7dc5b5cbab1500ca23072f",
  measurementId: "G-603RKMBFMK"
})
const auth = getAuth(app)
const { isAuthenticated, user:users } = useAuth(auth)

const signIn = () => signInWithPopup(auth, new GoogleAuthProvider())
// alert(users)
const email = ref('')
const password = ref('')
const schema = Yup.object().shape({
  email: Yup.string().required('Email is required'),
  password: Yup.string()
    .min(4, 'Password must be at least 4 characters')
    .required('Password is required')
})
const user = UserStore()
const loginreturn = ref('')
const loginprocess = ref(false)
const onSubmit = async () => {
  loginprocess.value = true
  try {
    // alert(users)
    // console.log(users)
    user.email = email.value
    loginreturn.value = await user.login(email.value, password.value)
  } catch (error) {
    console.log(error)
    loginreturn.value = error.message
  }
  loginprocess.value = false
}
</script>
<style scoped>
.overlay {
  position: fixed;
  background-color: rgb(0, 0, 0, 0.3);
}
</style>
