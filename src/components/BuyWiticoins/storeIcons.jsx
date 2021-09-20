import React from 'react'
import { styled } from '@material-ui/core/styles'
import src1 from '../../assets/openpay/stores/01.png'
import src2 from '../../assets/openpay/stores/02.png'
import src3 from '../../assets/openpay/stores/03.png'
import src4 from '../../assets/openpay/stores/04.png'
import src5 from '../../assets/openpay/stores/05.png'
import src6 from '../../assets/openpay/stores/06.png'
import src7 from '../../assets/openpay/stores/07.png'
import src8 from '../../assets/openpay/stores/08.png'


const CardIcons = props => {
  return (
    <Content>
      <FlexContent>
        <IconStore src={src1} />
        <IconStore src={src2} />
        <IconStore src={src3} />
        <IconStore src={src4} />
        <IconStore src={src5} />
        <IconStore src={src6} />
        <IconStore src={src7} />
        <IconStore src={src8} />
      </FlexContent>
    </Content>
  )
}

const Content = styled('div')({
  marginTop: '50px',
  display: 'flex',
  '@media (max-width:700px)': {
    flexWrap: 'wrap',
  }
})

const FlexContent = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  width: '100%'
})

const IconStore = styled('img')({
  width: '80px',
  marginRight: '10px',
  display: 'block'
})
export default CardIcons

