const months = {
  '01': 'Enero',
  '02': 'Febrero',
  '03': 'Marzo',
  '04': 'Abril',
  '05': 'Mayo',
  '06': 'Junio',
  '07': 'Julio',
  '08': 'Agosto',
  '09': 'Septiembre',
  '10': 'Octubre',
  '11': 'Noviembre',
  '12': 'Diciembre'
}

// convert date to month and year
function parseMonthName (date) {
  
  const month = date.slice(-2)
  const year = date.slice(0,4)

  return `${months[month]} ${year}`
}

export default parseMonthName