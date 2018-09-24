const router = require('express').Router()
const { signin, signup, fbSignin } = require('../controllers/user')

router.post('/signin', signin)
router.post('/signup', signup)
router.post('/fbSignin', fbSignin)

module.exports = router