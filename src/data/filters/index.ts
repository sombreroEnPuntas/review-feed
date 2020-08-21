import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Store } from '..'

interface FiltersState {
  themes: number[]
}

const initialState: FiltersState = {
  themes: [],
}

const { actions, reducer } = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setThemeFilters(state, action: PayloadAction<number[]>) {
      state.themes = action.payload
    },
  },
})

export const { setThemeFilters } = actions

export const getThemeFilters = (state: Store) => state.filters.themes

export default reducer
