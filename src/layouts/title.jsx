import React from 'react'
import { Typography } from '@material-ui/core'
import { styled } from '@material-ui/core/styles'

const TitleStyled = styled(Typography)(({theme}) => ({
  padding: '1px',
  margin: '40px 0px',
  color: theme.wdRegularBlue,
  fontSize: '2em', 
  fontWeight: 700,
  fontFamily: "Roboto"
}))

const Title = (props) => (
  <TitleStyled variant="h1">
    {props.children}
  </TitleStyled>
)

export default Title