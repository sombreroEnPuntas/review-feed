import { render } from '@testing-library/react'
import React from 'react'

// pages
import Index from '../pages/index'

// Utils
import TestProvider from '../src/utils/TestProvider'

describe.each`
  Page
  ${Index}
`('$Page.displayName', ({ Page }) => {
  test('snapshot', () => {
    const { container } = render(
      <TestProvider>
        <Page />
      </TestProvider>
    )

    expect(container).toMatchSnapshot()
  })
})
