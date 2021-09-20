import React from 'react'
import styled from 'styled-components'
import { Container } from './layout'
import { formatHumanNumber } from '../../helpers/currencyParser'
import sourcePackageBasic from '../../assets/BasicPackage.png'
import sourcePackageA from '../../assets/packageA.svg'
import sourcePackageB from '../../assets/packageB.svg'
import sourcePackageC from '../../assets/PackageC.svg'
import sourcePackageD from '../../assets/PackageD.svg'
import { Box } from '@material-ui/core'

const Body = styled.div`
  padding: 60px 0px;
  @media screen and (max-width:1750px) {
    font-size: .95em;
    padding: 50px 0px;
  }
  @media screen and (max-width:1600px) {
    font-size: .85em;
    padding: 40px 0px;
  }
  @media screen and (max-width:1400px) {
    font-size: .8em;
    padding: 30px 0px;
  }
  @media screen and (max-width:1300px) {
    font-size: .7em;
  }
  @media screen and (max-width:1100px) {
    font-size: .6em;
    padding: 20px 0px;
  }
  @media screen and (max-width:800px) {
    font-size: .5em;
  }
  @media screen and (max-width:500px) {
    font-size: .45em;
  }
`
const Title = styled.div`
  font-size: 4em;
  width: 55%;
  margin: auto;
  font-weight: bold;
  color: var(--blue-hover);
  @media screen and (max-width:1100px) {
    width: 80%;
  }
  @media screen and (max-width:500px) {
    font-size: 3em;
  }
`
const Subtitle = styled.div`
  font-size: 2em;
  color: #585858b8;
  width: 65%;
  margin: auto;
  margin-top: 80px;
  @media screen and (max-width:1750px) {
    margin-top: 70px;
  }
  @media screen and (max-width:1600px) {
    margin-top: 60px;
  }
  @media screen and (max-width:1400px) {
    margin-top: 50px;
  }
  @media screen and (max-width:1300px) {
    margin-top: 40px;
  }
  @media screen and (max-width:1100px) {
    margin-top: 25px;
  }
  @media screen and (max-width:1100px) {
    width: 80%;
  }
  @media screen and (max-width:500px) {
    font-size: 1.8em;
    margin-top: 10px;
  }
`
const CardsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: stretch;
  flex-wrap: wrap;
  margin-top: 40px;
  @media screen and (max-width:1100px) {
    margin-top: 25px;
  }
  @media screen and (max-width:500px) {
    width: 90%;
    margin: 15px auto;
  }
`

const CardWrapper = styled.div`
  width: 25%;
  padding: 30px;
  box-sizing: border-box;
  position: relative;
  @media screen and (max-width:1600px) {
    padding: 20px;
  }
  @media screen and (max-width:1300px) {
    padding: 15px;
  }
  @media screen and (max-width:1100px) {
    width: 33.3%;
    padding: 10px;
  }
  @media screen and (max-width:500px) {
    width: 50%;
    padding: 5px;
  }
  
`
const CardMaster = styled.div`
  padding: 40px 25px;
  color: #fff;
  background: #cdcdcd;
  border-radius: 10px;
  font-weight: bold;
  height: 100%;
  box-sizing: border-box;
  background-size: cover;
  background-position: center;
  @media screen and (max-width:1600px) {
    padding: 30px 20px;
  }
  @media screen and (max-width:1400px) {
    padding: 25px 15px;
  }
  @media screen and (max-width:600px) {
    padding: 15px 5px;
  }
`

const CardBasic = styled(CardMaster)`
  background-image: url(${sourcePackageBasic});
`
const CardPlata = styled(CardMaster)`
  background-image: url(${sourcePackageA});
`
const CardOro = styled(CardMaster)`
  background-image: url(${sourcePackageB});
`
const CardPlatino = styled(CardMaster)`
  background-image: url(${sourcePackageC});
`
const CardDiamante = styled(CardMaster)`
  background-image: url(${sourcePackageD});
`
const Name = styled.div`
  font-size: 2em;
`
const Quiantity = styled.div`
  margin-top: 30px;
  font-size: 2em;
  div {
    font-size: .8em;
  }
  @media screen and (max-width:1600px) {
    margin-top: 20px;
  }
  @media screen and (max-width:1400px) {
    margin-top: 15px;
  }
  @media screen and (max-width:600px) {
    margin-top: 9px;
  }
`

const Price = styled.div`
  margin-top: 30px;
  font-size: 2em;
  div {
    font-size: .6em;
    margin-top: 15px;
    @media screen and (max-width:600px) {
      margin-top: 10px;
    }
  }
  @media screen and (max-width:1600px) {
    margin-top: 20px;
  }
  @media screen and (max-width:1400px) {
    margin-top: 15px;
  }
  @media screen and (max-width:600px) {
    margin-top: 9px;
  }
`
const Witicoins = () => {
  return (
    <Container>
      <Body>
        <Title>Selecciona tu paquete de Witicoins</Title>
        <Subtitle>
          No hay un saldo mínimo para que tus anuncios sean visibles, puedes recargar o no la cantidad que te sugiere el simulador. <br/> 
          Puedes empezar con un paquete menor al sugerido y probar esta nueva manera de anunciar propiedades.
        </Subtitle>
        <CardsContainer>
          <CardWrapper>
            <CardBasic>
              <Name>Paquete Básico</Name>
              <Quiantity>
                600
                <div>Witicoins</div>
              </Quiantity>
              <Box fontSize='1.2em' m='.3em' >10 Clientes </Box>
              <Price>
                ${formatHumanNumber(570, 0)} MXN
                <div> Más IVA</div>
                <div>
                  + 30 witicoins extra
                </div>
              </Price>
            </CardBasic>
          </CardWrapper>

          <CardWrapper>
            <CardPlata>
              <Name>Paquete Plata</Name>
              <Quiantity>
                1800
                <div>Witicoins</div>
              </Quiantity>
              <Box fontSize='1.2em' m='.3em' >30 Clientes </Box>
              <Price>
                ${formatHumanNumber(1710, 0)} MXN
                <div> Más IVA</div>
                <div>
                  + 90 witicoins extra
                </div>
              </Price>
            </CardPlata>
          </CardWrapper>

          <CardWrapper>
            <CardOro>
              <Name>Paquete Oro</Name>
              <Quiantity>
                3600
                <div>Witicoins</div>
              </Quiantity>
              <Box fontSize='1.2em' m='.3em' >60 Clientes </Box>
              <Price>
                ${formatHumanNumber(3420, 0)} MXN
                <div> Más IVA</div>
                <div>
                  + 180 witicoins extra
                </div>
              </Price>
            </CardOro>
          </CardWrapper>

          <CardWrapper>
            <CardPlatino>
              <Name>Paquete Platino</Name>
              <Quiantity>
                5400
                <div>Witicoins</div>
              </Quiantity>
              <Box fontSize='1.2em' m='.3em' >90 Clientes </Box>
              <Price>
                ${formatHumanNumber(5130, 0)} MXN
                <div> Más IVA</div>
                <div>+ 270 witicoins extra</div>
              </Price>
            </CardPlatino>
          </CardWrapper>
        </CardsContainer>
      </Body>
    </Container>
  )
}

export default Witicoins
