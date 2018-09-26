const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    min: [6, 'Password min 6 characters']
  },
  loginType: {
    type: String,
    required: [true, 'Login Type is required']
  },
  active: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
})

const User = mongoose.model('User', userSchema)
module.exports = User