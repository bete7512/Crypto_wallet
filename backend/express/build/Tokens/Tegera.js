"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tegera = void 0;
var _web = require("../web3/web3.js");
var _Tegera_sepolia_ABI = require("../constant/Tegera_sepolia_ABI.js");
/**
 * Sepolia Tegera Token Contract Address
 * Tegera = 0x09871Adb124aab581046EA38c26C6af2e88F280E
 * 
 */
var contractAddress = '0x09871Adb124aab581046EA38c26C6af2e88F280E';
var tegera = new _web.web3.eth.Contract(_Tegera_sepolia_ABI.Tegera_ABI, contractAddress);

// 
exports.tegera = tegera;