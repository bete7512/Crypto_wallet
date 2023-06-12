import client from '../configuration/apollo.config'
import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
import bcrypt from 'bcrypt'
dotenv.config()
import { User } from '../utils/user_by_email'
import { Mailer } from '../utils/mailer'
import { InsertCode, Code, DeleteCode } from '../utils/forgot'
const handler = async (req, res) => {
  const { email } = req.body.input
  try {
    const user = await User({ email })
    console.log(user)
    if (!user) {
      return res.status(400).json({
        message: 'This Email Not Found',
      })
    }

    const OTP = Math.floor(100000 + Math.random() * 900000)
    const expirationDate = new Date()
    expirationDate.setTime(expirationDate.getTime() + 4 * 60 * 60 * 1000) // Add 4 hours
    let formattedExpirationDate = expirationDate.toISOString() // Convert to ISO 8601 format

    try {
      let tested = await Code({ email: user.email })
      if (tested) {
        let deleted = await DeleteCode({ id: tested.id })
        console.log(deleted)
      }
      let data = await InsertCode({
        email: user.email,
        code: String(OTP),
        expire: formattedExpirationDate, //
      })
      console.log('amd', data)
    } catch (error) {
        console.log(error.message)
        return res.status(400).json({
            message: 'Unexpected Error Occured',    
        })
    }
    let mailer = await Mailer(
      user.email,
      'Password Recovery Email Verification Code',
      `
        <html>
        <head>
          <style>
            /* CSS styles for the email */
            h1 {
              color: #333;
              font-size: 24px;
              font-family: Arial, sans-serif;
            }
            
            p {
              color: #666;
              font-size: 16px;
              font-family: Arial, sans-serif;
            }
          </style>
        </head>
        <body>
          <h1>Password Recovery Code</h1>
          <p>Enter this code to reset your Password <strong>${OTP}</strong></p>
          <p>This Code will expire in 4 hours</p>
        </body>
      </html>
        `,
    )
    console.log('still', mailer)
    return res.status(200).json({
        success: "Email Sent Successfully"
    })
  } catch (error) {
    console.log(error.message)
    return res.status(400).json({
      message: 'Unexpected Error Occured',
    })
  }
}

module.exports = handler
