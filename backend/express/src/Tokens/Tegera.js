import { web3 } from "../web3/web3.js"
import { Tegera_ABI,Tegera_Address } from "../constant/Tegera_sepolia_ABI.js"
/**
 * Sepolia Tegera Token Contract Address
 * Tegera = 0x09871Adb124aab581046EA38c26C6af2e88F280E
 */
// const contractAddress = '0x09871Adb124aab581046EA38c26C6af2e88F280E'
const Tegera = new web3.eth.Contract(Tegera_ABI, Tegera_Address)

export { Tegera }
