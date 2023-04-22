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
(0, _dotenv.config)();
var create_wallet = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(user) {
    var account, address, private_key, public_key, mnemonic, _yield$client$request, wallet;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          // Generate a new Ethereum wallet using Web3
          account = _web2.web3.eth.accounts.create(); // Extract the address and private key from the wallet
          address = account.address;
          console.log("The address for the new wallet is: ".concat(address, " and the private key is: ").concat(account.privateKey));
          //extract private key
          private_key = account.privateKey;
          public_key = _web2.web3.eth.accounts.privateKeyToAccount(private_key).address;
          mnemonic = _ethers.ethers.Wallet.createRandom().mnemonic.phrase;
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
          return _context.abrupt("return", wallet);
        case 14:
          _context.prev = 14;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);
          throw new Error('Failed to create wallet');
        case 18:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 14]]);
  }));
  return function create_wallet(_x) {
    return _ref.apply(this, arguments);
  };
}();
var _default = create_wallet;
exports["default"] = _default;