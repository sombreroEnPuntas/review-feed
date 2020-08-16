import Document, { Html, Main, NextScript, Head } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

const retroUIFontStyle = {
  fontFamily: "'Press Start 2P', monospace",
  fontSize: 'calc(50px - 2vw)',
  lineHeight: '1.5em',
}

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Press+Start+2P"
          />
        </Head>
        <body style={retroUIFontStyle}>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
