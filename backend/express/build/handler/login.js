"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _apollo = _interopRequireDefault(require("../configuration/apollo.config"));
var dotenv = _interopRequireWildcard(require("dotenv"));
var _bcrypt = _interopRequireDefault(require("bcrypt"));
var _constant = require("../constant/constant");
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _user_by_email = require("../utils/user_by_email");
var _mailer = require("../utils/mailer");
var _two_steps = require("../utils/two_steps");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
dotenv.config();
var handler = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$body$input, email, password, user, isPasswordCorrect, token, OTP, expirationDate, formattedExpirationDate, tested, deleted, data, mailer;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _req$body$input = req.body.input, email = _req$body$input.email, password = _req$body$input.password;
          _context.prev = 1;
          _context.next = 4;
          return (0, _user_by_email.User)({
            email: email
          });
        case 4:
          user = _context.sent;
          console.log(user);
          if (user) {
            _context.next = 8;
            break;
          }
          return _context.abrupt("return", res.status(400).json({
            message: 'User Not Found'
          }));
        case 8:
          if (!(user.status === false)) {
            _context.next = 10;
            break;
          }
          return _context.abrupt("return", res.status(400).json({
            message: 'You Are Banned From Using This Platform Kindly Contact Admin'
          }));
        case 10:
          _context.next = 12;
          return _bcrypt["default"].compare(password, user.password);
        case 12:
          isPasswordCorrect = _context.sent;
          if (isPasswordCorrect) {
            _context.next = 15;
            break;
          }
          return _context.abrupt("return", res.status(400).json({
            message: 'Password is incorrect'
          }));
        case 15:
          token = _jsonwebtoken["default"].sign({
            'https://hasura.io/jwt/claims': {
              'x-hasura-allowed-roles': ['users', 'admins'],
              'x-hasura-default-role': user.role.name,
              'x-hasura-user-id': user.id.toString()
            }
          }, process.env.HASURA_GRAPHQL_JWT_SECRET, {
            expiresIn: '5d'
          });
          console.log(user.two_step, Math.floor(100000 + Math.random() * 900000));
          if (!user.two_step) {
            _context.next = 47;
            break;
          }
          OTP = Math.floor(100000 + Math.random() * 900000);
          expirationDate = new Date();
          expirationDate.setTime(expirationDate.getTime() + 4 * 60 * 60 * 1000); // Add 4 hours
          formattedExpirationDate = expirationDate.toISOString(); // Convert to ISO 8601 format
          _context.prev = 22;
          _context.next = 25;
          return (0, _two_steps.Code)({
            email: user.email
          });
        case 25:
          tested = _context.sent;
          if (!tested) {
            _context.next = 31;
            break;
          }
          _context.next = 29;
          return (0, _two_steps.DeleteCode)({
            id: tested.id
          });
        case 29:
          deleted = _context.sent;
          console.log(deleted);
        case 31:
          _context.next = 33;
          return (0, _two_steps.InsertCode)({
            email: user.email,
            code: String(OTP),
            expire: formattedExpirationDate,
            //
            token: token
          });
        case 33:
          data = _context.sent;
          console.log("amd", data);
          _context.next = 40;
          break;
        case 37:
          _context.prev = 37;
          _context.t0 = _context["catch"](22);
          console.log(_context.t0.message);
        case 40:
          _context.next = 42;
          return (0, _mailer.Mailer)(user.email, 'Two Step Verification for Santim Crypto Payment', "\n        <html>\n        <head>\n          <style>\n            /* CSS styles for the email */\n            h1 {\n              color: #333;\n              font-size: 24px;\n              font-family: Arial, sans-serif;\n            }\n            \n            p {\n              color: #666;\n              font-size: 16px;\n              font-family: Arial, sans-serif;\n            }\n          </style>\n        </head>\n        <body>\n          <h1>Two Step Verification</h1>\n          <p>Enter this code to login <strong>".concat(OTP, "</strong></p>\n          <p>Code will expire in 4 hours</p>\n        </body>\n      </html>\n        "));
        case 42:
          mailer = _context.sent;
          console.log("still", mailer);
          return _context.abrupt("return", res.status(200).json({
            two_step: user.two_step,
            message: 'Two Step Verification Code Sent to your email address Successfully',
            access_token: ''
          }));
        case 47:
          return _context.abrupt("return", res.status(200).json({
            access_token: token,
            two_step: user.two_step
          }));
        case 48:
          _context.next = 54;
          break;
        case 50:
          _context.prev = 50;
          _context.t1 = _context["catch"](1);
          console.log(_context.t1.message);
          return _context.abrupt("return", res.status(400).json({
            message: 'Unexpected Error Occured'
          }));
        case 54:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[1, 50], [22, 37]]);
  }));
  return function handler(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
module.exports = handler;