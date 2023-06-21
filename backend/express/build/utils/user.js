"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transactionCounter = exports.User = exports.UpdateWallet = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _apollo = _interopRequireDefault(require("../configuration/apollo.config"));
var USE_BY_ID = "\nquery MyQuery($id: Int!) {\n  users_by_pk(id: $id) {\n    id\n    email\n    first_name\n    total_transaction\n    last_name\n    wallets {\n      id\n      userId\n      public_key\n      private_key\n    }\n    wallet {\n      id\n      userId\n      public_key\n      private_key\n    }\n    two_step\n  }\n}\n";
var UPDATE_WALLET = "\nmutation MyMutation($id: Int = 10, $private_key: String = \"\", $public_key: String = \"\", $recovery_phrase: String = \"\") {\n  update_wallet_by_pk(pk_columns: {id: $id}, _set: {private_key: $private_key, public_key: $public_key, recovery_phrase: $recovery_phrase}) {\n    id\n  }\n}\n\n\n";
var User = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(variables) {
    var data;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _apollo["default"].request(USE_BY_ID, variables);
        case 2:
          data = _context.sent;
          return _context.abrupt("return", data['users_by_pk']);
        case 4:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function User(_x) {
    return _ref.apply(this, arguments);
  };
}();
exports.User = User;
var COUNTER = "\nmutation MyMutation($total_transaction: Int!, $id: Int!) {\n  update_users_by_pk(pk_columns: {id: $id}, _set: {total_transaction: $total_transaction}) {\n    total_transaction\n  }\n}\n";
var UpdateWallet = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(variables) {
    var data;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return _apollo["default"].request(UPDATE_WALLET, variables);
        case 3:
          data = _context2.sent;
          console.log("Update Wallet", data);
          return _context2.abrupt("return", data['update_wallet_by_pk']);
        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](0);
          console.log("wallet update", _context2.t0.message);
        case 11:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 8]]);
  }));
  return function UpdateWallet(_x2) {
    return _ref2.apply(this, arguments);
  };
}();
exports.UpdateWallet = UpdateWallet;
var transactionCounter = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(variables) {
    var data;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return _apollo["default"].request(COUNTER, variables);
        case 3:
          data = _context3.sent;
          return _context3.abrupt("return", data['update_users_by_pk']);
        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);
          console.log(_context3.t0.message);
        case 10:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 7]]);
  }));
  return function transactionCounter(_x3) {
    return _ref3.apply(this, arguments);
  };
}();
exports.transactionCounter = transactionCounter;