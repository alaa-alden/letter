import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
// import passport from 'passport'
// import cookieSession from 'cookie-session'
// import passport config for working :
import '../config/passport-setup'
// import {
//   keys
// } from '../secret'
import connect from '../data/connect'


const initMiddleware = (app) => {
  // for read data from page
  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({
    extended: false
  }))
  // parse application/json
  app.use(bodyParser.json())
  // end config read
  app.use('', express.static(path.join(__dirname, '../../../bower_components')))
  app.use('/client', express.static(path.join(__dirname, '../../../build/client')))
  // connect with database
  connect()
  // initialization passport
  // app.use(passport.initialize())
  // app.use(passport.session())
  // set up session cookies
  // app.use(cookieSession({
  //   maxAge: 24 * 60 * 60 * 1000,
  //   keys: [keys.session.cookieKey]
  // }))
}
export default initMiddleware
