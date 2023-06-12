"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.User = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _apollo = _interopRequireDefault(require("../configuration/apollo.config"));
var USE_BY_ID = "\nquery MyQuery($email: String = \"\") {\n    users(where: {email: {_eq: $email}}, limit: 1) {\n      first_name\n      last_name\n      email\n      id\n      status\n      password\n      roleId\n      role {\n        name\n      }\n      status\n      two_step\n    }\n  }\n";
var User = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(variables) {
    var data;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return _apollo["default"].request(USE_BY_ID, variables);
        case 3:
          data = _context.sent;
          return _context.abrupt("return", data['users'][0]);
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
  return function User(_x) {
    return _ref.apply(this, arguments);
  };
}();
exports.User = User;