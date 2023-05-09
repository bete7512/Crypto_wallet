import { defineStore } from 'pinia'
import { provideApolloClient } from '@vue/apollo-composable';
import apolloclient from '../apollo.config'
// import { } from '../constants/query'
let  SIGNUP,LOGIN,USER_PROFILE
import router from '../router/index'
provideApolloClient(apolloclient);
export const UserStore = defineStore("user", {
    state: () => ({
        user:{},
        first_name:'',
        last_name:'', 
        email:'',
        password:'', 
        userLoggedin:localStorage.getItem('Apollotoken') ? true : false,
    }),
    actions: {
        async signup(){
            try {
                const response = await apolloclient.mutate({
                    mutation: SIGNUP,
                    variables: {
                        fname: this.first_name,
                        lname: this.last_name,
                        email: this.email,
                        password: this.password
                    }

                })
                return response.data
            } catch (err) {
                console.log(err);
                return err.message
            }
        },
        async login(email,password) {
            try {
                console.log(window.localStorage.getItem('Apollotoken'));
                window.localStorage.removeItem('Apollotoken')
                const response = await apolloclient.mutate({
                    mutation: LOGIN,
                    variables: {
                        email: email,
                        password: password
                    }
                })
                localStorage.setItem('Apollotoken', response.data.login.accestoken)
                console.log("njhnjhhhhhhhhhhhhhhhhhhhhhhhjh",response.data);
                if(window.localStorage.getItem('Apollotoken')){
                    await this.user_profile(response.data.login.id)
                    router.push('/')
                }
                return response.data
            } catch (err) {
                console.log(err);
                return err.message
            }
        },
        async user_profile(){
            try{
                const response = await apolloclient.query({
                    query: USER_PROFILE,
                })
                console.log(response.data);
                this.user = response.data
                return response.data
            }catch(err){
                console.log(err);
                return err.message
            }
        }
        

    },
    getters: {

    }
})
