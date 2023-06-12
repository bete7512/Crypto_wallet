"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InsertCode = exports.DeleteCodeByEmail = exports.DeleteCode = exports.Code = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _apollo = _interopRequireDefault(require("../configuration/apollo.config"));
var CODE_BY_EMAIL = "\nquery MyQuery($email: String = \"\", $limit: Int = 1) {\n    forget_password(where: {email: {_eq: $email}}, limit: $limit) {\n      code\n      created_at\n      email\n      expire\n      id\n    }\n  }\n  \n";
var Code = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(variables) {
    var data;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return _apollo["default"].request(CODE_BY_EMAIL, variables);
        case 3:
          data = _context.sent;
          console.log("forgot Code", data);
          return _context.abrupt("return", data['forget_password'][0]);
        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          console.log("forgot Code", _context.t0);
          return _context.abrupt("return", _context.t0);
        case 12:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 8]]);
  }));
  return function Code(_x) {
    return _ref.apply(this, arguments);
  };
}();
exports.Code = Code;
var DELETE_CODE = "\nmutation MyMutation($id: Int!) {\n    delete_forget_password_by_pk(id: $id) {\n      id\n    }\n  }  \n";
var DeleteCode = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(variables) {
    var data;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return _apollo["default"].request(DELETE_CODE, variables);
        case 3:
          data = _context2.sent;
          console.log("forgot DeleteCode", data);
          return _context2.abrupt("return", data['delete_forget_password_by_pk']);
        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](0);
          console.log("forgot DeleteCode", _context2.t0);
          return _context2.abrupt("return", _context2.t0);
        case 12:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 8]]);
  }));
  return function DeleteCode(_x2) {
    return _ref2.apply(this, arguments);
  };
}();
exports.DeleteCode = DeleteCode;
var INSERT_CODE = "\nmutation MyMutation($code: String = \"\", $email: String = \"\", $expire: timestamp = \"\") {\n    insert_forget_password_one(object: {code: $code, email: $email, expire: $expire}) {\n      id\n      code\n    }\n  }\n";
var InsertCode = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(variables) {
    var data;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return _apollo["default"].request(INSERT_CODE, variables);
        case 3:
          data = _context3.sent;
          console.log("forgot InsertCode", data);
          return _context3.abrupt("return", data['insert_forget_password_one']);
        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](0);
          console.log("forgot InsertCode", _context3.t0);
          return _context3.abrupt("return", _context3.t0);
        case 12:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 8]]);
  }));
  return function InsertCode(_x3) {
    return _ref3.apply(this, arguments);
  };
}();
exports.InsertCode = InsertCode;
var DELETE_CODE_BY_EMAIL = "\nmutation MyMutation($email: String = \"\") {\n    delete_forget_password(where: {email: {_eq: $email}}) {\n      affected_rows\n    }\n  }\n ";
var DeleteCodeByEmail = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(variables) {
    var data;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return _apollo["default"].request(DELETE_CODE_BY_EMAIL, variables);
        case 3:
          data = _context4.sent;
          console.log("forgot DeleteCodeByEmail", data);
          return _context4.abrupt("return", data['delete_forget_password']);
        case 8:
          _context4.prev = 8;
          _context4.t0 = _context4["catch"](0);
          console.log("forgot DeleteCodeByEmail", _context4.t0);
          return _context4.abrupt("return", _context4.t0);
        case 12:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 8]]);
  }));
  return function DeleteCodeByEmail(_x4) {
    return _ref4.apply(this, arguments);
  };
}();
exports.DeleteCodeByEmail = DeleteCodeByEmail;