import React, { useState, useEffect, Fragment } from 'react'
import useSession from '../../../../Hooks/useSession'
import useFetch from '../../../../Hooks/useFetch'
import connect from '../../../../firebase'
import {Paper, Box, Avatar, CircularProgress } from '@material-ui/core'
import { styled } from '@material-ui/core/styles'
import { Skeleton } from '@material-ui/lab'
import { useHistory } from 'react-router-dom'
import userDefaultPhoto from '../../../../assets/specificDataIcons/logIn.svg'
import numAppartments from '../../../../assets/specificDataIcons/numAppartments.svg'
import emptyNotification from '../../../../assets/specificDataIcons/emptyNotificaction.svg'


const NotificationList = (props) => {
  const { uId } = useSession()
  const history = useHistory()
  const initilState = {
    items: [],
    latest_item: null,
    no_more: false,
    loading: true,
    limit: 6,
  }
  const [state, setState] = useState(initilState)

  const handleFetch = async () => {
    setState({...state, loading: true})
    const {items, latest_item} = await connect.notification.getList(uId, state.latest_item, state.limit)
    const no_more = items.length < state.limit ? true : false
    setState({...state, no_more, loading: false, latest_item, items: state.items.concat(items)})
  }

  const handleClick = (item) => {
    connect.notification.setViewed(uId,item._id)
    history.push(`/contactos/${item.pId}/${item.uId}`)
    
  }

  const handleScroll = event => {
    if (state.loading) return false
    if (state.no_more) return false
    const notification = document.getElementById('notification')
    const scrolled = event.target.scrollTop
    const viewportHeight = notification.clientHeight;
    const fullHeight = document.getElementById('fullheight').clientHeight;
    if ((scrolled + viewportHeight + 100) < fullHeight) return false;
    handleFetch()
  }

  useFetch(handleFetch,[])

  useEffect(() => {
    const notification = document.getElementById('notification')
    notification.addEventListener('scroll', handleScroll)
    return () => notification.removeEventListener('scroll', handleScroll)
  }, [state.loading,state.no_more])

  return (
    <NotificationContainer id='notification'>
      <div id='fullheight'>
      {state.items.length > 0 && (
        state.items.map(item => (
          <ContainerCard p={1} key={item._id} viewed={item.isViewed.toString()}
            onClick={() => handleClick(item)}
          >
            <UserPicture src={item.photo || userDefaultPhoto} />
            <Typography>
              A <span>{item.name || ''}</span> le ha interesado tu inmueble con pId: {item.pId || ''}
            </Typography>
            <PropertyPictureContent>
              <PropertyPicture src={item.principalPhotoPath || numAppartments}/>
            </PropertyPictureContent>
          </ContainerCard>
        ))
      )}
      {state.loading && !state.no_more && state.items.length > 0 && (
        <LoadingComponent />
      )}
      {state.items.length === 0 && state.loading && (
        <Fragment>
          <SkeletonComponent />
          <SkeletonComponent />
          <SkeletonComponent />
          <SkeletonComponent />
          <SkeletonComponent />
          <SkeletonComponent />
        </Fragment>
      )}
      {!state.loading && state.items.length < 1 && (
        <MesageEmpty>
          <Icon src={emptyNotification} />
          <Message>
            No tienes notificaciones
          </Message>
        </MesageEmpty>
      )}    
      </div>
    </NotificationContainer>
  )
}

const SkeletonComponent = () => (
  <ContainerCard p={1}>
    <Skeleton variant='circle' width='45px' height='45px' />
    <Typography>
      <Skeleton variant='text' height='25'/>
      <Skeleton variant='text' height='25'/>
    </Typography>
    <PropertyPictureContent>
      <Skeleton variant='text' width='60px' height='60px'/>
    </PropertyPictureContent>
  </ContainerCard>
)
const LoadingComponent = styled(CircularProgress)({
  margin: '20px 0px',
  width: '30px!important',
  height: '30px!important'
})

const NotificationContainer = styled(Paper)({
  maxHeight: '400px',
  overflowY: 'auto',
  '&::-webkit-scrollbar': {
    width: '8px',
    background: '#00000010'
  },
 

 
'&::-webkit-scrollbar-thumb': {
  borderRadius: '10px',
  webkitboxshadow: 'inset 0 0 6px rgba(0,0,0,0.5)',
  background: '#cdcdcd',
  display: 'none'
},
'&::-webkit-scrollbar-thumb:hover': {
  display: 'block'
}
})

const UserPicture = styled(Avatar)({
  width: '60px', 
  height: '60px',
  minWidth: '60px', 
  minHeight: '60px',
  marginRight: '5px',
})

const ContainerCard = styled(Box)({
  background: props => props.viewed === 'false' ? '#E6E1FF' : '',
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
})

const PropertyPictureContent = styled('div')({
  width: '60px', 
  height: '60px',
  minWidth: '60px', 
  minHeight: '60px',
  overflow: 'hidden',
  borderRadius: '10px',
})

const PropertyPicture = styled('img')({
  width: 'inherit'
})

const Typography = styled('p')(({theme}) => ({
  fontSize: '.9em',
  width: '200px',
  padding: '0px',
  margin: '0px',
  color: theme.purple,
  textAlign: 'left',
  '& span': {
    fontWeight: 'bold'
  },
}))

const MesageEmpty = styled('div')({
  textAlign: 'center',
  padding: '50px 0px',
  color: '#cdcdcd'
})

const Icon = styled('img')({
  width: '80px',
  marginBottom: '20px',
})

const Message = styled('p')({
  color: '#e7e2fe'
})

export default NotificationList