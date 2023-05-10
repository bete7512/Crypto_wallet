"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handler = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _web = require("../web3/web3.js");
var address = '0x2709Ae17403096A516b86ad4f39c463CD9b92aF2';
var handler = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var sth;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          try {
            _web.web3.eth.getTransactionCount(address).then(function (res) {
              return sth = res;
            })["catch"](function (err) {
              return console.log(err);
            });
            console.log(sth);
            res.send(sth);
          } catch (error) {
            console.log(error);
          }
        case 1:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function handler(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.handler = handler;