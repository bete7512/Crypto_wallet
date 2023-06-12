import { defineStore } from "pinia";
import { provideApolloClient } from "@vue/apollo-composable";
import apolloclient from "../apollo.config";
import router from "../router/router";
import { INSERT_COMPLAIN,DELETE_COMPLAIN } from "../constants/queries";

provideApolloClient(apolloclient);
export const complainStore = defineStore("customer_complain", {
  state: () => ({
    service_req_id: null,
    complain: '',

  }),
  actions: {
    async insert_customer_complain(){
        try {
            const response = await apolloclient.mutate({
            mutation: INSERT_COMPLAIN,
            variables: {
                service_req_id: this.service_req_id,
                complain: this.complain,
            },
            });
            console.log(response);
            return response.data.insert_customer_complain_one.id;
        } catch (error) {
            console.log(error);
            return error.message;
        }
    },
    async delete_complain(id){
        try {
            const response = await apolloclient.mutate({
            mutation: DELETE_COMPLAIN,
            variables: {
                id: id,
            },
            });
            console.log(response);
            console.log("service_req_id");
            return response.data.delete_customer_complain_by_pk.id;
        } catch (error) {
            console.log(error);
            return error;
        }
    }

  },
  getters: {},

});
