import { web3 } from "../web3/web3.js"
import { Tether_ABI } from "../constant/constant.js"
/**
 * Sepolia Tether Token Contract Address
 * Tether = 0x222fB5507acD3Da78351Be60271fa9537b07Cdc3
 * 
 */
const address = '0x2709Ae17403096A516b86ad4f39c463CD9b92aF2'
const contractAddress = '0x0e387335a0367Daa2Dac27470437043d36E095D4'
const tether = new web3.eth.Contract(Tether_ABI, contractAddress)

export { tether }
