import recoverWallet from '../events/recover_wallet'
import { web3 } from '../web3/web3.js'
import { User,UpdateWallet } from '../utils/user.js'
import jwtDecode from 'jwt-decode'
import { recoverAccount } from '../events/recover_private_key'

const handler = async (req, res) => {
  let token = req.headers.authorization
  token = token.split(' ')[1]
  const content = jwtDecode(token)
  const userId = content['https://hasura.io/jwt/claims']['x-hasura-user-id']
  const user = await User({ id: userId })
  if(!user || user.wallets.length === 0) {
    return res.status(400).json({ message:"Something Were Wrong" }) 
    }
    console.log(req.body.input);
  const { recovery_phrase, private_key } = req.body.input
  console.log(recovery_phrase);
  if (recovery_phrase != undefined && recovery_phrase != null && recovery_phrase != '') {
    const wallet = await recoverWallet(recovery_phrase)
    console.log("Done",wallet);
    console.log("user",user.wallet);
    const update = await UpdateWallet({ id: user.wallet.id, private_key: wallet.privateKey, public_key: wallet.address, recovery_phrase: wallet.mnemonic })
    console.log(update);
    return res.status(200).json({ success: wallet })
  } else {
    // const account = web3.eth.accounts.privateKeyToAccount('0x' + private_key)
    return res.status(400).json({ message:"Something Were Wrong" })
    // console.log("private_key",private_key);
    // const recovered = await recoverAccount(private_key)     
    // console.log("recovered",recovered);
    // console.log(account);
    // return res
    //   .status(200)
    //   .json({
    //     success: {
    //       private_key: account.privateKey,
    //       public_key: account.address,
    //     },
    //   })
  }
  // const wallet = await recoverWallet(recovery_phrase)

  const account = web3.eth.accounts.privateKeyToAccount('0x' + private_key)

  return res.status(200).json({ wallet })
}

module.exports = handler
