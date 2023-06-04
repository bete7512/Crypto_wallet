import { web3 } from '../web3/web3.js'
import { User } from '../utils/user.js'
import jwtDecode from 'jwt-decode'
import { Tegera } from '../Tokens/Tegera.js' // Tegera token instance of smart contract
import { Tether } from '../Tokens/Tether.js' // Tether token instance of smart contract

const handler = async (req, res) => {
  try {
    const { to, amount, tokenType } = req.body.input
    let token = req.headers.authorization
    token = token.split(' ')[1]
    const content = jwtDecode(token)
    const userId = content['https://hasura.io/jwt/claims']['x-hasura-user-id']
    const user = await User({ id: userId })
    if (!user || user.wallets.length === 0) {
      return res.status(200).json({ transactions: [] })
    }
    const senderPublicKey = user.wallets[0].publicKey
    const senderPrivateKey = user.wallets[0].privateKey

    let tokenInstance
    if (tokenType === 'Tegera') {
      tokenInstance = Tegera
    } else if (tokenType === 'Tether') {
      tokenInstance = Tether
    } else {
      return res.status(400).json({ error: 'Invalid token type' })
    }

    const senderAccount =
      web3.eth.accounts.privateKeyToAccount(senderPrivateKey)
    const receiverAccount = to
    const value = amount

    const gasPrice = await web3.eth.getGasPrice()
    const gasLimit = 21000

    const nonce = await web3.eth.getTransactionCount(senderAccount.address)

    const transactionObject = {
      from: senderAccount.address,
      to: receiverAccount,
      value: web3.utils.toWei(value.toString(), 'ether'),
      gasPrice: gasPrice,
      gasLimit: gasLimit,
      nonce: nonce,
    }

    const signedTransaction = await senderAccount.signTransaction(
      transactionObject,
    )
    const receipt = await web3.eth.sendSignedTransaction(
      signedTransaction.rawTransaction,
    )

    const transactionHash = receipt.transactionHash
    const transaction = {
      from: senderAccount.address,
      to: receiverAccount,
      value: value,
      tokenType: tokenType,
      transactionHash: transactionHash,
    }

    return res.status(200).json({ transaction: transaction })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: error.message })
  }
}

module.exports = handler
