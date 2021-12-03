import React, { useContext, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useHistory } from "react-router";
import {
  makeStyles,
  Modal,
  Grid,
  Paper,
  Box,
  Backdrop,
  Fade,
} from "@material-ui/core";
import PublicaCard from "../../components/home/PublicaCard";
import sessionContext from "../../contexts/sessionContext";
import CloseModal from "../../layouts/closeModal";
import { Register } from "../../components/Register/register";

const img =
  "https://firebasestorage.googleapis.com/v0/b/witideal-b1f99.appspot.com/o/assets%2Ficons%2Fthumb%40frame.svg?alt=media&token=9116d954-5f68-4266-bb5e-1cafe947a61e";

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

const Publica = () => {
  const data = [
    {
      id: 1,
      img: "https://firebasestorage.googleapis.com/v0/b/witideal-b1f99.appspot.com/o/assets%2Ficons%2Fthumb%40paper.svg?alt=media&token=52180a4f-4b61-44a2-a453-666dc93d77c4",
      title: "Registra tu inmueble",
      desc: "Agrega los datos de tu inmueble",
    },
    {
      id: 2,
      img: "https://firebasestorage.googleapis.com/v0/b/witideal-b1f99.appspot.com/o/assets%2Ficons%2Fthumb%40map-location%201.svg?alt=media&token=02b23d14-4663-466f-b6ef-9a71abf1c164",
      title: "Agrega ubicación",
      desc: "Agrega la ubicación de la propiedad en mapa",
    },
    {
      id: 3,
      img: "https://firebasestorage.googleapis.com/v0/b/witideal-b1f99.appspot.com/o/assets%2Ficons%2Fthumb%40image-gallery.svg?alt=media&token=779df776-449c-41b5-aef8-e8534027bf89",
      title: "Agrega datos específicos",
      desc: "Agrega características físicas, estado de conservación",
    },
    {
      id: 4,
      img: "https://firebasestorage.googleapis.com/v0/b/witideal-b1f99.appspot.com/o/assets%2Ficons%2Fthumb%40folder-management.svg?alt=media&token=08b99819-0a27-42ca-992c-76da09db649c",
      title: "Agrega tus imágenes",
      desc: "Agrega la imagen principal y fotos del inmueble.",
    },
  ];
  const classes = useStyles();
  const history = useHistory();
  const { isLogged } = useContext(sessionContext);
  const [openRegister, setOpenRegister] = useState(false);
  const [comesFromLogin, setComesFromLogin] = useState(false);
  const [federated, setFederated] = useState(false); // state to hold if user comes from fb/gugulu

  const handleRedirect = () => {
    isLogged ? history.push("/Cargar") : handleToggleRegister();
  };

  const handleToggleRegister = () => setOpenRegister(!openRegister);
  const changeToLogIn = () => setOpenRegister(false);
  const handleCloseRegister = () => setOpenRegister(false);

  return (
    <div className="mb-5">
      <h1 className="title pt-5">Publica tus propiedades</h1>
      <p className="text-witideal">
        En <span className="witideal"> Witideal</span> es fácil y ágil
        anunciarse
      </p>
      <Container>
        <Row>
          {data.map((info) => (
            <Col
              sm={6}
              lg={3}
              key={info.id}
              className="d-flex justify-content-center"
            >
              <PublicaCard
                id={info.id}
                img={info.img}
                title={info.title}
                desc={info.desc}
              />
            </Col>
          ))}
        </Row>
        <div className="mt-5 ">
          <div className="d-flex justify-content-center">
            <div
              onClick={handleRedirect}
              className="background-anunciar pt-4 card-hover pointer"
            >
              <img src={img} alt="anuncia ahora" />
              <p className="subtitle-2">Publica tus propiedades ahora</p>
              <p className="subtitle-3 text-white">
                Aumenta tus oportunidades de venta
              </p>
            </div>
          </div>
        </div>

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
      </Container>
    </div>
  );
};

export default Publica;
