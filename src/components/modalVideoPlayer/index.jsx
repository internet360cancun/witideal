import React, { useState, useEffect } from 'react'
import { styled, Modal } from '@material-ui/core'
import Youtube from 'react-youtube'

const ModalBody = styled(Youtube)({
  border: 'none',
  outline: 'none',
})

const ModalStyled = styled(Modal)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  border: 'none',
  outline: 'none',
  '& *': {
    border: 'none',
    outline: 'none',
  }
})



const VideoPlayer = props => {
  const width = window.innerWidth
  const [isModalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    window.video = {
      open: () => setModalOpen(true),
      close: () => setModalOpen(false)
    }
  }, [])

  var w = Math.ceil(width * .70)
  if(width < 700) w = Math.ceil(width * .90)
  const h = Math.ceil(w * .563)


  const opt = {
    controls: 0,
    height: h,
    width: w,
    playerVars: {
      controls: 0,
      autoplay: 1,
    },
  }

  return (
    <ModalStyled open={isModalOpen} onClose={ _event => setModalOpen(false)} >
        <div>
          <ModalBody
            onEnd={() => setModalOpen(false)}
            videoId='GbXjXwBlaJQ'
            opts={opt}
          />
        </div>
      </ModalStyled>
  )
}

export default VideoPlayer
