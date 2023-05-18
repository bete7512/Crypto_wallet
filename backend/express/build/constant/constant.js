"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerQuery = exports.loginQuery = exports.createWalletQuery = void 0;
var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));
var _graphqlRequest = require("graphql-request");
var _templateObject, _templateObject2, _templateObject3;
var registerQuery = (0, _graphqlRequest.gql)(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2["default"])(["\n  mutation MyMutation(\n    $email: String!\n    $first_name: String!\n    $last_name: String!\n    $password: String!\n  ) {\n    insert_users_one(\n      object: {\n        email: $email\n        first_name: $first_name\n        last_name: $last_name\n        password: $password\n      }\n    ) {\n      email\n      first_name\n      last_name\n      created_at\n      id\n    }\n  }\n"])));
exports.registerQuery = registerQuery;
var loginQuery = (0, _graphqlRequest.gql)(_templateObject2 || (_templateObject2 = (0, _taggedTemplateLiteral2["default"])(["\nquery MyQuery($email: String = \"\") {\n  users(where: {email: {_eq: $email}}) {\n    first_name\n    last_name\n    email\n    id\n    password\n    roleId\n    role {\n      name\n    }\n  }\n}\n"])));
exports.loginQuery = loginQuery;
var createWalletQuery = (0, _graphqlRequest.gql)(_templateObject3 || (_templateObject3 = (0, _taggedTemplateLiteral2["default"])(["\nmutation MyMutation($private_key: String = \"\", $public_key: String = \"\", $userId: Int = 10, $recovery_phrase: String = \"\") {\n  insert_wallet_one(object: {private_key: $private_key, public_key: $public_key, userId: $userId, recovery_phrase: $recovery_phrase}) {\n    id\n    private_key\n    public_key\n    userId\n  }\n}\n "])));
exports.createWalletQuery = createWalletQuery;