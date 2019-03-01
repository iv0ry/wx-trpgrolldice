import { combineReducers } from 'redux'
import counter from './counter'
import sheet from './sheet'

export default combineReducers({
  counter,
  sheet
})
