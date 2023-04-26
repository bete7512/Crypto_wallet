import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client/core";
const getHeaders = () => {
    var headers = {};
    const token = window.localStorage.getItem("");
    if(token){
      headers = {Authorization:`Bearer ${token}`};
    }
    return headers;
  };
const httpLink = createHttpLink({
    uri:'http://localhost:8080/v1/graphql',
    headers:{
        'x-hasura-admin-secret':'myadminsecretkey'
    }
    // getHeaders()
})
const apolloclient = new ApolloClient({
    link:httpLink,
    cache:new InMemoryCache()
})
export default apolloclient