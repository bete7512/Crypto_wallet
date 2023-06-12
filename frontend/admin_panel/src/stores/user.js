import { defineStore } from 'pinia'
import { provideApolloClient } from '@vue/apollo-composable';
import apolloclient from '../apollo.config'
import router from '../router/router'
import gql from 'graphql-tag'
import { LOGIN, UPDATE_USER_BY_ID } from '../constants/queries';
import { notify } from '@kyvg/vue3-notification';
provideApolloClient(apolloclient);
export const userStore = defineStore("user", {
    state: () => ({
        user: {},
        userLoggedin: localStorage.getItem('Apollotoken') ? true : false,
        isauthenticated: false,
        user_id: "",
        first_name: "",
        last_name: "",
        phone_number: "",
        password: "",
        username: "",
        status: "",
        id: "",
        is_verified: "",
        role_id: "",
        roles: []
    }),
    actions: {
        async login(phone, password) {
            try {
                const result = await apolloclient.mutate({
                    mutation: LOGIN,
                    variables: {
                        phone: phone,
                        password: password,
                    }
                })
                localStorage.setItem("rensysAdminToken", result["data"]["login"]["accestoken"]);
                localStorage.setItem("id", result["data"]["login"]["id"]);
                this.userLoggedin = true
                router.push('/')
                notify({
                    type: 'success',     
                    text: 'You have successfully logged in',
                })
            } catch (error) {
                console.log(error);
                return error.message
            }
        },
        logout() {
            localStorage.removeItem('rensysAdminToken');
            this.isauthenticated = false,
            router.push('/login');
            notify({
                type: 'success',      
                text: 'You have successfully logged out',     
            })
        },
        async insert_user() {
            let admin_id = null
            let operator_id = null
            console.log("this.role_id", this.role_id, "this.roles", this.roles);
            console.log(this.role_id == this.roles.find(x => x.name === "technician").id);
            if (this.role_id == this.roles.find(x => x.name === "technician").id) {
                console.log("technician checked from here");
                return { error: { message: "You can only update username of Technician and Status of Technician from here" } }
            }
            if (this.role_id == this.roles.find(x => x.name === "admins").id) {
                console.log("admin checked from here");
                try {
                    let result = await apolloclient.mutate({
                        mutation: gql`mutation MyMutation($first_name: String = "", $last_name: String = "", $phone_number: String = "") {
                        insert_admins_one(object: {first_name: $first_name, last_name: $last_name, phone_number: $phone_number}) {
                          id
                        }
                      }
                      `,
                        variables: {
                            first_name: this.first_name,
                            last_name: this.last_name,
                            phone_number: this.phone_number
                        }
                    })
                    admin_id = result.data.insert_admins_one.id
                } catch (error) {
                    console.log(error);
                    return error
                }
            }
            if (this.role_id == this.roles.find(x => x.name === "operator").id) {
                console.log("operator checked from here")
                try {
                    let result = await apolloclient.mutate({
                        mutation: gql`
                    mutation MyMutation($first_name: String = "", $last_name: String = "", $phone_number: String = "") {
                        insert_operator_one(object: {first_name: $first_name, last_name: $last_name, phone_number: $phone_number}) {
                          id
                        }
                      }
                    `
                        ,
                        variables: {
                            first_name: this.first_name,
                            last_name: this.last_name,
                            phone_number: this.phone_number,
                        }
                    })
                    operator_id = result.data.insert_operator_one.id
                } catch (error) {
                    return error
                }
            }
            try {
                let res = await apolloclient.mutate({
                    mutation: gql`mutation MyMutation($id: uuid = "",  $status: Boolean = false) {
                        update_users_by_pk(pk_columns: {id: $id}, _set: { status: $status}) {
                          id
                        }
                      }
                    `,
                    variables: {
                        id: admin_id ? admin_id : operator_id,
                        status: this.status
                    }
                })
                console.log("result of added users", res.data.update_users_by_pk)
                return res.data.update_users_by_pk.id
            } catch (error) {
                console.log(error);
                return error
            }
        },
        async update_user(id, status) {
            try{
                const result = await apolloclient.mutate({
                    mutation: UPDATE_USER_BY_ID,
                    variables: {
                        id: id,
                        status: status,
                    }
                })
                return result.update_users_by_pk.id
            }
            catch (error) {
                return error.message
            }
        },
        async get_user(id) {
            try {
                const result = await apolloclient.query({
                    query: gql`
                    query MyQuery($id: uuid = "") {
                        users_by_pk(id: $id) {
                          first_name
                          last_name
                          phone_number
                          status
                          username
                          user_roles {
                            role_id
                            role {
                              name
                            }
                          }
                        }
                      }
                      `,
                    variables: {
                        id: id,
                    }
                })
                console.log("result", result.data.users_by_pk);
                this.first_name = result.data.users_by_pk.first_name
                this.last_name = result.data.users_by_pk.last_name
                this.phone_number = result.data.users_by_pk.phone_number
                this.status = result.data.users_by_pk.status
                this.username = result.data.users_by_pk.username
                this.role_id = result.data.users_by_pk.user_roles[0].role_id
                return result.data.users_by_pk
            }
            catch (error) {
                return error.message
            }
        },
        async get_roles() {
            try {
                const result = await apolloclient.query({
                    query: gql`
                    query MyQuery {
                             roles {
                               id
                               name
                             }
                           }
                         `,
                })
                console.log("result", result.data.roles);
                this.roles = result.data.roles
                return result.data.roles
            }
            catch (error) {
                console.log(error);
                return error
            }
        },
        async delete_users(id, role) {
            if (role == "technician") {
                return { error: { message: "You can only update username of Technician and Status of Technician from here" } }
            }
            if (role == 'operator') {
                try {
                    let res = await apolloclient.mutate({
                        mutation: gql`
                        mutation MyMutation($id: uuid = "") {
                            delete_operator_by_pk(id: $id) {
                                id
                                 }
                                 }
                                 `,
                        variables: {
                            id
                        }
                    })
                    console.log("result of deleted operator", res.data.delete_operator_by_pk)
                    return res.data.delete_operator_by_pk.id
                } catch (error) {
                    console.log(error);
                    return error;
                }
            }
            if(role == 'admins'){
                try {
                    let res = await apolloclient.mutate({
                        mutation: gql`
                        mutation MyMutation($id: uuid = "") {
                            delete_admins_by_pk(id: $id) {
                                id
                                 }
                                 }
                                 `,
                        variables: {
                            id
                        }
                    })
                    console.log("result of deleted admin", res.data.delete_admins_by_pk)
                    return res.data.delete_admins_by_pk.id
                } catch (error) {
                    console.log(error);
                    return error;
                }
            }

        },
        async reset_user_password(id) {
            try {
                const result = await apolloclient.mutate({
                    mutation: gql`
                    mutation MyMutation($user_id: String = "") {
                        reset_password(user_id: $user_id) {
                          success
                        }
                      }
                    `,
                    variables: {
                        user_id: id
                    }
                })
                notify({
                    title:result.data.reset_password.success,
                    type: "success"
                })
                return result.data.reset_password.success      
            }
            catch (error) {
                notify({
                    title:error.message,
                    type: "error"
                })
                return error
            }
        },
    },
    getters: {
    },
    persist: {
        enabled: false,
        mode: "localSession"
    }

})