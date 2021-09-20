import React, { useState, useEffect, Fragment } from 'react'
import NotificationIcon from '../../../../assets/specificDataIcons/notific.svg';
import {styled} from '@material-ui/core/styles'
import { Box } from '@material-ui/core'
import {IconButton} from '@material-ui/core/'
import connect from '../../../../firebase'
import useSession from '../../../../Hooks/useSession'
import ListNotifications from './list_notifications'
import renderLayer from '../../../../layouts/layer'

const Notific = (props) => {
  const { uId } = useSession()
  const [conuter, setCounter] = useState(0)
  const [isActive, setIsActive] = useState(false)
  
  useEffect(() => {
    renderLayer(
      isActive, 
      () => {setIsActive(false)}
    )
  }, [isActive])

  useEffect(() => {
    const unsubscribe = connect.notification.onChangeNumber(uId)( number => setCounter(number))
    return () => unsubscribe()
  },[uId])

  const handleClick = async (e) => {
    setIsActive(!isActive)
    await connect.notification.resetCounter(uId)
  }

  return (
    <Fragment>
      <Notification onClick={handleClick}>
        <IconButton>
          {conuter > 0 && (
            <Counter>
              {conuter}
            </Counter>
          )}
          <Icon src={NotificationIcon} />
        </IconButton>
        {isActive && (
          <ContainerList>
            <ListNotifications />
          </ContainerList>
        )}
      </Notification>
    </Fragment>
  )
}

//styles
export const Notification = styled(Box)({
  position: 'relative',
  '@media screen and (max-width:500px)': {
    position: 'initial',
  }
})

export const Icon = styled('img')({
  width: '22px',
})

export const Counter = styled('div')(({theme}) => ({
  position: 'absolute',
  fontSize: '13px',
  top: '6px',
  left: '6px',
  borderRadius: '50%',
  width:'18px',
  height: '18px',
  color: theme.colorBlue,
  fontWeight: 'bold',
  background: '#32FFD2',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
}))

export const ContainerList = styled('div')({
  position: 'absolute',
  width: '350px',
  right: 0,
  '@media screen and (max-width:500px)': {
    width: '90vw',
    boxSizing: 'border-box',
    right: 0,
    left: 0,
    margin: 'auto'
  }
})

export default Notific