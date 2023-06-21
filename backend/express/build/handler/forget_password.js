"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _apollo = _interopRequireDefault(require("../configuration/apollo.config"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var dotenv = _interopRequireWildcard(require("dotenv"));
var _bcrypt = _interopRequireDefault(require("bcrypt"));
var _user_by_email = require("../utils/user_by_email");
var _mailer = require("../utils/mailer");
var _forgot = require("../utils/forgot");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
dotenv.config();
var handler = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var email, user, OTP, expirationDate, formattedExpirationDate, tested, deleted, data, mailer;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          email = req.body.input.email;
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
            message: 'This Email Not Found'
          }));
        case 8:
          OTP = Math.floor(100000 + Math.random() * 900000);
          expirationDate = new Date();
          expirationDate.setTime(expirationDate.getTime() + 4 * 60 * 60 * 1000); // Add 4 hours
          formattedExpirationDate = expirationDate.toISOString(); // Convert to ISO 8601 format
          _context.prev = 12;
          _context.next = 15;
          return (0, _forgot.Code)({
            email: user.email
          });
        case 15:
          tested = _context.sent;
          if (!tested) {
            _context.next = 21;
            break;
          }
          _context.next = 19;
          return (0, _forgot.DeleteCode)({
            id: tested.id
          });
        case 19:
          deleted = _context.sent;
          console.log(deleted);
        case 21:
          _context.next = 23;
          return (0, _forgot.InsertCode)({
            email: user.email,
            code: String(OTP),
            expire: formattedExpirationDate //
          });
        case 23:
          data = _context.sent;
          console.log('amd', data);
          _context.next = 31;
          break;
        case 27:
          _context.prev = 27;
          _context.t0 = _context["catch"](12);
          console.log(_context.t0.message);
          return _context.abrupt("return", res.status(400).json({
            message: 'Unexpected Error Occured'
          }));
        case 31:
          _context.next = 33;
          return (0, _mailer.Mailer)(user.email, 'Password Recovery Email Verification Code', "\n        <html>\n        <head>\n          <style>\n            /* CSS styles for the email */\n            h1 {\n              color: #333;\n              font-size: 24px;\n              font-family: Arial, sans-serif;\n            }\n            \n            p {\n              color: #666;\n              font-size: 16px;\n              font-family: Arial, sans-serif;\n            }\n          </style>\n        </head>\n        <body>\n          <h1>Password Recovery Code</h1>\n          <p>Enter this code to reset your Password <strong>".concat(OTP, "</strong></p>\n          <p>This Code will expire in 4 hours</p>\n        </body>\n      </html>\n        "));
        case 33:
          mailer = _context.sent;
          console.log('still', mailer);
          return _context.abrupt("return", res.status(200).json({
            success: "Email Sent Successfully"
          }));
        case 38:
          _context.prev = 38;
          _context.t1 = _context["catch"](1);
          console.log(_context.t1.message);
          return _context.abrupt("return", res.status(400).json({
            message: 'Unexpected Error Occured'
          }));
        case 42:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[1, 38], [12, 27]]);
  }));
  return function handler(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
module.exports = handler;