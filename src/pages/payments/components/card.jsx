import React from 'react'
import { styled } from '@material-ui/core/styles'
import { Paper, Box } from '@material-ui/core'

const calculateBoder = ({method}) => {
  if (method === 'store') return '5px solid #3f19f9'
  if (method === 'bank_account') return '5px solid rgb(30, 14, 111)'
  if (method === 'Paypal') return '5px solid #1597d1'
  return '5px solid rgb(50, 255, 210)'
}

const Content = styled(Paper)({
  borderLeft: calculateBoder,
  minHeight: '100px'
})

const Row = styled('div')({
  textAlign: "left", 
  display: 'flex'
})

const Description = styled('div')({
  width: '130px', 
  marginRight: '10px',
  fontWeight: 'bold'
})

const Value = styled('span')(({theme}) => ({
  color: theme.wdPurpleSubtitle,
}))

const Data = styled('div')({
  color: 'gray', 
  textAlign: "left",
})


const formatter = (string) => {
  let stringParsed = string
  const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumSignificantDigits: 9
  })
  stringParsed = formatter.format(stringParsed)
  return `$ ${stringParsed}`
}

const Card = (props) => {
  
  console.log(props)
  
  let amount = props.amount ? props.amount : props.transaction ? props.transaction.amount : props.resource.amount.value
  let method = props.method ? props.method : props.transaction ? props.transaction.method : 'Paypal'


  amount = formatter(amount)

  const order_id = props.order_id ? props.order_id : props.transaction ? props.transaction.order_id : props.resource.custom_id

  let methodPay
  if (method === "store") methodPay = 'Tienda'
  if (method === "bank_account") methodPay = 'SPEI'
  if (method === "card") methodPay = 'Tarjeta'
  if (!methodPay) methodPay = method


  const dateParsed = new Date(props.chargeDate.toDate()).toLocaleDateString();

  
  return (
    <Content elevation={3} method={method}>
      <Box p={2}>
        <Data>{dateParsed}</Data>
        <Row>
          <Description>Método de pago</Description>
          <Value>{methodPay}</Value>
        </Row>
        <Row>
          <Description>Orden de pago</Description>
          <Value>{order_id}</Value>
        </Row>
        <Row>
          <Description>Cantidad</Description>
          <Value>{amount}</Value>
        </Row>
      </Box>
    </Content>
  )
}

export default Card