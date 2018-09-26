require('dotenv').config()

const nodemailer = require('nodemailer')
const kue = require('kue')
const queue = kue.createQueue()
const template = require('./confirmTemplate')

function confirmMail (to, name, link) {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: `${process.env.GMAIL_USER}`,
      pass: `${process.env.GMAIL_PASS}`
    }
  })
  let mailOptions = {
    from: 'hacktiv.overflow.ivansu@gmail.com',
    to: to,
    subject: 'Confirm your email to using our service',
    html: template(name, link)
  }

  let job = queue.create('confirmMail', mailOptions).save(function (err) {
    if (err) {
      console.error(err)
    } else {
      queue.process('confirmMail', function(job, done){
        transporter.sendMail(mailOptions, function (err, info) {
          if (err) {
            console.error(err)
          } else {
            console.log(info)
          }
        })
      });
    }
  })
}

module.exports = confirmMail