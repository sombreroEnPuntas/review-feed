import { useRef, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { DefaultApi, ModelReview, ModelTheme } from '../client/api'
import { Configuration } from '../client/configuration'
import parseAPIError from './parseAPIError'
import { getToken } from '../data/login'

interface ModelThemeResponse {
  data: ModelTheme[]
}

interface ModelReviewResponse {
  data: ModelReview[]
}

const useGetReviews = () => {
  const service = useRef<DefaultApi>()

  const dispatch = useDispatch()
  const token: string = useSelector(getToken)

  const [error, setError] = useState<string>()
  const [loading, setLoading] = useState(false)
  const [reviews, setReviews] = useState<ModelReview[]>()
  const [themes, setThemes] = useState<ModelTheme[]>()

  const getThemes = async ({
    limit,
    offset,
  }: {
    limit?: number
    offset?: number
  }) => {
    setLoading(true)
    let message = null

    try {
      // wrong types on the model :(
      const response: unknown = await service.current.apiThemesGet(
        limit,
        offset
      )
      setThemes((response as ModelThemeResponse).data)
    } catch (e) {
      message = await parseAPIError(e, dispatch)
    }

    setError(message)
    setLoading(false)
  }

  const getReviews = async ({
    limit = 10,
    offset,
    themeId,
  }: {
    limit?: number
    offset?: number
    themeId?: number
  } = {}) => {
    setLoading(true)
    let message = null

    try {
      // wrong types on the model :(
      const response: unknown = await service.current.apiReviewsGet(
        limit,
        offset,
        themeId
      )
      setError(null)
      setReviews((prevData) => [
        ...(prevData || []),
        ...(response as ModelReviewResponse).data,
      ])
    } catch (e) {
      message = await parseAPIError(e, dispatch)
    }

    setError(message)
    setLoading(false)
  }

  // instantiate the service when new tokens come only
  useEffect(() => {
    ;(async () => {
      if (!token) return

      const config: Configuration = { apiKey: `Bearer ${token}` }
      service.current = new DefaultApi(config)

      if (!themes) {
        // initializes all, since it's just text
        await getThemes({ limit: 100 })
      }
      if (!reviews) {
        await getReviews()
      }
    })()

    return function cleanUp() {
      service.current = undefined
    }
  }, [token])

  return { error, loading, reviews, themeList: themes, getReviews }
}

export default useGetReviews
