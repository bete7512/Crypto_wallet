import client from '../configuration/apollo.config'
const USE_BY_ID = `
query MyQuery($id: Int!) {
  users_by_pk(id: $id) {
    id
    email
    first_name
    total_transaction
    last_name
    wallets {
      id
      userId
      public_key
      private_key
    }
    wallet {
      id
      userId
      public_key
      private_key
    }
    two_step
  }
}
`

const UPDATE_WALLET = `
mutation MyMutation($id: Int = 10, $private_key: String = "", $public_key: String = "", $recovery_phrase: String = "") {
  update_wallet_by_pk(pk_columns: {id: $id}, _set: {private_key: $private_key, public_key: $public_key, recovery_phrase: $recovery_phrase}) {
    id
  }
}


`
const User = async (variables) => {
  const data = await client.request(USE_BY_ID, variables)
  return data['users_by_pk']
}

const COUNTER = `
mutation MyMutation($total_transaction: Int!, $id: Int!) {
  update_users_by_pk(pk_columns: {id: $id}, _set: {total_transaction: $total_transaction}) {
    total_transaction
  }
}
`
const UpdateWallet = async (variables) => {
 try {
   const data = await client.request(UPDATE_WALLET, variables)
   console.log("Update Wallet",data);       
   return data['update_wallet_by_pk']  
 } catch (error) {
  console.log("wallet update", error.message);
 }      
}

const transactionCounter = async (variables) => {
  try {    
    const data = await client.request(COUNTER, variables)            
    return data['update_users_by_pk']         
  }
  catch(error){
    console.log(error.message);
  }         
}

export { User,UpdateWallet,transactionCounter }
