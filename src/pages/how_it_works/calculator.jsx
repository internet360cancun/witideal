import React, { useState } from "react";
import styled from "styled-components";
import { Container } from "./layout";
import sourceCalculator from "../../assets/calculatorIcon.svg";
import {
  Box,
  ButtonBase,
  Grid,
  MenuItem,
  Select,
  TextField,
  useMediaQuery,
} from "@material-ui/core";
import {
  // toCurrency,
  toNumber,
} from "../../helpers/currencyParser";
import sourceImage from "../../assets/image.png";

const Title = styled.div`
  font-size: 4em;
  color: var(--blue);
  font-weight: bold;
  width: 60%;
  margin: auto;
  text-align: center;
  @media screen and (max-width: 800px) {
    width: 80%;
    font-size: 2em;
    margin-bottom: 40px;
  }
`;
const Body = styled.div`
  padding: 40px 0px 80px 0px;
  text-align: left;
  @media screen and (max-width: 1750px) {
    font-size: 0.9em;
  }
  @media screen and (max-width: 1650px) {
    font-size: 0.8em;
    padding: 35px 0px 70px 0px;
  }
  @media screen and (max-width: 1400px) {
    font-size: 0.7em;
    padding: 30px 0px 60px 0px;
  }
  @media screen and (max-width: 1200px) {
    font-size: 0.55em;
    padding: 25px 0px 50px 0px;
  }
  @media screen and (max-width: 800px) {
    padding: 20px 0px 40px 0px;
  }
`;
const GridContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 5em;
  @media screen and (max-width: 800px) {
    flex-direction: column-reverse;
  }
`;

const CalculatorCard = styled.div`
  width: 60%;
  border-radius: 10px;
  box-sizing: border-box;
  padding: 80px 0px;
  border: 1px solid #cdcdcd;
  box-shadow: 5px 5px 10px 1px #cdcdcd;
  position: relative;
  min-height: 300px;
  @media screen and (max-width: 1650px) {
    padding: 50px 0px;
  }
  @media screen and (max-width: 1400px) {
    padding: 40px 0px;
  }
  @media screen and (max-width: 1200px) {
    padding: 25px 0px;
    width: 65%;
  }
  @media screen and (max-width: 800px) {
    width: 100%;
  }
`;

const CalculatorBody = styled.div`
  width: 70%;
  margin: 2em auto auto auto;
  @media screen and (max-width: 1400px) {
    width: 80%;
  }
`;
const DataContainer = styled.div`
  width: 35%;
  @media screen and (max-width: 1200px) {
    width: 33%;
  }
  @media screen and (max-width: 800px) {
    width: 60%;
    margin-bottom: 30px;
    font-size: 0.9em;
  }
`;
const DataTextMaster = styled.div`
  font-size: 2em;
`;
const Gray = styled(DataTextMaster)`
  color: #626262;
`;
const Equivalent = styled(DataTextMaster)`
  color: #b1b1b1;
  margin: 1em 0px;
  font-style: italic;
  @media screen and (max-width: 800px) {
    font-size: 1.8em;
  }
`;
const CopyThird = styled(DataTextMaster)`
  color: var(--blue-hover);
  font-weight: bold;
  width: 50%;
  @media screen and (max-width: 1200px) {
    width: 70%;
  }
  @media screen and (max-width: 800px) {
    width: 70%;
    text-align: right;
    margin-left: 25%;
  }
`;
const CalculatorIcon = styled.img`
  width: 110px;
  position: absolute;
  top: -50px;
  right: 0px;
  left: 0px;
  margin: auto;
  @media screen and (max-width: 1400px) {
    width: 80px;
  }
  @media screen and (max-width: 1200px) {
    width: 65px;
    top: -25px;
  }
`;
const SelectStyled = styled(Select)`
  background: #f6f5ff;
  border-radius: 50px;
  text-align: center;
  color: var(--blue) !important;
  font-size: 1.1em;
  fieldset {
    border: 0px !important;
  }
`;

const CaclulatorText = styled.div`
  color: var(--blue-hover);
  font-size: 1.2em;
  font-weight: bold;
  margin-bottom: 10px;
`;

const TextFieldStyled = styled(TextField)`
  fieldset {
    border-color: #c0bce2 !important;
  }
  input {
    color: var(--blue);
  }
  label: {
    font-size: 1em;
  }
`;
const ResiltContaiener = styled.div`
  font-size: 1.4em;
  text-align: center;
  margin-top: 30px;
  color: var(--blue);
  margin: 30px auto auto auto;
  div {
    font-size: 1.2em;
    font-weight: bold;
    margin: 10px auto;
    color: var(--blue-hover);
  }
  span {
    color: var(--blue-hover);
  }
  @media screen and (max-width: 1400px) {
    margin-top: 20px;
  }
  @media screen and (max-width: 1200px) {
    margin-top: 15px;
  }
`;

const ButtonStyled = styled(ButtonBase)`
  background: var(--blue);
  color: #fff;
  display: block;
  margin: 2em auto auto auto;
  font-size: 1.3em;
  padding: 8px 30px;
  border-radius: 50px;
`;

const PictureBackground = styled.img`
  width: 400px;
  position: absolute;
  bottom: -200px;
  right: 0px;
  @media screen and (max-width: 1650px) {
    width: 300px;
    bottom: -150px;
  }
  @media screen and (max-width: 1400px) {
    width: 250px;
    bottom: -100px;
  }
  @media screen and (max-width: 1200px) {
    width: 180px;
    bottom: -50px;
  }
  @media screen and (max-width: 950px) {
    width: 130px;
    bottom: -40px;
  }
  @media screen and (max-width: 800px) {
    max-width: 140px;
    bottom: 65%;
    width: 40%;
  }
