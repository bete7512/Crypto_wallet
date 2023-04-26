import { v4 as uuidv4 } from 'uuid'
import * as dotenv from 'dotenv'
import client from '../configuration/apollo.config.js'
import { registerQuery } from '../constant/constant.js'
import EventEmitter from 'events'
import create_wallet from '../events/create_wallet.js'
const bcrypt = require('bcrypt');     
const eventEmitter = new EventEmitter()
eventEmitter.on('create_wallet', (responce) => {
  create_wallet(responce)
  })
const handler = async (req, res) => {

  const { first_name,last_name,email, password } = req.body.input
  const salt =  bcrypt.genSaltSync(10)
  const hashedPassword =  bcrypt.hashSync(password, salt); 
  try {
    const {insert_users_one:user} = await client.request(registerQuery, {  first_name,last_name,email, password:hashedPassword })   
    eventEmitter.emit('create_wallet', user)
  } catch (error) {
    console.log(error)
    return res.status(400).json({
      message: 'Unexpected Error Occured',
    })
  }
  return res.status(200).json({ success:'trh' }) 

}

module.exports  = handler  
