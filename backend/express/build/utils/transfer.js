"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
var _web = _interopRequireDefault(require("web3"));
var dotenv = _interopRequireWildcard(require("dotenv"));
var _web3EthContract = _interopRequireDefault(require("web3-eth-contract"));
var _web3EthPersonal = _interopRequireDefault(require("web3-eth-personal"));
var _constant = require("../constant/constant");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
dotenv.config();
var web3 = new _web["default"](process.env.INFURA_GOERLI_END_POINT);
var privateKey = process.env.YOUR_PRIVATE_KEY; //Your Private key environment variable

var tokenAddress = '0xdAC17F958D2ee523a2206206994597C13D831ec7'; // Demo Token contract address
var toAddress = '0x871A92E6a2Ef6Fe4Af01BD935333502d0f375AbF'; // where to send it
var fromAddress = '0x2709Ae17403096A516b86ad4f39c463CD9b92aF2'; // Your address
var contractABI = _constant.Tether_ABI;
var contract = new web3.eth.Contract(contractABI, tokenAddress);
var amount = web3.utils.toHex(web3.utils.toWei("1")); //1 DEMO Token
var data = contract.methods.transfer(toAddress, amount).encodeABI();