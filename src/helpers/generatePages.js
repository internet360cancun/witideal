export function generateGroup(page){
  var _module = page % 3
  if (_module === 1) return [page, page + 1, page + 2]
  if (_module === 2) return [page - 1, page, page + 1]
  if (_module === 0) return [page - 2, page - 1, page]
}

function generatePages (currentPage, numItems, itemsForPage) {
  const pages = Math.ceil(numItems / itemsForPage)
  return generateGroup(currentPage).filter(p => p <= pages)
}

export default generatePages

