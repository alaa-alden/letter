import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import passport from 'passport'

// import passport config for working :
import '../config/passport'

const initMiddleware = (app) => {
  // for read data from page
  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }))
  // parse application/json
  app.use(bodyParser.json())
  // end config read
  app.use('', express.static(path.join(__dirname, '../../../bower_components')))
  app.use('/client', express.static(path.join(__dirname, '../../../build/client')))

  // initialization passport
  app.use(passport.initialize())
  app.use(passport.session())
}
export default initMiddleware
