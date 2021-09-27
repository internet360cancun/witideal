import React, { useEffect, useContext, useState, Fragment } from 'react'
import { Grid } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import sessionContext from '../../contexts/sessionContext'
import FavoriteCard from '../FavoriteCard/favoriteCard'
import connect from '../../firebase'
import { styled } from '@material-ui/core/styles'
import emptyFavorite from '../../assets/specificDataIcons/emptyFavorite.svg'

const SkeletonRender = () => (
  <Grid item xs={12} md={6} lg={3}>
    <Skeleton variant="rect" height={350} />
    <Skeleton variant="text" width={250} />
    <Skeleton variant="text" />
    <Skeleton variant="text" width={250} />
  </Grid>
)


const MyFavoriteList = () => {
  const session = useContext(sessionContext)
  const [state, setState] = useState({items: [], loading: true})

  const handleDeleteFavorite = (property_reference) => {
    const favorite_references = state.items.map(item => item._ref)
    const new_favorites_filtered = favorite_references.filter(item => item !== property_reference)
    connect.users.updateFavorite(session.uId, new_favorites_filtered)
  }

  useEffect(() => {
    const unsubscribe = connect.users.onFavoriteChange(session.uId)(items => {
      setState({...state, items, loading: false})
    })
    return () => unsubscribe()
  },[])

  return (
    <Fragment>
      {state.items.length > 0 && !state.loading && (
        state.items.map(item => (
          <Grid key={item._id} item xs={12} sm={6} md={4} >
            <FavoriteCard
              properData={item}
              handleDeleteFavorite={handleDeleteFavorite}
            />
          </Grid>
        ))
      )}
      {state.items.length === 0 && state.loading && (
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
      {state.items.length < 1 && !state.loading && (
        <EmptyMessage item xs={12}>
          <Icon src={emptyFavorite} />
          <Message>
              Pulsa sobre el ícono del corazón y guarda aquí tus inmuebles favoritos hasta que encuentres el ideal.
          </Message>
        </EmptyMessage>
      )}

    </Fragment>
  )
}

const Icon = styled('img')({
  width: '100px',
  marginBottom: '30px',
})

const Message = styled('p')({
  maxWidth: '600px',
  color: '#e7e2fe',
  fontSize: '1.2rem',
  lineHeight: '1.5em',
})

const EmptyMessage = styled(Grid)({
  minHeight: '60vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column'
})

export default MyFavoriteList
