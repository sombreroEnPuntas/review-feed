import { renderHook, act } from '@testing-library/react-hooks'

import testedHook from './useLogin'

// Deps
import { DefaultApi, ModelJWTResponse } from '../client/api'
import { MockService, MockData } from './mocks'

// Mocks
jest.mock('../client/api')

// Mock data
const setDefaultApiMock = (data?: MockData, error?: 'internal' | 'API') =>
  (DefaultApi as jest.Mock).mockImplementation(
    () => new MockService(data, error)
  )

describe('useLogin', () => {
  afterEach(() => {
    // much force-casting, such type-safe, so dark side
    ;(DefaultApi as jest.Mock).mockClear()
  })
  afterAll(() => {
    jest.resetAllMocks() // clean .mock
  })

  it(`sets/clears a login token`, async () => {
    const testData: ModelJWTResponse = { code: 200, token: '🦕', expire: '5' }
    setDefaultApiMock({ login: testData })

    const { result } = renderHook(() => testedHook())

    await act(async () => {
      await result.current.login('Sally', 'Rawr!')
    })

    expect(result.current.error).toBe(null)
    expect(result.current.token).toBe(testData.token)

    act(() => {
      result.current.logout()
    })

    expect(result.current.error).toBe(null)
    expect(result.current.token).toBe(undefined)
  })

  it(`sets/clears a human friendly generic error`, async () => {
    setDefaultApiMock(undefined, 'internal')

    const { result } = renderHook(() => testedHook())

    await act(async () => {
      await result.current.login('Sally', 'Rawr!')
    })

    expect(result.current.error).toBe(`Wut?. SyntaxError or NetworkError`)
    expect(result.current.token).toBe(undefined)

    act(() => {
      result.current.logout()
    })

    expect(result.current.error).toBe(null)
    expect(result.current.token).toBe(undefined)
  })

  it(`sets/clears a human friendly server error`, async () => {
    setDefaultApiMock(undefined, 'API')

    const { result } = renderHook(() => testedHook())

    await act(async () => {
      await result.current.login('Sally', 'Rawr!')
    })

    expect(result.current.error).toBe(
      `418: The resulting entity body MAY be short and stout.`
    )
    expect(result.current.token).toBe(undefined)

    act(() => {
      result.current.logout()
    })

    expect(result.current.error).toBe(null)
    expect(result.current.token).toBe(undefined)
  })
})
