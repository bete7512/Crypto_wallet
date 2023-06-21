"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Mailer = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _nodemailer = _interopRequireDefault(require("nodemailer"));
var _nodemailerSmtpTransport = _interopRequireDefault(require("nodemailer-smtp-transport"));
var transporter = _nodemailer["default"].createTransport((0, _nodemailerSmtpTransport["default"])({
  service: 'gmail',
  host: 'smtp.gmail.com',
  auth: {
    user: 'betekbebe@gmail.com',
    pass: 'zafhcpglvqgnsfgx'
  }
}));
var Mailer = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(to, subject, text) {
    var mailOptions, response;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          mailOptions = {
            from: 'betekbebe@gmail.com',
            to: to,
            subject: subject,
            html: text
          };
          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log("Mailer", error);
              response = error;
              return error;
            } else {
              console.log("Mailer", info.response);
              response = info.response;
              return info.response;
            }
          });
          return _context.abrupt("return", response);
        case 3:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function Mailer(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
exports.Mailer = Mailer;