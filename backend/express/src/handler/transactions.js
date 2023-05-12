import { web3 } from '../web3/web3.js'
import jwtDecode from 'jwt-decode'
import { User } from '../utils/user.js'
import { Alchemy, Network } from 'alchemy-sdk'
import { GraphQLClient } from 'graphql-request'
import * as dotenv from 'dotenv'

dotenv.config()
const WALLET_TRANSACTIONS = `
query Transactions($address: String!) {
  ethereumSepolia {
    walletByAddress(address: $address) {
      transactions {
        edges {
          node {
            blockNumber
            blockTimestamp
            contractAddress
            fromAddress
            cumulativeGasUsed
            effectiveGasPrice
            gas
            gasPrice
            gasUsed
            hash
            maxFeePerGas
            maxPriorityFeePerGas
            toAddress
            type
            input
            transactionIndex
            value
          }
        }
      }
    }
  }
}`
const node =new GraphQLClient('https://api.quicknode.com/graphql', {
  headers: {
    'x-api-key': 'QN_c64163681a444c6fbd403d4a6d2044f6',
  },
})
// const config = {
//   apiKey: '5NOA_cRPiKibJ6QRvlAQamuQWFKWkjJJ',
//   network: Network.ETH_SEPOLIA,
// }
// const alchemy = new Alchemy(config)

const handler = async (req, res) => {
  try {
    let token = req.headers.authorization
    token = token.split(' ')[1]
    const content = jwtDecode(token)
    const user_id = content['https://hasura.io/jwt/claims']['x-hasura-user-id']
    const user = await User({ id: user_id })
    console.log(user);
    if (!user) return res.status(200).json({ transactions: [] })
    if (user.wallets.length == 0) {
      return res.status(200).json({ transactions: [] })
    }
    const address = user.wallets[0].public_key
    console.log(address);
    const { ethereumSepolia } = await node.request(WALLET_TRANSACTIONS, {
      address: address,
    })
    console.log(ethereumSepolia.walletByAddress.transactions.edges   );
    return res
      .status(200)
      .json({
        transactions: ethereumSepolia.walletByAddress.transactions.edges,
      })
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: 'Unexpected Error Occured' })
  }
}
module.exports = handler