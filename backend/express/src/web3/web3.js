/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import Web3 from 'web3'
import * as dotenv from 'dotenv'
// import Contract from 'web3-eth-contract'
// import Personal from 'web3-eth-personal'

dotenv.config()
const web3 = new Web3(process.env.INFURA_SEPOLIA_END_POINT)
const account = web3.eth.accounts.create()
const web3Object = {
  account,
}
export { web3Object, web3 }
