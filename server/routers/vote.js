const router = require('express').Router()
const { 
  questionVote, answerVote,
  countQuestionVotes, countAnswerVotes
} = require('../controllers/vote')
const isLogin = require('../middlewares/isLogin')

router.get('/question/:id/count', countQuestionVotes)
router.get('/answer/:id/count', countAnswerVotes)
router.post('/question/:id/:type', isLogin, questionVote)
router.post('/answer/:id/:type', isLogin, answerVote)

module.exports = router