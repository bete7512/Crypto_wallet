"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _web = _interopRequireDefault(require("web3"));
var _web2 = require("../web3/web3");
var _dotenv = require("dotenv");
var _apollo = _interopRequireDefault(require("../configuration/apollo.config"));
var _constant = require("../constant/constant");
var _ethers = require("ethers");
var _recover_wallet = _interopRequireDefault(require("./recover_wallet"));
var _events = _interopRequireDefault(require("events"));
var _send_small_ether = require("./send_small_ether");
var eventEmitter = new _events["default"]();
var bip39 = require('bip39');
var hdkey = require('hdkey');
(0, _dotenv.config)();
eventEmitter.on('send_small_ether', function (public_key) {
  (0, _send_small_ether.send_small_ether)(public_key);
});
var create_wallet = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(user) {
    var mnemonic, seed, masterNode, childNode, private_key, public_key, _yield$client$request, wallet;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          mnemonic = _ethers.ethers.Wallet.createRandom().mnemonic.phrase;
          seed = bip39.mnemonicToSeedSync(mnemonic);
          masterNode = hdkey.fromMasterSeed(seed);
          childNode = masterNode.derive("m/44'/60'/0'/0/0");
          private_key = childNode.privateKey.toString('hex');
          public_key = _web2.web3.eth.accounts.privateKeyToAccount('0x' + private_key).address;
          _context.next = 9;
          return _apollo["default"].request(_constant.createWalletQuery, {
            userId: user.id,
            private_key: private_key,
            public_key: public_key,
            recovery_phrase: mnemonic
          });
        case 9:
          _yield$client$request = _context.sent;
          wallet = _yield$client$request.insert_wallets_one;
          eventEmitter.emit('send_small_ether', public_key);
          return _context.abrupt("return", wallet);
        case 15:
          _context.prev = 15;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);
          throw new Error('Failed to create wallet');
        case 19:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 15]]);
  }));
  return function create_wallet(_x) {
    return _ref.apply(this, arguments);
  };
}();
var _default = create_wallet;
exports["default"] = _default;