const mongoose = require('mongoose')
const Schema = mongoose.Schema

const answerSchema = new Schema({
  question: {
    type: Schema.Types.ObjectId,
    ref: 'Question'
  },
  answers: [
    {
      answer: { type: String },
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    }
  ],
})

const Answer = mongoose.model('Answer', answerSchema)
module.exports = Answer