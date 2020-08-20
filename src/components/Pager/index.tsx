import { Button } from 'retro-ui'
import styled from 'styled-components'

import LoginForm from '../LoginForm'

const pagerColors = {
  accent: '#E4303E',
  body: '#3C3B41',
  main: '#ADACB1',
  screenBorder: '#D8D7D9',
}

const Body = styled.div`
  background-color: ${pagerColors.body};
  padding: 1em;
`

const BarContainer = styled.div`
  align-items: flex-end;
  display: flex;
  justify-content: space-between;
`
const Title = styled.h3`
  color: ${pagerColors.main};
  margin: 0 0 0.5em 0;
  max-width: max-content;
  padding: 0;
`
const StatusBar = styled.div<{ error?: boolean }>`
  ${({ theme, error }) => `
    align-items: center;
    background-color: ${pagerColors.screenBorder};
    display: flex;
    height: 20px;
    justify-content: center;
    width: 50px;

    &:before {
      background-color: ${theme.colors[error ? 'error' : 'success'].shadow};
      content: '';
      display: inline-block;
      height: 5px;
      width: 20px;
    }
  `}
`

const ScreenContainer = styled.div`
  background-color: ${pagerColors.screenBorder};
  display: flex;
  flex-direction: column;
`
const Screen = styled.div<{ error?: boolean }>`
  ${({ theme, error }) => `
    background-color: ${theme.colors[error ? 'error' : 'success'].background};
    box-shadow: \
      4px 0 ${pagerColors.body}, \
      0 -4px ${pagerColors.body}, \
      -4px 0 ${pagerColors.body}, \
      0 4px ${pagerColors.body};
    color: ${theme.colors[error ? 'error' : 'success'].outline};
    height: 4em;
    margin: 1em;
    overflow: auto;
    padding: 0.25em;
  `}
`

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 0.5em;
`
const ActionsGroup = styled.div`
  display: flex;
`
const MainCTA = styled(Button)`
  background-color: ${pagerColors.main};
  box-shadow: none;
`
export const AccentCTA = styled(Button)`
  background-color: ${pagerColors.accent};
  box-shadow: none;
`

export interface Props {
  error?: boolean
  message: string
}
const Pager = ({ error, message }: Props) => (
  <Body>
    <BarContainer>
      <Title>{'review-feed'}</Title>
      <StatusBar error={!!error} />
    </BarContainer>
    <ScreenContainer>
      <Screen error={!!error}>{message}</Screen>
    </ScreenContainer>
    <Actions>
      <ActionsGroup>
        <MainCTA>{'Filter'}</MainCTA>
        <MainCTA>{'Reset'}</MainCTA>
      </ActionsGroup>
      <LoginForm />
    </Actions>
  </Body>
)

export default Pager
