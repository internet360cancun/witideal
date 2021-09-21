import React, { useState } from "react";
import { styled } from "@material-ui/core/styles";
import { makeStyles, Modal, Button } from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Grid, Paper, Box } from "@material-ui/core";

import masclientes from "../../assets/howitworks/masclientes-1.png";
import { Register } from "../../components/Register/register";
import CloseModal from "../../layouts/closeModal";

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

const ThirdSection = () => {
  const classes = useStyles();

  const [openRegister, setOpenRegister] = useState(false);
  const [federated, setFederated] = useState(false); // state to hold if user comes from fb/gugulu
  const [comesFromLogin, setComesFromLogin] = useState(false);

  window.register = () => setOpenRegister(true);

  const changeToLogIn = () => {
    setOpenRegister(false);
  };

  const handleToggleRegister = () => {
    setOpenRegister(!openRegister);
  };

  const handleCloseRegister = () => {
    setOpenRegister(false);
  };

  return (
    <div className="view viewstyle" style={{background: 'linear-gradient(180deg, #3f19f9 0%, #2c0cc5 100%)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', borderRadius: '0px 298px'}}>
      <div className="container2" style={{marginTop: 118}}>
        <section className="mt-1">
          <div className="row align-items-center mt-5 mb-5">
            <div className="col-sm-6 col-md-12 col-lg-6 mb-5">
              <h1 className="BannerTitle3 text-right">Más clientes</h1>
              <p className="text-right subview3" style={{color: '#ffffff', fontSize: 26}}>
                <strong style={{color: 'aqua'}}> + </strong> leads
                <strong style={{color: 'aqua'}}> + </strong> prospectos
                <strong style={{color: 'aqua'}}> + </strong> amigos
              </p>
              <br />
              <br />
              <ul className="listview3 text-left" style={{listStyle: 'none', padding: 0, margin: 0, fontSize: 32, fontWeight: 500, color: '#ffffff'}}>
                <li>
                  <strong style={{color: 'aqua'}}> + </strong> Anuncios gratis
                </li>
                <li>
                  <strong style={{color: 'aqua'}}> + </strong> Campañas en Facebook
                </li>
                <li>
                  <strong style={{color: 'aqua'}}> + </strong> Instagram
                </li>
                <li>
                  <strong style={{color: 'aqua'}}> + </strong> Redes y grupos
                </li>
                <li>
                  <strong style={{color: 'aqua'}}> + </strong> Medios
                </li>
              </ul>
              <br />
              <br />
              <button
                onClick={handleToggleRegister}
                className="btn color-primary custombtnindex3 waves-effect waves-light"
              >
                Registrate
              </button>
            </div>
            <div className="col-md-6 mb-4 align-content-start imgtech">
              <img src={masclientes}/>
            </div>
          </div>
        </section>
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
    </div>

  );
};

const ButtonStyled = styled(Button)({
  textDecoration: "none",
  color: "#fff",
  marginBottom: "5px",
  paddingLeft: "90px !important",
  paddingRight: "90px !important",
  borderRadius: "68px !important",
  "@media (max-width:1400px)": {
    fontSize: ".9em",
  },
});
export default ThirdSection;
