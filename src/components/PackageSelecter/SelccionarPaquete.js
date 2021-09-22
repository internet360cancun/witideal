import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
import { useAuthState } from 'react-firebase-hooks/auth';
import cardback from '../../assets/howitworks/card-back.png';
import { makeStyles, Modal } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Grid, Paper, Box } from '@material-ui/core';

import { createCheckoutSessionRisingStar } from '../../stripe/createCheckoutSessionRisinStar';
import { createCheckoutSessionRockStar } from '../../stripe/createCheckoutSessionRockStar';
import { createCheckoutSessionSuperStar } from '../../stripe/createCheckoutSessionSuperStar';
import { Register } from '../../components/Register/register';
import CloseModal from '../../layouts/closeModal';

const wdLightBlue = '#41B8F9';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    borderRadius: 5,
    '& img': {
      width: 200,
    },
    [theme.breakpoints.down('xs')]: {
      '& img': {
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
    textTransform: 'none',
    fontSize: 15,
    '&:hover': {
      backgroundColor: '#1E0E6F',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '14px',
    },
  },
  btnItem: {
    fontWeight: 700,
    marginLeft: 10,
    borderRadius: 50,
    textTransform: 'none',
    fontSize: 15,
    borderColor: wdLightBlue,
    [theme.breakpoints.down('xs')]: {
      fontSize: '14px',
    },
  },

  navBgColor: {
    backgroundColor: 'white',
  },
  linkDecoration: {
    textDecoration: 'none',
    color: 'black',
  },
  avatarColor: {
    color: '#fff',
    backgroundColor: '#E8E5FD',
    width: '30px',
    height: '30px',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paperLogin: {
    paddingTop: '60px',
    backgroundColor: theme.palette.background.paper,
    border: '0px solid #000',
    outline: 'none',
    position: 'relative',
    boxShadow: theme.shadows[5],
    maxHeight: '85vh',
    overflow: 'scroll',
    '&::-webkit-scrollbar': {
      width: 0,
    },
    [theme.breakpoints.up('xs')]: {
      width: '90%',
    },
    [theme.breakpoints.up('md')]: {
      width: '80%',
    },
    [theme.breakpoints.up('lg')]: {
      width: '70%',
    },
    [theme.breakpoints.up('xl')]: {
      width: '50%',
    },
  },
  paper: {
    paddingTop: '60px',
    backgroundColor: theme.palette.background.paper,
    border: '0px solid #000',
    outline: 'none',
    position: 'relative',
    boxShadow: theme.shadows[5],
    maxHeight: '85vh',
    overflow: 'scroll',
    '&::-webkit-scrollbar': {
      width: 0,
    },
    width: '750px',
    '@media (max-width:800px)': {
      width: '96%',
    },
  },
}));

