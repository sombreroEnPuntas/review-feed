import { render, fireEvent } from '@testing-library/react'
import React from 'react'

import TestedComponent from '.'

// Deps
import useFilters from '../../utils/useFilters'

// Utils
import { themeListMock } from '../../utils/mocks'
import { ThemeWrapper } from 'retro-ui'

// Mocks
jest.mock('../../utils/useFilters')

// Mock data
const setMock = ({ filter, reset, themes, themeFilters }) =>
  (useFilters as jest.Mock).mockImplementation(() => ({
    filter,
    reset,
    themes,
    themeFilters,
  }))

const stageTest = ({
  filter = jest.fn(),
  reset = jest.fn(),
  themes = themeListMock,
  themeFilters = [],
}) => {
  setMock({ filter, reset, themes, themeFilters })

  return render(
    <ThemeWrapper>
      <TestedComponent />
    </ThemeWrapper>
  )
}

describe('FiltersForm', () => {
  afterEach(() => {
    // much force-casting, such type-safe, so dark side
    ;(useFilters as jest.Mock).mockClear()
  })
  afterAll(() => {
    jest.resetAllMocks() // clean .mock
  })

  it(`renders main CTAs when not opened`, async () => {
    const testData = {}
    const { container, getByText } = stageTest(testData)

    const filterButton = getByText(/Filter/)
    const resetButton = getByText(/Reset/)

    expect(filterButton).toBeInTheDocument()
    expect(resetButton).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })

  it(`renders a list of filters when opened`, async () => {
    const testData = {}
    const { container, getByText } = stageTest(testData)

    const filterButton = getByText(/Filter/)
    fireEvent.click(filterButton)

    const applyButton = getByText(/Apply/)
    const theme1 = getByText(/General/)
    const theme2 = getByText(/Other/)
    const theme3 = getByText(/Unspecific/)

    expect(applyButton).toBeInTheDocument()
    expect(theme1).toBeInTheDocument()
    expect(theme2).toBeInTheDocument()
    expect(theme3).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })

  it(`reacts to query input`, async () => {
    const filter = jest.fn()
    const testData = { filter }
    const { container, getByText, getByLabelText } = stageTest(testData)

    const filterButton = getByText(/Filter/)
    fireEvent.click(filterButton)

    const queryInput = getByLabelText(/query/)
    fireEvent.change(queryInput, { target: { value: 'gene' } })

    const theme1 = getByText(/General/)

    expect(theme1).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })

  it(`reacts to apply CTA`, async () => {
    const filter = jest.fn()
    const testData = { filter }
    const { container, getByText } = stageTest(testData)

    const filterButton = getByText(/Filter/)
    fireEvent.click(filterButton)

    const theme1 = getByText(/General/)
    fireEvent.click(theme1)

    const theme2 = getByText(/Other/)
    fireEvent.click(theme2)
    fireEvent.click(theme2) //unselect!

    const applyButton = getByText(/Apply/)
    fireEvent.click(applyButton)

    expect(filter).toHaveBeenCalledWith([1000])
    expect(container).toMatchSnapshot()
  })

  it(`reacts to reset CTA`, async () => {
    const reset = jest.fn()
    const testData = { reset }
    const { container, getByText, getAllByText } = stageTest(testData)

    const filterButton = getByText(/Filter/)
    fireEvent.click(filterButton)

    const theme1 = getByText(/General/)
    fireEvent.click(theme1)

    const resetButton = getAllByText(/Reset/)
    fireEvent.click(resetButton[0])
    fireEvent.click(resetButton[1])

    expect(reset).toHaveBeenCalledTimes(2)
    expect(container).toMatchSnapshot()
  })
})
