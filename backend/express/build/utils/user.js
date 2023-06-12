"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.User = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _apollo = _interopRequireDefault(require("../configuration/apollo.config"));
var USE_BY_ID = "query MyQuery($id: Int!) {\n    users_by_pk(id: $id) {\n      id\n      email\n      first_name\n      wallets {\n        public_key\n        private_key\n      }\n    }\n  }\n";
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