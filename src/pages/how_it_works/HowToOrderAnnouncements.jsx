import { Grid } from '@material-ui/core'
import React from 'react'
import styled from 'styled-components'
import sourceFirtsPicture from '../../assets/14.png'
import sourceImageSecondary from '../../assets/15.png'
import PictureResponsive from '../../sharedComponents/pictureResponsive'

const SizePrivoider = styled.div`
  @media screen and (max-width: 1750px) {
    font-Size: .9em;
  }
  @media screen and (max-width: 1650px) {
    font-Size: .8em;
  }
  @media screen and (max-width: 1400px) {
    font-Size: .65em;
  }
  @media screen and (max-width: 1200px) {
    font-Size: .55em;
  }
  @media screen and (max-width: 1100px) {
    font-Size: .5em;
  }
  @media screen and (max-width: 1000px) {
    font-Size: .4em;
  }
`
const FullWidth = styled.div`
  margin: 5em 0em;
`

const FlexContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const FirtsPicture = styled(PictureResponsive)`
  width: 55%;
  @media screen and (max-width: 1400px) {
    width: 50%;
  }
`
const DataContainer = styled.div`
  width: 45%;
  padding: 3em;
  text-align: left;
  @media screen and (max-width: 1400px) {
    width: 50%;
  }
`
const Title = styled.div`
  color: var(--blue);
  font-size: 4.5em;
  font-weight: bold;
  text-align: right;
  margin-right: 1em;
`
const Message = styled.div`
  font-size: 1.8em;
  color: #5e5e5e;
  width: 70%;
  margin: 2em auto;
`
const BoxPurple = styled.div`
  padding: 1em;
  background: #3f19f8;
  color: #fff;
  font-size: 1.7em;
  border-radius: 1em;
  margin-right: 3em;
  margin-left: 2em;
`

const PictureSecondary = styled.img`
  margin-right: -3em;
  margin-top: -2em;
  width: 60%;
  @media screen and (max-width: 1100px) {
    width: 50%;
  }
`
const HowToOrderAnnouncements = props => {
  return (
    <SizePrivoider id='howtoorder'>
      <FullWidth>
        <FlexContainer>
          <FirtsPicture height={85} src={sourceFirtsPicture} />
          <DataContainer>
            <Title>¿Cómo se ordenan los anuncios?</Title>
            <Message>
              Una persona ingresa en un formulario
              las características de la propiedad que
              requiere. Su búsqueda puede ser tan
              precisa como lo desee. Desde
              presupuesto, zona y número de
              recámaras, hasta si es pet friendly,
              planta baja, interior, con balcón, etc.
            </Message>
            <BoxPurple>
              En witideal NO se paga por estar en los
              primeros lugares de los listados. Cualquier
              inmueble publicado tiene las mismas
              oportunidades de aparecer.
            </BoxPurple>
            <Grid container justify='flex-end'>
              <PictureSecondary src={sourceImageSecondary} />
            </Grid>
          </DataContainer>
        </FlexContainer>
      </FullWidth>
    </SizePrivoider>
  )
}

export default HowToOrderAnnouncements