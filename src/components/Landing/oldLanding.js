import React, { useState, useEffect } from "react";
import { UserForm } from "../UserForm/userForm";
import { Grid, Typography, Box, Hidden } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import Head from "../head";

const Container = styled(Grid)({
  paddingTop: "15px",
  backgroundImage: `url(https://firebasestorage.googleapis.com/v0/b/witideal-develop.appspot.com/o/assets%2Fbackgrounds%2Fthumb%40landing_background.jpg?alt=media&token=9b44e5ac-b1c5-493a-99ed-f74e42dded41)`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundAttachment: "fixed",
});

const MainTitle = styled(Typography)(({ theme }) => ({
  color: "white",
  fontWeight: 800,
  "@media (max-width:960px)": {
    fontSize: "30px",
  },
  "@media (max-width:500px)": {
    fontSize: "20px",
  },
}));

const SecondarySubtitle = styled(Typography)(({ theme }) => ({
  color: "#32FFD2",
  fontWeight: 700,
  paddingTop: 30,
  "@media (max-width:960px)": {
    fontSize: "30px",
    paddingTop: 10,
  },
  "@media (max-width:500px)": {
    fontSize: "20px",
  },
}));

const MainSubtitle = styled(Typography)(({ theme }) => ({
  color: "white",
  fontWeight: 800,
  "@media (max-width:960px)": {
    fontSize: "20px",
  },
}));

const TextContainer = styled(Grid)({
  position: "sticky",
  top: "180px",
  marginTop: "60px",
  padding: "50px",
  "@media (max-width:960px)": {
    position: "static",
    padding: "10px",
    marginTop: "50px",
  },
});

const data = [
  {
    secondarySubtitle: "Descubre aquí tu nueva oficina",
  },
  {
    secondarySubtitle: "El local para tu negocio",
  },
  {
    secondarySubtitle: "Una bodega para almacenar tus productos",
  },
  {
    secondarySubtitle: "El taller para tu emprendimiento",
  },
  {
    secondarySubtitle: "La inversión a la medida de tus necesidades",
  },
  {
    secondarySubtitle: "El terreno para tu desarrollo",
  },
  {
    secondarySubtitle: "Tu nuevo hogar",
  },
  {
    secondarySubtitle: "Descubre tu lugar",
  },
];

export const OldLanding = () => {
  const [currentText, setText] = useState(
    data[Math.round(Math.random() * (data.length - 1))]
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentIndex = data.indexOf(currentText);
      const nextIndex = data.length > currentIndex + 1 ? currentIndex + 1 : 0;
      setText(data[nextIndex]);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [currentText]);

  return (
    <Container container justify="center" alignItems="flex-start">
      <Head title="Buscar inmuebles" />
      <TextContainer item xs={11} md={6}>
        <Hidden mdDown>
          <MainTitle align="center" variant="h1">
            ¡Hola!
          </MainTitle>
          <MainSubtitle align="center" variant="h3">
            Bienvenido a Witideal
          </MainSubtitle>
          <SecondarySubtitle align="center" variant="h4">
            {currentText.secondarySubtitle}
          </SecondarySubtitle>
        </Hidden>
        <Hidden lgUp>
          <MainTitle align="center" variant="h3">
            ¡Hola! Bienvenido a Witideal
          </MainTitle>
          <SecondarySubtitle align="center" variant="h3">
            {currentText.secondarySubtitle}
          </SecondarySubtitle>
        </Hidden>
      </TextContainer>
      <Grid item xs={12} sm={11} md={6} xl={5}>
        <Box pt={5} p={{ xs: 2, lg: 9 }}>
          <UserForm />
        </Box>
      </Grid>
    </Container>
  );
};
