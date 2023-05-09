import gql from 'graphql-tag'; 
export const SIGNUP = gql`
mutation MyMutation($email: String = "", $first_name: String = "", $last_name: String = "", $password: String = "") {
    register(email: $email, first_name: $first_name, last_name: $last_name, password: $password) {
      success
    }
  }
`

export const LOGIN = gql`
mutation MyMutation($email: String = "", $password: String = "") {
    login(email: $email, password: $password) {
      access_token
    }
  }
  `