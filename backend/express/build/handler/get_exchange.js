"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _web = require("../web3/web3.js");
var handler = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var response, data, response2, data2, data3, data4, data5, ETH_exchanges, BTC_exchanges, USDT_exchanges, XLM_exchanges, ADA_exchanges, exchanges;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          response = null; // response = await fetch(
          //   'https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
          //   {
          //     headers: {
          //       'X-CMC_PRO_API_KEY': '4a18b767-4cce-45b7-a618-f277624d705e',
          //     },
          //     method: 'GET',
          //   },
          // )
          _context.next = 4;
          return fetch('https://min-api.cryptocompare.com/data/top/exchanges/full?fsym=ETH&tsym=USD', {
            headers: {
              'X-CMC_PRO_API_KEY': '4a18b767-4cce-45b7-a618-f277624d705e'
            },
            method: 'GET'
          });
        case 4:
          response = _context.sent;
          _context.next = 7;
          return response.json();
        case 7:
          data = _context.sent;
          response2 = null;
          _context.next = 11;
          return fetch('https://min-api.cryptocompare.com/data/top/exchanges/full?fsym=BTC&tsym=USD', {
            headers: {
              'X-CMC_PRO_API_KEY': '4a18b767-4cce-45b7-a618-f277624d705e'
            },
            method: 'GET'
          });
        case 11:
          response2 = _context.sent;
          _context.next = 14;
          return response2.json();
        case 14:
          data2 = _context.sent;
          _context.next = 17;
          return fetch('https://min-api.cryptocompare.com/data/top/exchanges/full?fsym=USDT&tsym=USD', {
            headers: {
              'X-CMC_PRO_API_KEY': '4a18b767-4cce-45b7-a618-f277624d705e'
            },
            method: 'GET'
          });
        case 17:
          data3 = _context.sent;
          _context.next = 20;
          return data3.json();
        case 20:
          data3 = _context.sent;
          _context.next = 23;
          return fetch('https://min-api.cryptocompare.com/data/top/exchanges/full?fsym=XLM&tsym=USD', {
            headers: {
              'X-CMC_PRO_API_KEY': '4a18b767-4cce-45b7-a618-f277624d705e'
            },
            method: 'GET'
          });
        case 23:
          data4 = _context.sent;
          _context.next = 26;
          return data4.json();
        case 26:
          data4 = _context.sent;
          _context.next = 29;
          return fetch('https://min-api.cryptocompare.com/data/top/exchanges/full?fsym=ADA&tsym=USD', {
            headers: {
              'X-CMC_PRO_API_KEY': '4a18b767-4cce-45b7-a618-f277624d705e'
            },
            method: 'GET'
          });
        case 29:
          data5 = _context.sent;
          _context.next = 32;
          return data5.json();
        case 32:
          data5 = _context.sent;
          ETH_exchanges = data.Data.AggregatedData;
          BTC_exchanges = data2.Data.AggregatedData;
          USDT_exchanges = data3.Data.AggregatedData;
          XLM_exchanges = data4.Data.AggregatedData;
          ADA_exchanges = data5.Data.AggregatedData;
          exchanges = [{
            eth: ETH_exchanges
          }, {
            btc: BTC_exchanges
          }, {
            tether: USDT_exchanges
          }, {
            xlm: XLM_exchanges
          }, {
            cardano: ADA_exchanges
          }];
          return _context.abrupt("return", res.status(200).json({
            exchanges: exchanges
          }));
        case 42:
          _context.prev = 42;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          return _context.abrupt("return", res.status(500).json({
            error: _context.t0.message
          }));
        case 46:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 42]]);
  }));
  return function handler(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
module.exports = handler;