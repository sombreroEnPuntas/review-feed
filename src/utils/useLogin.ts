import { useRef, useEffect, useState } from 'react'
import Cookies, { CookieSetOptions } from 'universal-cookie'

import { DefaultApi, ModelJWTResponse } from '../client/api'
import parseAPIError from './parseAPIError'

const useLogin = () => {
  const cookiesOptions: CookieSetOptions = {
    path: '/',
    sameSite: 'strict',
  }
  const cookies = useRef<Cookies>()
  const service = useRef<DefaultApi>()

  const [error, setError] = useState<string>()
  const [token, setToken] = useState<string>()

  // instantiate the services once
  useEffect(() => {
    cookies.current = new Cookies()
    service.current = new DefaultApi() // un-auth instance 👻

    setToken(cookies.current.get('token'))

    return function cleanUp() {
      service.current = undefined
    }
  }, [])

  const login = async (username: string, password: string) => {
    let message = null

    try {
      const response: ModelJWTResponse = await service.current.loginPost(
        username,
        password
      )

      cookies.current.set('token', response.token, cookiesOptions)
      setToken(response.token)
    } catch (e) {
      message = await parseAPIError(e)
    }

    setError(message)
  }

  const logout = () => {
    cookies.current.remove('token', cookiesOptions)
    setToken(undefined)
    setError(null)
  }

  return { error, login, logout, token }
}

export default useLogin
