import { render } from '@testing-library/react'
import React from 'react'

import TestedComponent from '.'

// Deps
import useGetReviews from '../../utils/useGetReviews'
import useScroll from '../../utils/useScroll'
import LoginForm from '../LoginForm'
import { AccentCTA } from '../Pager'

// Utils
import { reviewMock, themeListMock } from '../../utils/mocks'
import TestProvider from '../../utils/TestProvider'

// Mocks
jest.mock('../../utils/useGetReviews')
jest.mock('../../utils/useScroll')
jest.mock('../LoginForm')

// Mock data
const setMock = ({ error, loading, reviews, themeList, getReviews }) => {
  ;(useGetReviews as jest.Mock).mockImplementation(() => ({
    error,
    loading,
    reviews,
    themeList,
    getReviews,
  }))
  ;(LoginForm as jest.Mock).mockImplementation(() => (
    <AccentCTA>{'Logout'}</AccentCTA>
  ))
}

const stageTest = ({
  error,
  loading,
  reviews = null,
  themeList = null,
  getReviews = jest.fn(),
}) => {
  setMock({ error, loading, reviews, themeList, getReviews })

  return render(
    <TestProvider>
      <TestedComponent />
    </TestProvider>
  )
}

describe('ReviewFeed', () => {
  afterEach(() => {
    // much force-casting, such type-safe, so dark side
    ;(useGetReviews as jest.Mock).mockClear()
    ;(useScroll as jest.Mock).mockClear()
    ;(LoginForm as jest.Mock).mockClear()
  })
  afterAll(() => {
    jest.resetAllMocks() // clean .mock
  })

  it(`renders a successful feed`, async () => {
    const testData = {
      error: null,
      loading: false,
      reviews: [reviewMock],
      themeList: [...themeListMock],
    }
    const { container, getByText } = stageTest(testData)

    const appState = getByText(/Listing all themes./)
    const review = getByText(/Good, Bad, and Ugly./)

    expect(appState).toBeInTheDocument()
    expect(review).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })

  it(`renders a loading feed`, async () => {
    const testData = {
      error: null,
      loading: true,
    }
    const { container, getByText } = stageTest(testData)

    const appState = getByText(/Loading.../)

    expect(appState).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })

  it(`renders a failed feed`, async () => {
    const testData = {
      error: `418: The resulting entity body MAY be short and stout.`,
      loading: false,
    }
    const { container, getByText } = stageTest(testData)

    const appState = getByText(
      /418: The resulting entity body MAY be short and stout./
    )

    expect(appState).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })

  it(`renders a failed loading feed`, async () => {
    const testData = {
      error: `418: The resulting entity body MAY be short and stout.`,
      loading: true,
    }
    const { container, getByText } = stageTest(testData)

    const appState = getByText(/Loading.../)

    expect(appState).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })

  it(`initializes scroll listener`, async () => {
    const testData = {
      error: null,
      loading: false,
    }
    stageTest(testData)

    expect(useScroll).toHaveBeenCalled()
  })
})
