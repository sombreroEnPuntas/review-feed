import { ModelAPIError } from '../client/api'

const parseAPIError = async (e: unknown) => {
  let message: string

  // `instanceof Response` is not reliable when contexts are different :)
  // duct-taping is ok tho cuz we just need to unwrap a server response
  if ((e as Body).json) {
    const errorResponse: ModelAPIError = await (e as Body).json()
    message = `${errorResponse.code}: ${errorResponse.message}`
  } else {
    message = `${(e as Error).message}`
  }

  return message
}

export default parseAPIError
