const deleteObjectKey = (object, keys) => {
  const new_object = {...object}
  if (typeof keys === 'string'){
    delete new_object[keys]
  } else {
    keys.forEach(keyname => {
      delete new_object[keyname]
    })
  }
  return new_object
}

export default deleteObjectKey