import client from '../configuration/apollo.config'
const USE_BY_ID = `query MyQuery($id: Int!) {
    users_by_pk(id: $id) {
      id
      email
      first_name
      wallets {
        public_key
        private_key
      }
    }
  }
`
const User = async (variables) => {
  const data = await client.request(USE_BY_ID, variables)
  return data['users_by_pk']
}
export { User }
