"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _web = require("../web3/web3.js");
var _jwtDecode = _interopRequireDefault(require("jwt-decode"));
var _user = require("../utils/user.js");
var _alchemySdk = require("alchemy-sdk");
var _bignumber = _interopRequireDefault(require("bignumber.js"));
var settings = {
  apiKey: '5NOA_cRPiKibJ6QRvlAQamuQWFKWkjJJ',
  network: _alchemySdk.Network.ETH_SEPOLIA
};
var alchemy = new _alchemySdk.Alchemy(settings);
var latestBlock = alchemy.core.getBlockNumber();
var handler = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var token, content, user_id, user, address, balance;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          token = req.headers.authorization;
          token = token.split(' ')[1];
          content = (0, _jwtDecode["default"])(token);
          user_id = content['https://hasura.io/jwt/claims']['x-hasura-user-id'];
          _context.next = 7;
          return (0, _user.User)({
            id: user_id
          });
        case 7:
          user = _context.sent;
          address = user.wallets[0].public_key;
          alchemy.core.getBalance(address, 'latest').then(function (balance) {
            var balanceWei = _web.web3.utils.toBN(balance);
            var balanceFloat = parseFloat(_web.web3.utils.fromWei(balanceWei, 'ether'));
            console.log(balanceFloat);
          })["catch"](function (error) {
            console.error(error);
          });
          _context.next = 12;
          return _web.web3.eth.getBalance(address);
        case 12:
          balance = _context.sent;
          balance = _web.web3.utils.fromWei(balance, 'ether');
          return _context.abrupt("return", res.status(200).json({
            balance: balance
          }));
        case 17:
          _context.prev = 17;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          return _context.abrupt("return", res.status(500).json({
            error: _context.t0.message
          }));
        case 21:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 17]]);
  }));
  return function handler(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
module.exports = handler;