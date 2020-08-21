import { useDispatch, useSelector } from 'react-redux'

import { ModelTheme } from '../client/api'
import { getThemeFilters, setThemeFilters } from '../data/filters'
import { getThemes } from '../data/themes'

const useFilters = () => {
  const themes: ModelTheme[] = useSelector(getThemes)
  const themeFilters: number[] = useSelector(getThemeFilters)

  const dispatch = useDispatch()

  const filter = (selection: number[]) => dispatch(setThemeFilters(selection))
  const reset = () => dispatch(setThemeFilters([]))

  return { filter, reset, themes, themeFilters }
}

export default useFilters
