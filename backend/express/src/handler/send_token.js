import { web3 } from '../web3/web3.js'
import { User } from '../utils/user.js'
import jwtDecode from 'jwt-decode'


const handler = async (req, res) => {
    const { to, amount, token_type } = req.body.input // to: receiver's public key, amount: amount of token to 
  let token = req.headers.authorization
  token = token.split(' ')[1]
  const content = jwtDecode(token)
  const user_id = content['https://hasura.io/jwt/claims']['x-hasura-user-id']
  const user = await User({ id: user_id })
  if (!user) return res.status(200).json({ transactions: [] })
  if (user.wallets.length == 0) {
    return res.status(200).json({ transactions: [] })
  }
  const sender_public_key = user.wallets[0].public_key
  const  sender_private_key = user.wallets[0].private_key 
}

module.exports = handler
