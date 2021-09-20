import { styled } from '@material-ui/core/styles'
import React from 'react'

const Picture = (props) => {
  return (
    <PictureContainer {...props}>
      <PictureImg src={props.src} />
    </PictureContainer>
  )
}

export default Picture

const PictureContainer = styled('div')({
  minWidth: '50px',
  minHeight: '50px',
  overflow: 'overflow',
  position: 'relative',
  borderRadius: props => props.radius || '0px',
})

const PictureImg = styled('img')({
  position: "absolute",
  minWidth: "1000%",
  minHeight: "1000%",
  left: "50%",
  top: "50%",
  transform: "translateX(-50%) translateY(-50%) scale(0.1)",
  zIndex: "1",
})
