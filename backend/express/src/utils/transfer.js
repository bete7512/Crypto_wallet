import Web3 from 'web3'
import * as dotenv from 'dotenv'
import Contract from 'web3-eth-contract'
import Personal from 'web3-eth-personal'
import { Tether_ABI } from '../constant/constant'
dotenv.config()
const web3 = new Web3(process.env.INFURA_GOERLI_END_POINT)

const privateKey = process.env.YOUR_PRIVATE_KEY //Your Private key environment variable

let tokenAddress = '0xdAC17F958D2ee523a2206206994597C13D831ec7' // Demo Token contract address
let toAddress = '0x871A92E6a2Ef6Fe4Af01BD935333502d0f375AbF'// where to send it
let fromAddress = '0x2709Ae17403096A516b86ad4f39c463CD9b92aF2'// Your address
let contractABI = Tether_ABI
let contract = new web3.eth.Contract(contractABI, tokenAddress)
let amount = web3.utils.toHex(web3.utils.toWei("1")); //1 DEMO Token
let data = contract.methods.transfer(toAddress, amount).encodeABI()