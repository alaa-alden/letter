import passport from 'passport'
import {
  Strategy as GoogleTokenStrategy
} from 'passport-google-token'
import FacebookTokenStrategy from 'passport-facebook-token'
import {
  Strategy as LocalStrategy
} from 'passport-local'
import bcrypt from 'bcrypt-nodejs'
import {
  keys
} from '../secret'
import {
  UserModel as User
} from '../data/model'

passport.use(new GoogleTokenStrategy({
  clientID: keys.google.clientID,
  clientSecret: keys.google.clientSecret
}, (accessToken, refreshToken, profile, done) => {
  // check if user already exists in our own db
  // console.log(profile)
  User.findOne({
    email: profile.emails[0].value
  }).then((currentUser) => {
    if (currentUser) {
      // if you find email update provider
      currentUser.googleProvider = {
        id: profile.id,
        token: accessToken
      }
      currentUser.thumbnail = profile._json.picture
      currentUser.save()
      // already have this user
      // console.log('user is: ', currentUser)
      done(null, currentUser)
    } else {
      // console.log(profile)
      // if not, create user in our db
      new User({
        displayName: profile.displayName,
        email: profile.emails[0].value,
        thumbnail: profile._json.picture,
        googleProvider: {
          id: profile.id,
          token: accessToken
        }
      }).save().then((newUser) => {
        // console.log('created new user: ', newUser)
        done(null, newUser)
      })
    }
  })
}))
// for facebook
passport.use(new FacebookTokenStrategy({
  clientID: keys.facebook.clientID,
  clientSecret: keys.facebook.clientSecret
}, (accessToken, refreshToken, profile, done) => {
  // check if user already exists in our own db
  // console.log(profile)
  User.findOne({
    email: profile.emails[0].value
  }).then((currentUser) => {
    if (currentUser) {
      // already have this user
      // update document ,insert
      currentUser.facebookProvider = {
        id: profile.id,
        token: accessToken
      }
      currentUser.thumbnail = profile.photos[0].value
      currentUser.save()
      done(null, currentUser)
    } else {
      // if not, create user in our db
      new User({
        displayName: profile.displayName,
        email: profile.emails[0].value,
        thumbnail: profile.photos[0].value,
        facebookProvider: {
          id: profile.id,
          token: accessToken
        }
      }).save().then((newUser) => {
        // console.log('created new user: ', newUser)
        done(null, newUser)
      })
    }
  })
}))


// // local auth
// passport.use(new LocalStrategy({
//     usernameField: 'email',
//     passwordField: 'password'
//   },
//   function (email, password, done) {
//   // this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
//     User.findOne({
//       email
//     })
//       .then(currentUser => {
//         // not find user
//           if(currentUser){
//           // email find in DB
//           bcrypt.compare(password, currentUser.password, function (err, isMatch) {
//             if (err) {
//               return cb(err)
//             }
//             cb(null, isMatch)
//           })
//           if(currentUser.password === password)
//             done(null, currentUser)
//         }
//       }
//       })
//   }
// ))
