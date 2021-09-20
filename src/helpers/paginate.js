const paginate = (data, length) => {
  var currentPage = 1
  return () => {
    var start = (currentPage - 1) * length
    var end = start + length
    const itemsOnCurrentPage = data.slice(start, end)
    currentPage = currentPage + 1
    return itemsOnCurrentPage
  }
}

export default paginate
