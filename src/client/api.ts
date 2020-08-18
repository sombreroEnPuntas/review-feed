/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import './custom.d.ts'
/**
 * Chattermill API
 * Chattermill API for Frontend coding challenge
 *
 * OpenAPI spec version: 1.0
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

import * as url from 'url'
import * as portableFetch from 'portable-fetch'
import { Configuration } from './configuration'

// @ts-ignore: this is ok
url.URLSearchParams = URLSearchParams

const BASE_PATH = 'https://frontend-task.production.cloud.chattermill.xyz'.replace(
  /\/+$/,
  ''
)

/**
 *
 * @export
 */
export const COLLECTION_FORMATS = {
  csv: ',',
  ssv: ' ',
  tsv: '\t',
  pipes: '|',
}

/**
 *
 * @export
 * @interface FetchAPI
 */
export interface FetchAPI {
  (url: string, init?: any): Promise<Response>
}

/**
 *
 * @export
 * @interface FetchArgs
 */
export interface FetchArgs {
  url: string
  options: any
}

/**
 *
 * @export
 * @class BaseAPI
 */
export class BaseAPI {
  protected configuration: Configuration

  constructor(
    configuration?: Configuration,
    protected basePath: string = BASE_PATH,
    protected fetch: FetchAPI = portableFetch
  ) {
    if (configuration) {
      this.configuration = configuration
      this.basePath = configuration.basePath || this.basePath
    }
  }
}

/**
 *
 * @export
 * @class RequiredError
 * @extends {Error}
 */
export class RequiredError extends Error {
  name: 'RequiredError'
  constructor(public field: string, msg?: string) {
    super(msg)
  }
}

/**
 *
 * @export
 * @interface ModelAPIError
 */
export interface ModelAPIError {
  /**
   *
   * @type {number}
   * @memberof ModelAPIError
   */
  code?: number
  /**
   *
   * @type {string}
   * @memberof ModelAPIError
   */
  message?: string
}

/**
 *
 * @export
 * @interface ModelJWTResponse
 */
export interface ModelJWTResponse {
  /**
   *
   * @type {number}
   * @memberof ModelJWTResponse
   */
  code?: number
  /**
   *
   * @type {string}
   * @memberof ModelJWTResponse
   */
  expire?: string
  /**
   *
   * @type {string}
   * @memberof ModelJWTResponse
   */
  token?: string
}

/**
 *
 * @export
 * @interface ModelReview
 */
export interface ModelReview {
  /**
   *
   * @type {string}
   * @memberof ModelReview
   */
  comment?: string
  /**
   *
   * @type {string}
   * @memberof ModelReview
   */
  createdAt?: string
  /**
   *
   * @type {number}
   * @memberof ModelReview
   */
  id?: number
  /**
   *
   * @type {Array<ModelReviewTheme>}
   * @memberof ModelReview
   */
  themes?: Array<ModelReviewTheme>
}

/**
 *
 * @export
 * @interface ModelReviewTheme
 */
export interface ModelReviewTheme {
  /**
   *
   * @type {number}
   * @memberof ModelReviewTheme
   */
  sentiment?: number
  /**
   *
   * @type {number}
   * @memberof ModelReviewTheme
   */
  themeId?: number
}

/**
 *
 * @export
 * @interface ModelTheme
 */
export interface ModelTheme {
  /**
   *
   * @type {number}
   * @memberof ModelTheme
   */
  id?: number
  /**
   *
   * @type {string}
   * @memberof ModelTheme
   */
  name?: string
}

/**
 * DefaultApi - fetch parameter creator
 * @export
 */
