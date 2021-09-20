import React from 'react'
import { styled } from '@material-ui/core/styles'
import iconSrc from '../../assets/openpay_color.png'

const OpenPayIcon = props => {
  return (
    <Content>
      <Picture src={iconSrc} />
    </Content>
  )
}

const Content = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})

const Picture = styled('img')({
  width: '200px',
  display: 'block',
  marginTop: '50px',
})

export default OpenPayIcon