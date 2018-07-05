import winston from 'winston'

/**
 * Create a Logger
 * @param {String} applicationName - unique name for application
 * @param {String} environmentName - unique name for environment (e.g. staging)
 */
function createLogger() {
  const logger = new winston.Logger()
  logger.add(winston.transports.Console)

  process.argv.forEach((val) => {
    if (val === 'log-verbose') logger.transports.console.level = 'verbose'
  })

  logger.handleExceptions()

  return logger
}

export default createLogger
