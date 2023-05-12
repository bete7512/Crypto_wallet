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
var Tegera_Address = '0x09871Adb124aab581046EA38c26C6af2e88F280E';
var Tether_Address = '0x222fB5507acD3Da78351Be60271fa9537b07Cdc3';
dotenv.config();
var config = {
  apiKey: '5NOA_cRPiKibJ6QRvlAQamuQWFKWkjJJ',
  network: _alchemySdk.Network.ETH_SEPOLIA
};
var alchemy = new _alchemySdk.Alchemy(config);
var handler = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var token, content, user_id, user, address, token_type, contract_address, response, data;
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
          address = user.wallets[0].public_key; // const response = await fetch('https://api-sepolia.etherscan.io/api?module=account&action=txlist&address=' + address + '&startblock=0&endblock=99999999&page=1&offset=50&sort=asc&apikey=3TKNZYI5MRN69PMWC1VGJMJWK35YDIKV6V');
          //
          token_type = req.body.input.token_type; // Tether or Tegera
          contract_address = token_type == 'Tether' ? Tether_Address : Tegera_Address;
          _context.next = 18;
          return fetch('https://api-sepolia.etherscan.io/api?module=account&action=tokentx&contractaddress=' + contract_address + '&address=' + address + '&page=1&offset=100&startblock=0&endblock=99999999&sort=asc&apikey=3TKNZYI5MRN69PMWC1VGJMJWK35YDIKV6V');
        case 18:
          response = _context.sent;
          if (!response.ok) {
            _context.next = 27;
            break;
          }
          _context.next = 22;
          return response.json();
        case 22:
          data = _context.sent;
          return _context.abrupt("return", res.status(200).json({
            transaction: data.result
          }));
        case 27:
          console.log('Request failed with status:', response.status);
        case 28:
          _context.next = 34;
          break;
        case 30:
          _context.prev = 30;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          return _context.abrupt("return", res.status(400).json({
            message: 'Unexpected Error Occured'
          }));
        case 34:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 30]]);
  }));
  return function handler(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
module.exports = handler;

/**
 * 
 *  var myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')
 *     var raw = JSON.stringify({
      id: 67,
      jsonrpc: '2.0',
      method: 'qn_getTransactionsByAddress',
      params: [
        {
          address: address,
          page: 1,
          perPage: 100,
        },
      ],
    })

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    }

    fetch(
      'https://lingering-hidden-daylight.ethereum-sepolia.discover.quiknode.pro/996e3cd76bb14b5babd73ddbb999527b26ecc24e/',
      requestOptions,
    )
      .then((response) => response.text())
      .then((result) => {
        console.log(result)
        return res.status(200).json({ transaction: result })
      })
      .catch((error) => {
        console.log('error', error)
        return res.status(400).json({ message: 'Unexpected Error Occured' })
      })
 */