import { render, fireEvent } from '@testing-library/react'
import React from 'react'
import { ThemeWrapper } from 'retro-ui'

import TestedComponent from '.'

// Deps
import useLogin from '../../utils/useLogin'

// Mocks
jest.mock('../../utils/useLogin')

// Mock data
const setMock = ({ error, login, logout, token }) =>
  (useLogin as jest.Mock).mockImplementation(() => ({
    error,
    login,
    logout,
    token,
  }))

const stageTest = ({ error, login = jest.fn(), logout = jest.fn(), token }) => {
  setMock({ error, login, logout, token })

  return render(
    <ThemeWrapper>
      <TestedComponent />
    </ThemeWrapper>
  )
}

describe('LoginForm', () => {
  afterEach(() => {
    // much force-casting, such type-safe, so dark side
    ;(useLogin as jest.Mock).mockClear()
  })
  afterAll(() => {
    jest.resetAllMocks() // clean .mock
  })

  it(`renders a logged-in view`, async () => {
    const testData = {
      error: null,
      token: '🦕',
    }
    const { container, getByText } = stageTest(testData)

    const logoutButton = getByText(/Logout/)

    expect(logoutButton).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })

  it(`renders a login form`, async () => {
    const testData = {
      error: null,
      token: undefined,
    }
    const { container, getByText } = stageTest(testData)

    const loginButton = getByText(/Login/)

    expect(loginButton).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })

  it(`renders a login form with error`, async () => {
    const testData = {
      error: `418: The resulting entity body MAY be short and stout.`,
      token: undefined,
    }
    const { container, getByText } = stageTest(testData)

    const loginButton = getByText(/Login/)

    expect(loginButton).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })

  it(`reacts to login cta`, async () => {
    const login = jest.fn()
    const testData = {
      error: null,
      login,
      token: undefined,
    }
    const { getByText, getByLabelText } = stageTest(testData)

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
      logout,
      token: '🦕',
    }
    const { getByText } = stageTest(testData)

    const logoutButton = getByText(/Logout/)

    fireEvent.click(logoutButton)

    expect(logout).toBeCalledWith()
  })
})
