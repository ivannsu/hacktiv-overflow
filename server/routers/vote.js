const router = require('express').Router()
const { questionUpVote, questionDownVote, answerUpVote, answerDownVote } = require('../controllers/vote')
const isLogin = require('../middlewares/isLogin')

router.post('/question/:id/upvote', isLogin, questionUpVote)
router.post('/question/:id/downvote', isLogin, questionDownVote)
router.post('/answer/:id/upvote', isLogin, answerUpVote)
router.post('/answer/:id/downvote', isLogin, answerDownVote)

module.exports = router