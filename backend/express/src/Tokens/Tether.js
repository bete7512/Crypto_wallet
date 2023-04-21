import { web3 } from "../web3/web3.js"
import { Tether_ABI } from "../constant/Tether_sepolia_ABI.js"
const contractAddress = '0x0e387335a0367Daa2Dac27470437043d36E095D4'
const tether = new web3.eth.Contract(Tether_ABI, contractAddress)

export { tether }
