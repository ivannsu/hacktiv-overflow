require('dotenv').config()

const express = require('express')
const axios = require('axios')
const cors = require('cors')
const mongoose = require('mongoose')

const PORT = process.env.PORT || 3000
const app = express()

const answerRouters = require('./routers/answer')
const userRouters = require('./routers/user')
const questionRouters = require('./routers/question')
const voteRouters = require('./routers/vote')

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/users', userRouters)
app.use('/questions', questionRouters)
app.use('/answers', answerRouters)
app.use('/votes', voteRouters)

if(process.env.NODE_ENV === 'dev') {
  mongoose.connect('mongodb://localhost:27017/hacktiv-overflow', { useNewUrlParser: true })
} else {
  mongoose.connect('mongodb://hacktiv-overflow:hacktiv-overflow123@ds111963.mlab.com:11963/hacktiv-overflow', { useNewUrlParser: true })
}
const db = mongoose.connection

db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => console.log('[Configuration] : Connected to mongooese'));

app.listen(PORT, () => console.log('[Configuration] : Listen to Port ' + PORT))