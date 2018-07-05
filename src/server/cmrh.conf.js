// This configuration file is required by css-modules-require-hook to ensure the
// CSS classes that are written to the DOM server side are the same as those
// written to the CSS file and used by the client side JS.

import path from 'path'
import sass from 'node-sass'
import pkg from '../../package.json'

module.exports = {
  // Same scope name as in webpack build
  // uses https://github.com/webpack/loader-utils#interpolatename
  generateScopedName: pkg.config.cssClassPattern,
  // src if dev, build if local
  rootDir: path.join(__dirname, '..'),
  extensions: ['.sass', '.scss', '.css'],
  // for understand file.scss and .sass
  preprocessCss: (data, filename) =>
      sass.renderSync({
        data,
        file: filename
      }).css,
}
