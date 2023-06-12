import { defineStore } from "pinia";
import { provideApolloClient } from "@vue/apollo-composable";
import apolloclient from "../apollo.config";
import router from "../router/router";
import gql from "graphql-tag";
import {INSERT_SUBSCRIPTION,UPDATE_SUBSCRIPTION,GET_SUBSCRIPTION_BY_ID} from "../constants/queries";
provideApolloClient(apolloclient);
export const subscriptionStore = defineStore("subscription", {
    state: () => ({
        subscription_plans: [],
        subscription_plan_id: '',
        amount: 0,
        receipt_number: "",
        status: false,
        technician_id: null,
        technician_phone: "",
    }),
    actions: {
        async insert_subscription() {
            try {
                const result = await apolloclient.mutate({
                    mutation: INSERT_SUBSCRIPTION,
                    variables: {
                        subscription_plan_id: this.subscription_plan_id,
                        amount: this.amount,
                        receipt_number: this.receipt_number,
                        status: this.status,
                        technician_id: this.technician_id,
                    },
                });
                console.log("result", result);
                return result.data.insert_subscription_one.id;
            } catch (error) {
                console.log(error);
                return error;
            }
        },
        async update_subscription(id) {
            try {
                const result = await apolloclient.mutate({
                    mutation: UPDATE_SUBSCRIPTION,
                    variables: {
                        id: id,
                        subscription_plan_id: this.subscription_plan_id,
                        amount: this.amount,
                        receipt_number: this.receipt_number,
                        status: this.status,
                        technician_id: this.technician_id,
                    },
                });
                return result.data.update_subscription_by_pk.id;
            } catch (error) {
                console.log(error);
                return error;
            }
        },
        async get_subscription_by_id(id) {
            try {
                const result = await apolloclient.query({
                    query: GET_SUBSCRIPTION_BY_ID,
                    variables: {
                        id: id,
                    },
                });
                this.subscription_plan_id = result.data.subscription_by_pk.subscription_plan_id;
                this.amount = result.data.subscription_by_pk.amount;
                this.receipt_number = result.data.subscription_by_pk.receipt_number;
                this.status = result.data.subscription_by_pk.status;
                this.technician_id = result.data.subscription_by_pk.technician_id;
            }
            catch (error) {
                console.log(error);
            }
        },

        async get_subscription_plan_list() {
            try {
                const result = await apolloclient.query({
                    query: gql`
                    query MyQuery {
                        subscription_plan {
                          id
                          name
                          number_of_service
                          price
                        }
                      }                      
                    `,
                });
                console.log("result", result );
                this.subscription_plans = result.data.subscription_plan;
                // this.subscription_plan_id = this.subscription_plan.length > 0 ? this.subscription_plan[0].id : null;
                return
            } catch (error) {
                console.log(error);
                return error;
            }
        },
        async delet_subscription(id) {
            console.log("id", id,"am now doing something");
            try {
                const result = await apolloclient.mutate({
                    mutation: gql`
                    mutation MyMutation($id: uuid = "") {
                        delete_subscription_by_pk(id: $id) {
                          id
                        }
                      }
                      `,
                    variables: {
                        id: id,
                    },
                });
                console.log("result", result);
                return result.data.delete_subscription_by_pk.id;
            } catch (error) {
                console.log(error);
                return error;
            }
        }
    },
    getters: {

    },
    persist: {
        enabled: false,
        mode: "localSession",
    },
});
