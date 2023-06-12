import { web3 } from '../web3/web3.js';
import { User } from '../utils/user.js';
import jwtDecode from 'jwt-decode';
import { Tegera_ABI, Tegera_Address } from '../constant/Tegera_sepolia_ABI.js';
import { Tether_ABI, Tether_Address } from '../constant/Tether_sepolia_ABI.js';

const handler = async (req, res) => {
  try {
    const { to, amount, token_type } = req.body.input;
    let token = req.headers.authorization;
    token = token.split(' ')[1];
    const content = jwtDecode(token);
    const userId = content['https://hasura.io/jwt/claims']['x-hasura-user-id'];
    const user = await User({ id: userId });

    if (!user || user.wallets.length === 0) {
      return res.status(200).json({ transactions: [] });
    }

    const senderPublicKey = user.wallets[0].public_key;
    const senderPrivateKey = user.wallets[0].private_key;
    const gasPrice = await web3.eth.getGasPrice();
    const gasLimit = 100000; // Adjust this value based on the ERC20 token contract
    const nonce = await web3.eth.getTransactionCount(senderPublicKey);
    let decimals = 1;
    const amountInWei = web3.utils.toHex(web3.utils.toWei(String(amount), "gwei"));

    let tokenABI, tokenAddress;

    if (token_type === 'Tegera') {
      tokenABI = Tegera_ABI;
      tokenAddress = Tegera_Address;
    } else if (token_type === 'Tether') {
      tokenABI = Tether_ABI;
      tokenAddress = Tether_Address;
    } else if (token_type === 'Ether') {
      await send_small_ether(to, amount, senderPublicKey, senderPrivateKey)

    } 
    else {
      return res.status(400).json({ error: 'Invalid token type' });
    }

    const contract = new web3.eth.Contract(tokenABI, tokenAddress, { from: senderPublicKey });
    const data = contract.methods.transfer(to, amountInWei).encodeABI();
    const balance = await contract.methods.balanceOf(senderPublicKey).call();

    if (balance < amount) {
      console.log('Insufficient balance');
      return res.status(400).json({ error: 'Insufficient balance' });
    }

    const transactionObject = {
      from: senderPublicKey,
      to: tokenAddress,
      data: data,
      gasPrice: gasPrice,
      gasLimit: gasLimit,
      nonce: nonce,
    };

    const signedTransaction = await web3.eth.accounts.signTransaction(transactionObject, senderPrivateKey);
    const receipt = await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);
    const transactionHash = receipt.transactionHash;

    console.log(receipt);
    return res.status(200).json({ success: transactionHash });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error.message });
  }
};



async function sendRaw(rawTx, privateKey) {
  const signedTx = await web3.eth.accounts.signTransaction(rawTx, privateKey)
  web3.eth.sendSignedTransaction(signedTx.rawTransaction, (error, hash) => {
    if (error) {
      console.error('Error sending transaction:')
      console.error(error.message)
      console.error('Transaction details:', rawTx)
      return error
    } else {
      console.log('Transaction hash:', hash)
      return hash 
    }
  })
}

async function send_small_ether(receiver, value, sender, sender_key) {
  try {
    const senderBalance = await web3.eth.getBalance(sender)
    console.log('Sender balance:', senderBalance.toString())
    const rawTx = {
      nonce: await web3.eth.getTransactionCount(sender, 'latest'),
      gasLimit: 21000,
      gasPrice: '4000000000',
      to: receiver,
      value: web3.utils.toHex(web3.utils.toWei(value, 'ether')),
      from: sender,
      chainId: 11155111,
    }
    await sendRaw(rawTx, sender_key)
  } catch (error) {
    console.error('Error sending ether:')
    console.error(error.message)
  }
}

module.exports = handler;