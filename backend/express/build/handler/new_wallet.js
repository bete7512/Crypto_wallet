"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _recover_wallet = _interopRequireDefault(require("../events/recover_wallet"));
var _web = require("../web3/web3.js");
var _user = require("../utils/user.js");
var _jwtDecode = _interopRequireDefault(require("jwt-decode"));
var _recover_private_key = require("../events/recover_private_key");
var handler = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var token, content, userId, user, _req$body$input, recovery_phrase, private_key, _wallet, update, account;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          token = req.headers.authorization;
          token = token.split(' ')[1];
          content = (0, _jwtDecode["default"])(token);
          userId = content['https://hasura.io/jwt/claims']['x-hasura-user-id'];
          _context.next = 6;
          return (0, _user.User)({
            id: userId
          });
        case 6:
          user = _context.sent;
          if (!(!user || user.wallets.length === 0)) {
            _context.next = 9;
            break;
          }
          return _context.abrupt("return", res.status(400).json({
            message: "Something Were Wrong"
          }));
        case 9:
          console.log(req.body.input);
          _req$body$input = req.body.input, recovery_phrase = _req$body$input.recovery_phrase, private_key = _req$body$input.private_key;
          console.log(recovery_phrase);
          if (!(recovery_phrase != undefined && recovery_phrase != null && recovery_phrase != '')) {
            _context.next = 25;
            break;
          }
          _context.next = 15;
          return (0, _recover_wallet["default"])(recovery_phrase);
        case 15:
          _wallet = _context.sent;
          console.log("Done", _wallet);
          console.log("user", user.wallet);
          _context.next = 20;
          return (0, _user.UpdateWallet)({
            id: user.wallet.id,
            private_key: _wallet.privateKey,
            public_key: _wallet.address,
            recovery_phrase: _wallet.mnemonic
          });
        case 20:
          update = _context.sent;
          console.log(update);
          return _context.abrupt("return", res.status(200).json({
            success: _wallet
          }));
        case 25:
          return _context.abrupt("return", res.status(400).json({
            message: "Something Were Wrong"
          }));
        case 26:
          // const wallet = await recoverWallet(recovery_phrase)
          account = _web.web3.eth.accounts.privateKeyToAccount('0x' + private_key);
          return _context.abrupt("return", res.status(200).json({
            wallet: wallet
          }));
        case 28:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function handler(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
module.exports = handler;