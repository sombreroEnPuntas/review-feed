import { render } from '@testing-library/react'
import React from 'react'
import { ThemeWrapper } from 'retro-ui'

// pages
import Index from '../pages/index'

describe.each`
  Page
  ${Index}
`('$Page.displayName', ({ Page }) => {
  test('snapshot', () => {
    const { container } = render(
      <ThemeWrapper>
        <Page />
      </ThemeWrapper>
    )

    expect(container).toMatchSnapshot()
  })
})
