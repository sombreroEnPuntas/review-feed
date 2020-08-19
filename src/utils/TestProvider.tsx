import React from 'react'
import { Provider } from 'react-redux'
import { ThemeWrapper } from 'retro-ui'

import store from '../data'

const TestProvider = ({ children }) => (
  <ThemeWrapper>
    <Provider store={store}>{children}</Provider>
  </ThemeWrapper>
)

export default TestProvider
