import { web3 } from "../web3/web3.js"
import { Tether_ABI } from "../constant/constant.js"
// import { Contract } from "web3-eth-contract"

const address = '0x2709Ae17403096A516b86ad4f39c463CD9b92aF2'
const contractAddress = '0xdAC17F958D2ee523a2206206994597C13D831ec7'
const tether = new web3.eth.Contract(Tether_ABI, contractAddress)

export { tether }// 
