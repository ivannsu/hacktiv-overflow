const User = require('../models/User')
const jwt = require('jsonwebtoken')
const crypt = require('../helpers/crypt')

module.exports = {
  signin (req, res) {
    let input = {
      email: req.body.email,
      password: crypt(req.body.password)
    }

    User.findOne({ email: input.email, password: input.password })
    .then(user => {
      if(!user) {
        res.status(500).json({
          message: 'Username or Password wrong'
        })
      } else {
        jwt.sign({
          _id: user._id,
          name: user.name,
          email: user.email
        }, process.env.JWT_SECRET_KEY, function (err, token) {
          if(err) {
            res.status(500).json({
              message: err
            })
          } else {
            res.status(200).json({
              message: 'sign in successfully',
              userId: user._id,
              token: token
            })
          }
        })
      }
    })
    .catch(err => {
      res.status(500).json({
        message: err.message
      })
    })
  },
  signup (req, res) {
    let input = {
      name: req.body.name,
      email: req.body.email,
      password: crypt(req.body.password),
      loginType: 'app'
    }

    User.findOne({ email: input.email })
    .then(user => {
      if (!user) {
        User.create(input)
        .then(newUser => {
          res.status(201).json({
            message: 'sign up successfully',
            user: input
          })
        })
        .catch(err => {
          res.status(500).json({
            message: err.message
          })  
        })
      } else {
        res.status(500).json({
          message: 'Email already registered'
        })  
      }
    })
    .catch(err => {
      res.status(500).json({
        message: err.message
      })
    })
  }
}