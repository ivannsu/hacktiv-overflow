const User = require('../models/User')
const jwt = require('jsonwebtoken')
const crypt = require('../helpers/crypt')
const axios = require('axios')

module.exports = {
  fbSignin (req, res) {
    let fbtoken = req.headers.fbtoken

    axios({
      method: 'get',
      url: `https://graph.facebook.com/me?fields=id,name,email&access_token=${fbtoken}`
    })
    .then(response => {
      // DATA FACEBOOK 
      let fbName = response.data.name
      let fbEmail = response.data.email
      let input = {
        name: fbName, email: fbEmail, 
        password: crypt('1234566'), loginType: 'facebook'
      }

      User.findOne({email: fbEmail})
      .then(user => {

        if(!user) {
          User.create(input)
          .then(newUser => {
            jwt.sign({
              _id: newUser._id,
              name: newUser.name,
              email: newUser.email
            }, process.env.JWT_SECRET_KEY, function(err, token) {
              if(err) {
                res.status(500).json({
                  message: 'Error generate token',
                  error: err
                })
              } else {
  
                res.status(200).json({
                  message: 'Success generate token',
                  userId: newUser._id,
                  token: token
                })
              }
            });
          })
          .catch(err => {
            res.status(500).json({
              message: 'Error create new user',
              error: err
            })
          })
        } else {
          jwt.sign({
            _id: user._id,
            name: user.name,
            email: user.email 
          }, process.env.JWT_SECRET_KEY, function(err, token) {
            if(err) {
              res.status(500).json({
                message: 'Error generate token',
                error: err
              })
            } else {

              res.status(200).json({
                message: 'Success generate token',
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
    })
    .catch(err => {
      res.status(500).json({
        message: err.message
      })
    })
  },

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