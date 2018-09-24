const mongoose = require('mongoose')
const Schema = mongoose.Schema

const questionSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required']
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  answers: [{
    type: Schema.Types.ObjectId,
    ref: 'Answer'
  }]
})

const Question = mongoose.model('Question', questionSchema)
module.exports = Question