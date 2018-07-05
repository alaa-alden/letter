import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { Provider } from 'react-redux'
import Helmet from 'react-helmet'

// thing in there
import createStore from '../../../../shared/store'
import { App } from '../../../../shared/components'
import template from '../template'


function reactRouteHandler(req, res) {
  // for redux
  const store = createStore
  const context = {}
  const reactApp = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={context}>
        <App />
      </StaticRouter>
    </Provider>
  )
  const state = store.getState()
  const helmet = Helmet.rewind()
  res.send(template(helmet, reactApp, state))
}


export default reactRouteHandler
