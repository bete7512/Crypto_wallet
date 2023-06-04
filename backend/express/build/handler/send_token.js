"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _web = require("../web3/web3.js");
var _user = require("../utils/user.js");
var _jwtDecode = _interopRequireDefault(require("jwt-decode"));
var _Tegera = require("../Tokens/Tegera.js");
var _Tether = require("../Tokens/Tether.js");
// Tegera token instance of smart contract
// Tether token instance of smart contract

var handler = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$body$input, to, amount, tokenType, token, content, userId, user, senderPublicKey, senderPrivateKey, tokenInstance, senderAccount, receiverAccount, value, gasPrice, gasLimit, nonce, transactionObject, signedTransaction, receipt, transactionHash, transaction;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body$input = req.body.input, to = _req$body$input.to, amount = _req$body$input.amount, tokenType = _req$body$input.tokenType;
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
          senderPublicKey = user.wallets[0].publicKey;
          senderPrivateKey = user.wallets[0].privateKey;
          if (!(tokenType === 'Tegera')) {
            _context.next = 17;
            break;
          }
          tokenInstance = _Tegera.Tegera;
          _context.next = 22;
          break;
        case 17:
          if (!(tokenType === 'Tether')) {
            _context.next = 21;
            break;
          }
          tokenInstance = _Tether.Tether;
          _context.next = 22;
          break;
        case 21:
          return _context.abrupt("return", res.status(400).json({
            error: 'Invalid token type'
          }));
        case 22:
          senderAccount = _web.web3.eth.accounts.privateKeyToAccount(senderPrivateKey);
          receiverAccount = to;
          value = amount;
          _context.next = 27;
          return _web.web3.eth.getGasPrice();
        case 27:
          gasPrice = _context.sent;
          gasLimit = 21000;
          _context.next = 31;
          return _web.web3.eth.getTransactionCount(senderAccount.address);
        case 31:
          nonce = _context.sent;
          transactionObject = {
            from: senderAccount.address,
            to: receiverAccount,
            value: _web.web3.utils.toWei(value.toString(), 'ether'),
            gasPrice: gasPrice,
            gasLimit: gasLimit,
            nonce: nonce
          };
          _context.next = 35;
          return senderAccount.signTransaction(transactionObject);
        case 35:
          signedTransaction = _context.sent;
          _context.next = 38;
          return _web.web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);
        case 38:
          receipt = _context.sent;
          transactionHash = receipt.transactionHash;
          transaction = {
            from: senderAccount.address,
            to: receiverAccount,
            value: value,
            tokenType: tokenType,
            transactionHash: transactionHash
          };
          return _context.abrupt("return", res.status(200).json({
            transaction: transaction
          }));
        case 44:
          _context.prev = 44;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);
          return _context.abrupt("return", res.status(500).json({
            error: _context.t0.message
          }));
        case 48:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 44]]);
  }));
  return function handler(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
module.exports = handler;