import { combineReducers } from '@reduxjs/toolkit'
import auth from './auth'
import tournaments from './tournaments'

export default combineReducers({
    auth,
    tournaments,
})
