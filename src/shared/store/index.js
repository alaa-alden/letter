import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import rootReducer from '../reducers'

const store = createStore(
  rootReducer,
  {},
  typeof window !== 'undefined' && window.devToolsExtension ? window.devToolsExtension() : f => f,
  applyMiddleware(
    thunk
  )
)
export default store
