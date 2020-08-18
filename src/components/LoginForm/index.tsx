import React, { useState, ChangeEvent, FormEvent } from 'react'
import { Box, Button, Input, Modal } from 'retro-ui'
import styled from 'styled-components'

import useLogin from '../../utils/useLogin'

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: stretch;
`
const Error = styled.div`
  font-size: 0.5em;
  line-height: 1.5em;
  margin: 1em 0;
  min-height: 3em;
`
const Spacer = styled.div`
  margin: 1em 0 0 0;
`

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const { error, loading, login, logout, token } = useLogin()
  if (loading) {
    return (
      <Modal>
        <Box>{`Loading...`}</Box>
      </Modal>
    )
  }

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await login(username, password)
  }

  const handleLogout = () => {
    logout()
  }

  return token ? (
    <Button onClick={handleLogout}>{'Logout'}</Button>
  ) : (
    <Modal>
      <Box error={!!error}>
        <Form onSubmit={handleLogin}>
          <Input
            aria-label="username"
            autoComplete="username"
            name="username"
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setUsername(event?.target?.value)
            }
            placeholder="username"
            required
            type="text"
            value={username}
          />
          <Spacer />
          <Input
            aria-label="password"
            autoComplete="password"
            name="password"
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setPassword(event?.target?.value)
            }
            placeholder="password"
            required
            type="password"
            value={password}
          />
          <Error>{error ? error : '\n\n'}</Error>
          <Button>{`Login`}</Button>
        </Form>
      </Box>
    </Modal>
  )
}

export default LoginForm
