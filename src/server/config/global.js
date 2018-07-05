// that for get global config
/* eslint no-console: "off" */
// We load config at application start so don't try to access the logging system
// instead we are using console.log
import path from 'path'

const appRoot = process.cwd()

const environmentVariablePrepend = 'SiteConfig_'

function loadConfig(configPath, logError = true) {
  try {
    return require.main.require(path.join(appRoot, configPath))
  } catch (e) {
    if (logError) {
      console.log('Config error')
      console.log(e)
    }
    return {}
  }
}

/**
 * :
 * When launching the express app:
 * 1. get default configuration from /config/config.default.json
 *    (config.default.json is checked in to git and shouldn't contain any sensitive info)
 * 2. override these settings with anything set in env specific /config/config.json
 *    (config.json is not checked in to git and is automatically created on first postinstall)
 * 3. override these settings with any local environment variables
 */
function getConfig() {
  const defaultConfig = loadConfig('./config/config.default.json')

  console.log('defaultConfig:')
  console.log(defaultConfig)

  const envConfig = {}
  Object.keys(defaultConfig).forEach((key) => {
    const value = process.env[`${environmentVariablePrepend}${key}`]
    if (value !== undefined) {
      const originalValue = defaultConfig[key]
      console.log(`${key} was found as an env variable (${value})`)
      if (typeof (originalValue) === 'boolean') {
        envConfig[key] = value.toLowerCase() === 'true'
      } else if (typeof (originalValue) === 'number') {
        envConfig[key] = Number(value)
      } else {
                // It is a string
        envConfig[key] = value
      }
    }
  })

    // This is needed to debug any config issues on the server
    // We can't use our logger util as the logger is dependent on config
  console.log('Initialising config')
  console.log('defaultConfig:')
  console.log(defaultConfig)
  console.log('envConfig:')
  console.log(envConfig)
  const mergedConfig = Object.assign(defaultConfig, envConfig)
  console.log('mergedConfig:')
  console.log(mergedConfig)

  return mergedConfig
}

// call the config straight away at runtime
export default getConfig()
