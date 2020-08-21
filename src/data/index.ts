import { combineReducers, Action } from 'redux'
import { configureStore, ThunkAction } from '@reduxjs/toolkit'

import filters from './filters'
import login from './login'
import themes from './themes'

const reducer = combineReducers({
  filters,
  login,
  themes,
})

const store = configureStore({
  reducer,
})

export type Store = ReturnType<typeof reducer>
export type Thunk = ThunkAction<void, Store, null, Action<string>>
export default store
