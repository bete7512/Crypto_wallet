/* eslint-disable consistent-return */
/* eslint-disable import/named */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable import/extensions */
const express = require('express')
const dotenv = require('dotenv')
const { tether } = require('./Tokens/Tether.js')
const { web3 } = require('./web3/web3.js')

dotenv.config()
const app = express()
app.use(express.json({ limit: '200mb' }))
app.use(express.urlencoded({ extended: true }))
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
