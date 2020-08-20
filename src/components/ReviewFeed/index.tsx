import React from 'react'
import styled from 'styled-components'

import Pager from '../Pager'
import Review from '../Review'
import Loading from '../Loading'
import useGetReviews from '../../utils/useGetReviews'
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

const ReviewFeed = () => {
  const { error, loading, reviews, themeList, getReviews } = useGetReviews()

  // trivial scroll implementation 📜
  /* istanbul ignore next */
  useScroll(() => getReviews(reviews && { offset: reviews.length }))

  const appStateMessage = loading
    ? 'Loading...'
    : error || 'Listing all themes.'

  return (
    <>
      {loading && <Loading />}
      <Header>
        <Pager error={!!error} message={appStateMessage} />
      </Header>
      <Section>
        {reviews?.map((review) => (
          <Review
            key={`review-${review.id}`}
            review={review}
            themeList={themeList}
          />
        ))}
      </Section>
    </>
  )
}

export default ReviewFeed
