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

export { registerQuery }
