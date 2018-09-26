const router = require('express').Router()
const { findAll, signin, signup, fbSignin, confirm } = require('../controllers/user')

router.get('/confirm/:id', confirm)
router.get('/', findAll)
router.post('/signin', signin)
router.post('/signup', signup)
router.post('/fbSignin', fbSignin)

module.exports = router