`;
const Calculator = () => {
  const [propertyType, setPropertyType] = useState("sale");
  const [properties, setProperties] = useState("");
  const [client, setClient] = useState("");
  // const [minPrice, setminPrice] = useState('')
  // const [maxPrice, setMaxPrice] = useState('')
  const [result, setResult] = useState(null);

  const isMd = useMediaQuery("(max-width:1280px)");
  const isMobile = useMediaQuery("(max-width:800px)");
  const size = isMd ? "small" : "medium";

  const handleCalculate = () => {
    const clickCostRent = 60;
    const clickCostSale = 60;

    let creditsCPCRent = client * clickCostRent * Math.abs(properties);
    creditsCPCRent = creditsCPCRent ? creditsCPCRent : 0;

    let creditsCPCSale = client * clickCostSale * Math.abs(properties);
    creditsCPCSale = creditsCPCSale ? creditsCPCSale : 0;

    setResult(
      Math.round(propertyType === "rent" ? creditsCPCRent : creditsCPCSale)
    );
  };

  return (
    <div style={{ position: "relative" }}>
      <PictureBackground src={sourceImage} />
      <Container>
        <Body>
          {!isMobile && (
            <Title>Te ayudamos a calcular cuántas witicoins necesitas</Title>
          )}
          <GridContainer>
            <CalculatorCard>
              <CalculatorIcon src={sourceCalculator} />

              <CalculatorBody>
                <SelectStyled
                  size="small"
                  variant="outlined"
                  fullWidth
                  value={propertyType}
                  onChange={(event) => setPropertyType(event.target.value)}
                >
                  <MenuItem value="sale">Venta</MenuItem>
                  <MenuItem value="rent">Renta</MenuItem>
                </SelectStyled>
                <Box mt={3}>
                  <Grid container spacing={isMd ? 1 : 2}>
                    <Grid item xs={6}>
                      <TextFieldStyled
                        inputProps={{ style: { fontSize: "1em" } }} // font size of input text
                        InputLabelProps={{
                          style: { fontSize: isMobile ? ".9em" : "1em" },
                        }} // font size of input label
                        size={size}
                        variant="outlined"
                        fullWidth
                        value={properties}
                        onChange={(event) =>
                          setProperties(
                            event.target.value
                              ? isNaN(toNumber(event.target.value))
                                ? ""
                                : toNumber(event.target.value)
                              : event.target.value
                          )
                        }
                        label="Número de propiedades"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextFieldStyled
                        inputProps={{ style: { fontSize: "1em" } }} // font size of input text
                        InputLabelProps={{
                          style: { fontSize: isMobile ? ".9em" : "1em" },
                        }} // font size of input label
                        size={size}
                        variant="outlined"
                        fullWidth
                        label="Cuantos clientes te interesan"
                        value={client}
                        onChange={(event) =>
                          setClient(
                            event.target.value
                              ? isNaN(toNumber(event.target.value))
                                ? ""
                                : toNumber(event.target.value)
                              : event.target.value
                          )
                        }
                      />
                    </Grid>
                  </Grid>
                </Box>
                {/* <Box mt={3}>
                  <CaclulatorText>
                    Rango de precios aproximados de tus inmuebles
                  </CaclulatorText>
                  <Grid container spacing={isMd ? 1 : 2}>
                    <Grid item xs={6}>
                      <TextFieldStyled
                        inputProps={{style: {fontSize: '1em'}}} // font size of input text
                        InputLabelProps={{style: {fontSize: isMobile ? '.9em' : '1em'}}} // font size of input label
                        size={size}
                        value={toCurrency(minPrice)}
                        variant='outlined'
                        fullWidth
                        label='Precio mínimo'
                        onChange={event => setminPrice(event.target.value ? isNaN(toNumber(event.target.value)) ? '' : toNumber(event.target.value) : event.target.value)}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextFieldStyled
                        inputProps={{style: {fontSize: '1em'}}} // font size of input text
                        InputLabelProps={{style: {fontSize: isMobile ? '.9em' : '1em'}}} // font size of input label
                        size={size}
                        value={toCurrency(maxPrice)}
                        variant='outlined'
                        fullWidth
                        label='Precio máximo'
                        onChange={event => setMaxPrice(event.target.value ? isNaN(toNumber(event.target.value)) ? '' : toNumber(event.target.value) : event.target.value)}
                      />
                    </Grid>
                  </Grid>
                </Box> */}
                <ButtonStyled onClick={handleCalculate}>Calcular</ButtonStyled>
                {result !== null && (
                  <ResiltContaiener>
                    Según el cálculo el número de witicoins que necesitas es:
                    <div>{result || 0} Witicoins</div>
                  </ResiltContaiener>
                )}
              </CalculatorBody>
            </CalculatorCard>
            {isMobile && (
              <Title>Te ayudamos a calcular cuántas witicoins necesitas</Title>
            )}
            <DataContainer>
              <Gray>
                Todos los cargos se hacen a un monedero electrónico de prepago
                llamado witicoins.
              </Gray>
              <Equivalent>1 witicoin = 1 peso mexicano</Equivalent>
              <CopyThird>
                Mantén siempre tus witicoins recargadas para conseguir muchos
                clientes
              </CopyThird>
            </DataContainer>
          </GridContainer>
        </Body>
      </Container>
    </div>
  );
};

export default Calculator;
