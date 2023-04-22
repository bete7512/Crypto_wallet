import client from '../configuration/apollo.config'
import jwt from 'jsonwebtoken'
const bcrypt = require('bcrypt')
import { loginQuery } from '../constant/constant'
const handler = async (req, res) => {
  try {
    const responce = await client.request(loginQuery, {
      email: req.body.input.email,
    })
    if (responce.users.length === 0) {
      return res.status(400).json({
        message: 'User Not Found',
      })
    }
    const user = responce.users[0]
    const isPasswordCorrect = bcrypt.compareSync(
      req.body.input.password,
      user.password,
    )
    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: 'Password is incorrect',
      })
    }
    const token = jwt.sign(
      {
        'http://hasura.io/jwt/claims': {
          'x-hasura-allowed-roles': ['user'],
          'x-hasura-default-role': user.role.name,
          'x-hasura-user-id': user.id,
        },
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '1d',
      },
    )
    return res.status(200).json({
      access_token: token,
    })
  } catch (error) {
    console.log(error)
    return res.status(400).json({
      message: 'Unexpected Error Occured',
    })
  }
}

module.exports = handler
