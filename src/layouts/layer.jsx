import React, { useState } from 'react'
import {styled} from '@material-ui/core/styles'

const LayerStyled = styled('div')({
  position: 'fixed',
  width: '100%',
  height: '100%',
  background: '#00000052',
  zIndex: '10'
})

var layerController = {
  isActive: false,
  handleClick: null,
  updater: () => {},
  renderLayer: (active, handleClick) => {
    if (active){
      layerController.isActive = true
      layerController.handleClick = handleClick
      layerController.updater()
    } else {
      layerController.isActive = false
      layerController.handleClick = null
      layerController.updater()
    }
  },
}


export const Layer = () => {
  const [updater, setUpdater] = useState(0)
  const handleUpdate = () => {
    setUpdater(updater + 1)
  }
  layerController.updater = handleUpdate
  if (!layerController.isActive) return null
  return (
  <LayerStyled 
    onClick={layerController.handleClick}
  />)
}

export default layerController.renderLayer
