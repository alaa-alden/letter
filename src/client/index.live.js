import React from 'react'
import ReactDOM from 'react-dom'
/* eslint import/no-extraneous-dependencies:0 */
import { AppContainer } from 'react-hot-loader'
import ClientApp from './clientapp'

const render = (Component) => {
  ReactDOM.hydrate(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('app')
  )
}

render(ClientApp)

if (module.hot) {
  module.hot.accept()
}
// https://github.com/webpack/webpack-dev-server/issues/100
// http://stackoverflow.com/questions/43491310/cant-get-webpack-2-hmr-react-to-work
// https://github.com/gaearon/react-hot-loader/tree/next/docs#webpack-2
// if (module.hot) {
//   module.hot.accept('./clientapp', () => { render(ClientApp) })
// }
