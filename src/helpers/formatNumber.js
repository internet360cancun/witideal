const formatNumber = number => {
  var spaces = []
  if (number.toString().length === 10) spaces = [2,6]
  if (number.toString().length === 8) spaces = [4]
  const spell = [...number.toString()]
  const newNumber = spell.map((letter, index) => spaces.includes(index) ? ` ${letter}` : letter)
  return newNumber.join('')
}

export default formatNumber
