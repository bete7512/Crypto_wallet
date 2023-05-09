"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _express = _interopRequireWildcard(require("express"));
var _dotenv = require("dotenv");
var _Tether = require("./Tokens/Tether.js");
var _web = require("./web3/web3.js");
var _graphqlRequest = require("graphql-request");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
// import client from './configuration/apollo.config.js'

(0, _dotenv.config)();
var app = (0, _express["default"])();
app.use((0, _express.json)({
  limit: '200mb'
}));
app.use((0, _express.urlencoded)({
  extended: true
}));

// app.post('/:route', async (req, res) => {
//   try {
//     const handler  = require(`./handler/${req.params.route}`)
//     if (!handler) {
//       return res.status(400).json({
//         message: 'Action Not Found',
//       })
//     }
//     handler(req, res)
//   } catch (e) {
//     console.log(e)
//     return res.status(400).json({
//       message: 'Unexpected Error Occured',
//     })
//   }
// })

// app.post('/event/:route', async (req, res) => {
//   try {
//     const handler  = require(`./event/${req.params.route}`)
//     if (!handler) {
//       return res.status(400).json({
//         message: 'Event not found',
//       })
//     }
//     handler(req, res)
//   } catch (e) {
//     console.log(e)
//     return res.status(400).json({
//       message: 'unexpected error occured',
//     })
//   }
// })

var client = new _graphqlRequest.GraphQLClient('https://yemsuatubeg.hasura.app/v1/graphql', {
  headers: {
    'x-hasura-admin-secret': 'T66GUFpwRCcjv0ko090BsgY6ibjoZFOifwZHyv0FCWABH8XF3zq90TnIr4M4cWtr'
  }
});
var totalLength = 0;
function getBalance() {
  return _getBalance.apply(this, arguments);
} // Call getBalance immediately and every minute after that
function _getBalance() {
  _getBalance = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var url, headers, i, query, variables, body, requestInit, response, responseHeaders, status, statusText, responseBody, requestLength, responseLength;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          url = 'https://yemsuatubeg.hasura.app/v1/graphql';
          headers = {
            'Content-Type': 'application/json',
            'x-hasura-admin-secret': 'T66GUFpwRCcjv0ko090BsgY6ibjoZFOifwZHyv0FCWABH8XF3zq90TnIr4M4cWtr'
          };
          i = 0;
        case 3:
          if (!(i < 60)) {
            _context.next = 30;
            break;
          }
          _context.prev = 4;
          query = "query MyQuery {\n        my_table {\n          col1\n          col10\n          col11\n          col12\n          col13\n          col14\n          col15\n          col16\n          col17\n          col18\n          col19\n          col2\n          col20\n          col21\n          col22\n          col23\n          col24\n          col25\n          col26\n          col27\n          col28\n          col29\n          col3\n          col30\n          col31\n          col32\n          col33\n          col34\n          col35\n          col36\n          col37\n          col38\n          col39\n          col4\n          col40\n          col41\n          col42\n          col43\n          col44\n          col45\n          col46\n          col47\n          col48\n          col49\n          col5\n          col50\n          col6\n          col7\n          col8\n          col9\n          id\n        }\n      }";
          variables = {};
          body = JSON.stringify({
            query: query,
            variables: variables
          });
          requestInit = {
            method: 'POST',
            headers: headers,
            body: body
          };
          _context.next = 11;
          return fetch(url, requestInit);
        case 11:
          response = _context.sent;
          responseHeaders = response.headers, status = response.status, statusText = response.statusText;
          _context.next = 15;
          return response.text();
        case 15:
          responseBody = _context.sent;
          requestLength = Buffer.byteLength(body, 'utf8');
          responseLength = responseHeaders.has('Content-Length') ? parseInt(responseHeaders.get('Content-Length'), 10) : 0;
          totalLength += requestLength + responseLength;
          console.log("Request Content Length: ".concat(requestLength));
          console.log("Response Content Length: ".concat(responseLength));
          console.log({
            status: status,
            statusText: statusText,
            response: responseBody
          });
          _context.next = 27;
          break;
        case 24:
          _context.prev = 24;
          _context.t0 = _context["catch"](4);
          console.log("Error: ".concat(_context.t0.message));
        case 27:
          i++;
          _context.next = 3;
          break;
        case 30:
          console.log("Total Length: ".concat(totalLength));
        case 31:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[4, 24]]);
  }));
  return _getBalance.apply(this, arguments);
}
var test_myserver = setInterval(getBalance, 60000);
setTimeout(function () {
  clearInterval(test_myserver);
}, 1312 * 61000);
app.listen(4000, function () {
  console.log('on the moon');
});