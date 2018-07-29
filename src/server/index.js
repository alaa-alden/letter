import express from 'express'
import fs from 'fs'
import https from 'https'
// import path from 'path'
// The require hook compiles CSS Modules in runtime. This is similar to Babel's babel/register.
import 'css-modules-require-hook/preset'
import logger from './logger'
import config from './config/global'
import initMiddleware from './middleware'
import initRoutes from './router'

const app = express()

function initApp() {
  logger.info('Initialising application:')
  logger.info('Initialising middleware...')
  initMiddleware(app)
}

try {
  initApp()
  logger.info('Initialising routes...')
  initRoutes(app)
  logger.info('Application initialised!')
  // logger.info(`Listening on port ${process.env.PORT || config.internalPort}`)
  // app.listen(process.env.PORT || config.internalPort)
  https.createServer({
      key: fs.readFileSync('server.key'),
      cert: fs.readFileSync('server.cert')
    },
    app).listen(process.env.PORT || config.internalPort, () => {
    logger.info(`Listening on port ${process.env.PORT || config.internalPort}`)

  })
} catch (e) {
  logger.error(e)
}

export default app
