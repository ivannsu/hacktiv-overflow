const router = require('express').Router()
const { create, update, remove, findAll } = require('../controllers/question')
const isLogin = require('../middlewares/isLogin')

router.post('/create', isLogin, create)
router.put('/update/:id', isLogin, update)

module.exports = router