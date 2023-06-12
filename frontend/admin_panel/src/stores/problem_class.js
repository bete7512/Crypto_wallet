import { defineStore } from 'pinia'
// import {  signin, user_profile_query } from '@/tools/queries';
import { provideApolloClient } from '@vue/apollo-composable';
import apolloclient from '../apollo.config'
import router from '../router/router'
import { QUERY_PROBLEM_CLASS,INSERT_PROBLEM_CLASS } from '../constants/queries';

provideApolloClient(apolloclient);
export const problemStore = defineStore("problem", {
    state: () => ({
        problems: []
    }),
    actions: {
        async get_problem_class(){
            try {
                const result = await apolloclient.query({
                    query: QUERY_PROBLEM_CLASS,
                })
                console.log(result);
                this.problems = [...result.data.problem_class] 
                return result.data.problem_class
            } catch (error) {
                console.log(error);
                return error.message
            }  
        },
      async insert_problem_class(new_problem){
        try {
            const result = await apolloclient.mutate({
                mutation: INSERT_PROBLEM_CLASS,
                variables: {
                    name: new_problem,
                }
            })
            this.problems.push({name:result.data.insert_problem_class.returning[0].name, id:result.data.insert_problem_class.returning[0].id})
            return {name:result.data.insert_problem_class.returning[0].name, id:result.data.insert_problem_class.returning[0].id}
        } catch (error) {
            console.log(error);
        }
      }
    },
    getters: {
    },
    persist: {
        enabled: true,
        mode: "localSession"
    }

})