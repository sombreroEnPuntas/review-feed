import { renderHook, act } from '@testing-library/react-hooks'

import testedHook from './useFilters'

// Utils
import TestProvider from '../../utils/TestProvider'

const stageTest = () => {
  return renderHook(() => testedHook(), {
    wrapper: TestProvider,
  })
}

describe('useFilters', () => {
  it(`sets filters`, async () => {
    const { result } = stageTest()

    await act(async () => {
      await result.current.filter([1000, 1001, 1002])
    })

    expect(result.current.themeFilters).toStrictEqual([1000, 1001, 1002])
  })

  it(`resets filters`, async () => {
    const { result } = stageTest()

    await act(async () => {
      await result.current.filter([1000, 1001, 1002])
    })

    expect(result.current.themeFilters).toStrictEqual([1000, 1001, 1002])

    await act(async () => {
      await result.current.reset()
    })

    expect(result.current.themeFilters).toStrictEqual([])
  })
})
