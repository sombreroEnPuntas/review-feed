import { ThemeWrapper } from 'retro-ui'

const App = ({ Component, pageProps }) => (
  <ThemeWrapper>
    <Component {...pageProps} />
  </ThemeWrapper>
)

export default App
