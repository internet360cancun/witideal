const timer = (time) => {
  return new Promise( resolver => {
    setTimeout(
      () => resolver(true),
      time
    )
  } )
}

export default timer