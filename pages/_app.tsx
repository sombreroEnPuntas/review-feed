import { Provider } from 'react-redux'
import { ThemeWrapper } from 'retro-ui'

import store from '../src/data'

const App = ({ Component, pageProps }) => (
  <ThemeWrapper>
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  </ThemeWrapper>
)

export default App
