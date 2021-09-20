import React, { useEffect, useContext, useState, Fragment } from 'react'
import { Grid, CircularProgress, Box } from '@material-ui/core'
import { styled } from '@material-ui/core/styles'
import { Skeleton } from '@material-ui/lab'
import useFirebaseTools from '../../Hooks/useFirebaseTools'
import sessionContext from '../../contexts/sessionContext'
import InterestedCard from '../InterestedCard/interestedCard'
import snapshotParser from '../../helpers/snapshotParser'
import { deleteLikedProperties } from '../../firebase/property'
import { setAlert } from '../Alert/alert'
import EmptyMessage from '../../layouts/emptyMessage'

const ProgresContainer = styled(Box)({
  marginTop: '70px', 
  marginBottom: '30px',
})

const SkeletonRender = () => (
  <Grid item xs={12} md={6} lg={3}>
    <Skeleton variant="rect" height={350} />
    <Skeleton variant="text" width={250} />
    <Skeleton variant="text" />
    <Skeleton variant="text" width={250} />
  </Grid>
)


const MyFavoriteList = () => {
  const [data, setData] = useState({
    loading: true,
    items: [],
    latestItem: null,
    noMore: false,
    limit: 9,
  })

  const { getPaginatedLikedProperties } = useFirebaseTools()
  const session = useContext(sessionContext)
  
  const handleFetch = async () => {
    setData({...data, loading: true})
    let { items, latestItem } = await getPaginatedLikedProperties(session.uId, data.limit, data.latestItem)
    const items_ = snapshotParser(items);
    setData({
      ...data,
      loading: false, 
      items: data.items.concat(items_),
      noMore: items_.length < data.limit ? true : false,
      latestItem: latestItem || null,
    }) 
  }

  const onDeleteClick = (data) => {
    setAlert(
      () => handleDelete(data),
      'Eliminar inmueble interesado',
      '¿Seguro que quieres eliminar este inmueble de tu lista?',
      'warning',
      'eliminar',
    )
  } 

  useEffect(() => {
    handleFetch()
    window.scrollTo(0,0)
  }, [])
  
  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  },[data.loading, data.latestItem])

  function handleScroll () {
    if (data.loading) return false
    if (data.noMore) return false
    const scrolled = window.scrollY;
    const viewportHeight = window.innerHeight;
    const fullHeight = document.getElementById('root').clientHeight;
    if ((scrolled + viewportHeight + 500) < fullHeight) return false;
    console.log('fetch ')
    handleFetch()
  }

  const handleDelete = async itemData => {
    const newItems = data.items.map(item => { if (itemData.pId === item.pId) item.loading = true; return item })
    setData({ ...data, items: newItems })
    await deleteLikedProperties(session.uId, itemData.pId)
    const newItemsAfterDelete = data.items.filter(item => item.pId !== itemData.pId)
    setData({ ...data, items: newItemsAfterDelete })
  }

  return (
    <Fragment>
      {data.items.length > 0 && (
        data.items.map(item => (
          <Grid key={item._id} item xs={12} sm={6} md={6} lg={4} >
            <InterestedCard
              {...item} ref={null} onDeleteClick={onDeleteClick}
            />
          </Grid>
        ))
      )}
      {data.items.length > 0 && data.loading && (
        <Grid item xs={12}>
          <ProgresContainer >
            <CircularProgress />
          </ProgresContainer>
        </Grid>
      )}
      {data.items.length === 0 && data.loading && (
        <React.Fragment>
          <SkeletonRender />
          <SkeletonRender />
          <SkeletonRender />
          <SkeletonRender />
          <SkeletonRender />
          <SkeletonRender />
          <SkeletonRender />
          <SkeletonRender />
        </React.Fragment>
      )}
      {!data.loading && !data.items.length && (
        <EmptyMessage message='Aún no tienes inmuebles en tu lista' />
      )}
    </Fragment>
  )
}

export default MyFavoriteList
