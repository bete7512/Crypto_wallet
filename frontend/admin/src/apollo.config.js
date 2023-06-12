import { ApolloClient,createHttpLink,InMemoryCache } from "@apollo/client/core";
const getHeaders = () => {
    var headers = {};
    const token = window.localStorage.getItem("cryptoAdminToken");
    // console.log("from apollo token"+token);
    if (token){

      headers = {Authorization:`Bearer ${token}`};
    }
    return headers;
  };
const httpLink = createHttpLink({
    uri:'https://blockchain-wallet.hasura.app/v1/graphql',
    fetch,
    headers:{
      'x-hasura-admin-secret':'aV1Xjxq3gzIVxppyVUwLL13JrLC2A2ZOlfYeenaXko46zqI89K7N1rK43WNWciH7'
    }
})
const apolloclient = new ApolloClient({
    link:httpLink,
    cache:new InMemoryCache()
})
export default apolloclient