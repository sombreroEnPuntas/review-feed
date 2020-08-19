import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  clearToken,
  getError,
  getToken,
  initialToken,
  setToken,
} from '../data/login'

const useLogin = () => {
  const dispatch = useDispatch()

  const error: string = useSelector(getError)
  const token: string = useSelector(getToken)

  useEffect(() => {
    dispatch(initialToken())
  }, [dispatch])

  const login = (username: string, password: string) => {
    dispatch(setToken(username, password))
  }

  const logout = () => {
    dispatch(clearToken())
  }

  return { error, login, logout, token }
}

export default useLogin
