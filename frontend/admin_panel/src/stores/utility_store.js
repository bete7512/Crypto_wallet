import { defineStore } from "pinia";
import { provideApolloClient } from "@vue/apollo-composable";
import apolloclient from "../apollo.config";
import router from "../router/router";
import { INSERT_COMPLAIN } from "../constants/queries";
import gql from "graphql-tag";
provideApolloClient(apolloclient);
export const utilityStore = defineStore("utility", {
  state: () => ({
    banks: [],
    bank_id: null,
  }),
  actions: {
    async get_banks_list() {
      try {
        const result = await apolloclient.query({
          query: gql`
          query MyQuery {
            banks {
              name
              id
            }
          }
          `,
        });
        this.banks = result.data.banks;
        this.bank_id = this.banks.length > 0 ? this.banks[0].id : null
      } catch (error) {
        console.log(error);
      }
    }
  },
  getters: {},

});
