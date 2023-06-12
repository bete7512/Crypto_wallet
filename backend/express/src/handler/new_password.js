import { v4 as uuidv4 } from 'uuid'
import * as dotenv from 'dotenv'
import client from '../configuration/apollo.config.js'
const bcrypt = require('bcrypt')
import jwt from 'jsonwebtoken'
import { User } from '../utils/user_by_email'
import { Mailer } from '../utils/mailer'
dotenv.config()
const UPDATE_PASSWORD = `
mutation MyMutation($id: Int = 10, $password: String = "") {
    update_users_by_pk(pk_columns: {id: $id}, _set: {password: $password}) {
      id
    }
  }
  
`
const handler = async (req, res) => {
  const { email, password } = req.body.input
  const user = await User({ email })
  console.log(user)
  if (!user) {
    return res.status(400).json({
      message: 'User Not Found',
    })
  }
  const salt = bcrypt.genSaltSync(10)
  const hashedPassword = bcrypt.hashSync(password, salt)
  try {
    const responce = await client.request(UPDATE_PASSWORD, {
      id: user.id,
      password: hashedPassword,
    })
    console.log(responce)
  } catch (error) {
    console.log(error)
    return res.status(400).json({
      message: 'Unexpected Error Occured',
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
  const mail = Mailer(
    user.email,
    'Password Changed',
    `<h1>Hi ${user.first_name} ${user.last_name}</h1><p>Your password has been changed</p>`,
  )
  console.log(mail)
  return res.status(200).json({ access_token: token })
}

module.exports = handler
