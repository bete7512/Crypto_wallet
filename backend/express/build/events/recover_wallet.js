"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
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
function recoverWallet(_x) {
  return _recoverWallet.apply(this, arguments);
}
function _recoverWallet() {
  _recoverWallet = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(mnemonic) {
    var seed, masterNode, childNode, privateKey, account, wallet;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return bip39.mnemonicToSeed(mnemonic);
        case 2:
          seed = _context.sent;
          masterNode = hdkey.fromMasterSeed(seed);
          childNode = masterNode.derive("m/44'/60'/0'/0/0");
          privateKey = childNode.privateKey.toString('hex');
          account = _web2.web3.eth.accounts.privateKeyToAccount('0x' + privateKey);
          wallet = {
            address: account.address,
            privateKey: privateKey,
            mnemonic: mnemonic
          };
          return _context.abrupt("return", wallet);
        case 9:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _recoverWallet.apply(this, arguments);
}
module.exports = recoverWallet;