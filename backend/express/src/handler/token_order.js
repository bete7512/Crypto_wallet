import { web3 } from '../web3/web3.js'
import { User } from '../utils/user.js'
import { Token } from '../utils/token.js'
import jwtDecode from 'jwt-decode'
import { Tegera_ABI, Tegera_Address } from '../constant/Tegera_sepolia_ABI.js'
import { Tether_ABI, Tether_Address } from '../constant/Tether_sepolia_ABI.js'
import { InsertOrder } from '../utils/insert_order.js'
import { Chapa } from '../chapa/chapa.js'
import { v4 as uuidv4 } from 'uuid'

const handler = async (req, res) => {
  try {
    const { token_id, amount } = req.body.input
    let token = req.headers.authorization
    token = token.split(' ')[1]
    const content = jwtDecode(token)
    const userId = content['https://hasura.io/jwt/claims']['x-hasura-user-id']
    const user = await User({ id: userId })
    const senderPublicKey = '0x2709Ae17403096A516b86ad4f39c463CD9b92aF2'
    let response_url
    // user.wallets[0].public_key;
    let to = user.wallets[0].public_key
    const senderPrivateKey =
      '702d55555b4c58bd0016246bcf824db4412a6c7bb38a85c7882ef2632d7fd354'
    // user.wallets[0].private_key;
    // const user = await User({ id: userId });
    // if (!user || user.wallets.length === 0) {
    //   return res.status(200).json({ transactions: [] });
    // }
    const crypto = await Token({ id: token_id })
    if (!crypto) {
      return res.status(400).json({ error: 'Token Not Found' })
    }
    const gasPrice = await web3.eth.getGasPrice()
    const gasLimit = 100000 // Adjust this value based on the ERC20 token contract
    const nonce = await web3.eth.getTransactionCount(senderPublicKey)
    const amountInWei = web3.utils.toHex(
      web3.utils.toWei(String(amount), 'gwei'),
    )

    let tokenABI, tokenAddress

    if (crypto.name === 'ጠገራ') {
      tokenABI = Tegera_ABI
      tokenAddress = Tegera_Address
    } else if (crypto.name === 'Tether') {
      tokenABI = Tether_ABI
      tokenAddress = Tether_Address
    } else if (crypto.name === 'Ether') {
      await send_small_ether(to, amount, senderPublicKey, senderPrivateKey)
    } else {
      return res.status(400).json({ error: 'Invalid token type' })
    }

    const contract = new web3.eth.Contract(tokenABI, tokenAddress, {
      from: senderPublicKey,
    })
    const data = contract.methods.transfer(to, amountInWei).encodeABI()
    const balance = await contract.methods.balanceOf(senderPublicKey).call()

    if (balance < amount) {
      console.log('Insufficient balance')
      return res.status(400).json({ error: 'Insufficient balance' })
    }

    const transactionObject = {
      from: senderPublicKey,
      to: tokenAddress,
      data: data,
      gasPrice: gasPrice,
      gasLimit: gasLimit,
      nonce: nonce,
    }

    const signedTransaction = await web3.eth.accounts.signTransaction(
      transactionObject,
      senderPrivateKey,
    )
    const receipt = await web3.eth.sendSignedTransaction(
      signedTransaction.rawTransaction,
    )
    const transactionHash = receipt.transactionHash
    let myChapa = new Chapa('CHASECK_TEST-R2r7oy9nnhaZuJLpM47VxYVHZXadMkS6')
    const customerInfo = {
      amount: `${crypto.price.price}` * amount,
      currency: `${crypto.price.currency}`,
      phone: '+250788123456',
      email: user.email || 'betekbebe@gmail.com',
      first_name: user?.first_name || 'John',
      last_name: user?.last_name || 'Doe',
      tx_ref: uuidv4(),
      callback_url: 'https://webhook.site/',
      return_url: 'http://localhost:5173/', // your callback URL
      customization: {
        title: 'Crypto Payment',
        description: 'Payment for Crypto Token',
      },
    }
    let chapa = async (customerInfo) => {
      try {
        const response = await myChapa.initialize(customerInfo, {
          autoRef: true,
        })
        return response
      } catch (err) {
        console.log(err)
        return err
      }
    }

    try {
      const chapa_response = await chapa(customerInfo)
      console.log(chapa_response)
      response_url = chapa_response.data.checkout_url
      const data = await InsertOrder({
        user_id: userId,
        reference_id: chapa_response.tx_ref,
        token_id: token_id,
        amount: amount * crypto.price.price,
      })
      console.log(data)
      return res.status(200).json({ check_out: response_url })
    } catch (error) {
      console.log(error)
      return res.status(400).json({ error: error.message })
    }
  } catch (error) {
    console.log(error)
    return res.status(400).json({ error: error.message })
  }
}

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

module.exports = handler
