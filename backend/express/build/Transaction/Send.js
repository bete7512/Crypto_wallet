"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendEther = sendEther;
var _ethereumjsTx = _interopRequireDefault(require("ethereumjs-tx"));
var _web = _interopRequireDefault(require("../web3/web3.js"));
function sendRaw(rawTx, key) {
  var privateKey = new BufferEncoding(key, 'hex');
  var tx = new _ethereumjsTx["default"](rawTx);
  tx.sign(privateKey);
  var serializedTx = tx.serialize();
  _web["default"].eth.sendRawTransaction('0x' + serializedTx.toString('hex'), function (err, txHash) {
    if (err) {
      console.error('sendRawTransaction failed.');
      console.error(err);
      return;
    }
    console.log(txHash);
    setTimeout(function () {
      var transaction = _web["default"].eth.getTransaction(txHash);
      console.log(transaction);
    }, 5 * 60 * 1000);
  });
}
function sendEther(sender, key, receiver, etherValue) {
  var rawTx = {
    nonce: _web["default"].toHex(_web["default"].eth.getTransactionCount(sender)),
    gasLimit: _web["default"].toHex(21000),
    gasPrice: _web["default"].toHex(_web["default"].eth.gasPrice),
    to: receiver,
    value: 0,
    from: sender,
    chainId: 1
  };
  rawTx.value = _web["default"].toHex(_web["default"].toWei(etherValue, 'ether'));
  sendRaw(rawTx, key);
}