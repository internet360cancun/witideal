import React from 'react'
import { styled } from '@material-ui/core/styles'
import src1 from '../../assets/openpay/1.png'
import src2 from '../../assets/openpay/2.png'
import src3 from '../../assets/openpay/3.png'
import src4 from '../../assets/openpay/4.png'
import src5 from '../../assets/openpay/5.png'
import src6 from '../../assets/openpay/6.png'
import src7 from '../../assets/openpay/7.png'
import src8 from '../../assets/openpay/8.png'
import src9 from '../../assets/openpay/9.png'
import src10 from '../../assets/openpay/10.png'
import src11 from '../../assets/openpay/11.png'
import src12 from '../../assets/openpay/12.png'


const CardIcons = props => {
  return (
    <Content>
      {props.type !== 'spei' && (
        <CreditContent>
          <Title>Tarjetas de crédito</Title>
          <IconsCredit src={src7} />
          <IconsCredit src={src10} />
          <IconsCredit src={src11} />
        </CreditContent>
      )}
      <DebitContent data={props.type}>
        {props.type !== 'spei' && (
          <Title>Tarjetas de débito</Title>
        )}
        <IconsDebit data={props.type} src={src1} />
        <IconsDebit data={props.type} src={src2} />
        <IconsDebit data={props.type} src={src3} />
        <IconsDebit data={props.type} src={src5} />
        <IconsDebit data={props.type} src={src8} />
        <IconsDebit data={props.type} src={src9} />
        <IconsDebit data={props.type} src={src12} />
        <IconsDebit data={props.type} src={src4} />
        <IconsDebit data={props.type} src={src6} />
      </DebitContent>
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

const DebitContent = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  width: props => props.data === 'spei' ? '100%' : '60%',
  alignItems: 'center',
  '@media (max-width:700px)': {
    width: '100%!important',
  }
})
const CreditContent = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  alignItems: 'center',
  width: '40%',
  borderRight: '2px solid #cdcdcd',
  marginRight: '10px',
  '@media (max-width:700px)': {
    width: '100%!important',
    marginRight: '0px',
    marginBottom: '20px',
  }
})
const Title = styled('div')({
  width: '100%',
  fontSize: '1em',
  marginBottom: '25px',
  textAlign: 'center',
})

const IconsCredit = styled('img')({
  width: '60px',
  marginRight: '10px',
  display: 'block',
  '@media (max-width:700px)': {
    width: '35px'
  }
})

const IconsDebit = styled('img')({
  width: props => props.data === 'spei' ? '120px' : '80px',
  marginRight: '10px',
  display: 'block'
})
export default CardIcons

