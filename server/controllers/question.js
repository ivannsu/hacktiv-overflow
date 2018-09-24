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
            question: question._id
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
    let questionId = req.params.id
    let userId = req.decoded._id

    Question.findOne({ _id: questionId, user: userId })
    .then(question => {
      if (!question) {
        res.status(500).json({
          message: 'no question create by this user'
        })
      } else {
        Question.deleteOne({ _id: questionId })
        .then(affected => {
          res.status(200).json({
            message: 'delete question successfully',
            question: question._id
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

  findAll (req, res) {
    Question.find({})
    .populate('user', '_id name email')
    .populate({
      path: 'answers',
      populate: {
        path: 'user',
        model: 'User',
        select: '_id name email'
      }
    })
    .then(questions => {
      res.status(200).json({
        message: 'get all questions successfully',
        questions
      })
    })
    .catch(err => {
      res.status(500).json({
        message: err.message
      })
    })
  }
}