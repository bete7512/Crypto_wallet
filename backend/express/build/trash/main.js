"use strict";

var Web3 = require('web3');
var Web3js = new Web3(new Web3.providers.HttpProvider('https://{username}:{password}@bisontrailsURL'));
var privateKey = process.env.YOUR_PRIVATE_KEY; //Your Private key environment variable

var tokenAddress = '0x4134aa5373acafc36337bf515713a943927b06e5'; // Demo Token contract address

var toAddress = ''; // where to send it

var fromAddress = ''; // Your address

var contractABI = [{
  constant: false,
  inputs: [{
    name: '_to',
    type: 'address'
  }, {
    name: '_value',
    type: 'uint256'
  }],
  name: 'transfer',
  outputs: [{
    name: '',
    type: 'bool'
  }]
}];
var contract = new Web3js.eth.Contract(contractABI, tokenAddress, {
  from: fromAddress
});
var amount = Web3js.utils.toHex(Web3js.utils.toWei('1')); //1 DEMO Token

var data = contract.methods.transfer(toAddress, amount).encodeABI();