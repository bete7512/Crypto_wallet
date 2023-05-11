import { defineStore } from 'pinia'
import { provideApolloClient } from '@vue/apollo-composable';
import apolloclient from '../apollo.config'
import {GET_NETWORKS,GET_TOKENS} from '../constants/query'
import {notify} from '@kyvg/vue3-notification'
// import router from '../router/index'   
provideApolloClient(apolloclient);
export const assetStore = defineStore("asset", {
    state: () => ({
        tokens:[],
        networks:[], 

    }),
    actions: {
        async get_tokens(){ 
            try {
                const response = await apolloclient.query({
                    query: GET_TOKENS,
                })
                this.tokens = response.data.tokens 
                return response.data.tokens
            } catch (err) {
                console.log(err);
                notify({
                    title:err.message,
                    type:"error" 
                })
                return err.message
            }
        } ,

        async get_networks(){ 
             try {
                const response = await apolloclient.query({
                    query: GET_NETWORKS,
                    variables: {
                    }
                })
                this.networks = response.data.network 
                return response.data.network

            } catch (err) {  
                console.log(err);
                notify({
                    title:err.message,
                    type:"error" 
                })
                return err.message
            }       
        },
        // async send_tokens(token_id,amount,receiver_address){
        //     try {
        //         const response = await apolloclient.mutate({     
        //             mutation: SEND_TOKENS,      
        //             variables: {


    // async send_tokens(token_id,amount,receiver_address){
    //     try {
    //         const response = await apolloclient.mutate({
    //             mutation: SEND_TOKENS,
    //             variables: {
    //                 token_id: token_id,
    //                 amount: amount,
    //                 receiver_address: receiver_address
    //             }
    //         })
    //         notify({
    //             title:"You have successfully sent tokens",
    //             type:"success" 
    //         })
    //         return response.data.sendTokens.success
    //     } catch (err) {
    //         console.log(err);
    //         notify({
    //             title:err.message,
    //             type:"error" 
    //         })
    //         return err.message
    //     }

    // },
    },
    getters: {

    }
})
