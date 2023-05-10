
import express, { json, urlencoded } from 'express'
import { config } from 'dotenv'
import { tether } from './Tokens/Tether.js'
import { web3 } from './web3/web3.js'
config()
const app = express()
app.use(json({ limit: '200mb' }))
app.use(urlencoded({ extended: true }))


app.post('/:route', async (req, res) => {
  try {
    const handler  = require(`./handler/${req.params.route}`)
    if (!handler) {
      return res.status(400).json({
        message: 'Action Not Found',
      })
    }
    handler(req, res)
  } catch (e) {
    console.log(e)
    return res.status(400).json({
      message: 'Unexpected Error Occured',
    })
  }
})

app.post('/event/:route', async (req, res) => {
  try {
    const handler  = require(`./event/${req.params.route}`)
    if (!handler) {
      return res.status(400).json({
        message: 'Event not found',
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

app.listen(7000, () => {
  console.log('on the moon')
})
