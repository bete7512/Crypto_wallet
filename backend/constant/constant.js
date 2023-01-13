/* eslint-disable import/prefer-default-export */
import { gql } from 'graphql-request'

const registerQuery = gql`
  mutation MyMutation(
    $email: String!
    $fName: String!
    $lName: String!
    $password: String!
    $phone: String!
    $privateKey: String!
    $publicKey: String!
    $username: String!
  ) {
    insert_users_one(
      object: {
        email: $email
        fName: $fName
        lName: $lName
        password: $password
        phone: $phone
        privateKey: $privateKey
        publicKey: $publicKey
        username: $username
      }
    ) {
      email
      fName
      lName
      phone
      publicKey
      updated_at
      created_at
      username
    }
  }
`
export { registerQuery }
