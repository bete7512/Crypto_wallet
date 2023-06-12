import { defineStore } from "pinia";
import { provideApolloClient } from "@vue/apollo-composable";
import apolloclient from "../apollo.config";
import { notify } from "@kyvg/vue3-notification";    
import { serviceRequestStore } from "./service_request_store";
import router from "../router/router";
import {
  REGIONS,
  ZONES,
  WOREDAS,
  UPDATE_ADDRESS_BY_ID,
  UPDATE_KEBELE,
  INSERT_KEBELE,
  DELETE_KEBELE,
  INSERT_REGION,
  INSERT_ADDRESS,
  INSERT_ZONE,
  INSERT_WOREDA
} from "../constants/queries";
provideApolloClient(apolloclient);
export const addressStore = defineStore("address", {
  state: () => ({
    regions: [],
    zones: [],
    woredas: [],
  }),
  actions: {
    async get_regions() {
      try {
        const result = await apolloclient.query({
          query: REGIONS,
        });
        console.log(result);
        this.regions = result.data.region;
        return result.data.region;
      } catch (error) {
        console.log(error);
        return error.message;
      }
    },
    async get_zones(region_id) {
      if (!region_id) return;
      try {
        const result = await apolloclient.query({
          query: ZONES,
          variables: {
            region_id: region_id,
          },
        });
        console.log(result);
        this.zones = result.data.zone;
      } catch (error) {
        console.log(error);
        return error.message;
      }
    },
    async get_woredas(zone_id) {
      if (!zone_id) return;
      try {
        const result = await apolloclient.query({
          query: WOREDAS,
          variables: {
            zone_id: zone_id ? zone_id : null,
          },
        });
        console.log(result);
        this.woredas = result.data.woreda;
      } catch (error) {
        console.log(error);
        return error.message;
      }
    },
    async insert_region(name) {
      try {
        const result = await apolloclient.mutate({
          mutation: INSERT_REGION,
          variables: {
            name: name,
          },
        });
        console.log(result);
       await  this.get_regions();
        return result.data.insert_region_one.id;            
      } catch (error) {
        console.log(error);
        return error;
      }
    },
    async insert_zone(name, region_id) {
      if(region_id == null) {
        notify({ 
          type: "error",      
          message: "Please select a region",       
        })
        return;
      }
      try {
        const result = await apolloclient.mutate({
          mutation: INSERT_ZONE,
          variables: {
            name: name,
            region_id: region_id,
          },
        });
        console.log(result);
        await this.get_zones(region_id); 
        return result.data.insert_zone_one.id;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
    async insert_woreda(name) {
      if(serviceRequestStore().zone_id == null) {       
        notify({ 
          type: "error", 
          message: "Please select a zone",     
        })
        return;
      }
      try {
        const result = await apolloclient.mutate({
          mutation: INSERT_WOREDA,
          variables: {
            name: name,
            zone_id: serviceRequestStore().zone_id ,
          },
        });
        console.log(result);
       await this.get_woredas(serviceRequestStore().zone_id);
        return result.data.insert_woreda_one.id;
      } catch (error) {
        console.log(error);
        return error;
      }
    },

    async update_region(id, name) {
      try {
        const result = await apolloclient.mutate({
          mutation: UPDATE_REGION,
          variables: {
            id: id,
            name: name,
          },
        });
        console.log(result);

        return result;
      } catch (error) {
        console.log(error);
        return error.message;
      }
    },
    async update_zone(id, name) {
      try {
        const result = await apolloclient.mutate({
          mutation: UPDATE_ZONE,
          variables: {
            id: id,
            name: name,
          },
        });
      } catch (error) {
        console.log(error);
      }
    },

    async update_woreda(id, name) {
      try {
        const result = await apolloclient.mutate({
          mutation: UPDATE_WOREDA,
          variables: {
            id: id,
            name: name,
          },
        });
      } catch (error) {
        console.log(error);
      }
    },
    async update_address_by_id(
      address_id,
      region_id,
      zone_id,
      woreda_id,
      k_name,
      kebele_id,
      kebele_woreda_id
    ) {

      console.log("The sheet of bull",address_id, region_id, zone_id, woreda_id, k_name, kebele_id, kebele_woreda_id);
      let kebele = null;
      try {
        kebele_id && kebele_woreda_id == woreda_id 
          ? (kebele = await this.update_kebele(kebele_id, k_name, woreda_id))
          : (kebele = await this.insert_kebele(k_name, woreda_id));
        console.log(kebele);
      } catch (error) {
        console.log(error);
        return error.message;
      }
      if (address_id) {
        try {
          const result = await apolloclient.mutate({
            mutation: UPDATE_ADDRESS_BY_ID,
            variables: {
              id: address_id,
              region_id: region_id,
              zone_id: zone_id,
              woreda_id: woreda_id,
              kebele_id: kebele,
            },
          });
          console.log("update address by id", result  );
          return result.data.update_address_by_pk.id;
        } catch (error) {
          console.log(error);
          return error.message;
        }
      } else {
        return this.insert_address(region_id, zone_id, woreda_id, kebele);
      }
    },
    async insert_address(region_id, zone_id, woreda_id, kebele) {
      try {
        const result = await apolloclient.mutate({
          mutation: INSERT_ADDRESS,
          variables: {
            region_id: region_id,
            zone_id: zone_id,
            woreda_id: woreda_id,
            kebele_id: kebele,
          },
        });
        console.log(result);
        return result.data.insert_address_one.id;
      } catch (error) {
        console.log(error);
        return error.message;
      }
    },
    async delete_region(id) {
      try {
        const result = await apolloclient.mutate({
          mutation: DELETE_REGION,
          variables: {
            id: id,
          },
        });
      } catch (error) {
        console.log(error);
      }
    },
    async delete_zone(id) {
      try {
        const result = await apolloclient.mutate({
          mutation: DELETE_ZONE,
          variables: {
            id: id,
          },
        });
      } catch (error) {
        console.log(error);
      }
    },
    async delete_woreda(id) {
      try {
        const result = await apolloclient.mutate({
          mutation: DELETE_WOREDA,
          variables: {
            id: id,
          },
        });
      } catch (error) {
        console.log(error);
      }
    },

    async get_address_by_id(id) {
      try {
        const result = await apolloclient.query({
          query: GET_ADDRESS_BY_ID,
          variables: {
            id: id,
          },
        });
        return result.data.address_by_pk;
      } catch (error) {
        console.log(error);
      }
    },
    async delete_kebele(id) {
      try {
        const result = await apolloclient.mutate({
          mutation: DELETE_KEBELE,
          variables: {
            id: id,
          },
        });
      } catch (error) {
        console.log(error);
      }
    },
    async insert_kebele(k_name, woreda_id) {
      try {
        const result = await apolloclient.mutate({
          mutation: INSERT_KEBELE,
          variables: {
            name: k_name,
            woreda_id: woreda_id,
          },
        });
        return result.data.insert_kebele_one.id;
      } catch (error) {
        console.log(error);
      }
    },
    async update_kebele(kebele_id, k_name,woreda_id) {
      try {
        const result = await apolloclient.mutate({
          mutation: UPDATE_KEBELE,
          variables: {
            id: kebele_id,
            name: k_name,
            woreda_id:woreda_id
          },
        });
        console.log("update kebele", result );
        return result.data.update_kebele_by_pk.id;
      } catch (error) {
        console.log(error);
        return error
      }
    },
    async insert_region(name) {
      try {
        const result = await apolloclient.mutate({
          mutation: INSERT_REGION,
          variables: {
            name: name,
          },
        });
        return result.data.insert_region_one.id;     
      } catch (error) {
        console.log(error);
        return error
      }

    },
    async insert_zone(name,region_id) {
      try {
        const result = await apolloclient.mutate({
          mutation: INSERT_ZONE,
          variables: {
            name: name,
            region_id:region_id
          },
        });
        return result.data.insert_zone_one.id;
      } catch (error) {
        console.log(error);
        return error
      }
    },
    async insert_woreda(name,zone_id) {
      try {
        const result = await apolloclient.mutate({
          mutation: INSERT_WOREDA,
          variables: {
            name: name,
            zone_id:zone_id
          },
        });
        return result.data.insert_woreda_one.id;
      } catch (error) {
        console.log(error);
        return error 
      }
    }
  },
  getters: {},
  persist: {
    enabled: false,
    mode: "localSession",
  },
});
