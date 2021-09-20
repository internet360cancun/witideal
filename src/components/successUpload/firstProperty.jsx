import React, { useState, useEffect } from 'react'
import { Box, Paper, useMediaQuery, IconButton } from '@material-ui/core'
import styled from 'styled-components'
import { Close } from '@material-ui/icons'
import Youtube from 'react-youtube'


const PaperStyled = styled(Paper)`
  position: relative;
  width: 90%;
  min-height: 40vh;
  outline: none;
  max-width: 800px;
  @media screen and (max-width:1400px) {
    max-width: 800px;
    font-size: .8em;
  }
  @media screen and (max-width:1000px) {
    font-size: .8em;
  }
`
const Name = styled.div`
  font-size: 2.7em;
  text-align: center;
  color: var(--blue);
  font-weight: bold;
  width: 80%;
  margin: auto;
  @media screen and (max-width:1300px) {
    font-size: 2.5em;
  }
  @media screen and (max-width:600px) {
    font-size: 2em;
  }
  @media screen and (max-width:400px) {
    font-size: 1.5em;
  }
`
const Seconday = styled.div`
  font-size: 1.4em;
  text-align: center;
  color: var(--blue-hover);
  max-width: 480px;
  line-height: 1.4em;
  margin: auto;
  @media screen and (max-width:1400px) {
    max-width: 350px;
  }
  @media screen and (max-width:500px) {
    font-size: 1.3em;
  }
  span {
    font-weight: bold;
  }
`

const IconButtonStyled = styled(IconButton)`
  position: absolute;
  right: 0px;
`

const VideoContainer = styled.div`
  width: 80%;
  margin: auto;
  @media screen and (max-width:1400) {
    width: 85%;
  }
  @media screen and (max-width:800px) {
    width: 90%;
  }
  @media screen and (max-width:400px) {
    width: 100%;
  }
`

const Video = styled(Youtube)({
  border: 'none',
  outline: 'none',
})

const SuccessWithoutWiticoins = props => {
  const isMobile = useMediaQuery('(max-width:600px)')
  const [containerVideoWidth, setVideoContainerWidth] = useState(0)
  const h = Math.ceil(containerVideoWidth * .562)
  

  useEffect(() => {
    const width_ = document.getElementById('videocontainermodal').offsetWidth
    if (width_ !== containerVideoWidth) setVideoContainerWidth(width_)
  }, [containerVideoWidth])

  const opt = {
    controls: 0,
    height: h,
    width: containerVideoWidth,
    playerVars: {
      controls: 0,
    },
  }

  return (
    <PaperStyled elevation={3}>
      <IconButtonStyled onClick={props.onClose}>
        <Close />
      </IconButtonStyled>
      <Box p={isMobile ? 3 : 5}>
        <Box pt={1} pb={1}>
          <Name>¡Felicidades!</Name>
        </Box>
        <Box pt={1} pb={1}>
          <Seconday>Tu inmueble quedó publicado y has recibido  <span> 100 witicoins GRATIS.</span></Seconday>
        </Box>
        <Box pt={1} pb={2}>
          <Seconday>Si tienes duda de cómo funciona witideal, ve el siguiente video:</Seconday>
        </Box>
        <VideoContainer id='videocontainermodal'>
          {containerVideoWidth && (
            <Video
              onEnd={props.onClose}
              videoId='GbXjXwBlaJQ'
              opts={opt}
            />
          )}
        </VideoContainer>
      </Box>
    </PaperStyled>
  )
}

export default SuccessWithoutWiticoins
