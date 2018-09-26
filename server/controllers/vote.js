const Vote = require('../models/Vote')

module.exports = {
  questionVote (req, res) {
    let questionId = req.params.id
    let userId = req.decoded._id
    let type = req.params.type

    let input = {
      question: questionId,
      answer: null,
      user: userId,
      status: (type === 'up') ? 1 : -1
    }

    Vote.findOne({ question: questionId, user: userId })
    .then(vote => {
      if (!vote) {
        Vote.create(input)
        .then(newVote => {
          res.status(201).json({
            message: 'vote question successfully',
            vote: newVote
          })
        })
        .catch(err => {
          res.status(500).json({
            message: err.message
          })
        })
      } else {
        Vote.updateOne({ _id: vote._id }, { status: input.status })
        .then(affected => {
          res.status(200).json({
            message: 'vote question successfully',
            vote: input
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

  answerVote (req, res) {
    let answerId = req.params.id
    let userId = req.decoded._id
    let type = req.params.type

    let input = {
      question: null,
      answer: answerId,
      user: userId,
      status: (type === 'up') ? 1 : -1
    }

    Vote.findOne({ answer: answerId, user: userId })
    .then(vote => {
      if (!vote) {
        Vote.create(input)
        .then(newVote => {
          res.status(201).json({
            message: 'vote question successfully',
            vote: newVote
          })
        })
        .catch(err => {
          res.status(500).json({
            message: err.message
          })
        })
      } else {
        Vote.updateOne({ _id: vote._id }, { status: input.status })
        .then(affected => {
          res.status(200).json({
            message: 'vote question successfully',
            vote: input
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

  countQuestionVotes (req, res) {
    let questionId = req.params.id

    Vote.find({ question: questionId }).select('question status').$where('this.question !== null')
    .then(votes => {

      let total = votes.reduce((acc, obj) => {
        return acc += obj.status
      }, 0)

      res.status(200).json({
        message: 'count question votes',
        total
      })
    })
    .catch(err => {
      res.status(500).json({
        message: err.message
      })
    })
  },

  countAnswerVotes (req, res) {
    let answerId = req.params.id

    Vote.find({ answer: answerId }).$where('this.answer !== null').select('answer status')
    .then(votes => {
      
      let total = votes.reduce((acc, obj) => {
        return acc += obj.status
      }, 0)

      res.status(200).json({
        message: 'count answer votes',
        total
      })
    })
    .catch(err => {
      res.status(500).json({
        message: err.message
      })
    })
  }
}