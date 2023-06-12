"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _apollo = _interopRequireDefault(require("../configuration/apollo.config"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var dotenv = _interopRequireWildcard(require("dotenv"));
var _bcrypt = _interopRequireDefault(require("bcrypt"));
var _mailer = require("../utils/mailer");
var _two_steps = require("../utils/two_steps");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
dotenv.config();
// import { User } from '../utils/user_by_email'
// import { Mailer } from '../utils/mailer'
var handler = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$body$input, email, code, otp, mail;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _req$body$input = req.body.input, email = _req$body$input.email, code = _req$body$input.code;
          _context.prev = 1;
          _context.next = 4;
          return (0, _two_steps.Code)({
            email: email
          });
        case 4:
          otp = _context.sent;
          console.log(otp);
          if (otp) {
            _context.next = 8;
            break;
          }
          return _context.abrupt("return", res.status(400).json({
            message: 'Code Not Found'
          }));
        case 8:
          if (!(otp.created_at + otp.expire < Date.now())) {
            _context.next = 10;
            break;
          }
          return _context.abrupt("return", res.status(400).json({
            message: 'Code Expired'
          }));
        case 10:
          if (!(otp.code != code)) {
            _context.next = 13;
            break;
          }
          console.log(otp.code, code);
          return _context.abrupt("return", res.status(400).json({
            message: 'Code is incorrect'
          }));
        case 13:
          _context.next = 15;
          return (0, _two_steps.DeleteCode)({
            id: otp.id
          });
        case 15:
          _context.next = 17;
          return (0, _two_steps.DeleteCodeByEmail)({
            email: otp.email
          });
        case 17:
          _context.next = 19;
          return (0, _mailer.Mailer)(otp.email, "Succcessfully Logged In", "<h1>Successfully Logged In</h1>");
        case 19:
          mail = _context.sent;
          console.log(mail);
          return _context.abrupt("return", res.status(200).json({
            token: otp.token
          }));
        case 24:
          _context.prev = 24;
          _context.t0 = _context["catch"](1);
          console.log(_context.t0.message);
          return _context.abrupt("return", res.status(400).json({
            message: 'Unexpected Error Occured'
          }));
        case 28:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[1, 24]]);
  }));
  return function handler(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
module.exports = handler;