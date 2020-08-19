import { combineReducers, Action } from 'redux'
import { configureStore, ThunkAction } from '@reduxjs/toolkit'

import loginReducer from './login'

const reducer = combineReducers({
  login: loginReducer,
})

const store = configureStore({
  reducer,
})

export type Store = ReturnType<typeof reducer>
export type Thunk = ThunkAction<void, Store, null, Action<string>>
export default store
