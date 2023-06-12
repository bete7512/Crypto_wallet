import { defineStore } from "pinia";
import { provideApolloClient } from "@vue/apollo-composable";
import apolloclient from "../apollo.config";
import { addressStore } from "./address";
import router from "../router/router";
import gql from "graphql-tag";
import {
  INSERT_SERVICE_REQUEST,
  UPDATE_JOBS_BY_ID,
  UPDATE_SERVICE_REQUEST_BY_ID,
  QUERY_SERVICE_REQUEST_BY_ID,
  INSERT_JOBS,
  REMOVE_TECHNICIANS_FROM_JOBS,
  DELETE_SERVICE_REQUEST_BY_ID,
  INSERT_SERVICE_PAYMENT,
  UPDATE_SERVICE_REQUEST_STATUS_BY_ID
} from "../constants/queries";
import {notify} from "@kyvg/vue3-notification";    
provideApolloClient(apolloclient);

export const serviceRequestStore = defineStore("service", {
  state: () => ({
    services: {},
    problem_description: "",
    customer_phone: "",
    customer_id: "",
    zone_id: null,
    woreda_id: null,
    region_id: null,
    product_id: "",
    k_name: "",
    phone_two: "",
    problem_class_id: null,
    technician_id: null,
    address_id: null,
    is_assigned_to_technician: false,
    status: "opened",
    technician_assigned_at: null,
    is_in_warranty_request: false,
    kebele_woreda_id: null,
    kebele_id: null,
    order_item_id:""
  }),
  actions: {
    async insert_service_request() {
      try {
        const result = await apolloclient.mutate({
          mutation: INSERT_SERVICE_REQUEST,
          variables: {
            k_name: this.k_name,
            region_id: this.region_id,
            woreda_id: this.woreda_id ? this.woreda_id : null,
            zone_id: this.zone_id ? this.zone_id : null,
            customer_id: this.customer_id ? this.customer_id.toString() : null,
            customer_phone: this.phone_two ? this.phone_two : "",
            problem_class_id: this.problem_class_id
              ? this.problem_class_id
              : null,
            problem_description: this.problem_description,
            product_id: this.product_id ? this.product_id.toString() : null,
            phone_two: this.customer_phone ? this.customer_phone : "",
            is_in_warranty_request: this.is_in_warranty_request,   
            order_item_id : this.order_item_id ? this.order_item_id.toString() : null,
          },
        });
        console.log(result);
        this.services = result.data.insert_service_request_one;
        notify({
          title: "Service Request Registered Successfully",
          type: "success",     
        });

        this.clear_state();
        return result.data.insert_service_request_one.id;
      } catch (error) {
        console.log(error);
        notify({ 
          title: "Service Request Registration Failed",      
          type: "error",
        });
        return error.message;
      }
    },

    async get_service_request_by_id(id) {
      try {
        const result = await apolloclient.query({
          query: QUERY_SERVICE_REQUEST_BY_ID,
          variables: {
            id: id,
          },
        });

        this.services = result.data.service_request_by_pk;
        this.problem_description = result.data.service_request_by_pk.problem_description;
        this.customer_phone = result.data.service_request_by_pk.selling_phone;
        this.customer_id = result.data.service_request_by_pk?.customer_id;
        this.zone_id = result.data.service_request_by_pk?.address?.zone_id;
        this.woreda_id = result.data.service_request_by_pk?.address?.woreda_id;
        this.region_id = result.data.service_request_by_pk?.address?.region_id;
        this.product_id = result.data.service_request_by_pk?.product_id;
        this.location_description = result.data.service_request_by_pk?.address?.location_description;
        this.k_name = result.data.service_request_by_pk?.address?.k_name;
        this.phone_two = result.data.service_request_by_pk?.customer_phone;
        this.kebele_woreda_id = result.data.service_request_by_pk?.address?.kebele_woreda_id;
        this.kebele_id = result.data.service_request_by_pk?.address?.kebele_id;
        this.address_id = result.data.service_request_by_pk?.address_id;
        this.problem_class_id = result.data.service_request_by_pk?.problem_class_id; 
        this.order_item_id = result.data.service_request_by_pk?.order_item_id; 
        this.is_in_warranty_request = result.data.service_request_by_pk?.is_in_warranty_request ? true : false;
        return result.data.service_request_by_pk;
      } catch (error) {
        console.log(error);
        return error.message;
      }
    },
    async update_service_request_by_id(id) {
      try {
        this.address_id = await addressStore().update_address_by_id(
          this.address_id,
          this.region_id,
          this.zone_id,
          this.woreda_id,
          this.k_name,
          this.kebele_id,
          this.kebele_woreda_id
        );
        console.log("address id", this.address_id);
      } catch (error) {
        console.log(error);
        return error.message;
      }
      if (!id) return;
      if (!this.problem_description) return;
      if (!this.customer_phone || !this.phone_two || !this.region_id) return;
      try {
        const result = await apolloclient.mutate({
          mutation: UPDATE_SERVICE_REQUEST_BY_ID,
          variables: {
            id: id,
            customer_id: this.customer_id ? this.customer_id : null,
            customer_phone: this.phone_two ? this.phone_two : "",
            problem_class_id: this.problem_class_id
              ? this.problem_class_id
              : null,
            problem_description: this.problem_description,
            product_id: this.product_id ? this.product_id : null,
            phone_two: this.customer_phone ? this.customer_phone : "",
            is_in_warranty_request: this.is_in_warranty_request
              ? this.is_in_warranty_request
              : false,
            selling_phone: this.customer_phone ? this.customer_phone : "",
            status: this.status ? this.status : "opened",
            address_id: this.address_id ? this.address_id : null,
          },
        });

        console.log(result.data.update_service_request_by_pk);
        return result.data.update_service_request_by_pk.id;
      } catch (error) {
        console.log(error);
        return error.message;
      }
    },
    async assign_technician(variables) {
      console.log("reall variables for it", variables);
        try {
          const response = await apolloclient.mutate({
            mutation: gql`mutation MyMutation($service_req_id: String = "", $technician_id: String = "") {
              cliam_jobs(service_req_id: $service_req_id, technician_id: $technician_id) {
                success
              }
            }`, variables: {
              service_req_id: variables.id
              , technician_id: variables.technician_id
            }
          });
          // notify({
          //   title:"Successfully assigned",   
          //   type:"success"
          // })
          return response.data.cliam_jobs.success;
        } catch (error) {
          notify({
            title:error.message,
            type:"error"
          })
          return { error: error.message };
        }

    },
    async unassign_technician(variables) {
      console.log("reall variables for it", variables);
      try {
        const result = await apolloclient.mutate({
          mutation: UPDATE_JOBS_BY_ID,
          variables: {
            id: variables.id,
            technician_id: variables.technician_id,
            is_assigned_to_technician: false,
            status: "opened",
            technician_assigned_at: null,
          },
        });
        console.log(result);
      } catch (error) {
        console.log(error);
        return error.message;
      }
    },
    async insert_jobs(service_id, technician_id) {
      try {
        const result = await apolloclient.mutate({
          mutation: INSERT_JOBS,
          variables: {
            service_req_id: service_id,
            technician_id: technician_id,
          },
        });
        console.log(result);
        return result.data.insert_jobs_one.id;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
    async remove_technicians_from_jobs(service_id, technician_id) {
      console.log("service id", service_id);
      console.log("technician id", technician_id);
      try {
        const result = await apolloclient.mutate({
          mutation: REMOVE_TECHNICIANS_FROM_JOBS,
          variables: {
            service_req_id: service_id,
            technician_id: technician_id,
          },
        });
        return result.data.delete_jobs.returning[0].id;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
    async delete_service_request_by_id(id) {
      try {
        const result = await apolloclient.mutate({
          mutation: DELETE_SERVICE_REQUEST_BY_ID,
          variables: {
            id: id,
          },
        });

        return result.data.delete_service_request_by_pk.id;
      } catch (error) {

        return error;
      }
    },
    async make_service_request_completed(id, status, technician_id) {
      // if (technician_id == null) {
      //   return { error: { message: "Technician is not assigned Yetff" } }
      // }
      console.log("technician id", technician_id   );
      // if (status == "completed" && technician_id != null) {
      //   await this.insert_service_request_to_payment(technician_id, id);
      // }
      try {
        const result = await apolloclient.mutate({
          mutation: UPDATE_SERVICE_REQUEST_STATUS_BY_ID,
          variables: {
            id: id,
            status: status,
          },
        });
        return result.data.update_service_request_by_pk.id;
      } catch (error) {
        return error.message;
      }
    },
    async insert_service_request_to_payment(technician_id, service_req_id) {
      try {
        const result = await apolloclient.mutate({
          mutation: INSERT_SERVICE_PAYMENT,
          variables: {
            service_req_id: service_req_id,
            technician_id: technician_id
          },
        });
        console.log(result);
        return result.data.insert_service_payment_one.id;
      }
      catch (error) {
        console.log(error);
        return error;
      }
    },
    clear_state() {
      this.services = {};
      this.problem_description = "";
      this.customer_phone = "";
      this.customer_id = "";
      this.zone_id = "";
      this.woreda_id = "";
      this.region_id = "";
      this.product_id = "";
      this.location_description = "";
      this.k_name = "";
      this.longitude = "";
      this.latitude = "";
      this.phone_two = "";
      this.problem_class_id = "";
      this.technician_id = "";
      this.is_assigned_to_technician = false;
      this.status = "opened";
      this.technician_assigned_at = null;
    },
  },
  getters: {},
  persist: {
    enabled: false,
    mode: "localSession",
  },
});
