import { defineStore } from "pinia";
import { provideApolloClient } from "@vue/apollo-composable";
import apolloclient from "../apollo.config";
import router from "../router/router";
import { INSERT_FEEDBACK,DELETE_FEED_BACK } from "../constants/queries";

provideApolloClient(apolloclient);
export const feedbackStore = defineStore("customer_feedback", {
  state: () => ({
    service_id: null,
    technician_report_date: null,
    service_detail: '',
    service_quality: '',
    is_service_completed: false,
    suggession: '',
  }),
  actions: {
    async insert_customer_feedback() {
        try {
            const response = await apolloclient.mutate({
            mutation: INSERT_FEEDBACK,
            variables: {
                service_id: this.service_id,
                service_detail: this.service_detail,
                service_quality: this.service_quality,
                suggession: this.suggession,
                survey_date: new Date().toISOString(),
                is_service_completed: this.is_service_completed,
            },
            });
            console.log(response);
            return response.data.insert_feed_back_survey_one.id;
        } catch (error) {
            console.log(error);
            return error;
        }
    },
    async delete_feedback(id) {
        try {
            const response = await apolloclient.mutate({
            mutation: DELETE_FEED_BACK,
            variables: {
                id: id,
            },
            });
            console.log(response);
            return response.data.delete_feed_back_survey_by_pk.id;
        } catch (error) {
            console.log(error);
            return error;
        }
    },
    async update_feedback(id) {
        try {
            const response = await apolloclient.mutate({
            mutation: UPDATE_FEEDBACK,
            variables: {
                id: id,
                service_id: this.service_id,
                service_detail: this.service_detail,
                service_quality: this.service_quality,
                suggession: this.suggession,
                survey_date: new Date().toISOString(),
                is_service_completed: this.is_service_completed,
            },
            });
            console.log(response);
            return response.data.update_feedback;
        } catch (error) {
            console.log(error);
            return error.message;
        }
    }

  },
  getters: {},

});
