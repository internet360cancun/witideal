import { Grid, useMediaQuery } from '@material-ui/core'
import React from 'react'
import styled from 'styled-components'
import sourceBackground from '../../assets/5.png'
import sourceAvatar from '../../assets/6.png'
import ResponsivePicture from '../../sharedComponents/pictureResponsive'

const SizeProvider = styled.div`
  @media screen and (max-width:1750px) {
    font-size: .9em;
  }
  @media screen and (max-width:1650px) {
    font-size: .8em;
  }
  @media screen and (max-width:1400px) {
    font-size: .7em;
  }
  @media screen and (max-width:1100px) {
    font-size: .6em;
  }
  @media screen and (max-width:1000px) {
    font-size: .5em;
  }
  @media screen and (max-width:900px) {
    font-size: .4em;
  }
  @media screen and (max-width:800px) {
    font-size: .7em;
  }
  @media screen and (max-width:700px) {
    font-size: .6em;
  }
  @media screen and (max-width:600px) {
    font-size: .5em;
    margin: 2em 0px;
  }
  @media screen and (max-width:500px) {
    font-size: .4em;
  }
  margin: 10em 0px;
  text-align: left;
`
const GridContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  @media screen and (max-width:800px) {
    flex-wrap: wrap;
    flex-direction: column-reverse;
  }
`
const CardContainer = styled.div`
  width: 50%;
  background-image: url(${sourceBackground});
  padding: 0em 0em 5em 5em;
  box-sizing: border-box;
  background-position-x: left;
  background-position-y: bottom;
  background-size: 95%;
  background-repeat: no-repeat;
  @media screen and (max-width:800px) {
    width: 100%;
    padding: 0em 5em 5em 5em;
    background-size: 90%;
  }
`
const Card = styled.div`
  background: #fff;
  border: 1px solid #cdcdcd;
  border-radius: 2em;
  box-shadow: 5px 5px 10px 9px #02020247;
  display: flex;
  justify-content: space-between;
  padding: 3em;
  box-sizing: border-box;
`
const Avata = styled(ResponsivePicture)`
  width: 45%;
`
const TextContainer = styled.div`
  width: 50%;
  text-align: right;
  padding-right: 15em;
  box-sizing: border-box;
  @media screen and (max-width:800px) {
    width: 100%;
    padding: 5em;
  }
`
const CardDataContainer = styled.div`
  width: 50%;
  @media screen and (max-width:500px) {
    width: 45%;
  }
`
const TextGrayCard = styled.div`
  color: #5e5e5e;
  font-size: 2.8em;
  margin-bottom: .2em;
`
const TextBlueCard = styled.div`
  color: var(--blue);
  font-size: 3em;
  font-weight: bold;
`

const TextPrimary = styled.div`
  display: flex;
  justify-content: center;
  font-size: 5.2em;
  font-weight: bold;
  color: var(--blue);
  @media screen and (max-width:600px) {
    font-size: 4.5em;
  }
`
const TextMEssage = styled.div`
  color: #5e5e5e;
  font-weight: bold;
  width: 70%;
  margin: 3em auto;
  text-align: left;
  font-size: 1.6em;
  span {
    color: var(--blue-hover);
  }
  @media screen and (max-width:800px) {
    font-size: 1.8em;
    width: 100%;
  }
  @media screen and (max-width:500px) {
    font-size: 2em;
    margin: 1em auto;
  }
`
const Button = styled.div`
  cursor: pointer;
  display: block;
  margin: auto;
  background: #3f19f8;
  color: #fff;
  text-align: center;
  padding: .4em 1.3em;
  font-size: 1.6em;
  border-radius: 52px;
  box-shadow: 3px 5px 1px 4px var(--blue-hover);
  margin-bottom: 5em;
  @media screen and (max-width: 1000px) {
    box-shadow: 2px 2px 1px 2px var(--blue-hover);
  }
  @media screen and (max-width:800px) {
    margin: auto;
  }
  @media screen and (max-width:500px) {
    font-size: 1.8em;
  }
`

const HowMuchDoesItCost = props => {
  const isMobile = useMediaQuery('(max-width:800px)')

  return (
    <SizeProvider id='howmuchiscost'>
      <GridContainer>
        <CardContainer>
          <Card>
            <Avata src={sourceAvatar} />
            <CardDataContainer>
              <TextGrayCard>
                Witideal te
                proporciona:
              </TextGrayCard>
              <TextBlueCard>
                Nombre<br />
                Correo<br />
                Teléfono<br />
              </TextBlueCard>
            </CardDataContainer>
          </Card>
        </CardContainer>
        <TextContainer>
          <TextPrimary>
            ¿Cuánto cuesta
            anunciar?
          </TextPrimary>
          {!isMobile && (
            <>
              <TextMEssage>
                Cuando a un buscador le interesa tu propiedad y presiona el botón  <span>CONTACTAR AL PROMOTOR</span> se te realiza un cobro de 60 witicoins
              </TextMEssage>
              <Grid container justify='center'>
                <Button>
                  Contactar al<br />
                  Promotor
                </Button>
              </Grid>
            </>
          )}
          {isMobile && (
            <Grid container spacing={1} alignItems='center'>
              <Grid item xs={6}>
                <TextMEssage>
                  Cuando a un buscador le interesa tu propiedad y presiona el botón  <span>CONTACTAR AL PROMOTOR</span> se te realiza un cobro
                </TextMEssage>
              </Grid>
              <Grid item xs={6}>
                <Grid container justify='center'>
                  <Button>
                    Contactar al<br />
                    Promotor
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          )}
        </TextContainer>
      </GridContainer>
    </SizeProvider>
  )
}

export default HowMuchDoesItCost
