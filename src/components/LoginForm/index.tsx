import React, { useState, ChangeEvent, FormEvent } from 'react'
import { Box, Button, Input, Modal } from 'retro-ui'
import styled from 'styled-components'

import ErrorMessage from '../ErrorMessage'
import { AccentCTA } from '../Pager'
import Spacer from '../Spacer'

import useLogin from './useLogin'

const Form = styled.form`
  align-items: stretch;
  display: flex;
  flex-direction: column;
  width: 100%;
`

const LoginForm = () => {
  const { error, login, logout, token } = useLogin()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    login(username, password)
  }

  const handleLogout = () => {
    logout()
  }

  return (
    <>
      <AccentCTA onClick={handleLogout}>{'Logout'}</AccentCTA>
      {!token && (
        <Modal>
          <Box type={error ? 'error' : 'black'}>
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
              <ErrorMessage type={error ? 'error' : 'black'}>
                {error ? error : ' '}
              </ErrorMessage>
              <Button>{`Login`}</Button>
            </Form>
          </Box>
        </Modal>
      )}
    </>
  )
}

export default LoginForm
