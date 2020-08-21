import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { ModelTheme } from '../../client/api'

import { Store } from '..'

type ThemesState = ModelTheme[]

const initialState: ThemesState = null

const { actions, reducer } = createSlice({
  name: 'themes',
  initialState,
  reducers: {
    setThemes: (_, action: PayloadAction<ThemesState>) => action.payload,
  },
})

export const { setThemes } = actions

export const getThemes = (state: Store) => state.themes

export default reducer
