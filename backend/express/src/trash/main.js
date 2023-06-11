const Web3 = require('web3')

const Web3js = new Web3(
  new Web3.providers.HttpProvider(
    'https://{username}:{password}@bisontrailsURL',
  ),
)

const privateKey = process.env.YOUR_PRIVATE_KEY //Your Private key environment variable

let tokenAddress = '0x4134aa5373acafc36337bf515713a943927b06e5' // Demo Token contract address

let toAddress = '' // where to send it

let fromAddress = '' // Your address

let contractABI = [
  {
    constant: false,

    inputs: [
      {
        name: '_to',

        type: 'address',
      },

      {
        name: '_value',

        type: 'uint256',
      },
    ],

    name: 'transfer',

    outputs: [
      {
        name: '',

        type: 'bool',
      },
    ],
  },
]

let contract = new Web3js.eth.Contract(contractABI, tokenAddress, {
  from: fromAddress,
})

let amount = Web3js.utils.toHex(Web3js.utils.toWei('1')) //1 DEMO Token

let data = contract.methods.transfer(toAddress, amount).encodeABI()
