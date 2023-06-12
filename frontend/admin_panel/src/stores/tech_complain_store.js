import { defineStore } from "pinia";
import { provideApolloClient } from "@vue/apollo-composable";
import apolloclient from "../apollo.config";
import router from "../router/router";
import { RESOLVE_COMPLAIN } from "../constants/queries";

provideApolloClient(apolloclient);
export const technicianComplainStore = defineStore("technician_complain", {
  state: () => ({
    id: null,
    response: '',
    is_resolved: true
  }),
  actions: {
    async insert_technician_response_complain(){
        try {
            const response = await apolloclient.mutate({
            mutation: RESOLVE_COMPLAIN,
            variables: {
                id: this.id,
                response: this.response,
                is_resolved: this.is_resolved
            },
            });
            console.log(response );
            return response.data.update_technician_complain_by_pk.id;
        } catch (error) {
            console.log(error);
            return error;
        }
    },

  },
  getters: {},

});
