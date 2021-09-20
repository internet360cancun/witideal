function calculate (price, type){
  const cost = type === 'buy' 
    ? price * 0.00001
    : price * 0.001
  return cost > 300 ? 300 : Math.ceil(cost)
}

export default calculate