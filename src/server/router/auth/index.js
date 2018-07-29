import express from 'express'
import passport from 'passport'
import '../../config/passport-setup'
import {
  generateToken,
  sendToken
} from './util'
// tools for local auth
import {
  UserModel as User
} from '../../data/model'

const router = express.Router()

router.post('/google', passport.authenticate('google-token', {
  session: false
}), (req, res, next) => {
  if (!req.user) {
    res.send(401, 'User Not Authenticated')
  } else {
    req.auth = {
      id: req.user.id
    }
    next()
  }
}, generateToken, sendToken)
router.post('/facebook', passport.authenticate('facebook-token', {
  session: false
}), (req, res, next) => {
  if (!req.user) {
    res.send(401, 'User Not Authenticated')
  } else {
    req.auth = {
      id: req.user.id
    }
    next()
  }
}, generateToken, sendToken)
// for local
// login
router.post('/local/login', (req, res, next) => {
  User.findOne({
    email: req.body.email
  }).then((currentUser) => {
    if (currentUser) {
      // compare password
      if (currentUser.validPassword(req.body.password)) {
        req.user = currentUser
        req.auth = {
          id: req.user.id
        }
        next()
      } else {
        res.status(401).send('you are not register')
      }
    }
  }
)
  .catch((err) => {
    console.log('error')
    res.status(404).send('error')
  })
}, generateToken, sendToken)
// register
// $2a$10$l0C5Qa18d4FKImTIYiypH.TBbiAz9gAAgbnjg5QS0YDCv91Zd4Em2
router.post('/local/register', (req, res, next) => {
  // User.findOne({email:req.body.email})
  /* ToDo */
  User.findOne({ email: req.body.email }).then((currentUser) => {
    if (!currentUser) {
      // console.log(req.body.password)
      const NewUser = new User({
        email: req.body.email,
        displayName: req.body.username,
      })
      NewUser.password = NewUser.generateHash(req.body.password)
      NewUser.save().then((user) => {
        req.user = user
        if (!req.user) {
          res.send(401, 'User Not Authenticated')
        } else {
          req.auth = {
            id: req.user.id
          }
          next()
        }
      })
    } else {
      res.status(401).send('you are register past')
    }
  }).catch((err) => { console.log(err) })
}, generateToken, sendToken)

export default router
