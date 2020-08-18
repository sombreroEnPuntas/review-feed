import { ModelJWTResponse, ModelAPIError } from '../client/api'

export const internalError = new Error(`Wut?. SyntaxError or NetworkError`)

export const errorAPIResponse: ModelAPIError = {
  code: 418,
  message: `The resulting entity body MAY be short and stout.`,
}

export interface MockData {
  login?: ModelJWTResponse
}
export class MockService {
  data?: MockData
  error?: 'internal' | 'API'
  constructor(data: MockData, error: 'internal' | 'API') {
    this.data = data
    this.error = error
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  loginPost = async (_username: string, _password: string) => {
    if (this.error === 'API') {
      throw { json: () => Promise.resolve(errorAPIResponse) }
    } else if (this.error === 'internal') {
      throw internalError
    }

    return this.data?.login
  }
}
