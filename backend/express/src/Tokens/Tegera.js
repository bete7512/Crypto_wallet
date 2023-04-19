import { web3 } from "../web3/web3.js"
import { Tether_ABI } from "../constant/constant.js"
/**
 * Sepolia Tegera Token Contract Address
 * Tegera = 0x09871Adb124aab581046EA38c26C6af2e88F280E
 * 
 */
const address = '0x2709Ae17403096A516b86ad4f39c463CD9b92aF2'
const contractAddress = '0x09871Adb124aab581046EA38c26C6af2e88F280E'
const tether = new web3.eth.Contract(Tether_ABI, contractAddress)

export { tether }// 
