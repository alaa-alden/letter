/* global window */
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import configureStore from '../shared/store/'
import { App } from '../shared/components'

const store = configureStore

const ClientApp = () => (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)

export default ClientApp
