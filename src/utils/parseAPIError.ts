import { ModelAPIError } from '../client/api'
import { clearToken } from '../data/login'

const UNAUTHORIZED_ERROR_CODE = 401

const parseAPIError = async (e: unknown, dispatch) => {
  let message: string

  // `instanceof Response` is not reliable when contexts are different :)
  // duct-taping is ok tho cuz we just need to unwrap a server response
  if ((e as Body).json) {
    const errorResponse: ModelAPIError = await (e as Body).json()
    if (errorResponse.code === UNAUTHORIZED_ERROR_CODE) {
      dispatch(clearToken())
    }
    message = `${errorResponse.code}: ${errorResponse.message}`
  } else {
    message = `${(e as Error).message}`
  }

  return message
}

export default parseAPIError
