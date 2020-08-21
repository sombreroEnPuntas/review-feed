import { renderHook, act } from '@testing-library/react-hooks'

import testedHook from './useLogin'

// Utils
import TestProvider from '../../utils/TestProvider'

// Deps
import { DefaultApi } from '../../client/api'
import { MockService, MockData } from '../../utils/mocks'

// Mocks
jest.mock('../../client/api')

// Mock data
const setMock = ({ data, error }) =>
  (DefaultApi as jest.Mock).mockImplementation(
    () => new MockService(data, error)
  )

const stageTest = ({ data, error }: { data?: MockData; error?: string }) => {
  setMock({ data, error })

  return renderHook(() => testedHook(), {
    wrapper: TestProvider,
  })
}

describe('useLogin', () => {
  afterEach(() => {
    // much force-casting, such type-safe, so dark side
    ;(DefaultApi as jest.Mock).mockClear()
  })
  afterAll(() => {
    jest.resetAllMocks() // clean .mock
  })

  it(`sets/clears a login token`, async () => {
    const testData = {
      data: { login: { code: 200, token: '🦕', expire: '5' } },
    }
    const { result } = stageTest(testData)

    await act(async () => {
      await result.current.login('Sally', 'Rawr!')
    })

    expect(result.current.error).toBe(null)
    expect(result.current.token).toBe(testData.data.login.token)

    act(() => {
      result.current.logout()
    })

    expect(result.current.error).toBe(null)
    expect(result.current.token).toBe(undefined)
  })

  it(`sets/clears a human friendly generic error`, async () => {
    const testData = {
      error: 'internal',
    }
    const { result } = stageTest(testData)

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
    const testData = {
      error: 'API',
    }
    const { result } = stageTest(testData)

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
