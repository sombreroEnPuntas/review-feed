import { render } from '@testing-library/react'
import React from 'react'
import { ThemeWrapper } from 'retro-ui'

import TestedPage from '../pages/index'

test('renders page title', () => {
  const { getByText } = render(
    <ThemeWrapper>
      <TestedPage />
    </ThemeWrapper>
  )
  const title = getByText(/review-feed/)

  expect(title).toBeInTheDocument()
})
