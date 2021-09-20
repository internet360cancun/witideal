export const toNumber = (string) => {
  if (!string) return ""
  let stringParsed = string.toString()
  stringParsed = stringParsed.replace(/,/g, '')
  stringParsed = stringParsed.replace('$', '')
  stringParsed = stringParsed.replace(' ', '')
  if (stringParsed === "") return null
  stringParsed = stringParsed > 99999999 ? 99999999 : parseInt(stringParsed)
  return stringParsed
}

export const toCurrency = (string) => {
  if (!string) return ""
  let stringParsed = string.toString();
  stringParsed = stringParsed.replace(/,/g, '')
  stringParsed = stringParsed.replace('$', '')
  stringParsed = stringParsed.replace(/[a-zA-Z]/g, '')
  stringParsed = stringParsed.replace(' ', '')
  stringParsed = parseInt(stringParsed)
  stringParsed = stringParsed > 99999999 ? 99999999 : stringParsed
  const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumSignificantDigits: 9
  })
  stringParsed = formatter.format(stringParsed)
  return stringParsed.length > 0 ? `$ ${stringParsed}` : ""
}

export const formatHumanNumber = (amount, decimalCount = 2, decimal = ".", thousands = ",") => {
  try {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;
    const negativeSign = amount < 0 ? "-" : "";
    let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
    let j = (i.length > 3) ? i.length % 3 : 0;
    return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
  } catch (e) {
    return console.log(e)
  }
}

export default {
  toCurrency,
  toNumber,
  formatHumanNumber
}

