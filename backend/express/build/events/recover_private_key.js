"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.recoverAccount = recoverAccount;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _web = _interopRequireDefault(require("web3"));
var _web2 = require("../web3/web3");
var _dotenv = require("dotenv");
var _apollo = _interopRequireDefault(require("../configuration/apollo.config"));
var _constant = require("../constant/constant");
var _ethers = require("ethers");
var bip39 = require('bip39');
var hdkey = require('hdkey');
(0, _dotenv.config)();
function recoverAccount(_x) {
  return _recoverAccount.apply(this, arguments);
}
function _recoverAccount() {
  _recoverAccount = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(privateKey) {
    var account, mnemonic, seed, masterNode, childNode, derivedPrivateKey, wallet;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          if (!privateKey.startsWith('0x')) {
            privateKey = '0x' + privateKey;
          }
          account = _web2.web3.eth.accounts.privateKeyToAccount(privateKey);
          mnemonic = bip39.generateMnemonic();
          _context.next = 5;
          return bip39.mnemonicToSeed(mnemonic);
        case 5:
          seed = _context.sent;
          masterNode = hdkey.fromMasterSeed(seed);
          childNode = masterNode.derive("m/44'/60'/0'/0/0");
          derivedPrivateKey = childNode.privateKey.toString('hex');
          wallet = {
            originalAddress: account.address,
            originalPrivateKey: privateKey,
            derivedAddress: _web2.web3.eth.accounts.privateKeyToAccount('0x' + derivedPrivateKey).address,
            derivedPrivateKey: derivedPrivateKey,
            mnemonic: mnemonic
          };
          console.log(wallet);
          return _context.abrupt("return", wallet);
        case 12:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _recoverAccount.apply(this, arguments);
}