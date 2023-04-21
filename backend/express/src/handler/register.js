/* eslint-disable import/named */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable import/extensions */
import bycrypt from 'bcrypt'
import * as dotenv from 'dotenv'
import client from '../configuration/apollo.config.js'
import { registerQuery } from '../constant/constant.js'
import { web3, web3Object } from '../web3/web3.js'
import { user } from '../constant/user.js'

const handler = async (req, res) => {
  const { account } = web3Object
  user.privateKey = account.privateKey
  user.publicKey = account.address
  user.email = randomEmail({ domain: 'gmail.com' })
  user.username = user.email
  user.fName = randomNames.random()
  user.lName = randomNames.random()
  user.password = bycrypt.hashSync('password', 10)
  user.phone = createMobilePhoneNumber('TR')
  let newUser
  const onTest = async () => {
    try {
      const userRegister = await client.request(registerQuery, {
        ...user,
      })
      newUser = userRegister
      console.log(`am registered${userRegister.insert_users_one}`)
    } catch (error) {
      console.log(error)
    }
  }
  await onTest()
  res.send(newUser)
}

export { handler }
