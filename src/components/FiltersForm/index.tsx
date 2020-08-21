import React, { useState, ChangeEvent, FormEvent } from 'react'
import { Box, Button, Input, Modal } from 'retro-ui'
import styled from 'styled-components'

import { MainCTA } from '../Pager'
import Spacer from '../Spacer'

import useFilters from '../../utils/useFilters'

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const Themes = styled.div`
  align-content: flex-start;
  display: flex;
  flex-wrap: wrap;
  height: 20em;
  overflow: auto;
`
const Theme = styled.div<{ active: boolean }>`
  ${({ theme, active }) => `
    background-color: ${
      theme.colors.black[active ? 'backgroundAlt' : 'background']
    };
    box-shadow: \
      4px 0 ${theme.colors.black.shadow}, \
      0 -4px ${theme.colors.black.shadow}, \
      -4px 0 ${theme.colors.black.shadow}, \
      0 4px ${theme.colors.black.shadow};
    cursor: pointer;
    margin: 5px;
    padding: 0 1px;
  `}
`

const ActionsGroup = styled.div`
  display: flex;
  justify-content: space-evenly;
`

const FiltersForm = () => {
  const { filter, reset, themes, themeFilters } = useFilters()

  const [visible, setVisible] = useState(false)
  const [selection, setSelection] = useState(themeFilters)
  const [query, setQuery] = useState('')

  const toggleShow = () => setVisible(!visible)

  const handleReset = () => {
    setQuery('')
    setSelection([])
    reset()
  }
  const handleSelect = (id: number, active: boolean) => {
    setSelection(
      active ? selection.filter((theme) => theme !== id) : [...selection, id]
    )
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    filter(selection)
    toggleShow()
  }

  return (
    <>
      <MainCTA onClick={toggleShow}>{'Filter'}</MainCTA>
      <MainCTA onClick={handleReset}>{'Reset'}</MainCTA>
      {visible && (
        <Modal>
          <Box>
            <Form onSubmit={handleSubmit}>
              <Box>
                <Themes>
                  {themes
                    .filter(({ name }) => !!name.match(new RegExp(query, 'gi')))
                    ?.map(({ id, name }) => (
                      <Theme
                        active={selection.includes(id)}
                        key={`theme-${id}-${name}`}
                        onClick={() => handleSelect(id, selection.includes(id))}
                      >
                        {name}
                      </Theme>
                    ))}
                </Themes>
              </Box>
              <Spacer />
              <Input
                aria-label="query"
                name="query"
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setQuery(event?.target?.value)
                }
                placeholder="find theme..."
                type="text"
                value={query}
              />
              <Spacer />

              <ActionsGroup>
                <Button type="submit">{`Apply`}</Button>
                <Button type="button" onClick={handleReset}>
                  {'Reset'}
                </Button>
              </ActionsGroup>
            </Form>
          </Box>
        </Modal>
      )}
    </>
  )
}

export default FiltersForm
