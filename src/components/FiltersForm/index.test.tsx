import { render, fireEvent } from '@testing-library/react'
import React from 'react'

import TestedComponent from '.'

// Deps
import { useSelector } from 'react-redux'
import { getThemeFilters, setThemeFilters } from '../../data/filters'
import { getThemes } from '../../data/themes'

// Utils
import { themeListMock } from '../../utils/mocks'
import TestProvider from '../../utils/TestProvider'

// Mocks
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}))
jest.mock('../../data/filters', () => ({
  ...jest.requireActual('../../data/filters'),
  setThemeFilters: jest.fn(),
}))

// Mock data
const setMock = ({ themes, themeFilters }) => {
  useSelector.mockImplementation((selector) => {
    switch (selector) {
      case getThemeFilters:
        return themeFilters
      case getThemes:
        return themes

      default:
        return jest.requireActual('react-redux').useSelector(selector)
    }
  })
  ;(setThemeFilters as any).mockImplementation(() => ({ type: 'mock' }))
}

const stageTest = () => {
  setMock({ themes: themeListMock, themeFilters: [] })

  return render(
    <TestProvider>
      <TestedComponent />
    </TestProvider>
  )
}

describe('FiltersForm', () => {
  afterEach(() => {
    useSelector.mockClear()
    ;(setThemeFilters as any).mockClear()
  })
  afterAll(() => {
    jest.resetAllMocks() // clean .mock
  })

  it(`renders main CTAs when not opened`, async () => {
    const { container, getByText } = stageTest()

    const filterButton = getByText(/Filter/)
    const resetButton = getByText(/Reset/)

    expect(filterButton).toBeInTheDocument()
    expect(resetButton).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })

  it(`renders a list of filters when opened`, async () => {
    const { container, getByText } = stageTest()

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
    const { container, getByText, getByLabelText } = stageTest()

    const filterButton = getByText(/Filter/)
    fireEvent.click(filterButton)

    const queryInput = getByLabelText(/query/)
    fireEvent.change(queryInput, { target: { value: 'gene' } })

    const theme1 = getByText(/General/)

    expect(theme1).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })

  it(`reacts to apply CTA`, async () => {
    const { container, getByText } = stageTest()

    const filterButton = getByText(/Filter/)
    fireEvent.click(filterButton)

    const theme1 = getByText(/General/)
    fireEvent.click(theme1)

    const theme2 = getByText(/Other/)
    fireEvent.click(theme2)
    fireEvent.click(theme2) //unselect!

    const applyButton = getByText(/Apply/)
    fireEvent.click(applyButton)

    expect(setThemeFilters).toHaveBeenCalledWith([1000])
    expect(container).toMatchSnapshot()
  })

  it(`reacts to reset CTA`, async () => {
    const { container, getByText, getAllByText } = stageTest()

    const filterButton = getByText(/Filter/)
    fireEvent.click(filterButton)

    const theme1 = getByText(/General/)
    fireEvent.click(theme1)

    const resetButton = getAllByText(/Reset/)
    fireEvent.click(resetButton[0])
    fireEvent.click(resetButton[1])

    expect(setThemeFilters).toHaveBeenNthCalledWith(1, [])
    expect(setThemeFilters).toHaveBeenNthCalledWith(2, [])
    expect(container).toMatchSnapshot()
  })
})
