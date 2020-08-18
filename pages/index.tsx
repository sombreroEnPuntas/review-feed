import { Box } from 'retro-ui'
import Head from 'next/head'
import styled from 'styled-components'

import LoginForm from '../src/components/LoginForm'

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
`

const Home = () => {
  return (
    <>
      <Head>
        <title>review-feed</title>
      </Head>
      <main>
        <Actions>
          <h3>{'review-feed'}</h3>
          <LoginForm />
        </Actions>
        <Box>{`Read reviews!`}</Box>
      </main>
    </>
  )
}

export default Home
