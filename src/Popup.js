import React from 'react'
import styled from 'styled-components'

import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

import { loremIpsum } from './constants/lorem-ipsum'
import { spacing } from './constants/spacing'
import { material } from './constants/material-ui'

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  padding: ${ spacing.unit };
  z-index: 99;
`
const StyledPaper = styled(Paper)`
  height: 50vh;
  padding: ${ spacing.unit };
  overflow-y: auto;
`
const LoremIpsum = withStyles({
  root: {
    color: 'rgba(0, 0, 0, 0.5)',
  }
})(Typography)

const Nope = null

export const Popup = ({ isOpen }) => {
  return isOpen ? (
    <Wrapper>
      <StyledPaper elevation={material.elevation}>
        <Typography variant="headline" component="h2">
          This is a simple popup
        </Typography>

        <Typography component="p">
          Click anywhere to dismiss it
        </Typography>

        <LoremIpsum>
          {loremIpsum.text}
        </LoremIpsum>
      </StyledPaper>
    </Wrapper>
  ) : Nope
}
