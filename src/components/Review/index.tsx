import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { Box } from 'retro-ui'

import { ModelReview, ModelTheme } from '../../client/api'
import { getThemes } from '../../data/themes'

const TimeStamp = styled.div`
  ${({ theme }) => `
    background-color: ${theme.colors.black.background};
    font-size: 0.5em;
    left: 2em;
    line-height: 1.5em;
    padding: 0 0.5em;
    position: relative;
    top: 1.2em;
    width: max-content;
  `}
`
const Container = styled.div`
  display: block;
  width: 100%;
`

const Sentiments = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
`
const Sentiment = styled.span<{ sentiment: number }>`
  ${({ theme, sentiment }) => `
    background-color: ${sentimentMap(sentiment, theme)};
    margin: 0.5em;
    padding: 0 0.5em;
    white-space: nowrap;
  `}
`
const sentimentMap = (n: number, theme) => {
  switch (n) {
    case 1:
      return theme.colors['success'].background
    case -1:
      return theme.colors['error'].background
    default:
      return `#E9C46A` // Add this to the style guide later ;)
  }
}

const Comment = styled.div`
  margin: 0 1em;
`

export const getThemeNameById = (id: number, themes: ModelTheme[]): string =>
  themes?.find((theme) => theme.id === id)?.name

export interface Props {
  review: ModelReview
}
const Review = ({ review: { comment, created_at, id, themes } }: Props) => {
  const themesList: ModelTheme[] = useSelector(getThemes)

  return (
    <article>
      <TimeStamp>{new Date(created_at).toLocaleDateString()}</TimeStamp>
      <Box>
        <Container>
          <Sentiments>
            {themes?.map(({ sentiment, theme_id }, index) => (
              <Sentiment
                key={`review-${id}-${theme_id}-${index}`}
                sentiment={sentiment}
              >
                {getThemeNameById(theme_id, themesList)}
              </Sentiment>
            ))}
          </Sentiments>
          <hr />
          <Comment>{comment}</Comment>
        </Container>
      </Box>
    </article>
  )
}

export default Review
