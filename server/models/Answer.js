const mongoose = require('mongoose')
const Schema = mongoose.Schema

const answerSchema = new Schema({
  answer: {
    type: String,
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  }
})

const Answer = mongoose.model('Answer', answerSchema)
module.exports = Answer