import { render } from '@testing-library/react'
import React from 'react'

import TestedComponent, { Props } from '.'

// Deps
import { useSelector } from 'react-redux'

// Utils
import { reviewMock, themeListMock } from '../../utils/mocks'
import TestProvider from '../../utils/TestProvider'

// Mocks
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}))

const getProps = (customProps) => ({
  review: { ...reviewMock },
  ...customProps,
})

const stageTest = (customProps?: Props) => {
  useSelector.mockImplementation(() => [...themeListMock])

  return render(
    <TestProvider>
      <TestedComponent {...getProps(customProps)} />
    </TestProvider>
  )
}

describe('Review', () => {
  afterEach(() => {
    // much force-casting, such type-safe, so dark side
    useSelector.mockClear()
  })
  afterAll(() => {
    jest.resetAllMocks() // clean .mock
  })

  it(`renders a Review`, async () => {
    const { container, getByText } = stageTest()

    const review = getByText(/Good, Bad, and Ugly./)
    const sentiment1 = getByText(/General/)
    const sentiment2 = getByText(/Other/)
    const sentiment3 = getByText(/Unspecific/)

    expect(review).toBeInTheDocument()
    expect(sentiment1).toBeInTheDocument()
    expect(sentiment2).toBeInTheDocument()
    expect(sentiment3).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })
})
