import {
  combineReducers
} from 'redux'
import reducerGame from './game'
import reducerUser from './user'

export default combineReducers({
  reducerGame,
  reducerUser
})
