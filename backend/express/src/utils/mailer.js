import nodemailer from 'nodemailer'
import smtpTransport from 'nodemailer-smtp-transport'

let transporter = nodemailer.createTransport(
  smtpTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
      user: 'betekbebe@gmail.com',
      pass: 'zafhcpglvqgnsfgx',
    },
  }),
)

const Mailer = async (to, subject, text) => {
  const mailOptions = {
    from: 'betekbebe@gmail.com',
    to: to,
    subject: subject,
    html: text,
  }
  let response
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
        console.log("Mailer",error);
        response = error
      return error
    } else {
        console.log("Mailer",info.response);
        response = info.response 
      return info.response
    }
  })
    return response 
}

export { Mailer }
