import client from '../configuration/apollo.config'
import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
import bcrypt from 'bcrypt'
dotenv.config()
import { Code, DeleteCode,DeleteCodeByEmail } from '../utils/forgot'
const handler = async (req, res) => {
  const { email, code } = req.body.input
  try {
    const otp = await Code({ email })
    console.log(otp);
    if (!otp) {
      return res.status(400).json({
        message: 'Relogin Again This Code Not Found or Expired',
      })
    }
    if (otp.created_at + otp.expire < Date.now()) {
      return res.status(400).json({
        message: 'This Code is Expired',
      })
    }
    if (otp.code != code) {
        console.log(otp.code, code);
      return res.status(400).json({
        message: 'Code is incorrect',
      })
    }
    await DeleteCode({ id: otp.id })
    await DeleteCodeByEmail({ email: otp.email })   
    return res.status(200).json({
      success: "Code Verified",
    })
  } catch (error) {
    console.log(error.message)
    return res.status(400).json({
      message: 'Unexpected Error Occured',
    })
  }
}

module.exports = handler
