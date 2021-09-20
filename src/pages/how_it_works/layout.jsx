import styled from "styled-components";

export const WrapperResponsive = styled.div`
  @media screen and (max-width:1700px) {
    font-size: .9em;
  }
  @media screen and (max-width:1550px) {
    font-size: .7em;
  }
  @media screen and (max-width:1200px) {
    font-size: .5em;
  }
  @media screen and (max-width:1000px) {
    font-size: .4em;
  }
`

export const TextPrimary = styled.div`
  color: #fff;
  font-size: 5em;
  font-weight: bold;
  line-height: 1em;
  @media screen and (max-width:850px) {
    font-size: 4em;
  }
  @media screen and (max-width:650px) {
    font-size: 3.5em;
  }
  @media screen and (max-width:600px) {
    font-size: 6em;
  }
`

export const Container  = styled.div`
  width: 80%;
  margin: auto;
  @media screen and (max-width:600px) {
    width: 90%;
  }
`