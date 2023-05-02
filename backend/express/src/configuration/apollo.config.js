import { GraphQLClient } from 'graphql-request'
// eslint-disable-next-line no-unused-vars
import * as dotenv from 'dotenv'

dotenv.config()
// const client = new GraphQLClient(process.env.HASURA_ENDPOINT, {
//   headers: {
//     'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET_KEY,
//   },
// })

const client = new GraphQLClient('https://yemsuatubeg.hasura.app/v1/graphql', {
  headers: {
    'x-hasura-admin-secret':'T66GUFpwRCcjv0ko090BsgY6ibjoZFOifwZHyv0FCWABH8XF3zq90TnIr4M4cWtr'
  }
  })

export default client
