import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { keys } from '../secret'

passport.serializeUser((user, done) => {
    done(null, user.id)
})
passport.deserializeUser((user, done) => {
    done(null, user)
})

// google
passport.use(
    new GoogleStrategy({
        // options for google strategy
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
        callbackURL: '/'
    }, (accessToken, refreshToken, profile, done) => {
        // check if user already exists in our own db
    })
)