const SelccionarPaquete = () => {
  const classes = useStyles();

  const [user, userLoading] = useAuthState(firebase.auth());

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
    <>
    <div className="container2" id="section7">
      {!user && userLoading && <h1>Cargando</h1>}
      <section className="mt-5">
        <div className="row">
          <div className="col">
            <div className="row d-flex justify-content-center">
              <div className="col-xm-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center">
                <div className="BannerTitle7">
                  Selecciona tu paquete
                </div>
              </div>
            </div>
            <div className="row d-flex justify-content-center">
              <div className="col-xm-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 text-center">
                <div className="row">
                  <div className="col">
                    <div className="megatitle">
                      Plan <br />
                      Risingstar
                    </div>
                  </div>
                </div>
                <div className="card cardplanes">
                  <div className="backcard1">
                    <div className="contenidocard">
                      <img className="imgcrd1" src={cardback} alt={""} />
                      <div className="titulo">Paquete Básico</div>
                      <div className="subtitulo">(Anunciar Gratis)</div>
                      <div className="precio">$1,500 MXN</div>
                      <div className="subtitulo">(3 Propiedades destacadas)</div>
                      <div className="lista">
                        <br />
                        <p>
                          <strong style={{color: 'aqua'}}>+</strong> Campaña de Facebook
                          / Instagram Ads en la fanpage de Witideal
                        </p>
                        <p>
                          <strong style={{color: 'aqua'}}>+</strong> Formato anuncio
                          carrusel o post / potencial o mensajes (3 propiedades)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    {!user && !userLoading && (
                      <button
                        onClick={handleToggleRegister}
                        className="btnplanes"
                      >
                        CONTRATAR
                      </button>
                    )}
                    {user && !userLoading && (
                      <button
                        onClick={() =>
                          createCheckoutSessionRisingStar(user.uid)
                        }
                        className="btnplanes"
                      >
                        CONTRATAR
                      </button>
                    )}
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
                          <CloseModal
                            onClick={() => setOpenRegister(false)}
                          />

                          <Paper elevation={0}>
                            <Box p={{ md: 5, xs: 1 }}>
                              <Grid
                                container
                                justifyContent="center"
                                alignItems="center"
                              >
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
                </div>
              </div>
              <div className="col-xm-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 text-center">
                <div className="megatitle">
                  Plan <br />
                  Rockstar
                </div>
                <div className="card cardplanes">
                  <div className="backcard2">
                    <div className="contenidocard">
                      <img className="imgcrd1" src={cardback}  />
                      <div className="titulo">Paquete Plata</div>
                      <div className="subtitulo">(Anunciar Gratis)</div>
                      <div className="precio">$1,990 MXN</div>
                      <div className="subtitulo">(5 Propiedades destacadas)</div>
                      <div className="lista">
                        <br />
                        <p>
                          <strong style={{color: 'aqua'}}>+</strong> Campaña de Facebook
                          / Instagram Ads en la fanpage de Witideal
                        </p>
                        <p>
                          <strong style={{color: 'aqua'}}>+</strong> Formato anuncio
                          carrusel o post / potencial o mensajes (5 propiedades)
                        </p>
                        <p>
                          <strong style={{color: 'aqua'}}>+</strong> Post en redes LUIS
                          RAM / Remates y oportunidades en directorio de redes
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    {!user && !userLoading && (
                      <button
                        onClick={handleToggleRegister}
                        className="btnplanes"
                      >
                        CONTRATAR
                      </button>
                    )}
                    {user && !userLoading && (
                      <button
                        onClick={() =>
                          createCheckoutSessionRockStar(user.uid)
                        }
                        className="btnplanes"
                      >
                        CONTRATAR
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-xm-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 text-center">
                <div className="megatitle">
                  Plan <br />
                  Superstar
                </div>
                <div className="card cardplanes">
                  <div className="backcard3">
                    <div className="contenidocard">
                      <img className="imgcrd1" src={cardback} />
                      <div className="titulo">Paquete Oro</div>
                      <div className="subtitulo">(Anunciar Gratis)</div>
                      <div className="precio">$2,500 MXN</div>
                      <div className="subtitulo">(Hasta 10 propiedades destacadas)</div>
                      <div className="lista">
                        <br />
                        <p>
                          <strong style={{color: 'aqua'}}>+</strong> Campaña de Facebook
                          / Instagram Ads en la fanpage de Witideal
                        </p>
                        <p>
                          <strong style={{color: 'aqua'}}>+</strong> Formato anuncio
                          carrusel o post / potencial o mensajes (10 propiedades)
                        </p>
                        <p>
                          <strong style={{color: 'aqua'}}>+</strong> Post en redes LUIS
                          RAM / Remates y oportunidades en directorio de redes
                        </p>
                        <p>
                          <strong style={{color: 'aqua'}}>+</strong> Mención en el
                          programa de radio / Luis Ramírez Mundo Inmobiliario
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    {!user && !userLoading && (
                      <button
                        onClick={handleToggleRegister}
                        className="btnplanes"
                      >
                        CONTRATAR
                      </button>
                    )}
                    {user && !userLoading && (
                      <button
                        onClick={() =>
                          createCheckoutSessionSuperStar(user.uid)
                        }
                        className="btnplanes"
                      >
                        CONTRATAR
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <br /><br /><br /><br /><br /><br />
    </div>
    </>
  );
};

export default SelccionarPaquete;
