require('dotenv').config()

const kue = require('kue')
const queue = kue.createQueue()
const template = require('./confirmTemplate')

function confirmMail (to, name, link) {
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
      console.log('Created new queue')
    }
  })
}

module.exports = confirmMail