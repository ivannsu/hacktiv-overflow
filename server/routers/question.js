const router = require('express').Router()
const { create, update, remove, findAll } = require('../controllers/question')
const isLogin = require('../middlewares/isLogin')

router.post('/create', isLogin, create)

module.exports = router