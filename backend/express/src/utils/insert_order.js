import client from '../configuration/apollo.config'

const INSERT_ORDER = `
mutation MyMutation($payment_status: Boolean = false, $status: Boolean = false, $token_id: Int!, $user_id: Int!, $amount: Float!, $reference_id: String = "") {
    insert_token_orders_one(object: {payment_status: $payment_status, status: $status, token_id: $token_id, user_id: $user_id, amount: $amount, reference_id: $reference_id}) {
      id
    }
  }  
 `

const InsertOrder = async (variables) => {
  try {
    const data = await client.request(INSERT_ORDER, variables)
    console.log(data);
    return data['insert_token_orders_one']
  } catch (error) {
    return error 
  }
}


module.exports = { InsertOrder }