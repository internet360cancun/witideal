/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import useHeaderHeight from '../../Hooks/useHeaderHeight'
import coverPicure from '../../assets/coverPicture.png'
import coverPicureMobile from '../../assets/coverMobile.png'
import coverArrow from '../../assets/coverArrow.png'
import { ButtonBase, useMediaQuery, Modal } from '@material-ui/core'
import { PlayArrow } from '@material-ui/icons'
import Youtube from 'react-youtube'
import { WrapperResponsive, TextPrimary } from './layout'
import { HashLink as Link } from 'react-router-hash-link';

const WrapperResponsiveMenu = styled(WrapperResponsive)`
  background: #3e18f2;
  margin-top: ${props => `${props.$top}px`};
  position: sticky;
  top: ${props => `${props.$top}px`};
  padding: 0px 5em;
  z-index: 10;
  @media screen and (max-width:600px) {
    background: #fff;
    padding: 0px 0em;
    border-bottom: 1px solid #cdcdcd;
  }
`
const MenuContainer = styled.div`
  padding: 12px 0px;
  width: 58%;
  display: flex;
  justify-content: space-between;
  @media screen and (max-width:600px) {
    width: 100%;
    position: relative;
    background: #fff;
    color: var(--blue);
    box-sizing: border-box;
    padding: 15px 15%;
    font-size: 1.2em;
    text-align: center;
    font-weight: bold;
  }
`

const FullWidtCover = styled.div`
  background: rgb(63,25,198);
  background: linear-gradient(1deg, rgba(63,25,198,1) 0%, rgba(62,24,242,1) 76%);
  padding-bottom: 1px;
  margin-bottom: 70px;
  @media screen and (max-width:1550px) {
    margin-bottom: 60px;
  }
  @media screen and (max-width:1300px) {
    margin-bottom: 50px;
  }
  @media screen and (max-width:1000px) {
    margin-bottom: 40px;
  }
  @media screen and (max-width:600px) {
    margin-bottom: 180px;
  }
`
const Content = styled.div`
  position: relative;
  height: 100%;
  min-height: ${props => `calc(100vh - ${props.$top + 70}px)`};
  margin-left: 5%;
  display: flex;
  text-align: left;
  align-items: center;
  justify-content: space-between;
  padding: 0px 0px;
  @media screen and (max-width:1650px) {
    min-height: auto;
  }
  @media screen and (max-width:600px) {
    flex-wrap: wrap;
    margin-left: 0px;
  }
`

const DataContainer = styled.div`
  width: 40%;
  @media screen and (max-width:600px) {
    width: 100%;
    padding: 10% 40px;
    padding-bottom: 50px;
    margin-top: 50px;
  }
`

const ImageContainer = styled.div`
  width: 50%;
  padding: 1px 0px;
  @media screen and (max-width:600px) {
    width: 100%;
  }
`


const Button = styled(ButtonBase)`
 background: #3e18f2;
  color: #fff;
  margin-top: 100px;
  box-shadow: 5px 5px 13px #000000c4;
  font-size: 2em;
  padding: 10px 30px;
  border-radius: 50px;
  svg {
    color: #fff;
    margin-right: 15px;
    font-size: 35px;
    @media screen and (max-width:1400px) {
      font-size: 25px;
      margin-right: 10px;
    }
  }
  @media screen and (max-width:1400px) {
    margin-top: 70px;
    padding: 8px 20px;
  }
  @media screen and (max-width:1200px) {
    margin-top: 60px;
  }
  @media screen and (max-width:1000px) {
    margin-top: 40px;
  }
  @media screen and (max-width:600px) {
    font-size: 2.5em;
    padding: 10px 30px;
    right: 0;
    left: 0;
    bottom: 100px;
    margin: auto;
    position: absolute;
  }
  @media screen and (max-width:550px) {
    bottom: -2px;
  }
  @media screen and (max-width:450px) {
    bottom: -50px;
  }
`
const Picture = styled.img`
  width: 100%;
  margin-bottom: -70px;
  @media screen and (max-width:1550px) {
    margin-bottom: -60px;
  }
  @media screen and (max-width:1300px) {
    margin-bottom: -50px;
  }
  @media screen and (max-width:1000px) {
    margin-bottom: -40px;
  }
  @media screen and (max-width:600px) {
    margin-bottom: -180px;
  }
`



