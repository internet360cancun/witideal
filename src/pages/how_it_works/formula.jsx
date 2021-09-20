import React from 'react'
import { Container, TextPrimary, WrapperResponsive } from './layout'
import styled from 'styled-components'
import { Grid, Box, useMediaQuery } from '@material-ui/core'

const Body = styled.div`
  width: 80%;
  margin: auto;
  padding: 50px 0px;
  @media screen and (max-width: 800px) {
    width: 100%;
  }
`

const Title = styled.div`
  font-size: .55em;
  width: 80%;
  margin: auto;
  color: #585858;
  line-height: 1em;
  font-weight: normal;
  @media screen and (max-width:450px) {
    font-size: .45em;
  }
`
const TitleSection = styled(Title)`
  color: var(--blue-hover);
  font-weight: bold;
`

const Card = styled.div`
  padding: 50px;
  border-radius: 10px;
  background: #f6f5ff;
  margin-top: 20px;
  font-weight: normal;
  font-size: .8em;
  @media screen and (max-width:1100px) {
    padding: 30px;
  }
  @media screen and (max-width:550px) {
    font-size: .7em;
    padding: 20px 10px;
  }
  @media screen and (max-width:450px) {
    padding: 20px 5px;
  }
`

const TitleSectionColor = styled(TitleSection)`
  color: var(--blue);
  font-weight: normal;
`

const Formula = props => {
  const isMobile = useMediaQuery('(max-width:600px)')
  const isXs = useMediaQuery('(max-width:400px)')

  return (
    <WrapperResponsive>
      <Container>
        <Body>
          <TextPrimary>
            <Title>
              Utiliza la siguiente fórmula para calcular el costo por cliente conseguido
            </Title>
          </TextPrimary>
          <Box mt={{ xs: 3, sm: 5, md: 7, lg: 10 }}>
            <Grid container spacing={isMobile ? 2 :5} >
              <Grid item xs={6}>
                <TextPrimary>
                  <TitleSection>
                    Inmuebles en <br /> <span>RENTA</span>
                  </TitleSection>
                </TextPrimary>
                <Card>
                  <Grid container spacing={isXs ? 0 : isMobile ? 1 : 2} alignItems='center'>
                      <Grid item xs={6}>
                        <TextPrimary>
                          <TitleSectionColor>
                            Precio de renta anunciado
                          </TitleSectionColor>
                        </TextPrimary>
                      </Grid>
                      <Grid item xs={6}>
                        <TextPrimary>
                          <TitleSection>
                            x 0.0015
                          </TitleSection>
                        </TextPrimary>
                      </Grid>
                    </Grid>
                </Card>
              </Grid>
              <Grid item xs={6}>
                <TextPrimary>
                  <TitleSection>
                    Inmuebles en <br /> <span>VENTA</span>
                  </TitleSection>
                </TextPrimary>
                <Card>
                  <Grid container spacing={isXs ? 0 : isMobile ? 1 : 2} alignItems='center'>
                    <Grid item xs={6}>
                      <TextPrimary>
                        <TitleSectionColor>
                          Precio de venta anunciado
                        </TitleSectionColor>
                      </TextPrimary>
                    </Grid>
                    <Grid item xs={6}>
                      <TextPrimary>
                        <TitleSection>
                          x 0.00002
                        </TitleSection>
                      </TextPrimary>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Body>
      </Container>
    </WrapperResponsive>
  )
}

export default Formula
