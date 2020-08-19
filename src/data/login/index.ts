import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Cookies, { CookieSetOptions } from 'universal-cookie'

import { Store, Thunk } from '..'
import { ModelJWTResponse, DefaultApi } from '../../client/api'
import parseAPIError from '../../utils/parseAPIError'

const cookies = new Cookies()
const cookiesOptions: CookieSetOptions = {
  path: '/',
  sameSite: 'strict',
}

interface LoginState {
  error?: string
  loading: boolean
  token?: string
}

const initialState: LoginState = {
  error: null,
  loading: false,
  token: null,
}

const { actions, reducer } = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setTokenFailure(state, action: PayloadAction<string>) {
      state.error = action.payload
      state.loading = false
    },
    setTokenStart(state) {
      state.error = null
      state.loading = true
    },
    setTokenSuccess(state, action: PayloadAction<string>) {
      state.error = null
      state.loading = false
      state.token = action.payload
    },

    clearToken(state) {
      cookies.remove('token', cookiesOptions)

      state.error = null
      state.loading = false
      state.token = undefined
    },
    initialToken(state) {
      state.error = null
      state.loading = false
      state.token = cookies.get('token')
    },
  },
})

export const {
  clearToken,
  initialToken,
  setTokenFailure,
  setTokenStart,
  setTokenSuccess,
} = actions

export const getError = (state: Store) => state.login.error
export const getLoading = (state: Store) => state.login.loading
export const getToken = (state: Store) => state.login.token

export const setToken = (username: string, password: string): Thunk => async (
  dispatch
) => {
  try {
    dispatch(setTokenStart())
    // throwaway un-auth instance 👻
    const response: ModelJWTResponse = await new DefaultApi().loginPost(
      username,
      password
    )

    cookies.set('token', response.token, cookiesOptions)
    dispatch(setTokenSuccess(response.token))
  } catch (e) {
    const message = await parseAPIError(e, dispatch)
    dispatch(setTokenFailure(message))
  }
}

export default reducer
