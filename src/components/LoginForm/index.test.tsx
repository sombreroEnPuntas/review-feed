import { render, fireEvent } from '@testing-library/react'
import React from 'react'
import { ThemeWrapper } from 'retro-ui'

import TestedComponent from '.'

// Deps
import useLogin from '../../utils/useLogin'

// Mocks
jest.mock('../../utils/useLogin')

// Mock data
const setUseLoginMock = ({
  error,
  loading,
  login = jest.fn(),
  logout = jest.fn(),
  token,
}) =>
  (useLogin as jest.Mock).mockImplementation(() => ({
    error,
    loading,
    login,
    logout,
    token,
  }))

describe('LoginForm', () => {
  afterEach(() => {
    // much force-casting, such type-safe, so dark side
    ;(useLogin as jest.Mock).mockClear()
  })
  afterAll(() => {
    jest.resetAllMocks() // clean .mock
  })

  it(`renders a loading view`, async () => {
    const testData = {
      error: null,
      loading: true,
      token: undefined,
    }
    setUseLoginMock(testData)

    const { container, getByText } = render(
      <ThemeWrapper>
        <TestedComponent />
      </ThemeWrapper>
    )
    const loadingText = getByText(/Loading/)

    expect(loadingText).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })

  it(`renders a logged-in view`, async () => {
    const testData = {
      error: null,
      loading: false,
      token: '🦕',
    }
    setUseLoginMock(testData)

    const { container, getByText } = render(
      <ThemeWrapper>
        <TestedComponent />
      </ThemeWrapper>
    )
    const logoutButton = getByText(/Logout/)

    expect(logoutButton).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })

  it(`renders a login form`, async () => {
    const testData = {
      error: null,
      loading: false,
      token: undefined,
    }
    setUseLoginMock(testData)

    const { container, getByText } = render(
      <ThemeWrapper>
        <TestedComponent />
      </ThemeWrapper>
    )
    const loginButton = getByText(/Login/)

    expect(loginButton).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })

  it(`renders a login form with error`, async () => {
    const testData = {
      error: `418: The resulting entity body MAY be short and stout.`,
      loading: false,
      token: undefined,
    }
    setUseLoginMock(testData)

    const { container, getByText } = render(
      <ThemeWrapper>
        <TestedComponent />
      </ThemeWrapper>
    )
    const loginButton = getByText(/Login/)

    expect(loginButton).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })

  it(`reacts to login cta`, async () => {
    const login = jest.fn()
    const testData = {
      error: null,
      loading: false,
      login,
      token: undefined,
    }
    setUseLoginMock(testData)

    const { getByText, getByLabelText } = render(
      <ThemeWrapper>
        <TestedComponent />
      </ThemeWrapper>
    )
    const loginButton = getByText(/Login/)
    const usernameInput = getByLabelText(/username/)
    const passwordInput = getByLabelText(/password/)

    fireEvent.change(usernameInput, { target: { value: 'Sally' } })
    fireEvent.change(passwordInput, { target: { value: 'Rawr!' } })
    fireEvent.click(loginButton)

    expect(login).toBeCalledWith('Sally', 'Rawr!')
  })

  it(`reacts to logout cta`, async () => {
    const logout = jest.fn()
    const testData = {
      error: null,
      loading: false,
      logout,
      token: '🦕',
    }
    setUseLoginMock(testData)

    const { getByText } = render(
      <ThemeWrapper>
        <TestedComponent />
      </ThemeWrapper>
    )
    const logoutButton = getByText(/Logout/)

    fireEvent.click(logoutButton)

    expect(logout).toBeCalledWith()
  })
})
