import { defineStore } from "pinia";
import { provideApolloClient } from "@vue/apollo-composable";
import apolloclient from "../apollo.config";
import gql from "graphql-tag";
import router from "../router/router";
import {UPDATE_PAYMENT  } from "../constants/queries";

provideApolloClient(apolloclient);
export const servicePaymentStore = defineStore("service_payment", {
  state: () => ({
    payment_id: null,
    service_req_id: null,
    technician_id: null,
    is_paid: false,
    amount: 0,
    payment_date: null,
    reciept_code:new Date().getTime(),
    first_name: '',
    last_name: '', 
  }),
  actions: {
    async get_payment_by_id(id) {
      const { data } = await apolloclient.query({
        query:gql`
        query MyQuery($id: uuid = "") {
          service_payment_by_pk(id: $id) {
            amount
            is_paid
            payment_date
            reciept_code
            service_req_id
            technician_id
            id
            technician {
              first_name
              last_name
              id
            }
          }
        }
        ` ,
        variables: { id: id },
      });
      this.payment_id = data.service_payment_by_pk.id;
      this.service_req_id = data.service_payment_by_pk.service_req_id;
      this.technician_id = data.service_payment_by_pk.technician_id;
      this.is_paid = data.service_payment_by_pk.is_paid;
      this.amount = data.service_payment_by_pk.amount;
      this.payment_date = data.service_payment_by_pk?.payment_date;
      this.reciept_code = data.service_payment_by_pk?.reciept_code;
      this.first_name = data.service_payment_by_pk.technician.first_name;    
      this.last_name = data.service_payment_by_pk.technician.last_name;   
    },
    async update_payment() {
     console.log(this.is_paid, this.amount, this.payment_date, this.reciept_code )
      try {
        const result = await apolloclient.mutate({  
          mutation: UPDATE_PAYMENT,   
          variables: { 
            id: this.payment_id,  
            is_paid: this.is_paid, 
            amount: this.amount,
            payment_date: this.payment_date,
            reciept_code: this.reciept_code
            },
            });   
           return result.data.update_service_payment_by_pk.id
      } catch (error) {
        return error;
      }
    },

    async delete_payment_by_id(id,service_req_id) {

      try {
        // try {
        //   const response = await apolloclient.mutate({ 
        //     mutation: gql`
        //     mutation MyMutation($id: uuid = "") { 
        //       update_service_request_by_pk(pk_columns: {id: $id}, _set: {status: "pending"}) {   
        //         id
        //         status
        //         }
        //          }
        //           `,
        //            variables: { id: service_req_id }, 
        //             });
                     
        // } catch (error) {
          
        // }
        let result= await apolloclient.mutate({      
          mutation: gql` 
          mutation MyMutation($id: uuid = "") {
            delete_service_payment_by_pk(id: $id) {
              id
              }
              }
              `,
              variables: { id: id }, 
              });
      return result.data.delete_service_payment_by_pk.id      
      } catch (error) {
        console.log(error);
        return error
      }
    }
  },
  getters: {},

});