const LinkStyled = styled(Link)`
  color: #fff;
  font-size: 1.3em;
  cursor: pointer;
  text-decoration: none;
  padding: .4em .8em;
  border-radius: 15px;
  @media screen and (max-width:600px) {
    color: var(--blue)
  }
  transition: all 300ms;
  :hover {
    background: #2200c573;
  }
`
const ArrowPicture = styled.img`
  position: absolute;
  height: 180px;
  right: 53%;
  @media screen and (max-width:1550px) {
    height: 140px;
  }
  @media screen and (max-width:1300px) {
    height: 110px;
  }
  @media screen and (max-width:1000px) {
    height: 80px;
  }
  @media screen and (max-width:600px) {
    height: 80px;
    right: 40px;
    top: 228px;
  }
`

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

const ModalBody = styled(Youtube)({
  border: 'none',
  outline: 'none',
})

const Cover = props => {
  const headerHeight = useHeaderHeight()
  const isMobile = useMediaQuery('(max-width:600px)')
  const width = window.innerWidth
  const [isVideoPlaying, setVideoPlaying] = useState(false)
  const [isFixed, setFixed] = useState(false)

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

  const handleScroll = event => {
    const scrolled = window.scrollY
    const shoudScroll = 50
    if (scrolled > shoudScroll && !isFixed) setFixed(true)
    if (scrolled <= shoudScroll && isFixed) setFixed(false)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isFixed])

  return (
    <>
      {isFixed && (
        <WrapperResponsiveMenu $top={headerHeight}>
          <MenuContainer>
            <LinkStyled to='/como-funciona#whytouse' smooth>¿Porqué usar Witideal?</LinkStyled>
            <LinkStyled to='/como-funciona#howmuchiscost' smooth>¿Cuánto cuesta?</LinkStyled>
            <LinkStyled to='/como-funciona#howtoorder' smooth>¿Cómo se ordenan los anuncios?</LinkStyled>
          </MenuContainer>
        </WrapperResponsiveMenu>
      )}
      <WrapperResponsive>
        <FullWidtCover>
          <ModalStyled open={isVideoPlaying} onClose={ _event => setVideoPlaying(false)} >
            <>
              <ModalBody
                onEnd={() => setVideoPlaying(false)}
                videoId='qrsS5_oVB-w'
                opts={opt}
              />
            </>
          </ModalStyled>
          <Content $top={headerHeight}>
            {!isFixed && (
              <MenuContainer style={{ position: 'absolute', top: '0px' }}>
                <LinkStyled to='/como-funciona#whytouse' smooth>¿Porqué usar Witideal?</LinkStyled>
                <LinkStyled to='/como-funciona#howmuchiscost' smooth>¿Cuánto cuesta?</LinkStyled>
                <LinkStyled to='/como-funciona#howtoorder' smooth>¿Cómo se ordenan los anuncios?</LinkStyled>
              </MenuContainer>
            )}
            <ArrowPicture src={coverArrow} />
            <DataContainer>
              <TextPrimary>
                Conoce la nueva manera de anunciar inmuebles 
              </TextPrimary>
                <Button onClick={_event => setVideoPlaying(true)}>
                  <PlayArrow />
                  Ver Video
                </Button>
            </DataContainer>
            <ImageContainer>
              <Picture src={isMobile ? coverPicureMobile : coverPicure} />
            </ImageContainer>
          </Content>
        </FullWidtCover>
      </WrapperResponsive>
    </>
  )
}

export default Cover
