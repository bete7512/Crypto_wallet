import Web3 from 'web3'
import { web3 } from '../web3/web3'
import { config } from 'dotenv'
import client from '../configuration/apollo.config'
import { createWalletQuery } from '../constant/constant'
import { ethers } from 'ethers'
const bip39 = require('bip39')
const hdkey = require('hdkey') 
config()
async function recoverWallet(mnemonic) {
    const seed = await bip39.mnemonicToSeed(mnemonic)
  
    const masterNode = hdkey.fromMasterSeed(seed)
  
    const childNode = masterNode.derive("m/44'/60'/0'/0/0")
  
    const privateKey = childNode.privateKey.toString('hex')
    const account = web3.eth.accounts.privateKeyToAccount('0x' + privateKey)
  
    const wallet = {
      address: account.address,
      privateKey: privateKey,
      mnemonic: mnemonic
    }
  
    return wallet
  }

  module.exports = recoverWallet  