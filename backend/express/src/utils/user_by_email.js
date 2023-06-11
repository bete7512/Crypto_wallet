import client from '../configuration/apollo.config'
const USE_BY_ID = `
query MyQuery($email: String = "") {
    users(where: {email: {_eq: $email}}, limit: 1) {
      first_name
      last_name
      email
      id
      password
      roleId
      role {
        name
      }
      status
      two_step
    }
  }
`
const User = async (variables) => {
  try {
    const data = await client.request(USE_BY_ID, variables)
    // console.log(data)
    return data['users'][0]
  } catch (error) {
    console.log(error)
    return error
  }

}
export { User }
