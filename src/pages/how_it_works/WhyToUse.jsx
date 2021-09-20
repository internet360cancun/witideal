import React from 'react'
import styled from 'styled-components'
import { WrapperResponsive, Container, TextPrimary as TextPrimaryBase  } from './layout'
import { Grid, Hidden, Box } from '@material-ui/core'
import propertiesCard from '../../assets/propertiesCard.png'

const Body = styled.div`
  padding: 150px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: left;
  @media screen and (max-width:1400px) {
    padding: 100px 0px;
  }
  @media screen and (max-width:800px) {
    padding: 80px 0px;
  }
`
const ImageContainer = styled.div`
  width: 45%;
`
const DataContainer = styled.div`
  width: 55%;
`
const TitelContainer = styled.div`
  width: 75%;
  margin: auto;
`

const TextPrimary = styled(TextPrimaryBase)`
  color: var(--blue);
  font-weight: bold;
`

const Picture = styled.img`
  width: 80%;
  display: block;
  margin: auto;
  @media screen and (max-width:600px) {
    width: 100%;
  }
`
const TextContainer = styled.div`
  width: 60%;
  margin: auto;
`
const MarginText = styled.div`
  margin: 30px auto;
  @media screen and (max-width:1100px) {
    margin: 20px auto;
  }
  @media screen and (max-width:600px) {
    margin: 0px;
  }
`
const SubTitle = styled(MarginText)`
  color: #515151;
  font-size: .73em;
  line-height: 1em;
  font-weight: normal;
`

const FreeText = styled(MarginText)`
  color: #41b7f8;
  font-weight: bold;
`
const ColorSecondaryText = styled(SubTitle)`
  color: var(--blue-hover);
  font-weight: bold;
`
const BodyIntMobile = styled.div`
  display: flex;
  justify-content: space-between;
`

const WhyToUse = props => {
  return (
    <WrapperResponsive id='whytouse'> 
      <Container>
        <Body>
          <Hidden xsDown>
            <DataContainer as={Grid} container justify='center'>
              <TitelContainer>
                <TextPrimary>
                  ¿Porqué usar Witideal?
                </TextPrimary>
              </TitelContainer>
              <TextContainer>
                <TextPrimary>
                  <SubTitle>
                    En witideal publicar anuncios inmobiliarios es
                  </SubTitle>
                  <FreeText>
                    GRATIS
                  </FreeText>
                  <ColorSecondaryText>
                    Publica todos tus inmuebles
                  </ColorSecondaryText>
                </TextPrimary>
              </TextContainer>
            </DataContainer>
            <ImageContainer>
              <Picture src={propertiesCard} />
            </ImageContainer>
          </Hidden>
          <Hidden smUp>
            <Box>
              <TextPrimary>
                ¿Porqué usar Witideal?
              </TextPrimary>
              <Box pt={2} />
              <BodyIntMobile>
                <DataContainer>
                  <Box fontSize='.75em' width='90%'>
                    <TextPrimary>
                      <SubTitle>
                        En witideal publicar anuncios inmobiliarios es
                      </SubTitle>
                      <FreeText style={{ margin: '8px 0px 15px 0px' }}>
                        GRATIS
                      </FreeText>
                    </TextPrimary>
                  </Box>
                  <Box fontSize='.75em' width='90%'>
                    <TextPrimary>
                      <ColorSecondaryText style={{ textAlign: 'right', }}>
                        Publica <br />todos tus<br /> inmuebles
                      </ColorSecondaryText>
                    </TextPrimary>
                  </Box>
                </DataContainer>
                <ImageContainer>
                  <Picture src={propertiesCard} />
                </ImageContainer>
              </BodyIntMobile>
            </Box>
          </Hidden>
        </Body>
      </Container>
    </WrapperResponsive>
  )
}

export default WhyToUse
