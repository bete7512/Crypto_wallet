"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _web = require("../web3/web3.js");
var _jwtDecode = _interopRequireDefault(require("jwt-decode"));
var _user = require("../utils/user.js");
var _alchemySdk = require("alchemy-sdk");
var _graphqlRequest = require("graphql-request");
var dotenv = _interopRequireWildcard(require("dotenv"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
dotenv.config();
var WALLET_TRANSACTIONS = "\nquery Transactions($address: String!) {\n  ethereumSepolia {\n    walletByAddress(address: $address) {\n      transactions {\n        edges {\n          node {\n            blockNumber\n            blockTimestamp\n            contractAddress\n            fromAddress\n            cumulativeGasUsed\n            effectiveGasPrice\n            gas\n            gasPrice\n            gasUsed\n            hash\n            maxFeePerGas\n            maxPriorityFeePerGas\n            toAddress\n            type\n            input\n            transactionIndex\n            value\n          }\n        }\n      }\n    }\n  }\n}";
var node = new _graphqlRequest.GraphQLClient('https://api.quicknode.com/graphql', {
  headers: {
    'x-api-key': 'QN_c64163681a444c6fbd403d4a6d2044f6'
  }
});
// const config = {
//   apiKey: '5NOA_cRPiKibJ6QRvlAQamuQWFKWkjJJ',
//   network: Network.ETH_SEPOLIA,
// }
// const alchemy = new Alchemy(config)

var handler = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var token, content, user_id, user, address, _yield$node$request, ethereumSepolia;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          token = req.headers.authorization;
          token = token.split(' ')[1];
          content = (0, _jwtDecode["default"])(token);
          user_id = content['https://hasura.io/jwt/claims']['x-hasura-user-id'];
          _context.next = 7;
          return (0, _user.User)({
            id: user_id
          });
        case 7:
          user = _context.sent;
          console.log(user);
          if (user) {
            _context.next = 11;
            break;
          }
          return _context.abrupt("return", res.status(200).json({
            transactions: []
          }));
        case 11:
          if (!(user.wallets.length == 0)) {
            _context.next = 13;
            break;
          }
          return _context.abrupt("return", res.status(200).json({
            transactions: []
          }));
        case 13:
          address = user.wallets[0].public_key;
          console.log(address);
          _context.next = 17;
          return node.request(WALLET_TRANSACTIONS, {
            address: address
          });
        case 17:
          _yield$node$request = _context.sent;
          ethereumSepolia = _yield$node$request.ethereumSepolia;
          console.log(ethereumSepolia.walletByAddress.transactions.edges);
          return _context.abrupt("return", res.status(200).json({
            transactions: ethereumSepolia.walletByAddress.transactions.edges
          }));
        case 23:
          _context.prev = 23;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          return _context.abrupt("return", res.status(400).json({
            message: 'Unexpected Error Occured'
          }));
        case 27:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 23]]);
  }));
  return function handler(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
module.exports = handler;