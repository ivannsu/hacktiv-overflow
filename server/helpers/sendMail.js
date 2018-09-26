require('dotenv').config()

const nodemailer = require('nodemailer')
const fs = require('fs')
const kue = require('kue')
const queue = kue.createQueue()
const template = require('./mailTemplate')

kue.app.listen(3001)

// let template = fs.readFileSync(__dirname + '/mailTemplate.html', 'utf-8').toString()

function sendMail (to, name, link) {
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
    subject: 'Your Question has some answer',
    html: template(name, link)
  }

  let job = queue.create('sendMail', mailOptions).save(function (err) {
    if (err) {
      console.error(err)
    } else {
      queue.process('sendMail', function(job, done) {
        transporter.sendMail(mailOptions, function (err, info) {
          if (err) {
            console.error(err)
          } else {
            console.log(info)
          }
        })
      })
    }
  })
}

module.exports = sendMail