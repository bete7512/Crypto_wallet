import { defineStore } from "pinia";
import { provideApolloClient } from "@vue/apollo-composable";
import apolloclient from "../apollo.config";
import router from "../router/router";
import {
  INSERT_ACCESSORY,
  FILE_UPLOAD,
  QUERY_ALL_ACCESSORY,
  INSERT_ACCESSORY_REQUEST,
  INSERT_REPORT,
  DELETE_ACCESSORY_REQUEST,
  DELETE_ACCESSORY
} from "../constants/queries";

provideApolloClient(apolloclient);
export const accessoryStore = defineStore("accessory", {
  state: () => ({
    name: "Solar Panel ",
    description: "Solar Panel Description",
    price: "2000",
    image_url: [],
    accessories: [],
    url: [],
    base64str: "",
    type: "",
    f_name: "",
    ObjectFile: [],
    file: "",
    quantity_in_stock: 1,
  }),
  actions: {
    async insert_accessory() {
      try {
        await this.add_image();
      } catch (error) {
        console.log(error);
      }
      console.log("inside insert accessory");
      try {
        const response = await apolloclient.mutate({
          mutation: INSERT_ACCESSORY,
          variables: {
            name: this.name,
            description: this.description,
            price: this.price,
            images: this.image_url.join(),
            quantity_in_stock: this.quantity_in_stock,
          },
        });
        console.log(response);
        return response.data.insert_accessory_one.id;
      } catch (err) {
        console.log(err);
        return err;
      }
    },
    async add_image() {
      for (let i = 0; i < this.ObjectFile.length; i++) {
        console.log("inside a loop" + this.ObjectFile[i]);
        var hold = this.ObjectFile[i];
        console.log(hold);
        try {
          var tempourl = await fileupload(hold);
          this.image_url.push(tempourl);
          console.log(tempourl);
        } catch (error) {
          console.log(error);
        }
      }
    },

    async get_all_accessories() {
      try {
        const response = await apolloclient.query({
          query: QUERY_ALL_ACCESSORY,
        });
        console.log(response.data.accessory);
        this.accessories = response.data.accessory;
      } catch (error) {
        console.log(error);
      }
    },
    async insert_accessory_request(variables) {
      // console.log("reall variables for it", variables);
      // let price_id;
      // try {
      //   const response = await apolloclient.query({
      //     query: FIND_ACCESSORY_BY_ID,
      //     variables: {
      //       acessory_id: variables.accessory_id,
      //     },
      //   });
      //   console.log("hygiygiyyyyyyyyyyyyyyyyyyyyyyyyr", response.data);
      //   price_id = response.data.price[0].id;
      // } catch (error) {
      //   console.log(error);
      // }
      try {
        const response = await apolloclient.mutate({
          mutation: INSERT_ACCESSORY_REQUEST,
          variables: {
            accessory_id: variables.accessory_id,
            quantity: variables.quantity,
            service_req_id: variables.service_req_id,
            reason: variables.reason,
            is_verified: variables.is_verified,
          },
        });
        return response.data.insert_accessory_request_one.id;
      } catch (err) {
        console.log(err);
        return err;
      }
    },
    async delete_accessory(id) {
      try {
        const response = await apolloclient.mutate({
          mutation: DELETE_ACCESSORY,
          variables: {
            id: id,
          },
        });
        console.log(response);
        return response.data.delete_accessory_by_pk.id;
      } catch (err) {
        console.log(err);
        return err;
      }
    },
    async delete_accessory_request(id) {
      try {
        const response = await apolloclient.mutate({
          mutation: DELETE_ACCESSORY_REQUEST,
          variables: {
            id: id,
          },
        });
        console.log(response);
        return response.data.delete_accessory_request_by_pk.id;
      } catch (err) {
        console.log(err);
        return err;
      }
    },
  },
  getters: {},
});

const fileupload = async (object) => {
  try {
    const response = await apolloclient.mutate({
      mutation: FILE_UPLOAD,
      variables: {
        name: object.file.name,
        type: object.file.type,
        base64str: object.base64str,
      },
    });
    console.log(response.data.fileupload.file_path);
    return response.data.fileupload.file_path;
  } catch (error) {
    console.log(error);
  }
};
