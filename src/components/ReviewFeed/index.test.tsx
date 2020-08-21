import { render } from '@testing-library/react'
import React from 'react'

import TestedComponent from '.'

// Deps
import { useSelector } from 'react-redux'
import { getThemeFilters } from '../../data/filters'
import useGetReviews from './useGetReviews'
import useScroll from '../../utils/useScroll'
import LoginForm from '../LoginForm'
import { AccentCTA } from '../Pager'

// Utils
import {
  generalReviewMock,
  otherReviewMock,
  reviewMock,
  themeListMock,
  unspecificReviewMock,
} from '../../utils/mocks'
import TestProvider from '../../utils/TestProvider'
import { getThemes } from '../../data/themes'

// Mocks
jest.mock('./useGetReviews')
jest.mock('../../utils/useScroll')
jest.mock('../LoginForm')
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}))

// Mock data
const setMock = ({
  error,
  getReviews,
  loading,
  reviews,
  themeFilters,
  themeList,
}) => {
  ;(useGetReviews as jest.Mock).mockImplementation(() => ({
    error,
    getReviews,
    loading,
    reviews,
    themeList,
  }))
  ;(LoginForm as jest.Mock).mockImplementation(() => (
    <AccentCTA>{'Logout'}</AccentCTA>
  ))

  // could be abstracted as util
  useSelector.mockImplementation((selector) => {
    switch (selector) {
      case getThemeFilters:
        return themeFilters
      case getThemes:
        return themeList

      default:
        return jest.requireActual('react-redux').useSelector(selector)
    }
  })
}

const stageTest = ({
  error,
  getReviews = jest.fn(),
  loading,
  reviews = null,
  themeFilters = [],
  themeList = null,
}) => {
  setMock({ error, getReviews, loading, reviews, themeFilters, themeList })

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
    useSelector.mockClear()
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

    const appState = getByText(/Listing: all themes./)
    const review = getByText(/Good, Bad, and Ugly./)

    expect(appState).toBeInTheDocument()
    expect(review).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })

  it(`filters a successful feed`, async () => {
    const testData = {
      error: null,
      loading: false,
      reviews: [
        reviewMock,
        generalReviewMock,
        unspecificReviewMock,
        otherReviewMock,
      ],
      themeFilters: [1000],
      themeList: [...themeListMock],
    }
    const { container, getByText } = stageTest(testData)

    const appState = getByText(/Listing: General./)
    const review1 = getByText(/Good, Bad, and Ugly./)
    const review2 = getByText(/Generally good./)

    expect(appState).toBeInTheDocument()
    expect(review1).toBeInTheDocument()
    expect(review2).toBeInTheDocument()
    expect(container).toMatchSnapshot()

    container.dispatchEvent
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
