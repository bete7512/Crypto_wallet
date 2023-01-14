/* eslint-disable consistent-return */
// /* eslint-disable import/named */
// /* eslint-disable no-unused-vars */
// /* eslint-disable no-console */
// /* eslint-disable import/extensions */
import express from 'express'
import * as dotenv from 'dotenv'

const app = express()
app.use(express.json({ limit: '200mb' }))
app.use(express.urlencoded({ extended: true }))

dotenv.config()
app.post('/:route', async (req, res) => {
  try {
    console.log(req.params.route)
    const { handler } = await import(`./handler/${req.params.route}.js`)
    if (!handler) {
      return res.status(400).json({
        message: 'not found',
      })
    }
    console.log(typeof handler)
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
