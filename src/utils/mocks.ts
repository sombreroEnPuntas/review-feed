import {
  ModelJWTResponse,
  ModelAPIError,
  ModelTheme,
  ModelReview,
} from '../client/api'

export const internalError = new Error(`Wut?. SyntaxError or NetworkError`)

export const errorAPIResponse: ModelAPIError = {
  code: 418,
  message: `The resulting entity body MAY be short and stout.`,
}

export const unauthorizedAPIResponse: ModelAPIError = {
  code: 401,
  message: `You shall not pass!`,
}

export interface MockData {
  login?: ModelJWTResponse
  themes?: ModelTheme[]
  reviews?: ModelReview[]
}
export class MockService {
  data
  error

  constructor(data: MockData, error: 'internal' | 'API' | 'EXPIRED_TOKEN') {
    this.data = data
    this.error = error
  }

  private genericErrorResponse = () => {
    if (this.error === 'API') {
      throw { json: () => Promise.resolve(errorAPIResponse) }
    } else if (this.error === 'EXPIRED_TOKEN') {
      throw { json: () => Promise.resolve(unauthorizedAPIResponse) }
    } else if (this.error === 'internal') {
      throw internalError
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  loginPost = async (_username: string, _password: string) => {
    this.genericErrorResponse()

    return this.data?.login
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  apiThemesGet = async (_limit: number, _offset: number) => {
    this.genericErrorResponse()

    return { data: this.data?.themes }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  apiReviewsGet = async (_limit: number, _offset: number, _themeId: number) => {
    this.genericErrorResponse()

    return { data: this.data?.reviews }
  }
}

export const reviewMock = {
  id: 59435909,
  created_at: '2020-08-20T11:54:52Z',
  comment: 'Good, Bad, and Ugly.',
  themes: [
    { theme_id: 1000, sentiment: 1 },
    { theme_id: 1001, sentiment: 0 },
    { theme_id: 1002, sentiment: -1 },
  ],
}

export const themeListMock = [
  { id: 1000, name: 'General' },
  { id: 1001, name: 'Other' },
  { id: 1002, name: 'Unspecific' },
]
