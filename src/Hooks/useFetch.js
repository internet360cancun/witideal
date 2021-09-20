import {useEffect} from 'react'
// function only for async process, 
// input: async function || 
// return: noting

const useFetch = (handler, dependencies = []) => {
  useEffect(() => {
    handler()
  }, dependencies)
}

export default  useFetch