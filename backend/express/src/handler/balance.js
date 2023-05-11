import { web3 } from '../web3/web3.js'
import jwtDecode from 'jwt-decode'
import { User } from '../utils/user.js'
import { Network, Alchemy } from 'alchemy-sdk'
import BigNumber from 'bignumber.js'

const settings = {
  apiKey: '5NOA_cRPiKibJ6QRvlAQamuQWFKWkjJJ',
  network: Network.ETH_SEPOLIA,
}

const alchemy = new Alchemy(settings)

const latestBlock = alchemy.core.getBlockNumber()
const handler = async (req, res) => {
  try {
    let token = req.headers.authorization
    token = token.split(' ')[1]
    const content = jwtDecode(token)
    const user_id = content['https://hasura.io/jwt/claims']['x-hasura-user-id']
    const user = await User({ id: user_id })
    const address = user.wallets[0].public_key
 
    alchemy.core
      .getBalance(address, 'latest')
      .then((balance) => {
        const balanceWei = web3.utils.toBN(balance)
        const balanceFloat = parseFloat(web3.utils.fromWei(balanceWei, 'ether'))

        console.log(balanceFloat)
      })
      .catch((error) => {
        console.error(error)
      })
    let balance = await web3.eth.getBalance(address);
    balance = web3.utils.fromWei(balance, 'ether');
    return res.status(200).json({ balance: balance })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: error.message })
  }
}

module.exports = handler
