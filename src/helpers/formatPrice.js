const formatPrice = (string) => {

  const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumSignificantDigits: 9
  })
  const stringParsed = formatter.format(string)
  return stringParsed
}

export default formatPrice