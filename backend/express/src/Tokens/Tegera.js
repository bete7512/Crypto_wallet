import { web3 } from "../web3/web3.js"
import { Tether_ABI } from "../constant/constant.js"
// import { Contract } from "web3-eth-contract"

const address = '0x2709Ae17403096A516b86ad4f39c463CD9b92aF2'
const contractAddress = '0x11be89f241063c13dB88E03BFb8502e8595168E2'
const tether = new web3.eth.Contract(Tether_ABI, contractAddress)

export { tether }// 
