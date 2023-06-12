import { web3 } from "../web3/web3.js"
import { Tether_ABI } from "../constant/Tether_sepolia_ABI.js"
const contractAddress = '0x222fB5507acD3Da78351Be60271fa9537b07Cdc3'//0x0e387335a0367Daa2Dac27470437043d36E095D4
const Tether = new web3.eth.Contract(Tether_ABI, contractAddress)

export { Tether }