"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.send_small_ether = send_small_ether;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _web = require("../web3/web3");
var sender = '0x2709Ae17403096A516b86ad4f39c463CD9b92aF2';
var sender_key = '0x702d55555b4c58bd0016246bcf824db4412a6c7bb38a85c7882ef2632d7fd354';
var value = '0.01';
function sendRaw(_x, _x2) {
  return _sendRaw.apply(this, arguments);
}
function _sendRaw() {
  _sendRaw = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(rawTx, privateKey) {
    var signedTx;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _web.web3.eth.accounts.signTransaction(rawTx, privateKey);
        case 2:
          signedTx = _context.sent;
          _web.web3.eth.sendSignedTransaction(signedTx.rawTransaction, function (error, hash) {
            if (error) {
              console.error('Error sending transaction:');
              console.error(error.message);
              console.error('Transaction details:', rawTx);
            } else {
              console.log('Transaction hash:', hash);
            }
          });
        case 4:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _sendRaw.apply(this, arguments);
}
function send_small_ether(_x3) {
  return _send_small_ether.apply(this, arguments);
}
function _send_small_ether() {
  _send_small_ether = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(receiver) {
    var senderBalance, rawTx;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          console.log('Sending ether to', receiver);
          _context2.prev = 1;
          _context2.next = 4;
          return _web.web3.eth.getBalance(sender);
        case 4:
          senderBalance = _context2.sent;
          console.log('Sender balance:', senderBalance.toString());
          _context2.next = 8;
          return _web.web3.eth.getTransactionCount(sender, 'latest');
        case 8:
          _context2.t0 = _context2.sent;
          _context2.t1 = receiver;
          _context2.t2 = _web.web3.utils.toHex(_web.web3.utils.toWei(value, 'ether'));
          _context2.t3 = sender;
          rawTx = {
            nonce: _context2.t0,
            gasLimit: 21000,
            gasPrice: '4000000000',
            to: _context2.t1,
            value: _context2.t2,
            from: _context2.t3,
            chainId: 11155111
          };
          _context2.next = 15;
          return sendRaw(rawTx, sender_key);
        case 15:
          _context2.next = 21;
          break;
        case 17:
          _context2.prev = 17;
          _context2.t4 = _context2["catch"](1);
          console.error('Error sending ether:');
          console.error(_context2.t4.message);
        case 21:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[1, 17]]);
  }));
  return _send_small_ether.apply(this, arguments);
}