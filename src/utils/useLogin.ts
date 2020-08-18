import { useRef, useEffect, useState } from 'react'
import Cookies from 'universal-cookie'

import { DefaultApi, ModelAPIError, ModelJWTResponse } from '../client/api'

const useLogin = () => {
  const cookies = new Cookies()
  const service = useRef<DefaultApi>()

  const [error, setError] = useState<string>()
  const [loading, setLoading] = useState(true)
  const [token, setToken] = useState<string>()

  // instantiate the service once
  useEffect(() => {
    service.current = new DefaultApi()
    setLoading(false)

    return function cleanUp() {
      service.current = undefined
    }
  }, [])

  // set token status after rendering
  useEffect(() => {
    setToken(cookies.get('token'))
  }, [cookies])

  const login = async (username: string, password: string) => {
    try {
      const response: ModelJWTResponse = await service.current.loginPost(
        username,
        password
      )

      cookies.set('token', response.token, {
        path: '/',
        sameSite: 'strict',
      })
      setToken(response.token)
      setError(null)
    } catch (e) {
      // `instanceof Response` is not reliable when contexts are different :)
      // duct-taping is ok tho cuz we just need to unwrap a server response
      if (e.json) {
        const errorResponse: ModelAPIError = await e.json()
        setError(`${errorResponse.code}: ${errorResponse.message}`)
      } else {
        setError(`${e.message}`)
      }
    }

    return { error }
  }

  const logout = () => {
    cookies.remove('token', {
      path: '/',
      sameSite: 'strict',
    })
    setToken(undefined)
    setError(null)
  }

  return { error, loading, login, logout, token }
}

export default useLogin
