import Web3 from 'web3';
import { web3 } from '../web3/web3';
import { config } from 'dotenv';
import client from '../configuration/apollo.config';
import { createWalletQuery } from '../constant/constant';
import { ethers } from 'ethers';
const bip39 = require('bip39');
const hdkey = require('hdkey');
config();


async function recoverAccount(privateKey) {
 if (!privateKey.startsWith('0x')) {
    privateKey = '0x' + privateKey;
  }

  const account = web3.eth.accounts.privateKeyToAccount(privateKey);

  const mnemonic = bip39.generateMnemonic();

  const seed = await bip39.mnemonicToSeed(mnemonic);

  const masterNode = hdkey.fromMasterSeed(seed);

  const childNode = masterNode.derive("m/44'/60'/0'/0/0");

  const derivedPrivateKey = childNode.privateKey.toString('hex');

  const wallet = {
    originalAddress: account.address,
    originalPrivateKey: privateKey,
    derivedAddress: web3.eth.accounts.privateKeyToAccount('0x' + derivedPrivateKey).address,
    derivedPrivateKey: derivedPrivateKey,
    mnemonic: mnemonic,
  };

  console.log(wallet);
  return wallet;
}

export {recoverAccount}