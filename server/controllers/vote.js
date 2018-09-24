const Vote = require('../models/Vote')

module.exports = {
  questionUpVote (req, res) {
    let questionId = req.params.id
    let userId = req.decoded._id
    let input = {
      question: questionId,
      user: userId,
      status: 1
    }

    Vote.create(input)
    .then(newVote => {
      res.status(201).json({
        message: 'up vote question successfully',
        vote: newVote
      })
    })
    .catch(err => {
      res.status(500).json({
        message: err.message
      })
    })
  },

  questionDownVote (req, res) {
    let questionId = req.params.id
    let userId = req.decoded._id
    let input = {
      question: questionId,
      user: userId,
      status: -1
    }

    Vote.create(input)
    .then(newVote => {
      res.status(201).json({
        message: 'down vote question successfully',
        vote: newVote
      })
    })
    .catch(err => {
      res.status(500).json({
        message: err.message
      })
    })
  },

  answerUpVote (req, res) {
    let answerId = req.params.id
    let userId = req.decoded._id
    let input = {
      answer: answerId,
      user: userId,
      status: 1
    }

    Vote.create(input)
    .then(newVote => {
      res.status(201).json({
        message: 'up vote answer successfully',
        vote: newVote
      })
    })
    .catch(err => {
      res.status(500).json({
        message: err.message
      })
    })
  },

  answerDownVote (req, res) {
    let answerId = req.params.id
    let userId = req.decoded._id
    let input = {
      answer: answerId,
      user: userId,
      status: -1
    }

    Vote.create(input)
    .then(newVote => {
      res.status(201).json({
        message: 'up vote answer successfully',
        vote: newVote
      })
    })
    .catch(err => {
      res.status(500).json({
        message: err.message
      })
    })
  },
}