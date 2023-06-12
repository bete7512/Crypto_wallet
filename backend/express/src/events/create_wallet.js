import Web3 from 'web3'
import { web3 } from '../web3/web3'
import { config } from 'dotenv'
import client from '../configuration/apollo.config'
import { createWalletQuery } from '../constant/constant'
import { ethers } from 'ethers'
import recover_wallet from './recover_wallet'
import EventEmitter from 'events'
import { send_small_ether } from './send_small_ether'
const eventEmitter = new EventEmitter()
const bip39 = require('bip39')
const hdkey = require('hdkey')
config()
eventEmitter.on('send_small_ether', (public_key) => {
  send_small_ether(public_key)
})
const create_wallet = async (user) => {
  try {
    const mnemonic = ethers.Wallet.createRandom().mnemonic.phrase
    const seed = bip39.mnemonicToSeedSync(mnemonic)
    const masterNode = hdkey.fromMasterSeed(seed)
    const childNode = masterNode.derive("m/44'/60'/0'/0/0")
    const private_key = childNode.privateKey.toString('hex')
    const public_key = web3.eth.accounts.privateKeyToAccount(
      '0x' + private_key,
    ).address
    const { insert_wallets_one: wallet } = await client.request(
      createWalletQuery,
      {
        userId: user.id,
        private_key: private_key,
        public_key: public_key,
        recovery_phrase: mnemonic,
      },
    )
    eventEmitter.emit('send_small_ether', public_key)
    return wallet
  } catch (error) {
    console.error(error)
    throw new Error('Failed to create wallet')
  }
}

export default create_wallet
