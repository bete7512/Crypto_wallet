import { defineStore } from "pinia";
import { provideApolloClient } from "@vue/apollo-composable";
import apolloclient from "../apollo.config";
import router from "../router/router";
import { INSERT_REPORT,DELETE_REPORT } from "../constants/queries";

provideApolloClient(apolloclient);
export const technicianReportStore = defineStore("technician_report", {
  state: () => ({
    technician_id: null,
    service_req_id: null,
    technician_report_date: null,
    problem_diagnosis: '',
    solution_provided: '',
    is_service_completed: false,
  }),
  actions: {
    async insert_technician_report() {
        try {
            const response = await apolloclient.mutate({
            mutation: INSERT_REPORT,
            variables: {
                technician_id: this.technician_id,
                service_req_id: this.service_req_id,
                problem_diagnosis: this.problem_diagnosis,
                solution_provided: this.solution_provided,
                technician_report_date: new Date().toISOString(),
                is_service_completed: this.is_service_completed,
            },
            });
            console.log(response);
            return response.data.insert_technician_report_one.id;
        } catch (error) {
            console.log(error);
            return error;
        }
    },
    async delete_report(id) {
        try {
            const response = await apolloclient.mutate({
            mutation: DELETE_REPORT,
            variables: {
                id: id,
            },
            });
            console.log(response);
            return response.data.delete_technician_report_by_pk.id;
        } catch (error) {
            console.log(error);
            return error;
        }
    }
   

  },
  getters: {},

});
