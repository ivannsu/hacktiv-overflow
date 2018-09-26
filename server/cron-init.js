require('dotenv').config()

const nodemailer = require('nodemailer')
const kue = require('kue')
const queue = kue.createQueue()
const CronJob = require('cron').CronJob;

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: `${process.env.GMAIL_USER}`,
    pass: `${process.env.GMAIL_PASS}`
  }
})

new CronJob('30 * * * * *', function () {
  queue.process('confirmMail', function(job, done){
    transporter.sendMail(job.data, function (err, info) {
      if (err) {
        console.error(err)
      } else {
        console.log('confirmMail success')
      }
    })
  })
}, null, true, 'Asia/Jakarta')