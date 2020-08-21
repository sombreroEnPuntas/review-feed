import { renderHook, act } from '@testing-library/react-hooks'

import testedHook from './useGetReviews'

// Utils
import TestProvider from '../../utils/TestProvider'
import {
  MockService,
  MockData,
  reviewMock,
  themeListMock,
} from '../../utils/mocks'

// Deps
import { DefaultApi } from '../../client/api'
import { getToken, setToken } from '../../data/login'
import { useDispatch, useSelector } from 'react-redux'

// Mocks
jest.mock('../../client/api')

// Mock data
const setMock = ({ data, error }: { data?: MockData; error?: any }) =>
  (DefaultApi as jest.Mock).mockImplementation(
    () => new MockService(data, error)
  )

const stageTest = ({ data, error }: { data?: MockData; error?: any }) => {
  setMock({ data, error })

  return renderHook(
    () => ({
      ...testedHook(),
      dispatch: useDispatch(),
      token: useSelector(getToken),
    }),
    {
      wrapper: TestProvider,
    }
  )
}

describe('useGetReviews', () => {
  afterEach(() => {
    // much force-casting, such type-safe, so dark side
    ;(DefaultApi as jest.Mock).mockClear()
  })
  afterAll(() => {
    jest.resetAllMocks() // clean .mock
  })

  it(`exits when no login token found`, async () => {
    const { result } = stageTest({})

    expect(result.current.error).toBeFalsy()
    expect(result.current.loading).toBe(false)
    expect(result.current.reviews).toBeFalsy()
    expect(result.current.themeList).toBeFalsy()
  })

  it(`sets initial data when token found`, async () => {
    const reviews = [reviewMock]
    const themes = themeListMock
    const testData = {
      data: {
        login: { code: 200, token: '🦕', expire: '5' },
        reviews,
        themes,
      },
    }
    const { result } = stageTest(testData)

    await act(async () => {
      await result.current.dispatch(setToken('Sally', 'Rawr!'))
    })

    expect(result.current.error).toBeFalsy()
    expect(result.current.loading).toBe(false)
    expect(result.current.reviews).toStrictEqual([reviewMock])
    expect(result.current.themeList).toStrictEqual(themes)

    await act(async () => {
      await result.current.getReviews()
    })

    expect(result.current.error).toBeFalsy()
    expect(result.current.loading).toBe(false)
    expect(result.current.reviews).toStrictEqual([reviewMock, reviewMock])
    expect(result.current.themeList).toStrictEqual(themes)
  })

  it(`sets a human friendly generic error`, async () => {
    const testData = {
      data: {
        login: { code: 200, token: '🦕', expire: '5' },
      },
      error: 'internal',
    }
    const { result } = stageTest(testData)

    await act(async () => {
      await result.current.getReviews()
    })

    expect(result.current.error).toBe(`Wut?. SyntaxError or NetworkError`)
    expect(result.current.loading).toBe(false)
  })

  it(`sets a human friendly server error`, async () => {
    const testData = {
      data: {
        login: { code: 200, token: '🦕', expire: '5' },
      },
      error: 'API',
    }
    const { result } = stageTest(testData)

    await act(async () => {
      await result.current.getReviews()
    })

    expect(result.current.error).toBe(
      `418: The resulting entity body MAY be short and stout.`
    )
    expect(result.current.loading).toBe(false)
  })

  it(`clears an expired token`, async () => {
    const reviews = [reviewMock]
    const themes = themeListMock
    const testData = {
      data: {
        login: { code: 200, token: '🦕', expire: '5' },
        reviews,
        themes,
      },
      error: 'EXPIRED_TOKEN',
    }
    const { result } = stageTest(testData)
    expect(result.current.token).toBe('🦕')

    await act(async () => {
      await result.current.getReviews()
    })

    expect(result.current.error).toBe(`401: You shall not pass!`)
    expect(result.current.loading).toBe(false)
    expect(result.current.token).toBe(undefined)
  })
})
