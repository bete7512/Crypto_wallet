import { defineStore } from 'pinia'
import { provideApolloClient } from '@vue/apollo-composable';
import apolloclient from '../apollo.config'
import {SIGNUP,LOGIN} from '../constants/query'
import {notify} from '@kyvg/vue3-notification'
import router from '../router/index'   
provideApolloClient(apolloclient);
export const UserStore = defineStore("user", {
    state: () => ({
        user:{},
        first_name:'',
        last_name:'', 
        email:'',
        password:'', 
        userLoggedin: localStorage.getItem('crypto-token') ? true : false,
    }),
    actions: {
        async signup(first_name,last_name,email,password){
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
                    title:"You have successfully registered",
                    type:"success" 
                })
                return response.data.register.success
            } catch (err) {
                console.log(err);
                notify({
                    title:err.message,
                    type:"error" 
                })
                return err.message
            }
        },
        async login(email,password) {
            try {
                window.localStorage.removeItem('crypto-token')
                const response = await apolloclient.mutate({
                    mutation: LOGIN,
                    variables: {
                        email: email,
                        password: password
                    }
                })
                localStorage.setItem('crypto-token', response.data.login.access_token)
                console.log(localStorage.getItem('crypto-token')); 
                notify({
                    title:"You have successfully logged in",     
                    type:"success"       
                })
                router.push('/')
                return 'Successfully Login'
            } catch (err) {
                console.log(err);
                notify({
                    title:err.message,   
                    type:"error"      
                })
                return err.message
            }
        },
        // async user_profile(){
        //     try{
        //         const response = await apolloclient.query({
        //             query: USER_PROFILE,
        //         })
        //         console.log(response.data);
        //         this.user = response.data
        //         return response.data
        //     }catch(err){
        //         console.log(err);
        //         return err.message
        //     }
        // }
        logout(){ 
            localStorage.removeItem('crypto-token')
            this.userLoggedin = false
            router.push('/login')
        }     

    },
    getters: {

    }
})
