import React, { useState } from "react";
import { styled } from "@material-ui/core/styles";
import { Button, useMediaQuery } from "@material-ui/core";
import { Grid, Paper, Box } from "@material-ui/core";
import { makeStyles, Modal } from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";
import facebook from "../../assets/facebook.svg";
import instagram from "../../assets/instagram.svg";
import youtube from "../../assets/youtube.svg";
import playstore from "../../assets/playstore.png";
import linkedin from "../../assets/linkedin.svg";
import { currentVersion } from "../../assets/Strings";
import CloseModal from "../../layouts/closeModal";
import { Register } from "../../components/Register/register";

const wdLightBlue = "#41B8F9";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    borderRadius: 5,
    "& img": {
      width: 200,
    },
    [theme.breakpoints.down("xs")]: {
      "& img": {
        width: 120,
      },
    },
  },

  title: {
    flexGrow: 1,
  },
  btnItemContained: {
    fontWeight: 700,
    marginLeft: 10,
    borderRadius: 50,
    textTransform: "none",
    fontSize: 15,
    "&:hover": {
      backgroundColor: "#1E0E6F",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "14px",
    },
  },
  btnItem: {
    fontWeight: 700,
    marginLeft: 10,
    borderRadius: 50,
    textTransform: "none",
    fontSize: 15,
    borderColor: wdLightBlue,
    [theme.breakpoints.down("xs")]: {
      fontSize: "14px",
    },
  },

  navBgColor: {
    backgroundColor: "white",
  },
  linkDecoration: {
    textDecoration: "none",
    color: "black",
  },
  avatarColor: {
    color: "#fff",
    backgroundColor: "#E8E5FD",
    width: "30px",
    height: "30px",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paperLogin: {
    paddingTop: "60px",
    backgroundColor: theme.palette.background.paper,
    border: "0px solid #000",
    outline: "none",
    position: "relative",
    boxShadow: theme.shadows[5],
    maxHeight: "85vh",
    overflow: "scroll",
    "&::-webkit-scrollbar": {
      width: 0,
    },
    [theme.breakpoints.up("xs")]: {
      width: "90%",
    },
    [theme.breakpoints.up("md")]: {
      width: "80%",
    },
    [theme.breakpoints.up("lg")]: {
      width: "70%",
    },
    [theme.breakpoints.up("xl")]: {
      width: "50%",
    },
  },
  paper: {
    paddingTop: "60px",
    backgroundColor: theme.palette.background.paper,
    border: "0px solid #000",
    outline: "none",
    position: "relative",
    boxShadow: theme.shadows[5],
    maxHeight: "85vh",
    overflow: "scroll",
    "&::-webkit-scrollbar": {
      width: 0,
    },
    width: "750px",
    "@media (max-width:800px)": {
      width: "96%",
    },
  },
}));

