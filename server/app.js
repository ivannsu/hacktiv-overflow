require('dotenv').config()

const express = require('express')
const axios = require('axios')
const cors = require('cors')
const mongoose = require('mongoose')

const PORT = process.env.PORT || 3000
const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

if(process.env.NODE_ENV === 'dev') {
  mongoose.connect('mongodb://localhost:27017/hacktiv-overflow', { useNewUrlParser: true })
} else {
  mongoose.connect('mongodb://hacktiv-overflow:hacktiv-overflow123@ds111963.mlab.com:11963/hacktiv-overflow', { useNewUrlParser: true })
}
const db = mongoose.connection

db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => console.log('[Configuration] : Connected to mongooese'));

app.listen(PORT, () => console.log('[Configuration] : Listen to Port ' + PORT))