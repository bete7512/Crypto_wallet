import { defineStore } from "pinia";
import { provideApolloClient } from "@vue/apollo-composable";
import apolloclient from "../apollo.config";
import router from "../router/router";
import { addressStore } from "./address";
import { INSERT_TECHNICIAN,DELETE_TECHNICIAN_BY_ID,AVAILABILITY_TECHNICIAN_BY_ID ,UPDATE_TECHNICIAN_BY_ID,GET_TECHNICIAN_BY_ID,VERIFY_TECHNICIAN_BY_ID} from "../constants/queries";
provideApolloClient(apolloclient);
export const technicianStore = defineStore("technician", {
  state: () => ({
    region_id: null,
    zone_id: null,
    woreda_id: null,
    k_name: "",
    bios: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    password: "",
    address_id: null,
    is_verified: true,   
    kebele_id: null,
    kebele_woreda_id: null,

  }),

  actions: {
    async register_technician() {
      try {
        console.log("this", this);
        const result = await apolloclient.mutate({
          mutation: INSERT_TECHNICIAN,
          variables: {
            region_id: this.region_id,
            zone_id: this.zone_id,
            woreda_id: this.woreda_id ? this.woreda_id : "",
            k_name: this.k_name ? this.k_name : "",
            longitude: this.longitude ? this.longitude : "",
            latitude: this.latitude ? this.latitude : "",
            location_description: this.location_description
              ? this.location_description
              : "",
            first_name: this.first_name,
            last_name: this.last_name,
            password: this.password ? this.password : "",
            phone_number: this.phone_number,
            bios: this.bios ? this.bios : "",
          },
        });
        console.log("result", result);
        this.clear_state();
        return result.data.insert_technician_one.id;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
    async update_technician(id) {
      try {
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
        /**
         *        region_id: this.region_id,
            zone_id: this.zone_id,
            woreda_id: this.woreda_id ? this.woreda_id : "",
            k_name: this.k_name ? this.k_name : "",
            longitude: this.longitude ? this.longitude : "",
            latitude: this.latitude ? this.latitude : "",
            location_description: this.location_description
              ? this.location_description
              : "",
         */
        const result = await apolloclient.mutate({
          mutation: UPDATE_TECHNICIAN_BY_ID,
          variables: {
            id: id,
            first_name: this.first_name,
            last_name: this.last_name,
            phone_number: this.phone_number,
            bios: this.bios ? this.bios : "",
            is_verified: this.is_verified,
            address_id: this.address_id,

          },
        });
        console.log("result", result);
        return result.data.update_technician_by_pk.id;
      } catch (error) {
        console.log(error.message);
        return error;
      }
    },

    async get_technician_by_id(id) {
      try {
        const result = await apolloclient.query({
          query: GET_TECHNICIAN_BY_ID,
          variables: {
            id: id,
          },
        });
        this.first_name = result.data.technician_by_pk?.first_name
        this.last_name = result.data.technician_by_pk?.last_name  
        this.phone_number = result.data.technician_by_pk?.phone_number
        this.region_id = result.data.technician_by_pk?.address?.region_id    
        this.zone_id = result.data.technician_by_pk?.address?.zone_id  
        this.woreda_id = result.data.technician_by_pk?.address?.woreda_id  
        this.k_name = result.data.technician_by_pk?.address?.kebele?.name        
        this.bios = result.data.technician_by_pk?.bios ? result.data.technician_by_pk?.bios : ""   
        this.is_verified = result.data.technician_by_pk?.is_verified        
        this.address_id = result.data.technician_by_pk?.address_id          
        this.kebele_id = result.data.technician_by_pk?.address?.kebele?.id    
        this.kebele_woreda_id = result.data.technician_by_pk?.address?.kebele?.woreda_id
        return result.data.technician_by_pk;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
    async delete_technician(id) {
      try {
        const result = await apolloclient.mutate({
          mutation: DELETE_TECHNICIAN_BY_ID,
          variables: {
            id: id,
          },
        });
        return result.data.delete_technician_by_pk.id;
      } catch (error) {
        console.log(error.message);
        return error;
      }
    },
    async availability_technician(id, availability) {
      console.log("availability",availability, id);
      try { 
        const result = await apolloclient.mutate({
          mutation: AVAILABILITY_TECHNICIAN_BY_ID,       
          variables: {
            id: id,
            availability: availability, 
            },
            }); 
          return result.data.update_technician_by_pk.id;   
          } catch (error) {   
            console.log(error.message); 
            return error;  
            }
          },
    async verify_technician(id,  is_verified) {
      console.log("availability",is_verified, id);
            try {
              const result = await apolloclient.mutate({ 
                mutation: VERIFY_TECHNICIAN_BY_ID,     
                variables: {   
                  id: id,
                  is_verified: is_verified,      
                  },
                  }); 
                  return result.data.update_technician_by_pk.id;  
         } catch (error) {   
         console.log(error.message);
        return error;      
        }
            },
    clear_state() {
      this.region_id = null;
      this.zone_id = null;
      this.woreda_id = null;
      this.k_name = "";
      this.bios = "";
      this.longitude = "";
      this.latitude = "";
      this.location_description = "";
      this.first_name = "";
      this.last_name = "";
      this.phone_number = "";
      this.password = "";
    },
  },
  getters: {},
  persist: {
    enabled: false,
    mode: "localSession",
  },
});
