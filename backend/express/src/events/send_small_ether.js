import { web3 } from '../web3/web3'

const sender = '0x2709Ae17403096A516b86ad4f39c463CD9b92aF2'
const sender_key = '0x702d55555b4c58bd0016246bcf824db4412a6c7bb38a85c7882ef2632d7fd354'
const value = '0.04'

async function sendRaw(rawTx, privateKey) {
  const signedTx = await web3.eth.accounts.signTransaction(rawTx, privateKey)
  web3.eth.sendSignedTransaction(signedTx.rawTransaction, (error, hash) => {
    if (error) {
      console.error('Error sending transaction:')
      console.error(error.message)
      console.error('Transaction details:', rawTx)
    } else {
      console.log('Transaction hash:', hash)
    }
  })
}

async function send_small_ether(receiver) {
  console.log('Sending ether to', receiver);
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

export { send_small_ether }
