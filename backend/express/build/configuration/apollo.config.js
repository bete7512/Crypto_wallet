"use strict";

var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _graphqlRequest = require("graphql-request");
var dotenv = _interopRequireWildcard(require("dotenv"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
// eslint-disable-next-line no-unused-vars

dotenv.config();
// const client = new GraphQLClient(process.env.HASURA_ENDPOINT, {
//   headers: {
//     'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET_KEY,
//   },
// })

var client = new _graphqlRequest.GraphQLClient('https://yemsuatubeg.hasura.app/v1/graphql', {
  headers: {
    'x-hasura-admin-secret': 'T66GUFpwRCcjv0ko090BsgY6ibjoZFOifwZHyv0FCWABH8XF3zq90TnIr4M4cWtr'
  }
});
var _default = client;
exports["default"] = _default;