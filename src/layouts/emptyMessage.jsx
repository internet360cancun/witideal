import React from 'react'
import { styled } from '@material-ui/core/styles'
import EmptyBuilding from '../assets/specificDataIcons/emptyPropety.svg'

const EmptyMessage = props => {
  return (
    <Content>
      <Picture src={EmptyBuilding} />
      <Text>
        {props.message || 'Opps no hay nada aqui'}
      </Text>
    </Content>
  )
}

const Content = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  minHeight: '70vh',
  width: '100%',
  boxSizing: 'border-box',
})

const Picture = styled('img')({
  width: '120px',
  marginBottom: '80px',
})

const Text = styled('div')({
  fontSize: '1.3em',
  color: '#e2ddfe',
  width: '70%',
  '@media (max-width:500px)': {
    width: '90%'
  }
})

export default EmptyMessage
