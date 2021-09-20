/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'

const useHeaderHeight = () => {
  const [height, setHeight] = useState(0)
  
  useEffect(() => {
    try {
      const element = document.getElementById('headerHeight')
      const currentHeight = element.offsetHeight
      console.log('element', element, currentHeight)
      if (height !== currentHeight) setHeight(currentHeight)
    } catch (error) {
      console.log('useHeaderHeightError', error)
    }
  })

  return height
}

export default useHeaderHeight