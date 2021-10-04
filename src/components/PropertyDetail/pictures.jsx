import React, { useState } from 'react'
import { styled } from '@material-ui/core/styles'
import  useMediaQuery from '@material-ui/core/useMediaQuery'

const Pictures = (props) => {

  const movileHidde = useMediaQuery('(max-width:650px)')
  const [renderBackdrop, setBackdrop] = useState(false)
  const photos = props.photos.map(url => url.replace(' ', '+'))


  
  return (
    <Container onMouseLeave={() => setBackdrop(false)} onMouseEnter={() => setBackdrop(true)}>
      {renderBackdrop && (
        <>
          <PhotoCounter>
            {props.photos.length} Fotos
          </PhotoCounter>
          <ShowMore>
            Ver más
          </ShowMore>
        </>
      )}
      {!movileHidde && (
        <ImagesCntainer>
          <Picture
            style={{backgroundColor: renderBackdrop ? 'rgba(0, 0, 0, 0.6)' : 'rgba(0, 0, 0, 0)'}} 
            src={photos[1]}
          />
        </ImagesCntainer>
      )}
      <ImagesCntainer>
        <Picture
          style={{backgroundColor: renderBackdrop ? 'rgba(0, 0, 0, 0.6)' : 'rgba(0, 0, 0, 0)'}}
          src={photos[0]}
        />
      </ImagesCntainer>
      {!movileHidde && (
        <ImagesCntainer>
          <Picture
            style={{backgroundColor: renderBackdrop ? 'rgba(0, 0, 0, 0.6)' : 'rgba(0, 0, 0, 0)'}}
            src={photos[2]}
          />
        </ImagesCntainer>
      )}
   </Container>
  )
}

export default Pictures


// only styles 
const Container = styled ('section')({
  position: 'relative',
  height: '350px',
  display: 'flex',
  alignItems: 'strech',
  justifyContent: 'center',
  '@media (max-width:1000px)': {
    height: '280px',
  },
})

const ImagesCntainer = styled('div')({
  width: '35%',
  height: '100%',
  overflow: 'hidden',
  '@media (max-width:650px)': {
    width: '100%'
  }
})

const Picture = styled('div')({
  backgroundBlendMode: 'color',
  backgroundImage: props => `url('${props.src}')`,
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  cursor: 'pointer',
  transition: 'all 300ms',
  '&:hover': {
    transform: 'scale(1.1)',
  }
})

const PhotoCounter = styled('div')({
  position: 'absolute',
  bottom: '20px',
  right: '20px',
  zIndex: 10,
  backgroundColor: '#fff',
  width: '80px',
  padding: '8px',
  textAlign: 'center',
  borderRadius: '10px',
  height: '20px',
  cursor: 'pointer',
  fontWeight: 'bold',
  color: 'var(--blue)'
})
const ShowMore = styled(PhotoCounter)({
  top: 0,
  bottom: 0,
  right: 0,
  left: 0,
  margin: 'auto',
})
