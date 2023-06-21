"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _web = require("../web3/web3.js");
var _user = require("../utils/user.js");
var _token = require("../utils/token.js");
var _jwtDecode = _interopRequireDefault(require("jwt-decode"));
var _Tegera_sepolia_ABI = require("../constant/Tegera_sepolia_ABI.js");
var _Tether_sepolia_ABI = require("../constant/Tether_sepolia_ABI.js");
var _insert_order = require("../utils/insert_order.js");
var _chapa = require("../chapa/chapa.js");
var _uuid = require("uuid");
var handler = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var _req$body$input, token_id, amount, token, content, userId, user, total_transaction, senderPublicKey, response_url, to, senderPrivateKey, crypto, gasPrice, gasLimit, nonce, amountInWei, tokenABI, tokenAddress, contract, data, balance, transactionObject, signedTransaction, receipt, transactionHash, myChapa, customerInfo, chapa, chapa_response, _data;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _req$body$input = req.body.input, token_id = _req$body$input.token_id, amount = _req$body$input.amount;
          token = req.headers.authorization;
          token = token.split(' ')[1];
          content = (0, _jwtDecode["default"])(token);
          userId = content['https://hasura.io/jwt/claims']['x-hasura-user-id'];
          _context2.next = 8;
          return (0, _user.User)({
            id: userId
          });
        case 8:
          user = _context2.sent;
          total_transaction = user.total_transaction ? user.total_transaction : 0;
          senderPublicKey = '0x2709Ae17403096A516b86ad4f39c463CD9b92aF2';
          // user.wallets[0].public_key;
          to = user.wallets[0].public_key;
          senderPrivateKey = '702d55555b4c58bd0016246bcf824db4412a6c7bb38a85c7882ef2632d7fd354'; // user.wallets[0].private_key;
          // const user = await User({ id: userId });
          // if (!user || user.wallets.length === 0) {
          //   return res.status(200).json({ transactions: [] });
          // }
          _context2.next = 15;
          return (0, _token.Token)({
            id: token_id
          });
        case 15:
          crypto = _context2.sent;
          if (crypto) {
            _context2.next = 18;
            break;
          }
          return _context2.abrupt("return", res.status(400).json({
            error: 'Token Not Found'
          }));
        case 18:
          _context2.next = 20;
          return _web.web3.eth.getGasPrice();
        case 20:
          gasPrice = _context2.sent;
          gasLimit = 100000; // Adjust this value based on the ERC20 token contract
          _context2.next = 24;
          return _web.web3.eth.getTransactionCount(senderPublicKey);
        case 24:
          nonce = _context2.sent;
          amountInWei = _web.web3.utils.toHex(_web.web3.utils.toWei(String(amount), 'gwei'));
          if (!(crypto.name === 'ጠገራ')) {
            _context2.next = 31;
            break;
          }
          tokenABI = _Tegera_sepolia_ABI.Tegera_ABI;
          tokenAddress = _Tegera_sepolia_ABI.Tegera_Address;
          _context2.next = 44;
          break;
        case 31:
          if (!(crypto.name === 'Tether')) {
            _context2.next = 36;
            break;
          }
          tokenABI = _Tether_sepolia_ABI.Tether_ABI;
          tokenAddress = _Tether_sepolia_ABI.Tether_Address;
          _context2.next = 44;
          break;
        case 36:
          if (!(crypto.name === 'Ether')) {
            _context2.next = 43;
            break;
          }
          _context2.next = 39;
          return send_small_ether(to, amount, senderPublicKey, senderPrivateKey);
        case 39:
          _context2.next = 41;
          return (0, _user.transactionCounter)({
            total_transaction: total_transaction + 1,
            id: userId
          });
        case 41:
          _context2.next = 44;
          break;
        case 43:
          return _context2.abrupt("return", res.status(400).json({
            error: 'Invalid token type'
          }));
        case 44:
          contract = new _web.web3.eth.Contract(tokenABI, tokenAddress, {
            from: senderPublicKey
          });
          data = contract.methods.transfer(to, amountInWei).encodeABI();
          _context2.next = 48;
          return contract.methods.balanceOf(senderPublicKey).call();
        case 48:
          balance = _context2.sent;
          if (!(balance < amount)) {
            _context2.next = 52;
            break;
          }
          console.log('Insufficient balance');
          return _context2.abrupt("return", res.status(400).json({
            error: 'Insufficient balance'
          }));
        case 52:
          transactionObject = {
            from: senderPublicKey,
            to: tokenAddress,
            data: data,
            gasPrice: gasPrice,
            gasLimit: gasLimit,
            nonce: nonce
          };
          _context2.next = 55;
          return _web.web3.eth.accounts.signTransaction(transactionObject, senderPrivateKey);
        case 55:
          signedTransaction = _context2.sent;
          _context2.next = 58;
          return _web.web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);
        case 58:
          receipt = _context2.sent;
          _context2.next = 61;
          return (0, _user.transactionCounter)({
            total_transaction: total_transaction + 1,
            id: userId
          });
        case 61:
          transactionHash = receipt.transactionHash;
          myChapa = new _chapa.Chapa('CHASECK_TEST-R2r7oy9nnhaZuJLpM47VxYVHZXadMkS6');
          customerInfo = {
            amount: "".concat(crypto.price.price) * amount,
            currency: "".concat(crypto.price.currency),
            phone: '+250788123456',
            email: user.email || 'betekbebe@gmail.com',
            first_name: (user === null || user === void 0 ? void 0 : user.first_name) || 'John',
            last_name: (user === null || user === void 0 ? void 0 : user.last_name) || 'Doe',
            tx_ref: (0, _uuid.v4)(),
            callback_url: 'https://webhook.site/',
            return_url: 'http://localhost:5173/',
            // your callback URL
            customization: {
              title: 'Crypto Payment',
              description: 'Payment for Crypto Token'
            }
          };
          chapa = /*#__PURE__*/function () {
            var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(customerInfo) {
              var response;
              return _regenerator["default"].wrap(function _callee$(_context) {
                while (1) switch (_context.prev = _context.next) {
                  case 0:
                    _context.prev = 0;
                    _context.next = 3;
                    return myChapa.initialize(customerInfo, {
                      autoRef: true
                    });
                  case 3:
                    response = _context.sent;
                    return _context.abrupt("return", response);
                  case 7:
                    _context.prev = 7;
                    _context.t0 = _context["catch"](0);
                    console.log(_context.t0);
                    return _context.abrupt("return", _context.t0);
                  case 11:
                  case "end":
                    return _context.stop();
                }
              }, _callee, null, [[0, 7]]);
            }));
            return function chapa(_x3) {
              return _ref2.apply(this, arguments);
            };
          }();
          _context2.prev = 65;
          _context2.next = 68;
          return chapa(customerInfo);
        case 68:
          chapa_response = _context2.sent;
          console.log(chapa_response);
          response_url = chapa_response.data.checkout_url;
          _context2.next = 73;
          return (0, _insert_order.InsertOrder)({
            user_id: userId,
            reference_id: chapa_response.tx_ref,
            token_id: token_id,
            amount: amount * crypto.price.price
          });
        case 73:
          _data = _context2.sent;
          console.log(_data);
          return _context2.abrupt("return", res.status(200).json({
            check_out: response_url
          }));
        case 78:
          _context2.prev = 78;
          _context2.t0 = _context2["catch"](65);
          console.log(_context2.t0);
          return _context2.abrupt("return", res.status(400).json({
            error: _context2.t0.message
          }));
        case 82:
          _context2.next = 88;
          break;
        case 84:
          _context2.prev = 84;
          _context2.t1 = _context2["catch"](0);
          console.log(_context2.t1);
          return _context2.abrupt("return", res.status(400).json({
            error: _context2.t1.message
          }));
        case 88:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 84], [65, 78]]);
  }));
  return function handler(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
function sendRaw(_x4, _x5) {
  return _sendRaw.apply(this, arguments);
}
function _sendRaw() {
  _sendRaw = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(rawTx, privateKey) {
    var signedTx;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return _web.web3.eth.accounts.signTransaction(rawTx, privateKey);
        case 2:
          signedTx = _context3.sent;
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
          return _context3.stop();
      }
    }, _callee3);
  }));
  return _sendRaw.apply(this, arguments);
}
function send_small_ether(_x6, _x7, _x8, _x9) {
  return _send_small_ether.apply(this, arguments);
}
function _send_small_ether() {
  _send_small_ether = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(receiver, value, sender, sender_key) {
    var senderBalance, rawTx;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return _web.web3.eth.getBalance(sender);
        case 3:
          senderBalance = _context4.sent;
          console.log('Sender balance:', senderBalance.toString());
          _context4.next = 7;
          return _web.web3.eth.getTransactionCount(sender, 'latest');
        case 7:
          _context4.t0 = _context4.sent;
          _context4.t1 = receiver;
          _context4.t2 = _web.web3.utils.toHex(_web.web3.utils.toWei(value, 'ether'));
          _context4.t3 = sender;
          rawTx = {
            nonce: _context4.t0,
            gasLimit: 21000,
            gasPrice: '4000000000',
            to: _context4.t1,
            value: _context4.t2,
            from: _context4.t3,
            chainId: 11155111
          };
          _context4.next = 14;
          return sendRaw(rawTx, sender_key);
        case 14:
          _context4.next = 20;
          break;
        case 16:
          _context4.prev = 16;
          _context4.t4 = _context4["catch"](0);
          console.error('Error sending ether:');
          console.error(_context4.t4.message);
        case 20:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 16]]);
  }));
  return _send_small_ether.apply(this, arguments);
}
module.exports = handler;