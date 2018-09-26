const User = require('../models/User')
const jwt = require('jsonwebtoken')
const crypt = require('../helpers/crypt')

module.exports = (req, res, next) => {
  let token = req.headers.token

  jwt.verify(token, process.env.JWT_SECRET_KEY, function (err, decoded) {
    if (err) {
      res.status(401).json({
        message: 'not authorized'
      })
    } else {
      User.findOne({ _id: decoded._id, email: decoded.email })
      .then(user => {
        if (!user) {
          res.status(401).json({
            message: 'not authorized'
          })
        } else {
          req.decoded = decoded
          next()
        }
      })
      .catch(err => {
        res.status(500).json({
          message: err
        })
      })
    }
  })
}