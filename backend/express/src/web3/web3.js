/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import Web3 from 'web3'
import * as dotenv from 'dotenv'
// import Contract from 'web3-eth-contract'
// import Personal from 'web3-eth-personal'

dotenv.config()
const web3 = new Web3('wss://sepolia.infura.io/ws/v3/7adda8f39ad04bf2b5709fe8a04fbbdd')
  // process.env.INFURA_SEPOLIA_END_POINT)
// const contract = new Contract()
export { web3 }
