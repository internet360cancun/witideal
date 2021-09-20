import { useState } from 'react'

const useObjectState = initialState => {
  const [state, setState] = useState(initialState || {})

  const updateState = newState => {
    setState({
      ...state,
      ...newState
    })
  }

  return [state, updateState, setState] 
}

export default useObjectState
