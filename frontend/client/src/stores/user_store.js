import { defineStore } from 'pinia'
import { provideApolloClient } from '@vue/apollo-composable'
import apolloclient from '../apollo.config'
import { SIGNUP, LOGIN, USER_PROFILE } from '../constants/query'
import { notify } from '@kyvg/vue3-notification'
import router from '../router/index'
provideApolloClient(apolloclient)
export const UserStore = defineStore('user', {
  state: () => ({
    user: {},
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    userLoggedin: localStorage.getItem('crypto-token') ? true : false,
    public_key: '',
    private_key: '',
    recovery_phrase: '',
    created_at: '',
    address: '',
    two_step: ''
  }),
  actions: {
    async signup(first_name, last_name, email, password) {
      try {
        const response = await apolloclient.mutate({
          mutation: SIGNUP,
          variables: {
            first_name: first_name,
            last_name: last_name,
            email: email,
            password: password
          }
        })
        notify({
          title: 'You have successfully registered',
          type: 'success'
        })
        return response.data.register.success
      } catch (err) {
        console.log(err)
        notify({
          title: err.message,
          type: 'error'
        })
        return err.message
      }
    },
    async login(email, password) {
      try {
        window.localStorage.removeItem('crypto-token')
        const response = await apolloclient.mutate({
          mutation: LOGIN,
          variables: {
            email: email,
            password: password
          }
        })
        if (response.data.login.two_step) {
          this.email = email
          localStorage.setItem('user_email', email)
          // localStorage.removeItem('crypto-token')
          router.push('/two-step-verfication')
          notify({ 
            type: 'success',  
            text: response.data.login.message 
            })
          return
        } else {
          localStorage.setItem('crypto-token', response.data.login.access_token)
          console.log(localStorage.getItem('crypto-token'))
          notify({
            title: 'You have successfully logged in',
            type: 'success'
          })
          router.push('/home')
          return 
        }

        location.replace('/login')
        // await this.user_profile()
        return 'error'
      } catch (err) {
        console.log(err)
        notify({
          title: err.message,
          type: 'error'
        })
        return err.message
      }
    },
    async user_profile() {
      try {
        const response = await apolloclient.query({
          query: USER_PROFILE
        })
        console.log(response.data)
        this.user = response.data.users[0]
        this.public_key = response.data.users[0].wallets[0].public_key
        this.private_key = response.data.users[0].wallets[0].private_key
        this.recovery_phrase = response.data.users[0].wallets[0].recovery_phrase
        this.created_at = response.data.users[0].created_at
        this.address = response.data.users[0].address
        this.two_step = response.data.users[0].two_step
        console.log(this.user)
        return response.data
      } catch (err) {
        console.log(err)
        return err.message
      }
    },
    logout() {
      localStorage.removeItem('crypto-token')
      this.userLoggedin = false
      router.push('/login')
    }
  },
  getters: {}
})
