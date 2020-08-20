import styled from 'styled-components'

interface Props {
  error: boolean
}
const ErrorMessage = styled.div<Props>`
  ${({ theme, error }) =>
    error &&
    ` background-color: ${theme.colors.error.background};
      color: ${theme.colors.error.outline};
    `}
  font-size: 1em;
  line-height: 1.5em;
  margin: 1em 0;
  min-height: 3em;
`

export default ErrorMessage
