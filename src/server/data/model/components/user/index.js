import mongoose from 'mongoose'
import bcrypt from 'bcrypt-nodejs'

const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  },
  thumbnail: {
    type: String,
    required: true,
    default: 'https://www.logolynx.com/images/logolynx/e5/e5ba79334133d2cb362dd639f755a392.png'
  },
  displayName: {
    type: String,
    required: true
  },
  password: {
    type: String
  },
  rating: {
    type: Number,
    required: true,
    default: 0
  },
  facebookProvider: {
    type: {
      id: String,
      token: String
    },
    select: false
  },
  googleProvider: {
    type: {
      id: String,
      token: String
    },
    select: false
  }
})
userSchema.set('toJSON', {
  getters: true,
  virtuals: true
})
// hash the password
userSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

// checking if password is valid
userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}
const User = mongoose.model('user', userSchema)

export default User
