import { GraphQLClient } from 'graphql-request'

const client = new GraphQLClient(
  'https://blockchain-wallet.hasura.app/v1/graphql',
  {
    headers: {
      'x-hasura-admin-secret':
        'aV1Xjxq3gzIVxppyVUwLL13JrLC2A2ZOlfYeenaXko46zqI89K7N1rK43WNWciH7',
    },
  },
)
export default client