export function Footer() {
  const classes = useStyles();
  const [openRegister, setOpenRegister] = useState(false);
  const [federated, setFederated] = useState(false); // state to hold if user comes from fb/gugulu
  const [comesFromLogin, setComesFromLogin] = useState(false);

  const tablet = useMediaQuery("(min-width:901px)");

  window.register = () => setOpenRegister(true);

  const changeToLogIn = () => setOpenRegister(false);

  const handleToggleRegister = () => setOpenRegister(!openRegister);

  const handleCloseRegister = () => setOpenRegister(false);

  return (
    <div className="master_footer">
      <Container>
        <Grid container justifyContent="center">
          <Grid item xs={12} lg={10}>
            <Body>
              <Right>
                <LogoImg src={Logo} />
                <Title>Descubre tu lugar</Title>
                <div className="text-white">
                  En Witideal encuentra tu lugar ideal
                </div>
              </Right>

              {!tablet ? null : (
                <vr style={{ border: "solid 1px #41B8F9", height: "150px" }} />
              )}

              <Center>
                <Title>Nuestras oficinas</Title>
                <Contact>
                  Cerro de las Campanas No. 3, Despacho 304, <br /> Piso 3 Torre
                  A, San Andrés Atenco, 54050,
                  <br /> Tlalnepantla, México. Cd de México
                </Contact>
              </Center>

              {!tablet ? null : (
                <vr style={{ border: "solid 1px #41B8F9", height: "150px" }} />
              )}

              <Center style={{ textAlign: "center" }}>
                <Title>Quiero anunciar</Title>
                <ButtonStyled onClick={handleToggleRegister}>
                  Registrarme
                </ButtonStyled>
                <br />
                <ButtonStyled onClick={handleToggleRegister}>
                  Iniciar sesión
                </ButtonStyled>
              </Center>

              {!tablet ? null : (
                <vr style={{ border: "solid 1px #41B8F9", height: "150px" }} />
              )}
              <Left>
                <Contact>contacto@witideal.com</Contact>
                <Contact>55 1971 3247(soporte)</Contact>
                <Contact>33 1527 6156 (ventas)</Contact>
                <SocialContainer>
                  <a
                    href="https://www.facebook.com/Witideal-100558841331747/"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <SocialIcon src={facebook} />
                  </a>
                  <a
                    href="https://www.instagram.com/witideal/"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <SocialIcon src={instagram} />
                  </a>
                  <a
                    href="https://www.youtube.com/channel/UC_sEpAQLE-WEVtCA-_RnlEA"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <SocialIcon src={youtube} />
                  </a>
                  <a
                    href="https://www.linkedin.com/company/witideal"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <SocialIcon src={linkedin} />
                  </a>
                </SocialContainer>
                <SocialContainer>
                  {/* <a href='/#'><App src={appstore} style={{ marginRight: '10px' }}/></a> */}
                  <a
                    href="https://play.google.com/store/apps/details?id=com.ard.witideal"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <App src={playstore} />
                  </a>
                </SocialContainer>
              </Left>
            </Body>
          </Grid>
        </Grid>
      </Container>
      <LegalContainer>
        <Grid container justifyContent="center">
          <Grid item xs={12} lg={10}>
            <LegalBody>
              <LegalLeft>
                <div>
                  ®{new Date().getFullYear()}, Derechos Reservados |
                  Desarrolladora de Tecnologías ARD, S.A. de C.V.
                </div>
                <div>Versión {currentVersion}</div>
              </LegalLeft>

              <LegalRight>
                <LegalLink to="/terminos-y-condiciones">
                  Términos y condiciones
                </LegalLink>
                <span>{" | "}</span>
                <LegalLink to="/aviso-de-privacidad">
                  Aviso de Privacidad
                </LegalLink>
              </LegalRight>
            </LegalBody>
          </Grid>
        </Grid>
      </LegalContainer>

      <Modal
        aria-labelledby="register-modal"
        aria-describedby="register-form"
        className={classes.modal}
        open={openRegister}
        onClose={handleCloseRegister}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openRegister}>
          <div className={classes.paper}>
            <CloseModal onClick={() => setOpenRegister(false)} />

            <Paper elevation={0}>
              <Box p={{ md: 5, xs: 1 }}>
                <Grid container justifyContent="center" alignItems="center">
                  <Grid item xs={12} sm={10} lg={10}>
                    <Register
                      setComesFromLogin={setComesFromLogin}
                      comesFromLogin={comesFromLogin}
                      dismissModal={handleCloseRegister}
                      changeToLogIn={changeToLogIn}
                      federated={federated}
                      setFederated={setFederated}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
const App = styled("img")({
  height: "30px",
});
const SocialIcon = styled("img")({
  width: "40px",
});
const SocialContainer = styled("div")({
  marginTop: "15px",
  display: "flex",
  justifyContent: "flex-end",
  "@media (max-width:900px)": {
    justifyContent: "center",
  },
});
const Contact = styled("div")({
  color: "#fff",
  marginBottom: "5px",
});

const ButtonStyled = styled(Button)({
  textDecoration: "none",
  color: "#fff",
  marginBottom: "5px",
  "@media (max-width:1400px)": {
    fontSize: ".9em",
  },
});

const Title = styled("div")({
  fontSize: "1.6em",
  color: "#41B8F9",
  fontWeight: "bold",
  marginBottom: "5px",
  "@media (max-width:1400px)": {
    fontSize: "1.3em",
  },
});
const LogoImg = styled("img")({
  width: "90px",
  "@media (max-width:1400px)": {
    width: "75px",
  },
});
const Container = styled("div")({
  background: "#3f19f9",
  padding: "20px 20px",
});

const Body = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  "@media (max-width:900px)": {
    flexWrap: "wrap",
  },
});

const Right = styled("div")({
  textAlign: "left",
  "@media (max-width:900px)": { width: "100%", textAlign: "center" },
});

const Left = styled("div")({
  textAlign: "right",
  "@media (max-width:900px)": {
    width: "100%",
    textAlign: "center",
    marginTop: "15px",
  },
});

const Center = styled("a")({
  textDecoration: "none",
  width: "auto",
  display: "block",
  textAlign: "left",
  "@media (max-width:900px)": {
    width: "100%",
    textAlign: "center",
    marginTop: "25px",
    marginBottom: "25px",
  },
});

const LegalContainer = styled("div")({
  background: "#2a11a0",
  padding: "20px 20px",
});
const LegalBody = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  "@media (max-width:900px)": {
    flexWrap: "wrap",
  },
});
const LegalLeft = styled("div")({
  width: "50%",
  color: "#41B8F9",
  textAlign: "left",
  "@media (max-width:900px)": {
    width: "100%",
    textAlign: "center",
  },
});
const LegalRight = styled("div")({
  lineHeight: "2em",
  color: "#fff",
  width: "50%",
  textAlign: "right",
  "@media (max-width:900px)": {
    width: "100%",
    textAlign: "center",
    marginTop: "20px",
  },
  "@media (max-width:500px)": {
    "& span": { display: "none" },
    "& a": { display: "block" },
  },
});

const LegalLink = styled(Link)({
  color: "#fff",
  textDecoration: "none",
});
