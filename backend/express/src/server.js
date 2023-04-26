import express, { json, urlencoded } from 'express'
import { config } from 'dotenv'
import { tether } from './Tokens/Tether.js'
import { web3 } from './web3/web3.js'

config()
const app = express()
app.use(json({ limit: '200mb' }))
app.use(urlencoded({ extended: true }))
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello World' })
})

app.post('/:route', async (req, res) => {
  try {
    console.log(req.params.route)
    const { handler } = require(`./handler/${req.params.route}`)
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
