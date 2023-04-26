/* eslint-disable import/prefer-default-export */
import { gql } from 'graphql-request'

const registerQuery = gql`
  mutation MyMutation(
    $email: String!
    $first_name: String!
    $last_name: String!
    $password: String!
  ) {
    insert_users_one(
      object: {
        email: $email
        first_name: $first_name
        last_name: $last_name
        password: $password
      }
    ) {
      email
      first_name
      last_name
      created_at
      id
    }
  }
`


const loginQuery = gql`
query MyQuery($email: String = "") {
  users(where: {email: {_eq: $email}}) {
    first_name
    last_name
    email
    id
    password
    roleId
    role {
      name
    }
  }
}
`

const createWalletQuery = gql`
mutation MyMutation($private_key: String = "", $public_key: String = "", $userId: Int = 10, $recovery_phrase: String = "") {
  insert_wallet_one(object: {private_key: $private_key, public_key: $public_key, userId: $userId, recovery_phrase: $recovery_phrase}) {
    id
    private_key
    public_key
    userId
  }
}
 ` 

export { registerQuery,loginQuery,createWalletQuery }
