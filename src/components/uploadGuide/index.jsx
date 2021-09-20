import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { renderToStaticMarkup } from 'react-dom/server'
import arrowSrc from '../../assets/arrow.png'
import { ClickAwayListener, Box, useMediaQuery } from '@material-ui/core'

const FullWidthCentered = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  width: 100%;
  height: 100vh;
  background: red;
  background: #8e8f98a6;
  z-index: 99;
  top: 0px;
`

const Body = styled.div`
  margin-top: 50px;
  max-width: 700px;
  width: 90%;
  height: 400px;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding: 50px;
  box-sizing: border-box;
  outline: none;
  font-size: 2.3em;
  text-align: center;
  color: var(--blue-hover);
  border-radius: 10px;
  flex-direction: column;
  line-height: 1.3em;
  box-shadow: 1px 1px 5px #807e7e;
  @media screen and (max-width:1600px) {
    height: 350px;
    font-size: 1.8em;
  }
  @media screen and (max-width:1300px) {
    height: 300px;
    font-size: 1.5em;
    max-width: 500px;
  }
  @media screen and (max-width:1100px) {
    height: auto;
    font-size: 1.3em;
  }
`

const Arrow = styled.img`
  color: #fff;
  position: absolute;
  width: 50px;
  top: 78px;
  left: 0;
  right: 0;
  margin: auto;
  @media screen and (max-width:1600px) {
    width: 40px;
    top: 60px;
  }
  @media screen and (max-width:1300px) {
    width: 30px;
  }
  @media screen and (max-width:1100px) {
    width: 25px;
  }
`

const Primary = styled.div`
  color: var(--blue-dark);
  font-weight: bold;
`

const Third = styled.div`
  color: var(--blue);
  font-size: .6em;
  line-height: 1.3em;
  span {
    font-weight: bold;
  }
`


const HelperArrow = () => {
  return (
    <Arrow src={arrowSrc} />
  )
}

const UploadGuide = props => {
  const [isActive, setActive] = useState(false)
  const shouldRender = useMediaQuery('(min-width:960px)')

  // render helpers
  useEffect(() => {
    setTimeout(() => {
      try {
        const node = document.getElementById('target_guide_here')
        node.innerHTML = isActive ? renderToStaticMarkup(<HelperArrow />) : ''
      } catch (error) {
        console.log(error)
      }
    }, 10)
  }, [isActive])

  // add methos to widows
  useEffect(() => {
    window.uploadguide = {
      open: () => setActive(true),
      close: () => setActive(false)
    }
  }, [])
  

  const handleClick = event => {
    setActive(false)
  }

  if (!isActive) return null
  if (!shouldRender) return null

  return (
    <>
      {isActive && (
        <div dangerouslySetInnerHTML={{ __html: `
          <style>
            #target_guide {
              background: var(--blue);
              color: #fff;
              zIndex: 99999999!important;
              position: relative;
            }
          </style>
      ` }}/>
      )}
      <FullWidthCentered open={isActive} onClose={event => setActive(false)}>
        <ClickAwayListener onClickAway={handleClick}>
          <Body>
            <Primary>Sigue Cargando</Primary>
            <Box pt={{ xs: 3, lg:4 }} />
            <Third>Da click al botón de <span>"Anunciar"</span> que se encuentra en la barra superior y sigue cargando todo tu inventario</Third>
          </Body>
        </ClickAwayListener>
      </FullWidthCentered>
    </>
  )
}

export default UploadGuide
