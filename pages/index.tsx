import Head from 'next/head'

import ReviewFeed from '../src/components/ReviewFeed'

const Home = () => {
  return (
    <>
      <Head>
        <title>review-feed</title>
      </Head>
      <main>
        <ReviewFeed />
      </main>
    </>
  )
}

export default Home
