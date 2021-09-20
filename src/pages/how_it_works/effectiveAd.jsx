import React from 'react'
import styled from 'styled-components'
import { Container } from './layout'
import sourceBack from '../../assets/22.png'
import phone2 from '../../assets/phone2.PNG'
import sourceBackMpobile from '../../assets/4.png'
import { useMediaQuery } from '@material-ui/core'

const Body = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 80%;
  margin: auto;
  @media screen and (max-width:1750px) {
    font-size: .9em;
  }
  @media screen and (max-width:1650px) {
    font-size: .8em;
  }
  @media screen and (max-width:1450px) {
    font-size: .7em;
  }
  @media screen and (max-width:1250px) {
    font-size: .6em;
  }
  @media screen and (max-width:1000px) {
    font-size: .5em;
  }
  @media screen and (max-width:800px) {
    font-size: .4em;
    width: 90%;
  }
  @media screen and (max-width:800px) {
    font-size: .4em;
    width: 90%;
  }
  @media screen and (max-width:500px) {
    width: 100%;
  }
`
const Picture = styled.img`
  display: block;
  width: 37%;
  @media screen and (max-width:500px) {
    width: 55%;
    margin-left: -20%;
    margin-top: 10%;
  }
`
const BackGround = styled.img`
  position: absolute;
  top: 0px;
  width: 100%;
  left: 0px;
  z-index: -1;
  height: 100%;
`
const Card = styled.div`
  margin-top: 2em;
  background: #fff;
  padding: 7em 5em;
  width: 45%;
  border-radius: 10px;
  box-sizing: border-box;
  box-shadow: 3px 3px 17px #5d5d5d;
  margin-right: 5%;
  @media screen and (max-width:1450px) {
    padding: 5em 4em;
  }
  @media screen and (max-width:500px) {
    width: 65%;
    margin-right: -10%;
    margin-top: 5%;
    padding-right: 10%;
  }
`
const Title = styled.div`
  font-size: 3.2em;
  color: var(--blue-hover);
  font-weight: bold;
  text-align: left;
`
const TextCard = styled.div`
  font-size: 2em;
  text-align: left;
  margin-top: 2.5em;
  line-height: 1.2em;
  color: #5e5e5e;
`

const EffectiveAdd = props => {
  const isXs = useMediaQuery('(max-width:500px)')

  return (
    <div style={{ position: "relative" }}>
      <BackGround src={isXs ? sourceBackMpobile : sourceBack} />
      <Container>
        <Body>
          <Picture src={phone2} />
          <Card>
            <Title>Paga por publicidad efectiva</Title>
            <TextCard>
              Witideal es el primer sitio de
              anuncios inmobiliarios donde
              pagas sólo cuando recibes los
              datos de contacto de un
              interesado.
            </TextCard>
          </Card>
        </Body>
      </Container>
    </div>
  )
}

export default EffectiveAdd
