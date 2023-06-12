"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tether = void 0;
var _web = require("../web3/web3.js");
var _Tether_sepolia_ABI = require("../constant/Tether_sepolia_ABI.js");
var contractAddress = '0x222fB5507acD3Da78351Be60271fa9537b07Cdc3'; //0x0e387335a0367Daa2Dac27470437043d36E095D4
var Tether = new _web.web3.eth.Contract(_Tether_sepolia_ABI.Tether_ABI, contractAddress);
exports.Tether = Tether;