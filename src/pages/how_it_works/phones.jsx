import React from 'react'
import styled from 'styled-components'
import { Container } from './layout'
import sourcePhones from '../../assets/16.png'

const Body = styled.div`
  margin: 3em 0px 8em 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  }
  @media screen and (max-width:500px) {
    align-items: flex-start;
    font-size: .3em;
  }
`
const Picture = styled.img`
  width: 55%;
`
const DataCotainer = styled.div`
  width: 37%;
  text-align: left;
  font-size: 1.9em;
  color: #5e5e5e;
  div {
    :last-child {
      margin-top: 1.8em;
    }
  }
`
const Phones = props => {
  return (
    <Container>
      <Body>
        <DataCotainer>
        <div>
          Witideal ordena las propiedades de
          manera descendente; primero las que
          cumplen con el 100% de coincidencia
          con su búsqueda, y luego las de
          porcentajes menores.
        </div>
        <div>
          En el caso de que una o más
          propiedades obtengan el mismo
          porcentaje de coincidencia, witideal
          sortea las que saldrán primero.
        </div>
        </DataCotainer>
        <Picture src={sourcePhones} />
      </Body>
    </Container>
  )
}

export default Phones
