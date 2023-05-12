import { web3 } from '../web3/web3.js'
import jwtDecode from 'jwt-decode'
import { User } from '../utils/user.js'
import { Alchemy, Network } from 'alchemy-sdk'
import { GraphQLClient } from 'graphql-request'
import * as dotenv from 'dotenv'
const Tegera_Address = '0x09871Adb124aab581046EA38c26C6af2e88F280E'           
const Tether_Address = '0x222fB5507acD3Da78351Be60271fa9537b07Cdc3'
dotenv.config()

const config = {
  apiKey: '5NOA_cRPiKibJ6QRvlAQamuQWFKWkjJJ',
  network: Network.ETH_SEPOLIA,
}
const alchemy = new Alchemy(config)

const handler = async (req, res) => {
  try {
    let token = req.headers.authorization
    token = token.split(' ')[1]
    const content = jwtDecode(token)
    const user_id = content['https://hasura.io/jwt/claims']['x-hasura-user-id']
    const user = await User({ id: user_id })
    console.log(user)
    if (!user) return res.status(200).json({ transactions: [] })
    if (user.wallets.length == 0) {
      return res.status(200).json({ transactions: [] })
    }
    const address = user.wallets[0].public_key
    // const response = await fetch('https://api-sepolia.etherscan.io/api?module=account&action=txlist&address=' + address + '&startblock=0&endblock=99999999&page=1&offset=50&sort=asc&apikey=3TKNZYI5MRN69PMWC1VGJMJWK35YDIKV6V');
    //
    const token_type = req.body.input.token_type // Tether or Tegera
    const contract_address = token_type == 'Tether' ? Tether_Address : Tegera_Address    
    const response = await fetch('https://api-sepolia.etherscan.io/api?module=account&action=tokentx&contractaddress='+contract_address+'&address='+address+'&page=1&offset=100&startblock=0&endblock=99999999&sort=asc&apikey=3TKNZYI5MRN69PMWC1VGJMJWK35YDIKV6V')
    if (response.ok) {
      const data = await response.json();
      return res.status(200).json({ transaction: data.result})
      console.log(data); // Output the response data
    } else {
      console.log('Request failed with status:', response.status);
    }
    
  } catch (error) {
    console.log(error)
    return res.status(400).json({ message: 'Unexpected Error Occured' })
  }
}
module.exports = handler






/**
 * 
 *  var myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')
 *     var raw = JSON.stringify({
      id: 67,
      jsonrpc: '2.0',
      method: 'qn_getTransactionsByAddress',
      params: [
        {
          address: address,
          page: 1,
          perPage: 100,
        },
      ],
    })

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    }

    fetch(
      'https://lingering-hidden-daylight.ethereum-sepolia.discover.quiknode.pro/996e3cd76bb14b5babd73ddbb999527b26ecc24e/',
      requestOptions,
    )
      .then((response) => response.text())
      .then((result) => {
        console.log(result)
        return res.status(200).json({ transaction: result })
      })
      .catch((error) => {
        console.log('error', error)
        return res.status(400).json({ message: 'Unexpected Error Occured' })
      })
 */