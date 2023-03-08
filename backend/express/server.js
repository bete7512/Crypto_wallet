/* eslint-disable consistent-return */
// /* eslint-disable import/named */
// /* eslint-disable no-unused-vars */
// /* eslint-disable no-console */
// /* eslint-disable import/extensions */
import express from 'express'
import * as dotenv from 'dotenv'
import { tether } from './Tokens/Tether.js'
import { web3 } from './web3/web3.js'

dotenv.config()
const app = express()
app.use(express.json({ limit: '200mb' }))
app.use(express.urlencoded({ extended: true }))

async function getUserBalance() {
  let userAccountBalance = await tether.methods.balanceOf('0x2709Ae17403096A516b86ad4f39c463CD9b92aF2').call()
  console.log(userAccountBalance)
  let symbol = await tether.methods.symbol().call()
  console.log(symbol)
  let totalSupply = await tether.methods.totalSupply().call()
  console.log(totalSupply)
  let name = await tether.methods.name().call()
  console.log(name)
  return web3.utils.fromWei(userAccountBalance, 'ether') // Convert wei balance to USDT and returns in string
}
app.post('/:route', async (req, res) => {
  try {
    console.log(req.params.route)
    const { handler } = await import(`./handler/${req.params.route}.js`)
    if (!handler) {
      return res.status(400).json({
        message: 'not found',
      })
    }
    handler(req, res)
  } catch (e) {
    console.log(e)
    return res.status(400).json({
      message: 'unexpected error occured',
    })
  }
})
app.listen(process.env.PORT, () => {
  console.log('on the moon')
})
