const Vote = require('../models/Vote')

module.exports = {
  questionUpVote (req, res) {
    let questionId = req.params.id
    let userId = req.decoded._id
    let input = {
      question: questionId,
      answer: null,
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
      answer: null,
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
      question: null,
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
      question: null,
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

  countQuestionVotes (req, res) {
    Vote.find({}).select('question').$where('this.question !== null').count()
    .then(count => {
      res.status(200).json({
        message: 'count question votes',
        count: count
      })
    })
    .catch(err => {
      res.status(500).json({
        message: err.message
      })
    })
  },

  countAnswerVotes (req, res) {
    Vote.find({}).select('answer').$where('this.answer !== null').count()
    .then(count => {
      res.status(200).json({
        message: 'count answer votes',
        count: count
      })
    })
    .catch(err => {
      res.status(500).json({
        message: err.message
      })
    })
  }
}