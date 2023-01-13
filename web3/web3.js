/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import Web3 from 'web3'
import Contract from 'web3-eth-contract'
import Personal from 'web3-eth-personal'

const web3 = new Web3(
  'https://goerli.infura.io/v3/7adda8f39ad04bf2b5709fe8a04fbbdd',
)
const account = web3.eth.accounts.create()
const web3Object = {
  account,
}
export { web3Object, web3 }
