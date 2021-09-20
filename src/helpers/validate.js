export const requires = (state, requires) => {
  const emptyInputs = requires.filter(name => !state[name])
  return emptyInputs.length ? emptyInputs : false
}

export const filterObject = (object, allows) => {
  const scoppedObject = { ...object }
  Object.keys(scoppedObject).forEach(keyname => {
    if (!allows.includes(keyname)) delete scoppedObject[keyname]
  })
  return scoppedObject
}

export const validateEmail = email => {
  var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
  return !!regex.test(email)
}