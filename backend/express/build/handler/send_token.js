"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _web = require("../web3/web3.js");
var _user = require("../utils/user.js");
var _jwtDecode = _interopRequireDefault(require("jwt-decode"));
var _Tegera_sepolia_ABI = require("../constant/Tegera_sepolia_ABI.js");
var _Tether_sepolia_ABI = require("../constant/Tether_sepolia_ABI.js");
var handler = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$body$input, to, amount, token_type, token, content, userId, user, senderPublicKey, senderPrivateKey, gasPrice, gasLimit, nonce, decimals, amountInWei, tokenABI, tokenAddress, contract, data, balance, transactionObject, signedTransaction, receipt, transactionHash;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body$input = req.body.input, to = _req$body$input.to, amount = _req$body$input.amount, token_type = _req$body$input.token_type;
          token = req.headers.authorization;
          token = token.split(' ')[1];
          content = (0, _jwtDecode["default"])(token);
          userId = content['https://hasura.io/jwt/claims']['x-hasura-user-id'];
          _context.next = 8;
          return (0, _user.User)({
            id: userId
          });
        case 8:
          user = _context.sent;
          if (!(!user || user.wallets.length === 0)) {
            _context.next = 11;
            break;
          }
          return _context.abrupt("return", res.status(200).json({
            transactions: []
          }));
        case 11:
          senderPublicKey = user.wallets[0].public_key;
          senderPrivateKey = user.wallets[0].private_key;
          _context.next = 15;
          return _web.web3.eth.getGasPrice();
        case 15:
          gasPrice = _context.sent;
          gasLimit = 100000; // Adjust this value based on the ERC20 token contract
          _context.next = 19;
          return _web.web3.eth.getTransactionCount(senderPublicKey);
        case 19:
          nonce = _context.sent;
          decimals = 1;
          amountInWei = _web.web3.utils.toHex(_web.web3.utils.toWei(String(amount), "gwei"));
          if (!(token_type === 'Tegera')) {
            _context.next = 27;
            break;
          }
          tokenABI = _Tegera_sepolia_ABI.Tegera_ABI;
          tokenAddress = _Tegera_sepolia_ABI.Tegera_Address;
          _context.next = 38;
          break;
        case 27:
          if (!(token_type === 'Tether')) {
            _context.next = 32;
            break;
          }
          tokenABI = _Tether_sepolia_ABI.Tether_ABI;
          tokenAddress = _Tether_sepolia_ABI.Tether_Address;
          _context.next = 38;
          break;
        case 32:
          if (!(token_type === 'Ether')) {
            _context.next = 37;
            break;
          }
          _context.next = 35;
          return send_small_ether(to, amount, senderPublicKey, senderPrivateKey);
        case 35:
          _context.next = 38;
          break;
        case 37:
          return _context.abrupt("return", res.status(400).json({
            error: 'Invalid token type'
          }));
        case 38:
          contract = new _web.web3.eth.Contract(tokenABI, tokenAddress, {
            from: senderPublicKey
          });
          data = contract.methods.transfer(to, amountInWei).encodeABI();
          _context.next = 42;
          return contract.methods.balanceOf(senderPublicKey).call();
        case 42:
          balance = _context.sent;
          if (!(balance < amount)) {
            _context.next = 46;
            break;
          }
          console.log('Insufficient balance');
          return _context.abrupt("return", res.status(400).json({
            error: 'Insufficient balance'
          }));
        case 46:
          transactionObject = {
            from: senderPublicKey,
            to: tokenAddress,
            data: data,
            gasPrice: gasPrice,
            gasLimit: gasLimit,
            nonce: nonce
          };
          _context.next = 49;
          return _web.web3.eth.accounts.signTransaction(transactionObject, senderPrivateKey);
        case 49:
          signedTransaction = _context.sent;
          _context.next = 52;
          return _web.web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);
        case 52:
          receipt = _context.sent;
          transactionHash = receipt.transactionHash;
          console.log(receipt);
          return _context.abrupt("return", res.status(200).json({
            success: transactionHash
          }));
        case 58:
          _context.prev = 58;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          return _context.abrupt("return", res.status(400).json({
            error: _context.t0.message
          }));
        case 62:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 58]]);
  }));
  return function handler(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
function sendRaw(_x3, _x4) {
  return _sendRaw.apply(this, arguments);
}
function _sendRaw() {
  _sendRaw = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(rawTx, privateKey) {
    var signedTx;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return _web.web3.eth.accounts.signTransaction(rawTx, privateKey);
        case 2:
          signedTx = _context2.sent;
          _web.web3.eth.sendSignedTransaction(signedTx.rawTransaction, function (error, hash) {
            if (error) {
              console.error('Error sending transaction:');
              console.error(error.message);
              console.error('Transaction details:', rawTx);
              return error;
            } else {
              console.log('Transaction hash:', hash);
              return hash;
            }
          });
        case 4:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return _sendRaw.apply(this, arguments);
}
function send_small_ether(_x5, _x6, _x7, _x8) {
  return _send_small_ether.apply(this, arguments);
}
function _send_small_ether() {
  _send_small_ether = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(receiver, value, sender, sender_key) {
    var senderBalance, rawTx;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return _web.web3.eth.getBalance(sender);
        case 3:
          senderBalance = _context3.sent;
          console.log('Sender balance:', senderBalance.toString());
          _context3.next = 7;
          return _web.web3.eth.getTransactionCount(sender, 'latest');
        case 7:
          _context3.t0 = _context3.sent;
          _context3.t1 = receiver;
          _context3.t2 = _web.web3.utils.toHex(_web.web3.utils.toWei(value, 'ether'));
          _context3.t3 = sender;
          rawTx = {
            nonce: _context3.t0,
            gasLimit: 21000,
            gasPrice: '4000000000',
            to: _context3.t1,
            value: _context3.t2,
            from: _context3.t3,
            chainId: 11155111
          };
          _context3.next = 14;
          return sendRaw(rawTx, sender_key);
        case 14:
          _context3.next = 20;
          break;
        case 16:
          _context3.prev = 16;
          _context3.t4 = _context3["catch"](0);
          console.error('Error sending ether:');
          console.error(_context3.t4.message);
        case 20:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 16]]);
  }));
  return _send_small_ether.apply(this, arguments);
}
module.exports = handler;