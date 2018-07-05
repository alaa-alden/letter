import webpack from 'webpack'
//import CopyWebpackPlugin from 'copy-webpack-plugin'
import { defaultConfig, defaultJsRule, defaultCssRule, defaultImageRule } from './default.babel'

const devConfig = defaultConfig
// javascript file
defaultJsRule.query.plugins = ['react-hot-loader/babel']
devConfig.module.rules.push(defaultJsRule)
// css file
devConfig.module.rules.push(defaultCssRule)
// image
devConfig.module.rules.push(defaultImageRule)

devConfig.entry.app = [
  'react-hot-loader/patch', // needs to be first entry when entry obj is converted to an array
  'webpack-dev-server/client?http://localhost:9000',
  './client/index.live.js'
]

devConfig.devServer = {
  port: 9000,
  // config for update
  hotOnly: true,
  headers: { 'Access-Control-Allow-Origin': '*' }
  // end
}
devConfig.output.publicPath = 'http://localhost:9000/'
devConfig.plugins.push(
// update page without refreach
  new webpack.HotModuleReplacementPlugin(),
  // copy this file to
  new webpack.NoEmitOnErrorsPlugin() // do not emit compiled assets that include errors
 //,new CopyWebpackPlugin([{ from: '../src/assets/favicons/', to: '../../build/client/favicons' }]),

)
devConfig.target = 'web'
devConfig.devtool = 'cheap-module-eval-source-map'
export default devConfig

