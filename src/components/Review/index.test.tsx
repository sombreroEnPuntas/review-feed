import { render } from '@testing-library/react'
import React from 'react'
import { ThemeWrapper } from 'retro-ui'

import TestedComponent, { Props } from '.'

// Utils
import { reviewMock, themeListMock } from '../../utils/mocks'
// Mocks
const getProps = (customProps) => ({
  review: { ...reviewMock },
  themeList: [...themeListMock],
  ...customProps,
})

const stageTest = (customProps?: Props) => {
  return render(
    <ThemeWrapper>
      <TestedComponent {...getProps(customProps)} />
    </ThemeWrapper>
  )
}

describe('Review', () => {
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
