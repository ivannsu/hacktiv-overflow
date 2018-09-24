const router = require('express').Router()
const { create, update, remove, findAll, findById, selectTitle } = require('../controllers/question')
const isLogin = require('../middlewares/isLogin')

router.get('/', findAll)
router.get('/detail/:id', findById)
router.get('/title', selectTitle)
router.post('/create', isLogin, create)
router.put('/update/:id', isLogin, update)
router.delete('/delete/:id', isLogin, remove)

module.exports = router