import React, { useState } from 'react'
import { styled } from '@material-ui/core/styles'
import {  Button } from '@material-ui/core'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore'

/*
  render gallery modal
  props: photos = array of pictures, handleClose = function, indexToStar::position to initial render,
  
*/ 
const Photos = (props) => {
  const start = props.index || 0
  const [currentPicture, setCurrentPicture] = useState(props.photos[start])
  const totalPhotos = props.photos.length
  const indexCurrentPhoto = props.photos.indexOf(currentPicture) + 1
  
  const handleNext = () => {
    var nextPhotoToLoad = props.photos.indexOf(currentPicture) + 1
    if (nextPhotoToLoad >= props.photos.length) nextPhotoToLoad = 0
    setCurrentPicture(props.photos[nextPhotoToLoad])
  }

  const handleBack = () => {
    const nextPhotoToLoad = props.photos.indexOf(currentPicture) - 1
    const latest_photo = props.photos[props.photos.length - 1]
    if (nextPhotoToLoad < 0) return setCurrentPicture(latest_photo)
    setCurrentPicture(props.photos[nextPhotoToLoad])
  }

  return (
    <Container>
      <Layer 
        onClick={props.handleClose}
      />
      <PaperStyled>
        <Counter>
        Foto {indexCurrentPhoto} / {totalPhotos}
        </Counter>
        <BackControl>
          <ButtonStyled color="primary" onClick={handleBack}>
            <NavigateBeforeIcon fontSize='large'/>
          </ButtonStyled>
        </BackControl>
        <Picture
          src={currentPicture}
        />
        <NextControl>
          <ButtonStyled color="primary" onClick={handleNext}>
            <NavigateNextIcon style={{color: 'red'}} fontSize='large'/>
          </ButtonStyled>
        </NextControl>
      </PaperStyled>
    </Container>  
  )
}

const Container = styled('div')(({theme}) => ({
  color: theme.colors.blue,
  position: 'fixed',
  width: '100%',
  height: '100%',
  zIndex: 1100,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '10px',
  boxSizing: 'border-box',
  top: '0',
  right: '0'
}))

const Layer = styled('section')(({theme}) => ({
  width: '100%',
  height: '100%',
  background: 'rgba(236, 232, 252, 0.9)',
  backgroundColor: theme.layer,
  position:  'absolute',
  
}))

const PaperStyled = styled('div')(({theme}) => ({
  background: '#000',
  height: '97%',
  overflow: 'hidden',
  width: '70%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: theme.colors.blue,
  position: 'relative',
  ['@media (max-width:1000px)']: {
    width: '80%',
    height: '70%',
  },
  ['@media (max-width:600px)']: {
    width: '98%',
    height: '60%',
  },
  ['@media (max-width:400px)']: {
    width: '100%',
    height: '50%',
    minHeight: '200px'
  }
}))

const Picture = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'contain'
})

const ButtonStyled = styled(Button)(({theme}) => ({
  color: '#fff',
  textTransform:"none",
  '& MuiButtonBase-root': {
    background: 'red'
  }
}))

const Controls = styled('div')(({theme}) => ({
  top: '50%',
  bottom: '50%',
  position: 'absolute',
  '& path': {
    color: theme.colors.blue
  }
}))

const NextControl = styled(Controls)({
  right: '0px',
})

const BackControl = styled(Controls)({
  left: '0px',
})

const Counter = styled('div')(({theme}) => ({
  color: theme.colors.blue_ligtht,
  fontWeight: 'bold',
  position: 'absolute',
  right: '20px',
  top: '20px',
}))

export default Photos