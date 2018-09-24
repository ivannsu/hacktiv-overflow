const mongoose = require('mongoose')
const Schema = mongoose.Schema

const voteSchema = new Schema({
  question: {
    type: Schema.Types.ObjectId,
    ref: 'Question'
  },
  answer: {
    type: Schema.Types.ObjectId,
    ref: 'Answer'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  status: Number
})

const Vote = mongoose.model('Vote', voteSchema)
module.exports = Vote