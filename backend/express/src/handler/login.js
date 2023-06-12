import client from '../configuration/apollo.config'
import * as dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import { loginQuery } from '../constant/constant'
import jwt from 'jsonwebtoken'
import { User } from '../utils/user_by_email'
import { Mailer } from '../utils/mailer'
import { InsertCode,Code,DeleteCode } from '../utils/two_steps'
dotenv.config()
const handler = async (req, res) => {
  const { email, password } = req.body.input
  try {
    const user = await User({ email })
    console.log(user)
    if (!user) {
      return res.status(400).json({
        message: 'User Not Found',
      })
    }
    if(user.status === false){
      return res.status(400).json({     
        message: 'You Are Banned From Using This Platform Kindly Contact Admin',      
      })
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password)
    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: 'Password is incorrect',
      })
    }
    const token = jwt.sign(
      {
        'https://hasura.io/jwt/claims': {
          'x-hasura-allowed-roles': ['users', 'admins'],
          'x-hasura-default-role': user.role.name,
          'x-hasura-user-id': user.id.toString(),
        },
      },
      process.env.HASURA_GRAPHQL_JWT_SECRET,
      {
        expiresIn: '5d',
      },
    )
    console.log(user.two_step, Math.floor(100000 + Math.random() * 900000))
    if (user.two_step) {
      const OTP = Math.floor(100000 + Math.random() * 900000)
      const expirationDate = new Date();
      expirationDate.setTime(expirationDate.getTime() + 4 * 60 * 60 * 1000); // Add 4 hours
      let formattedExpirationDate = expirationDate.toISOString(); // Convert to ISO 8601 format

      try {
        // let deleted = await DeleteCodeByEmail({ email: user.email })
        // console.log(deleted);   
        let tested = await Code({ email: user.email })
        if(tested){
          let deleted = await DeleteCode({ id: tested.id })
          console.log(deleted);
        }    
        let data = await InsertCode({
          email: user.email,
          code: String(OTP),
          expire: formattedExpirationDate, //
          token: token,
        })
        console.log("amd",data)
      } catch (error) {
        console.log(error.message)
      }
      let mailer = await Mailer(
        user.email,
        'Two Step Verification for Santim Crypto Payment',
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
          <h1>Two Step Verification</h1>
          <p>Enter this code to login <strong>${OTP}</strong></p>
          <p>Code will expire in 4 hours</p>
        </body>
      </html>
        `,
      )
      console.log("still",mailer);
      return res.status(200).json({
        two_step: user.two_step,
        message:
          'Two Step Verification Code Sent to your email address Successfully',
        access_token: '',
      })
    } else {
      return res.status(200).json({
        access_token: token,
        two_step: user.two_step,
      })
    }
  } catch (error) {
    console.log(error.message)
    return res.status(400).json({
      message: 'Unexpected Error Occured',
    })
  }
}

module.exports = handler
