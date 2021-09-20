import React from 'react'
import styled from 'styled-components'
import {MobileStepper as MobileStepperBase } from '@material-ui/core'
import SwipeableViews from 'react-swipeable-views'
import propTypes from 'prop-types'

const PictureViewer = props => {
  const [activeStep, setActiveStep] = React.useState(0)
  const maxSteps = props.pictures.length

  const handleStepChange = (step) => {
    setActiveStep(step)
  }

  return (
    <>
      <PicturesContainer onClick={props.onClick}>
        <SwipeableViews onChangeIndex={handleStepChange}>
          {props.pictures.map(step => (
            <Picture key={step} src={step} alt={step} />
          ))}
        </SwipeableViews>
        <ContainerStepper>
          <MobileStepper steps={maxSteps} position='static' variant='dots' activeStep={activeStep} />
        </ContainerStepper>
      </PicturesContainer>

    </>
  )
}

PictureViewer.propTypes = {
  pictures: propTypes.array
}

const Picture = styled.img`
  width: 100%;
  min-height: 400px;
  height: 400px;
  object-fit: cover;
`
const PicturesContainer = styled('div')`
  position: relative;
`

const MobileStepper = styled(MobileStepperBase)`
  background: none;
`
const ContainerStepper = styled.div`
  width: 100%;
  bottom: 10px;
  position: absolute;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`
export default PictureViewer
