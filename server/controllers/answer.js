const Answer = require('../models/Answer')
const Question = require('../models/Question')

module.exports = {
  create (req, res) {
    let questionId = req.params.questionId
    let userId = req.decoded._id
    let input = {
      answer: req.body.answer,
      user: userId
    }

    Question.findOne({ _id: questionId })
    .then(question => {
      if (!question) {
        res.status(500).json({
          message: 'no question !'
        })  
      } else {
        Answer.create(input)
        .then(newAnswer => {

          Question.updateOne({ _id: questionId }, { $push: { answers: newAnswer._id } })
          .then(affected => {
            res.status(201).json({
              message: 'create new answer successfully',
              answer: newAnswer
            })
          })
          .catch(err => {
            res.status(500).json({
              message: err.message
            })
          })
        })
        .catch(err => {
          res.status(500).json({
            message: err.message
          })
        })
      }
    })
    .catch(err => {
      res.status(500).json({
        message: err.message
      })
    })
  },

  update (req, res) {

  },

  findByQuestion (req, res) {

  }
}