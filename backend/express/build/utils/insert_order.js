"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _apollo = _interopRequireDefault(require("../configuration/apollo.config"));
var INSERT_ORDER = "\nmutation MyMutation($payment_status: Boolean = false, $status: Boolean = true, $token_id: Int!, $user_id: Int!, $amount: Float!, $reference_id: String = \"\") {\n    insert_token_orders_one(object: {payment_status: $payment_status, status: $status, token_id: $token_id, user_id: $user_id, amount: $amount, reference_id: $reference_id}) {\n      id\n    }\n  }  \n ";
var InsertOrder = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(variables) {
    var data;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return _apollo["default"].request(INSERT_ORDER, variables);
        case 3:
          data = _context.sent;
          console.log(data);
          return _context.abrupt("return", data['insert_token_orders_one']);
        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          return _context.abrupt("return", _context.t0);
        case 11:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 8]]);
  }));
  return function InsertOrder(_x) {
    return _ref.apply(this, arguments);
  };
}();
module.exports = {
  InsertOrder: InsertOrder
};