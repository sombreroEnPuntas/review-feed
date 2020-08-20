import { render } from '@testing-library/react'
import React from 'react'
import { ThemeWrapper } from 'retro-ui'

import TestedComponent, { Props } from '.'

// Deps
import LoginForm from '../LoginForm'
import { AccentCTA } from '.'

// Mocks
jest.mock('../LoginForm')

// Mock data
const setMock = () =>
  (LoginForm as jest.Mock).mockImplementation(() => (
    <AccentCTA>{'Logout'}</AccentCTA>
  ))

const getProps = (customProps) => ({
  message: ':v',
  ...customProps,
})

const stageTest = (customProps?: Props) => {
  setMock()

  return render(
    <ThemeWrapper>
      <TestedComponent {...getProps(customProps)} />
    </ThemeWrapper>
  )
}

describe('Pager', () => {
  afterEach(() => {
    // much force-casting, such type-safe, so dark side
    ;(LoginForm as jest.Mock).mockClear()
  })
  afterAll(() => {
    jest.resetAllMocks() // clean .mock
  })

  it(`renders a Pager with a message`, async () => {
    const { container, getByText } = stageTest()

    const appMessage = getByText(/:v/)

    expect(appMessage).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })

  it(`renders a Pager with error`, async () => {
    const testData = {
      error: true,
      message: `418: The resulting entity body MAY be short and stout.`,
    }
    const { container, getByText } = stageTest(testData)

    const appMessage = getByText(
      /418: The resulting entity body MAY be short and stout./
    )

    expect(appMessage).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })
})
