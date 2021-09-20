function calculatePate(items, currentPage, itemsForPage) {
  const pointerStart = ((currentPage - 1) * itemsForPage)
  const newItems = items.slice(pointerStart, itemsForPage + pointerStart)
  return newItems
}

export default calculatePate