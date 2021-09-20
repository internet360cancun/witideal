function mapObjects (object = {}, handler) {
  const keys = Object.keys(object)
  return keys.map((keyname, index) => {
    const value = object[keyname]
    return handler(keyname, value, index)
  })
}

export default mapObjects