export const DefaultApiFetchParamCreator = function (
  configuration?: Configuration
) {
  return {
    /**
     * Get list of reviews. API supports filtering and pagination.
     * @summary Get list of reviews
     * @param {number} [limit] Size of the filtered result set
     * @param {number} [offset] Offset within filtered result set
     * @param {number} [themeId] Parameter to filter results by theme id
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    apiReviewsGet(
      limit?: number,
      offset?: number,
      themeId?: number,
      options: any = {}
    ): FetchArgs {
      const localVarPath = `/api/reviews`
      const localVarUrlObj = url.parse(localVarPath, true)
      const localVarRequestOptions = Object.assign({ method: 'GET' }, options)
      const localVarHeaderParameter = {} as any
      const localVarQueryParameter = {} as any

      // authentication ApiKeyAuth required
      if (configuration && configuration.apiKey) {
        const localVarApiKeyValue =
          typeof configuration.apiKey === 'function'
            ? configuration.apiKey('Authorization')
            : configuration.apiKey
        localVarHeaderParameter['Authorization'] = localVarApiKeyValue
      }

      if (limit !== undefined) {
        localVarQueryParameter['limit'] = limit
      }

      if (offset !== undefined) {
        localVarQueryParameter['offset'] = offset
      }

      if (themeId !== undefined) {
        localVarQueryParameter['theme_id'] = themeId
      }

      localVarUrlObj.query = Object.assign(
        {},
        localVarUrlObj.query,
        localVarQueryParameter,
        options.query
      )
      // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
      delete localVarUrlObj.search
      localVarRequestOptions.headers = Object.assign(
        {},
        localVarHeaderParameter,
        options.headers
      )

      return {
        url: url.format(localVarUrlObj),
        options: localVarRequestOptions,
      }
    },
    /**
     * Get review by id
     * @summary Get single review
     * @param {number} id Review id
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    apiReviewsIdGet(id: number, options: any = {}): FetchArgs {
      // verify required parameter 'id' is not null or undefined
      if (id === null || id === undefined) {
        throw new RequiredError(
          'id',
          'Required parameter id was null or undefined when calling apiReviewsIdGet.'
        )
      }
      const localVarPath = `/api/reviews/{id}`.replace(
        `{${'id'}}`,
        encodeURIComponent(String(id))
      )
      const localVarUrlObj = url.parse(localVarPath, true)
      const localVarRequestOptions = Object.assign({ method: 'GET' }, options)
      const localVarHeaderParameter = {} as any
      const localVarQueryParameter = {} as any

      // authentication ApiKeyAuth required
      if (configuration && configuration.apiKey) {
        const localVarApiKeyValue =
          typeof configuration.apiKey === 'function'
            ? configuration.apiKey('Authorization')
            : configuration.apiKey
        localVarHeaderParameter['Authorization'] = localVarApiKeyValue
      }

      localVarUrlObj.query = Object.assign(
        {},
        localVarUrlObj.query,
        localVarQueryParameter,
        options.query
      )
      // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
      delete localVarUrlObj.search
      localVarRequestOptions.headers = Object.assign(
        {},
        localVarHeaderParameter,
        options.headers
      )

      return {
        url: url.format(localVarUrlObj),
        options: localVarRequestOptions,
      }
    },
    /**
     * Get list of themes. API supports filtering and pagination.
     * @summary Get list of themes
     * @param {number} [limit] Size of the filtered result set
     * @param {number} [offset] Offset within filtered result set
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    apiThemesGet(
      limit?: number,
      offset?: number,
      options: any = {}
    ): FetchArgs {
      const localVarPath = `/api/themes`
      const localVarUrlObj = url.parse(localVarPath, true)
      const localVarRequestOptions = Object.assign({ method: 'GET' }, options)
      const localVarHeaderParameter = {} as any
      const localVarQueryParameter = {} as any

      // authentication ApiKeyAuth required
      if (configuration && configuration.apiKey) {
        const localVarApiKeyValue =
          typeof configuration.apiKey === 'function'
            ? configuration.apiKey('Authorization')
            : configuration.apiKey
        localVarHeaderParameter['Authorization'] = localVarApiKeyValue
      }

      if (limit !== undefined) {
        localVarQueryParameter['limit'] = limit
      }

      if (offset !== undefined) {
        localVarQueryParameter['offset'] = offset
      }

      localVarUrlObj.query = Object.assign(
        {},
        localVarUrlObj.query,
        localVarQueryParameter,
        options.query
      )
      // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
      delete localVarUrlObj.search
      localVarRequestOptions.headers = Object.assign(
        {},
        localVarHeaderParameter,
        options.headers
      )

      return {
        url: url.format(localVarUrlObj),
        options: localVarRequestOptions,
      }
    },
    /**
     * Get theme by id
     * @summary Get single theme
     * @param {number} id Theme id
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    apiThemesIdGet(id: number, options: any = {}): FetchArgs {
      // verify required parameter 'id' is not null or undefined
      if (id === null || id === undefined) {
        throw new RequiredError(
          'id',
          'Required parameter id was null or undefined when calling apiThemesIdGet.'
        )
      }
      const localVarPath = `/api/themes/{id}`.replace(
        `{${'id'}}`,
        encodeURIComponent(String(id))
      )
      const localVarUrlObj = url.parse(localVarPath, true)
      const localVarRequestOptions = Object.assign({ method: 'GET' }, options)
      const localVarHeaderParameter = {} as any
      const localVarQueryParameter = {} as any

      // authentication ApiKeyAuth required
      if (configuration && configuration.apiKey) {
        const localVarApiKeyValue =
          typeof configuration.apiKey === 'function'
            ? configuration.apiKey('Authorization')
            : configuration.apiKey
        localVarHeaderParameter['Authorization'] = localVarApiKeyValue
      }

      localVarUrlObj.query = Object.assign(
        {},
        localVarUrlObj.query,
        localVarQueryParameter,
        options.query
      )
      // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
      delete localVarUrlObj.search
      localVarRequestOptions.headers = Object.assign(
        {},
        localVarHeaderParameter,
        options.headers
      )

      return {
        url: url.format(localVarUrlObj),
        options: localVarRequestOptions,
      }
    },
    /**
     * Used to obtain a JWT token
     * @summary Login API
     * @param {string} username username of a user
     * @param {string} password password of a user
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    loginPost(
      username: string,
      password: string,
      options: any = {}
    ): FetchArgs {
      // verify required parameter 'username' is not null or undefined
      if (username === null || username === undefined) {
        throw new RequiredError(
          'username',
          'Required parameter username was null or undefined when calling loginPost.'
        )
      }
      // verify required parameter 'password' is not null or undefined
      if (password === null || password === undefined) {
        throw new RequiredError(
          'password',
          'Required parameter password was null or undefined when calling loginPost.'
        )
      }
      const localVarPath = `/login`
      const localVarUrlObj = url.parse(localVarPath, true)
      const localVarRequestOptions = Object.assign({ method: 'POST' }, options)
      const localVarHeaderParameter = {} as any
      const localVarQueryParameter = {} as any
      const localVarFormParams = new url.URLSearchParams()

      if (username !== undefined) {
        localVarFormParams.set('username', username as any)
      }

      if (password !== undefined) {
        localVarFormParams.set('password', password as any)
      }

      localVarHeaderParameter['Content-Type'] =
        'application/x-www-form-urlencoded'

      localVarUrlObj.query = Object.assign(
        {},
        localVarUrlObj.query,
        localVarQueryParameter,
        options.query
      )
      // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
      delete localVarUrlObj.search
      localVarRequestOptions.headers = Object.assign(
        {},
        localVarHeaderParameter,
        options.headers
      )
      localVarRequestOptions.body = localVarFormParams.toString()

      return {
        url: url.format(localVarUrlObj),
        options: localVarRequestOptions,
      }
    },
  }
}

/**
 * DefaultApi - functional programming interface
 * @export
 */
export const DefaultApiFp = function (configuration?: Configuration) {
  return {
    /**
     * Get list of reviews. API supports filtering and pagination.
     * @summary Get list of reviews
     * @param {number} [limit] Size of the filtered result set
     * @param {number} [offset] Offset within filtered result set
     * @param {number} [themeId] Parameter to filter results by theme id
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    apiReviewsGet(
      limit?: number,
      offset?: number,
      themeId?: number,
      options?: any
    ): (fetch?: FetchAPI, basePath?: string) => Promise<Array<ModelReview>> {
      const localVarFetchArgs = DefaultApiFetchParamCreator(
        configuration
      ).apiReviewsGet(limit, offset, themeId, options)
      return (
        fetch: FetchAPI = portableFetch,
        basePath: string = BASE_PATH
      ) => {
        return fetch(
          basePath + localVarFetchArgs.url,
          localVarFetchArgs.options
        ).then((response) => {
          if (response.status >= 200 && response.status < 300) {
            return response.json()
          } else {
            throw response
          }
        })
      }
    },
    /**
     * Get review by id
     * @summary Get single review
     * @param {number} id Review id
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    apiReviewsIdGet(
      id: number,
      options?: any
    ): (fetch?: FetchAPI, basePath?: string) => Promise<ModelReview> {
      const localVarFetchArgs = DefaultApiFetchParamCreator(
        configuration
      ).apiReviewsIdGet(id, options)
      return (
        fetch: FetchAPI = portableFetch,
        basePath: string = BASE_PATH
      ) => {
        return fetch(
          basePath + localVarFetchArgs.url,
          localVarFetchArgs.options
        ).then((response) => {
          if (response.status >= 200 && response.status < 300) {
            return response.json()
          } else {
            throw response
          }
        })
      }
    },
    /**
     * Get list of themes. API supports filtering and pagination.
     * @summary Get list of themes
     * @param {number} [limit] Size of the filtered result set
     * @param {number} [offset] Offset within filtered result set
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    apiThemesGet(
      limit?: number,
      offset?: number,
      options?: any
    ): (fetch?: FetchAPI, basePath?: string) => Promise<Array<ModelTheme>> {
      const localVarFetchArgs = DefaultApiFetchParamCreator(
        configuration
      ).apiThemesGet(limit, offset, options)
      return (
        fetch: FetchAPI = portableFetch,
        basePath: string = BASE_PATH
      ) => {
        return fetch(
          basePath + localVarFetchArgs.url,
          localVarFetchArgs.options
        ).then((response) => {
          if (response.status >= 200 && response.status < 300) {
            return response.json()
          } else {
            throw response
          }
        })
      }
    },
    /**
     * Get theme by id
     * @summary Get single theme
     * @param {number} id Theme id
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    apiThemesIdGet(
      id: number,
      options?: any
    ): (fetch?: FetchAPI, basePath?: string) => Promise<ModelTheme> {
      const localVarFetchArgs = DefaultApiFetchParamCreator(
        configuration
      ).apiThemesIdGet(id, options)
      return (
        fetch: FetchAPI = portableFetch,
        basePath: string = BASE_PATH
      ) => {
        return fetch(
          basePath + localVarFetchArgs.url,
          localVarFetchArgs.options
        ).then((response) => {
          if (response.status >= 200 && response.status < 300) {
            return response.json()
          } else {
            throw response
          }
        })
      }
    },
    /**
     * Used to obtain a JWT token
     * @summary Login API
     * @param {string} username username of a user
     * @param {string} password password of a user
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    loginPost(
      username: string,
      password: string,
      options?: any
    ): (fetch?: FetchAPI, basePath?: string) => Promise<ModelJWTResponse> {
      const localVarFetchArgs = DefaultApiFetchParamCreator(
        configuration
      ).loginPost(username, password, options)
      return (
        fetch: FetchAPI = portableFetch,
        basePath: string = BASE_PATH
      ) => {
        return fetch(
          basePath + localVarFetchArgs.url,
          localVarFetchArgs.options
        ).then((response) => {
          if (response.status >= 200 && response.status < 300) {
            return response.json()
          } else {
            throw response
          }
        })
      }
    },
  }
}

/**
 * DefaultApi - factory interface
 * @export
 */
export const DefaultApiFactory = function (
  configuration?: Configuration,
  fetch?: FetchAPI,
  basePath?: string
) {
  return {
    /**
     * Get list of reviews. API supports filtering and pagination.
     * @summary Get list of reviews
     * @param {number} [limit] Size of the filtered result set
     * @param {number} [offset] Offset within filtered result set
     * @param {number} [themeId] Parameter to filter results by theme id
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    apiReviewsGet(
      limit?: number,
      offset?: number,
      themeId?: number,
      options?: any
    ) {
      return DefaultApiFp(configuration).apiReviewsGet(
        limit,
        offset,
        themeId,
        options
      )(fetch, basePath)
    },
    /**
     * Get review by id
     * @summary Get single review
     * @param {number} id Review id
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    apiReviewsIdGet(id: number, options?: any) {
      return DefaultApiFp(configuration).apiReviewsIdGet(id, options)(
        fetch,
        basePath
      )
    },
    /**
     * Get list of themes. API supports filtering and pagination.
     * @summary Get list of themes
     * @param {number} [limit] Size of the filtered result set
     * @param {number} [offset] Offset within filtered result set
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    apiThemesGet(limit?: number, offset?: number, options?: any) {
      return DefaultApiFp(configuration).apiThemesGet(
        limit,
        offset,
        options
      )(fetch, basePath)
    },
    /**
     * Get theme by id
     * @summary Get single theme
     * @param {number} id Theme id
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    apiThemesIdGet(id: number, options?: any) {
      return DefaultApiFp(configuration).apiThemesIdGet(id, options)(
        fetch,
        basePath
      )
    },
    /**
     * Used to obtain a JWT token
     * @summary Login API
     * @param {string} username username of a user
     * @param {string} password password of a user
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    loginPost(username: string, password: string, options?: any) {
      return DefaultApiFp(configuration).loginPost(
        username,
        password,
        options
      )(fetch, basePath)
    },
  }
}

/**
 * DefaultApi - object-oriented interface
 * @export
 * @class DefaultApi
 * @extends {BaseAPI}
 */
export class DefaultApi extends BaseAPI {
  /**
   * Get list of reviews. API supports filtering and pagination.
   * @summary Get list of reviews
   * @param {number} [limit] Size of the filtered result set
   * @param {number} [offset] Offset within filtered result set
   * @param {number} [themeId] Parameter to filter results by theme id
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof DefaultApi
   */
  public apiReviewsGet(
    limit?: number,
    offset?: number,
    themeId?: number,
    options?: any
  ) {
    return DefaultApiFp(this.configuration).apiReviewsGet(
      limit,
      offset,
      themeId,
      options
    )(this.fetch, this.basePath)
  }

  /**
   * Get review by id
   * @summary Get single review
   * @param {number} id Review id
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof DefaultApi
   */
  public apiReviewsIdGet(id: number, options?: any) {
    return DefaultApiFp(this.configuration).apiReviewsIdGet(id, options)(
      this.fetch,
      this.basePath
    )
  }

  /**
   * Get list of themes. API supports filtering and pagination.
   * @summary Get list of themes
   * @param {number} [limit] Size of the filtered result set
   * @param {number} [offset] Offset within filtered result set
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof DefaultApi
   */
  public apiThemesGet(limit?: number, offset?: number, options?: any) {
    return DefaultApiFp(this.configuration).apiThemesGet(
      limit,
      offset,
      options
    )(this.fetch, this.basePath)
  }

  /**
   * Get theme by id
   * @summary Get single theme
   * @param {number} id Theme id
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof DefaultApi
   */
  public apiThemesIdGet(id: number, options?: any) {
    return DefaultApiFp(this.configuration).apiThemesIdGet(id, options)(
      this.fetch,
      this.basePath
    )
  }

  /**
   * Used to obtain a JWT token
   * @summary Login API
   * @param {string} username username of a user
   * @param {string} password password of a user
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof DefaultApi
   */
  public loginPost(username: string, password: string, options?: any) {
    return DefaultApiFp(this.configuration).loginPost(
      username,
      password,
      options
    )(this.fetch, this.basePath)
  }
}