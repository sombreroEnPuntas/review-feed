import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { Modal } from 'retro-ui'

import useGetReviews from './useGetReviews'
import Pager from '../Pager'
import Review, { getThemeNameById } from '../Review'
import { getThemeFilters } from '../../data/filters'
import { ModelReview } from '../../client/api'
import useScroll from '../../utils/useScroll'

const Header = styled.header`
  margin: auto;
  max-width: 450px;
  position: sticky;
  top: 0;
  z-index: 1;
`

const Section = styled.section`
  margin: auto;
  max-width: 450px;
  padding: 0 0.5em;
  position: relative;
  z-index: 0;
`

const filterReviewsByThemes = (review: ModelReview, filters: number[]) =>
  filters.length === 0
    ? true
    : review.themes.some((theme) => filters.includes(theme.theme_id))

const ReviewFeed = () => {
  const { error, loading, reviews, themeList, getReviews } = useGetReviews()

  // trivial scroll implementation 📜
  /* istanbul ignore next */
  useScroll(() => getReviews(reviews && { offset: reviews.length }))

  const themeFilters: number[] = useSelector(getThemeFilters)

  const appStateMessage = loading
    ? 'Loading...'
    : error ||
      `Listing: ${
        themeFilters.length === 0
          ? 'all themes'
          : themeFilters
              .map((filter) => getThemeNameById(filter, themeList))
              .join(', ')
      }.`

  return (
    <>
      {loading && <Modal />}
      <Header>
        <Pager error={!!error} message={appStateMessage} />
      </Header>
      <Section>
        {reviews
          ?.filter((review) => filterReviewsByThemes(review, themeFilters))
          ?.map((review) => (
            <Review key={`review-${review.id}`} review={review} />
          ))}
      </Section>
    </>
  )
}

export default ReviewFeed
