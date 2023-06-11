import client from '../configuration/apollo.config'
const TOKEN_BY_ID = `
    query MyQuery($id: Int!) {
        tokens_by_pk(id: $id) {
          name
          id
          price {
            currency
            price
          }
        }
      }
`
const Token = async (variables) => {
  const data = await client.request(TOKEN_BY_ID, variables)
  return data['tokens_by_pk']
}
export { Token }
