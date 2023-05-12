"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _uuid = require("uuid");
var dotenv = _interopRequireWildcard(require("dotenv"));
var _apolloConfig = _interopRequireDefault(require("../configuration/apollo.config.js"));
var _constant = require("../constant/constant.js");
var _events = _interopRequireDefault(require("events"));
var _create_wallet = _interopRequireDefault(require("../events/create_wallet.js"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var bcrypt = require('bcrypt');
var eventEmitter = new _events["default"]();
eventEmitter.on('create_wallet', function (responce) {
  (0, _create_wallet["default"])(responce);
});
var handler = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$body$input, first_name, last_name, email, password, salt, hashedPassword, _yield$client$request, user;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _req$body$input = req.body.input, first_name = _req$body$input.first_name, last_name = _req$body$input.last_name, email = _req$body$input.email, password = _req$body$input.password;
          salt = bcrypt.genSaltSync(10);
          hashedPassword = bcrypt.hashSync(password, salt);
          _context.prev = 3;
          _context.next = 6;
          return _apolloConfig["default"].request(_constant.registerQuery, {
            first_name: first_name,
            last_name: last_name,
            email: email,
            password: hashedPassword
          });
        case 6:
          _yield$client$request = _context.sent;
          user = _yield$client$request.insert_users_one;
          eventEmitter.emit('create_wallet', user);
          _context.next = 15;
          break;
        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](3);
          console.log(_context.t0);
          return _context.abrupt("return", res.status(400).json({
            message: 'Unexpected Error Occured'
          }));
        case 15:
          return _context.abrupt("return", res.status(200).json({
            success: 'Successfully Registered'
          }));
        case 16:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[3, 11]]);
  }));
  return function handler(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
module.exports = handler;