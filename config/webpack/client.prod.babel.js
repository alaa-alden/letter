import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'/* eslint import/no-extraneous-dependencies:0 */
import CopyWebpackPlugin from 'copy-webpack-plugin'
import { defaultConfig, defaultJsRule } from './default.babel'
import pkg, { version } from '../../package.json'

defaultConfig.module.rules.push(defaultJsRule)

defaultConfig.module.rules.push({
  test: /\.(css|scss)$/,
  loader: ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: [
      {
        loader: 'css-loader',
        options: {
          modules: true,
          sourceMap: true,
          importLoaders: 1,
          localIdentName: pkg.config.cssClassPattern
        }
      },
      'postcss-loader'
    ]
  })
})

defaultConfig.module.rules.push({
  test: /\.(jpg|png|svg)$/,
  use: [
    'url-loader?limit=5000'
  ]
})
defaultConfig.module.rules.push({
  test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
  loader: 'file-loader'
})

defaultConfig.plugins.push(
  new webpack.DefinePlugin({
    // We need to specify the production environment so that React builds in production mode
    'process.env': {
      NODE_ENV: JSON.stringify('production')
    }
  }),
  new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false,
    options: {
      // we need to specify the context so that CSS Modules hashing works correctly when minified
      // see https://github.com/css-modules/css-modules-require-hook/issues/81
      context: defaultConfig.context,
      eslint: {
        configFile: '.eslintrc',
        failOnWarning: false,
        failOnError: false
      }
    }
  }),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
      screw_ie8: true,
      conditionals: true,
      unused: true,
      comparisons: true,
      sequences: true,
      dead_code: true,
      evaluate: true,
      if_return: true,
      join_vars: true,
    },
    output: {
      comments: false
    },
    sourceMap: true
  })
)
defaultConfig.plugins.push(
  new ExtractTextPlugin({ filename: `[name].${version}.bundle.css`, allChunks: true, ignoreOrder: true }),
  new CopyWebpackPlugin(
    [{ from: '../src/assets/favicons/', to: '../../build/client/favicons' }]
  )
)
defaultConfig.target = 'web'
defaultConfig.devtool = 'source-map'

export default defaultConfig

