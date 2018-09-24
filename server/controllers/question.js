const Question = require('../models/Question')

module.exports = {
  create (req, res) {
    let input = {
      title: req.body.title,
      user: req.decoded._id
    }

    Question.create(input)
    .then(newQuestion => {
      res.status(201).json({
        message: 'create new question successfully',
        question: newQuestion
      })
    })
    .catch(err => {
      res.status(500).json({
        message: err.message
      })
    })
  },

  update (req, res) {
    let questionId = req.params.id
    let userId = req.decoded._id
    let input = {
      title: req.body.title
    }

    Question.findOne({ _id: questionId, user: userId })
    .then(question => {
      if (!question) {
        res.status(500).json({
          message: 'no question create by this user'
        })
      } else {
        Question.updateOne({ _id: questionId }, input)
        .then(affected => {
          res.status(200).json({
            message: 'update question successfully',
            question: question
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

  remove (req, res) {
    
  },

  findAll (req, res) {

  }
}