// import web3 from './web3.js';
// import { Tether_ABI } from '../constant/constant.js';

// const tetherContractAddress = '0xdAC17F958D2ee523a2206206994597C13D831ec7'
// //0xdac17f958d2ee523a2206206994597c13d831ec7
// // '0xa9f4820b76dd8f64a73188e26c465518cfd4bf06'; 
 
// const contract = new web3.eth.Contract(Tether_ABI, tetherContractAddress);  

//  let userAccountBalance;

//  async function getUserBalance() {    

//      userAccountBalance = await contract.methods.balanceOf("0x2709Ae17403096A516b86ad4f39c463CD9b92aF2").call(); 
//     return web3.utils.fromWei(userAccountBalance, 'ether'); // Convert wei balance to USDT and returns in string 

//  }


//  async function getUserBalance() {
//     let userAccountBalance = await tether.methods.balanceOf('0x2709Ae17403096A516b86ad4f39c463CD9b92aF2').call()
//     console.log(userAccountBalance)
//     let symbol = await tether.methods.symbol().call()
//     console.log(symbol)
//     let totalSupply = await tether.methods.totalSupply().call()
//     console.log(totalSupply)
//     let name = await tether.methods.name().call()
//     console.log(name)
//     return web3.utils.fromWei(userAccountBalance, 'ether') // Convert wei balance to USDT and returns in string
//   }
//  getUserBalance()