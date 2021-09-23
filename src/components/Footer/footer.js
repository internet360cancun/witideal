import React from "react";
import { styled } from "@material-ui/core/styles";
import { Button, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";
import facebook from "../../assets/facebook.svg";
import instagram from "../../assets/instagram.svg";
import youtube from "../../assets/youtube.svg";
import playstore from "../../assets/playstore.png";
// import appstore from "../../assets/appstore.png";
import linkedin from "../../assets/linkedin.svg";
import { currentVersion } from "../../assets/Strings";
import tucasasrc from "../../assets/tucasa.png";
import creditosrc from "../../assets/credito.png";
import useSession from "../../Hooks/useSession";
import fotoespacioSrc from "../../assets/fotoespacio.png";

export function Footer() {
  const { isPromoter = false } = useSession();

  return (
    <div className="master_footer">
      <Container>
        <Grid container justifyContent="center">
          <Grid item xs={12} lg={10}>
            <Body>
              <Right>
                <LogoImg src={Logo} />
                <Title>Descubre tu lugar</Title>
                {/* <Text>NOSOTROS</Text> */}
                <LinkStyled to="/como-funciona">Quiero Anunciar</LinkStyled>
              </Right>
              <Center href="https://bit.ly/3q3rTri" target="_blank">
                <LogoImg src={tucasasrc} alt="Tu Kasa en linea logo" />
                <Title>Tu Kasa en línea</Title>
                <ButtonStyled>Servicio de Mudanzas</ButtonStyled>
              </Center>

              {isPromoter && (
                <Center href="https://bit.ly/3hXM8E7" target="_blank">
                  <LogoImg src={fotoespacioSrc} alt="Tu Kasa en linea logo" />
                  <Title>Foto Espacios</Title>
                  <ButtonStyled >
                    Arquitectura {"&"} Inmobiliaria <br />
                    Fotografía{" "}
                  </ButtonStyled>
                </Center>
              )}

              <Center
                href="https://bit.ly/36sDCbz"
                target="_blank"
                style={{ textAlign: "center" }}
              >
                <LogoImg src={creditosrc} alt="Tu Kasa en linea logo" />
                <Title>
                  Créditos <br />
                  Hipotecarios
                </Title>
                {/* <LinkStyled>Servicio de Mudanzas</LinkStyled> */}
              </Center>
              <Left>
                <Contact>contacto@witideal.com</Contact>
                <Contact>55 1971 3247(soporte)</Contact>
                <Contact>800 905 0911 (ventas)</Contact>
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
                  Cerro de las Campanas No.3 Despacho 304, piso 3 Torre A, San
                  Andrés Atenco, 54050 Tlalnepantla, México. Cd de México
                </div>
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

const LinkStyled = styled(Link)({
  textDecoration: "none",
  color: "#fff",
  marginBottom: "5px",
  "@media (max-width:1400px)": {
    fontSize: ".9em",
  },
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
  // width: '33%',
  textAlign: "left",
  "@media (max-width:900px)": { width: "100%", textAlign: "center" },
});

const Left = styled("div")({
  // width: '33%',
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
  cursor: "pointer",
});
// -----------

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
