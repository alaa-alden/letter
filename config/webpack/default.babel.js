import path from 'path'
// import CopyWebpackPlugin from 'copy-webpack-plugin'
import pkg, { version } from '../../package.json'

const sourcePath = path.join(__dirname, '../../src')
const staticsPath = path.join(__dirname, '../../build/client')
const defaultConfig = {
  context: sourcePath,
  entry: {
    app: './client/index.js',
    polyfills: './client/polyfills.js'
  },
  output: {
    path: staticsPath,
    filename: `[name].${version}.bundle.js`,
    libraryTarget: 'umd',
    publicPath: '/client/'
  },
  module: {
    rules: []
  },
  plugins: [

  ]
}

const defaultJsRule = {
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  loader: 'babel-loader',
  query: {
    presets: [
      // we need to disabe modules in order to get tree shaking to work
      ['env', { modules: false }],
      'stage-1',
      'react'
    ]
  }
}
const defaultCssRule = {
  test: /\.(css|scss|sass)$/,
  use: [
    'style-loader',
    {
      loader: 'css-loader',
      options: {
        modules: true,
        importLoaders: 1,
        localIdentName: pkg.config.cssClassPattern
      }
    },
    'postcss-loader'
  ]
}
const defaultImageRule = {
  test: /\.(png|jpg|svg)$/,
  use: [
    'file-loader'
  ]
}
export { defaultConfig, defaultJsRule, defaultCssRule, defaultImageRule }

