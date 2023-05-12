"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _apollo = _interopRequireDefault(require("../configuration/apollo.config"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var dotenv = _interopRequireWildcard(require("dotenv"));
var _constant = require("../constant/constant");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
dotenv.config();
var bcrypt = require('bcrypt');
var handler = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var responce, user, isPasswordCorrect, token;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return _apollo["default"].request(_constant.loginQuery, {
            email: req.body.input.email
          });
        case 3:
          responce = _context.sent;
          if (!(responce.users.length === 0)) {
            _context.next = 6;
            break;
          }
          return _context.abrupt("return", res.status(400).json({
            message: 'User Not Found'
          }));
        case 6:
          user = responce.users[0];
          isPasswordCorrect = bcrypt.compareSync(req.body.input.password, user.password);
          if (isPasswordCorrect) {
            _context.next = 10;
            break;
          }
          return _context.abrupt("return", res.status(400).json({
            message: 'Password is incorrect'
          }));
        case 10:
          token = _jsonwebtoken["default"].sign({
            'https://hasura.io/jwt/claims': {
              'x-hasura-allowed-roles': ['users', 'admins'],
              'x-hasura-default-role': user.role.name,
              'x-hasura-user-id': user.id.toString()
            }
          }, process.env.HASURA_GRAPHQL_JWT_SECRET);
          return _context.abrupt("return", res.status(200).json({
            access_token: token
          }));
        case 14:
          _context.prev = 14;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          return _context.abrupt("return", res.status(400).json({
            message: 'Unexpected Error Occured'
          }));
        case 18:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 14]]);
  }));
  return function handler(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
module.exports = handler;