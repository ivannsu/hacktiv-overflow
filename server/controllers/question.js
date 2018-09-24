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
  },

  remove (req, res) {

  },

  findAll (req, res) {

  }
}