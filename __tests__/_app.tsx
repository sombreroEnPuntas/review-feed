import React from 'react'
import { render } from '@testing-library/react'

import TestedComponent from '../pages/_app'

const TestDiv = (props: React.HTMLProps<HTMLDivElement>) => <div {...props} />

const getDefaultProps = (customProps?: typeof TestedComponent) => ({
  Component: TestDiv,
  pageProps: { children: '👾' },
  ...customProps,
})

test('renders Component with passed pageProps', () => {
  const { container } = render(<TestedComponent {...getDefaultProps()} />)

  expect(container).toMatchSnapshot()
})
