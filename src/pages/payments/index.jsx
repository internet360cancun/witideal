import React, { useEffect, useContext, useState } from 'react'
import connect from '../../firebase'
import sessionContext from '../../contexts/sessionContext'
import useFetch from '../../Hooks/useFetch'
import View from './view'

const MyPayments = () => {
  
  const session = useContext(sessionContext)
  const [state, setState] = useState({
    loading: 
    true, 
    items: [], 
    latestItem: null, 
    limit: 8, 
    noMore: false
  })

  useEffect(() => { window.scrollTo(0, 0) }, [])
  
  useEffect( () => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }) 

  useFetch(() => {
    handleFetch()
  },[])
  
  const handleFetch = async () => {
    setState({...state, loading: true})
    const { items, latestItem } = await connect.users.getPayments(session.uId, state.latestItem, state.limit)
    const noMore = items.length < state.limit
    setState({...state, items: [...state.items, ...items], latestItem, loading: false, noMore})
  }

  function handleScroll () {
    if (state.loading) return false
    if (state.noMore) return false
    const scrolled = window.scrollY;
    const viewportHeight = window.innerHeight;
    const fullHeight = document.getElementById('root').clientHeight;
    if ((scrolled + viewportHeight + 500) < fullHeight) return false;
    handleFetch()
  }

  
  return (
    <View 
      {...state}
    />
  )
}

export default MyPayments
