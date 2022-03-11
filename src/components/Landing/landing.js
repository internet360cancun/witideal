import React, { useEffect } from "react";
import { UserForm } from "../UserForm/userForm";
import { Grid, Typography, Box, useMediaQuery } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import Head from "../head";

const Container = styled(Grid)({
  paddingTop: "15px",
  backgroundImage: `url(https://firebasestorage.googleapis.com/v0/b/witideal-b1f99.appspot.com/o/assets%2Fthumb%40fondo.png?alt=media&token=4f7689fc-222b-4502-acf1-187747883b6c)`,
  // backgroundImage: `url(https://firebasestorage.googleapis.com/v0/b/witideal-develop.appspot.com/o/assets%2Fbackgrounds%2Fthumb%40landing_background.jpg?alt=media&token=9b44e5ac-b1c5-493a-99ed-f74e42dded41)`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundAttachment: "fixed",
  position: "relative",
  overflowX: "hidden",
});

const ContainerResponsive = styled(Grid)({
  paddingTop: "15px",
  backgroundImage: `url(https://firebasestorage.googleapis.com/v0/b/witideal-b1f99.appspot.com/o/assets%2Fthumb%40fondo-resp.png?alt=media&token=15b06aa3-bde1-4d6c-b1ac-3d19f36f8bac)`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundAttachment: "fixed",
  overflowX: "hidden",
});

const MainTitle = styled(Typography)(({ theme }) => ({
  color: "white",
  fontWeight: 800,

  "@media (max-width:1048px)": {
    fontSize: "50px",
  },
  "@media (max-width:960px)": {
    fontSize: "30px",
  },
  "@media (max-width:500px)": {
    fontSize: "35px",
    textAlign: "center",
  },
}));

const MainSubtitle = styled(Typography)(({ theme }) => ({
  color: "white",
  "@media (max-width:960px)": {
    fontSize: "20px",
    textAlign: "center",
  },
}));

const TextContainer = styled(Grid)({
  top: "180px",
  marginTop: "60px",
  paddingLeft: "100px",
  paddingTop: "50px",
  "@media (max-width:960px)": {
    position: "static",
    padding: "10px",
    marginTop: "50px",
  },
});
const Span = styled(Grid)({
  color: "#32FFD2",
});

const familia =
  "https://firebasestorage.googleapis.com/v0/b/witideal-b1f99.appspot.com/o/assets%2Fthumb%40familia-2-privamera.png?alt=media&token=3088b0f4-0a09-4b45-b9e7-db1de8131706";

export function Landing() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const tablet = useMediaQuery("(min-width:961px)");

  return (
    <>
      <Head title="Witideal " />
      {tablet ? (
        <Container container justifyContent="center" alignItems="flex-start">
          <TextContainer item xs={11} md={6}>
            <MainTitle align="left" variant="h2">
              La primavera llegó a <br /> Witideal y con ella
              <Span>
                tu hogar ideal<span style={{ color: "white" }}>.</span>
              </Span>
            </MainTitle>
            <MainSubtitle align="left" variant="h5">
              Estás a un clic de encontrar tu <br /> nuevo hogar, encuentra
              casas, <br /> departamentos, estudios en <br /> todo México.
            </MainSubtitle>
            <div className="body-2">
              <img src={familia} alt="familia-witideal" className="familia" />
            </div>
          </TextContainer>
          <Grid item xs={12} sm={11} md={6} xl={5}>
            <Box pt={5} p={{ xs: 2, lg: 9 }}>
              <UserForm />
            </Box>
          </Grid>
        </Container>
      ) : (
        <ContainerResponsive>
          <br />
          <br />
          <br />
          <MainTitle align="center" variant="h2">
            La primavera llegó a Witideal y con ella
            <Span>
              tu hogar ideal <span style={{ color: "white" }}>.</span>{" "}
            </Span>
          </MainTitle>
          <MainSubtitle align="center" variant="h5">
            Estás a un clic de encontrar tu nuevo hogar, encuentra casas,
            departamentos, estudios en todo México
          </MainSubtitle>
          <div className="container d-flex justify-content-center">
            <UserForm />
          </div>
          <img src={familia} alt="familia-witideal" className="familia-2" />
        </ContainerResponsive>
      )}
    </>
  );
}
