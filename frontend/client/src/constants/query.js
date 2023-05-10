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

  export const GET_TOKENS = gql`
  query MyQuery {
    tokens {
      created_at
      id
      name
      network_id
      symbol
      total_supply
      url_address
      network {
        name
        id
      }
    }
  }
  `

  export const GET_NETWORKS = gql`
  query MyQuery {
    network {
      name
      id
      tokens {
        name
        id
      }
    }
  }
`  

export const USER_PROFILE = gql`
query MyQuery {
  users {
    first_name
    email
    last_name
    id
    wallets {
      public_key
      private_key
      recovery_phrase
      id
    }
  }
}
`