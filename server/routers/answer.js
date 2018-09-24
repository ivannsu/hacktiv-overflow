const router = require('express').Router()
const { create, update } = require('../controllers/answer')
const isLogin = require('../middlewares/isLogin')

router.post('/create/:questionId', isLogin, create)
router.put('/update/:id', isLogin, update)

module.exports = router