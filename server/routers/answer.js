const router = require('express').Router()
const { create, update, findByQuestion } = require('../controllers/answer')
const isLogin = require('../middlewares/isLogin')

router.get('/question/:questionId', findByQuestion)
router.post('/create/:questionId', isLogin, create)
router.put('/update/:id', isLogin, update)

module.exports = router