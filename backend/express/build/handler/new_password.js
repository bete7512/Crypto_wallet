"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _uuid = require("uuid");
var dotenv = _interopRequireWildcard(require("dotenv"));
var _apolloConfig = _interopRequireDefault(require("../configuration/apollo.config.js"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _user_by_email = require("../utils/user_by_email");
var _mailer = require("../utils/mailer");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var bcrypt = require('bcrypt');
dotenv.config();
var UPDATE_PASSWORD = "\nmutation MyMutation($id: Int = 10, $password: String = \"\") {\n    update_users_by_pk(pk_columns: {id: $id}, _set: {password: $password}) {\n      id\n    }\n  }\n  \n";
var handler = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$body$input, email, password, user, salt, hashedPassword, responce, token, mail;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _req$body$input = req.body.input, email = _req$body$input.email, password = _req$body$input.password;
          _context.next = 3;
          return (0, _user_by_email.User)({
            email: email
          });
        case 3:
          user = _context.sent;
          console.log(user);
          if (user) {
            _context.next = 7;
            break;
          }
          return _context.abrupt("return", res.status(400).json({
            message: 'User Not Found'
          }));
        case 7:
          salt = bcrypt.genSaltSync(10);
          hashedPassword = bcrypt.hashSync(password, salt);
          _context.prev = 9;
          _context.next = 12;
          return _apolloConfig["default"].request(UPDATE_PASSWORD, {
            id: user.id,
            password: hashedPassword
          });
        case 12:
          responce = _context.sent;
          console.log(responce);
          _context.next = 20;
          break;
        case 16:
          _context.prev = 16;
          _context.t0 = _context["catch"](9);
          console.log(_context.t0);
          return _context.abrupt("return", res.status(400).json({
            message: 'Unexpected Error Occured'
          }));
        case 20:
          token = _jsonwebtoken["default"].sign({
            'https://hasura.io/jwt/claims': {
              'x-hasura-allowed-roles': ['users', 'admins'],
              'x-hasura-default-role': user.role.name,
              'x-hasura-user-id': user.id.toString()
            }
          }, process.env.HASURA_GRAPHQL_JWT_SECRET, {
            expiresIn: '5d'
          });
          mail = (0, _mailer.Mailer)(user.email, 'Password Changed', "<h1>Hi ".concat(user.first_name, " ").concat(user.last_name, "</h1><p>Your password has been changed</p>"));
          console.log(mail);
          return _context.abrupt("return", res.status(200).json({
            access_token: token
          }));
        case 24:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[9, 16]]);
  }));
  return function handler(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
module.exports = handler;