import React from 'react'
import styled from 'styled-components'
import sourceFirtsPicture from '../../assets/14.png'
import sourceImageSecondary from '../../assets/15.png'
import PictureResponsive from '../../sharedComponents/pictureResponsive'

const SizePrivoider = styled.div`
  text-align: left;
  @media screen and (max-width: 600px) {
    font-size: .8em;
  }
  @media screen and (max-width: 500px) {
    font-size: .7em;
  }
`

const FullWidth = styled.div`
  padding: 2em 0em;
`

const GridContainer = styled.div`
  display: flex;
  justify-content: space-between;
`
const FirsPicture = styled(PictureResponsive)`
  width: 55%;
  @media screen and (max-width: 500px) {
    width: 50%;
  }
`
const FirstDataContainer = styled.div`
  width: 40%;
  padding-right: 2.5em;
  padding-top: 1em;
  box-sizing: border-box;
  font-size: 1.1em;
  color: #5e5e5e;
  @media screen and (max-width: 500px) {
    width: 45%;
    padding-right: 2em;
  }
`
const Title = styled.div`
  color: var(--blue);
  font-weight: bold;
  font-size: 2.8em;
  padding: 0em 1.5em .5em 1.5em;
  text-align: right;
  @media screen and (max-width: 500px) {
    font-size: 2.2em;
  }
`

const SecondaryBox = styled.div`
  margin: 0em 2em;
`
const PurpleBox = styled.div`
  margin: 4em 0em; 
  position: relative;
  padding: 2em;
  background: #3f19f8;
  border-radius: 15px;
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 500px) {
    padding: 1.5em;
  }
`
const PurpleBoxText = styled.div`
  width: 55%;
  color: #fff;
  font-size: 1.1em;
  text-align: center;
  position: relative;
  @media screen and (max-width: 500px) {
    width: 65%;
  }
`
const PictureSecondary = styled.img`
  position: absolute;
  width: 40%;
  top: 0px;
  bottom: 0px;
  margin: auto;
  right: -2em;
`
const HowToOrderAnnouncements = props => {
  return (
    <SizePrivoider id='howtoorder'>
      <FullWidth>
        <Title>
          ¿Cómo se ordenan
          los anuncios?
        </Title>
        <GridContainer>
          <FirsPicture height={85} src={sourceFirtsPicture} />
          <FirstDataContainer>
            Una persona ingresa en un
            formulario las
            características de la
            propiedad que requiere. Su
            búsqueda puede ser tan
            precisa como lo desee.
            Desde presupuesto, zona y
            número de recámaras,
            hasta si es pet friendly,
            planta baja, interior, con
            balcón, etc.
          </FirstDataContainer>
        </GridContainer>
        <SecondaryBox>
          <PurpleBox>
            <PurpleBoxText>
              En witideal NO se paga por estar
              en los primeros lugares de los
              listados. Cualquier inmueble
              publicado tiene las mismas
              oportunidades de aparecer.
            </PurpleBoxText>
            <PictureSecondary src={sourceImageSecondary} />
          </PurpleBox>
        </SecondaryBox>
      </FullWidth>
    </SizePrivoider>
  )
}

export default HowToOrderAnnouncements