const constExchangeCredentials = (priceMxn, action) => {
  const buy = 0.00002
  const rent = 0.0015
  if (action === 'rent') {
    return Math.ceil(rent * priceMxn)
  } else {
    return Math.ceil(buy * priceMxn)
  }
}

export default constExchangeCredentials
