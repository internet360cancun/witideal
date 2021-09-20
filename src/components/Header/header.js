import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Backdrop from '@material-ui/core/Backdrop';
import Modal from '@material-ui/core/Modal';
import IconButton from '@material-ui/core/IconButton';
import SesContext from '../../contexts/sessionContext';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import useFirebaseTools from '../../Hooks/useFirebaseTools';
import { Tooltip, Hidden } from '@material-ui/core';
import { LogIn } from '../LogIn/logIn';
import { Register } from '../Register/register';
import { Grid, Paper, Box, styled } from '@material-ui/core';
import * as ROUTES from '../../constants/routes';
import Fade from '@material-ui/core/Fade';
import { enviroment } from '../../constants/globalConstraints';
import Notification from './components/notification';
import { useHistory } from 'react-router-dom';
import CloseModal from '../../layouts/closeModal';
import ChangeUserToPromoter from '../../highOrderComponents/changeUserToPromoter';

const avatar =
  'https://firebasestorage.googleapis.com/v0/b/witideal-b1f99.appspot.com/o/assets%2Ficons%2Fthumb%40logIn.svg?alt=media&token=b5b57bad-a437-4691-bd6c-194c98514983';
const logoWitideal =
  'https://firebasestorage.googleapis.com/v0/b/witideal-develop.appspot.com/o/assets%2Fthumb%40BlackIogo.svg?alt=media&token=3113b9ae-4a7e-4276-a1e6-9b66cb5587ed';

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

const Name = styled('div')({
  marginRight: '10px',
  color: 'var(--blue)',
  paddingLeft: '5px',
});

const Profile = styled(Button)({
  border: '1px solid #cdcdcd66',
  boxShadow: '5px 5px 10px #8080804a',
});

function HeaderComponent(props) {
  const classes = useStyles();
  const { logOut } = useFirebaseTools();
  const context = useContext(SesContext);
  const [hamMenuPromoter, setHamMenuPromoter] = React.useState(null);
  const [openLogIn, setOpenLogIn] = React.useState(false);
  const [openRegister, setOpenRegister] = React.useState(false);
  const [federated, setFederated] = React.useState(false); // state to hold if user comes from fb/gugulu
  const [comesFromLogin, setComesFromLogin] = React.useState(false);

  window.register = () => setOpenRegister(true);
  window.login = () => setOpenLogIn(true);

  const history = useHistory();

  const handleCloseLogIn = () => {
    setOpenLogIn(false);
  };
  const handleToggleLogIn = () => {
    setOpenLogIn(!openLogIn);
  };
  const handleCloseRegister = () => {
    setOpenRegister(false);
  };
  const handleToggleRegister = () => {
    setOpenRegister(!openRegister);
  };
  const handleClick = (event) => {
    setHamMenuPromoter(event.currentTarget);
  };
  const handleClose = () => {
    setHamMenuPromoter(null);
  };
  const handleCloseLogOut = () => {
    setHamMenuPromoter(null);
    setFederated(false);
    logOut();
  };
  const changeToLogIn = () => {
    setOpenLogIn(true);
    setOpenRegister(false);
  };
  const changeToRegister = () => {
    setOpenLogIn(false);
    setOpenRegister(true);
  };
  var menuWithoutLogIn = (
    <React.Fragment>
      {/* XS -SM Layout */}

      <Hidden mdUp>
        <AppBar
          position="fixed"
          id="headerHeight"
          className={classes.navBgColor}
        >
          <Toolbar>
            <Link to={ROUTES.LANDING} className={classes.linkDecoration}>
              {enviroment === 'production' ? (
                <IconButton
                  edge="start"
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="menu"
                >
                  <img src={logoWitideal} alt="Witideal Logo" />
                </IconButton>
              ) : (
                <Typography variant="h6">Desarrollo</Typography>
              )}
            </Link>
            <Typography variant="h6" className={classes.title}></Typography>
            <Button
              color="primary"
              onClick={() => history.push(ROUTES.HOWITWORKS)}
              size="small"
              className={classes.btnItem}
              style={{ fontSize: '.9em' }}
            >
              Anunciar
            </Button>
            <Button
              size="small"
              color="primary"
              variant="outlined"
              className={classes.btnItem}
              style={{ fontSize: '.85em' }}
              onClick={handleToggleRegister}
            >
              Registrarte
            </Button>
          </Toolbar>
        </AppBar>
      </Hidden>

      {/* Desktop Layout  MD- LG*/}
      <Hidden smDown>
        <AppBar
          position="fixed"
          id="headerHeight"
          className={classes.navBgColor}
        >
          <Toolbar>
            <Link to={ROUTES.LANDING} className={classes.linkDecoration}>
              {enviroment === 'production' ? (
                <IconButton
                  edge="start"
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="menu"
                >
                  <img src={logoWitideal} alt="Witideal Logo" />
                </IconButton>
              ) : (
                <Typography variant="h4">Desarrollo</Typography>
              )}
            </Link>
            <Typography variant="h6" className={classes.title}></Typography>
            <Link to={ROUTES.HOWITWORKS} className={classes.linkDecoration}>
              <Button
                id="target_guide"
                color="primary"
                className={classes.btnItem}
              >
                Quiero Anunciar
              </Button>
            </Link>
            <Link to={ROUTES.SEARCH} className={classes.linkDecoration}>
              <Button color="primary" className={classes.btnItem}>
                Buscar
              </Button>
            </Link>
            <Button
              color="primary"
              variant="outlined"
              className={classes.btnItem}
              onClick={handleToggleLogIn}
            >
              Iniciar Sesión
            </Button>
            <Button
              color="primary"
              variant="contained"
              className={classes.btnItemContained}
              onClick={handleToggleRegister}
            >
              Registrarse
            </Button>
          </Toolbar>
        </AppBar>
      </Hidden>
    </React.Fragment>
  );

  var menuPromoterTooltip = (
    <React.Fragment>
      <Typography variant="caption">Promotor Witideal</Typography>
      <Typography>{context.Name || ''}</Typography>
      <Typography variant="caption">{context.Email}</Typography>
    </React.Fragment>
  );

  var menuPromoter = (
    <React.Fragment>
      {/* XS -SM Layout */}
      <Hidden mdUp>
        <AppBar
          position="fixed"
          id="headerHeight"
          className={classes.navBgColor}
        >
          <Toolbar>
            <Link to={ROUTES.LANDING} className={classes.linkDecoration}>
              {enviroment === 'production' ? (
                <IconButton
                  edge="start"
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="menu"
                >
                  <img src={logoWitideal} alt="Witideal Logo" />
                </IconButton>
              ) : (
                <Typography variant="h6">Desarrollo</Typography>
              )}
            </Link>
            <Typography variant="h6" className={classes.title}></Typography>

            <Notification />
            <Tooltip title={menuPromoterTooltip} placement="bottom">
              <Profile className={classes.btnItem} onClick={handleClick}>
                <Name>{context.Name ? context.Name.split(' ')[0] : ''}</Name>
                <Avatar
                  className={classes.avatarColor}
                  src={context.PhotoURL || avatar}
                />
              </Profile>
            </Tooltip>
            <Menu
              id="simple-menu"
              anchorEl={hamMenuPromoter}
              keepMounted
              open={Boolean(hamMenuPromoter)}
              onClose={handleClose}
            >
              <Link to={ROUTES.MYPROFILE} className={classes.linkDecoration}>
                <MenuItem onClick={handleClose}>Mi Perfil</MenuItem>
              </Link>
              <Link to={ROUTES.MYFAVORITES} className={classes.linkDecoration}>
                <MenuItem onClick={handleClose}>Mis Favoritos</MenuItem>
              </Link>
              <Link to={ROUTES.MYPROPERTIES} className={classes.linkDecoration}>
                <MenuItem onClick={handleClose}>Mis Inmuebles</MenuItem>
              </Link>
              <Link to={ROUTES.SEARCH} className={classes.linkDecoration}>
                <MenuItem onClick={handleClose}>Buscar Inmuebles</MenuItem>
              </Link>
              {/* <MenuItem onClick={handleClose}>WITICOINS</MenuItem> */}
              <Link to={ROUTES.UPLOAD} className={classes.linkDecoration}>
                <MenuItem onClick={handleClose}>Cargar Inmueble</MenuItem>
              </Link>

              <Link to={ROUTES.BUYWITICOINS} className={classes.linkDecoration}>
                <MenuItem onClick={handleClose}>Agregar Witicoins</MenuItem>
              </Link>
              <Link to="/mis-pagos" className={classes.linkDecoration}>
                <MenuItem onClick={handleClose}>Mis Pagos</MenuItem>
              </Link>
              <Link to={ROUTES.HOWITWORKS} className={classes.linkDecoration}>
                <MenuItem onClick={handleClose}>¿Cómo funciona?</MenuItem>
              </Link>
              <Link to={ROUTES.SEARCH} className={classes.linkDecoration}>
                <MenuItem onClick={handleCloseLogOut}>Cerrar Sesión</MenuItem>
              </Link>
            </Menu>
          </Toolbar>
        </AppBar>
      </Hidden>

      {/* MD - LG Layout */}
      <Hidden smDown>
        <AppBar
          position="fixed"
          id="headerHeight"
          className={classes.navBgColor}
        >
          <Toolbar>
            <Link to={ROUTES.LANDING} className={classes.linkDecoration}>
              {enviroment === 'production' ? (
                <IconButton
                  edge="start"
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="menu"
                >
                  <img src={logoWitideal} alt="Witideal Logo" />
                </IconButton>
              ) : (
                <Typography variant="h4">Desarrollo</Typography>
              )}
            </Link>
            <Typography variant="h6" className={classes.title}></Typography>
            <Link to={ROUTES.UPLOAD} className={classes.linkDecoration}>
              <Button
                id="target_guide"
                color="primary"
                className={classes.btnItem}
              >
                {' '}
                <div id="target_guide_here" /> Anunciar
              </Button>{' '}
              {/* div inside for render Helpers ( how to upload a new property) */}
            </Link>
            <Link to={ROUTES.MYPROPERTIES} className={classes.linkDecoration}>
              <Button color="primary" className={classes.btnItem}>
                Mis Inmuebles
              </Button>
            </Link>
            {/* <Link to={ROUTES.BUYWITICOINS} className={classes.linkDecoration}>

              <Button color="primary" className={classes.btnItem}>Paquetes</Button>

            </Link> */}
            <Link to={ROUTES.SEARCH} className={classes.linkDecoration}>
              <Button color="primary" className={classes.btnItem}>
                Buscar
              </Button>
            </Link>
            <Notification />
            <Tooltip title={menuPromoterTooltip} placement="bottom">
              <Profile className={classes.btnItem} onClick={handleClick}>
                <Name>{context.Name ? context.Name.split(' ')[0] : ''}</Name>
                <Avatar
                  className={classes.avatarColor}
                  src={context.PhotoURL || avatar}
                />
              </Profile>
            </Tooltip>
            <Menu
              id="simple-menu"
              anchorEl={hamMenuPromoter}
              keepMounted
              open={Boolean(hamMenuPromoter)}
              onClose={handleClose}
            >
              <Link to={ROUTES.MYPROFILE} className={classes.linkDecoration}>
                <MenuItem onClick={handleClose}>Mi Perfil</MenuItem>
              </Link>
              <Link to={ROUTES.MYFAVORITES} className={classes.linkDecoration}>
                <MenuItem onClick={handleClose}>Mis Favoritos</MenuItem>
              </Link>
              <Link to="/mis-pagos" className={classes.linkDecoration}>
                <MenuItem onClick={handleClose}>Mis Pagos</MenuItem>
              </Link>
              <Link to={ROUTES.HOWITWORKS} className={classes.linkDecoration}>
                <MenuItem onClick={handleClose}>¿Cómo funciona?</MenuItem>
              </Link>
              <Link to={ROUTES.SEARCH} className={classes.linkDecoration}>
                <MenuItem onClick={handleCloseLogOut}>Cerrar Sesión</MenuItem>
              </Link>
            </Menu>
          </Toolbar>
        </AppBar>
      </Hidden>
    </React.Fragment>
  );

  // User view
  var menuUserTooltip = (
    <React.Fragment>
      <Typography>{context.Name}</Typography>
      <Typography variant="caption">{context.Email}</Typography>
    </React.Fragment>
  );

  var menuUser = (
    <React.Fragment>
      {/* XS -SM Layout */}
      <Hidden smDown>
        <AppBar
          position="fixed"
          id="headerHeight"
          className={classes.navBgColor}
        >
          <Toolbar>
            <Link to={ROUTES.SEARCH} className={classes.linkDecoration}>
              {enviroment === 'production' ? (
                <IconButton
                  edge="start"
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="menu"
                >
                  <img src={logoWitideal} alt="Witideal Logo" />
                </IconButton>
              ) : (
                <Typography variant="h4">Desarrollo</Typography>
              )}
            </Link>
            <Typography variant="h6" className={classes.title}></Typography>

            <Button
              onClick={props.onChangeToPromoter}
              color="primary"
              className={classes.btnItem}
            >
              Quiero Volverme Promotor
            </Button>
            <Link to={ROUTES.SEARCH} className={classes.linkDecoration}>
              <Button color="primary" className={classes.btnItem}>
                Buscar
              </Button>
            </Link>

            <Tooltip title={menuUserTooltip} placement="bottom">
              <Profile className={classes.btnItem} onClick={handleClick}>
                <Name>{context.Name ? context.Name.split(' ')[0] : ''}</Name>
                <Avatar
                  className={classes.avatarColor}
                  src={context.PhotoURL || avatar}
                />
              </Profile>
            </Tooltip>
            <Menu
              id="simple-menu"
              anchorEl={hamMenuPromoter}
              keepMounted
              open={Boolean(hamMenuPromoter)}
              onClose={handleClose}
            >
              <Link to={ROUTES.MYPROFILE} className={classes.linkDecoration}>
                <MenuItem onClick={handleClose}>Mi Perfil</MenuItem>
              </Link>
              <Link to={ROUTES.MYFAVORITES} className={classes.linkDecoration}>
                <MenuItem onClick={handleClose}>Mis Favoritos</MenuItem>
              </Link>
              <Link to={ROUTES.SEARCH} className={classes.linkDecoration}>
                <MenuItem onClick={handleCloseLogOut}>Cerrar Sesión</MenuItem>
              </Link>
            </Menu>
          </Toolbar>
        </AppBar>
      </Hidden>
      <Hidden mdUp>
        <AppBar
          position="fixed"
          id="headerHeight"
          className={classes.navBgColor}
        >
          <Toolbar>
            <Link to={ROUTES.SEARCH} className={classes.linkDecoration}>
              {enviroment === 'production' ? (
                <IconButton
                  edge="start"
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="menu"
                >
                  <img src={logoWitideal} alt="Witideal Logo" />
                </IconButton>
              ) : (
                <Typography variant="h6">Desarrollo</Typography>
              )}
            </Link>
            <Typography variant="h6" className={classes.title}></Typography>

            <Link to={ROUTES.SEARCH} className={classes.linkDecoration}>
              <Button color="primary" className={classes.btnItem}>
                Buscar
              </Button>
            </Link>

            <Tooltip title={menuUserTooltip} placement="bottom">
              <Profile className={classes.btnItem} onClick={handleClick}>
                <Name>{context.Name ? context.Name.split(' ')[0] : ''}</Name>
                <Avatar
                  className={classes.avatarColor}
                  src={context.PhotoURL || avatar}
                />
              </Profile>
            </Tooltip>
            <Menu
              id="simple-menu"
              anchorEl={hamMenuPromoter}
              keepMounted
              open={Boolean(hamMenuPromoter)}
              onClose={handleClose}
            >
              <Link to={ROUTES.MYPROFILE} className={classes.linkDecoration}>
                <MenuItem onClick={handleClose}>Mi Perfil</MenuItem>
              </Link>
              <Link to={ROUTES.MYFAVORITES} className={classes.linkDecoration}>
                <MenuItem onClick={handleClose}>Mis Favoritos</MenuItem>
              </Link>
              <MenuItem onClick={props.onChangeToPromoter}>
                Quiero Volverme Promotor
              </MenuItem>
              <Link to={ROUTES.SEARCH} className={classes.linkDecoration}>
                <MenuItem onClick={handleCloseLogOut}>Cerrar Sesión</MenuItem>
              </Link>
            </Menu>
          </Toolbar>
        </AppBar>
      </Hidden>
    </React.Fragment>
  );

  function renderMenu() {
    if (context.SesState && context.RegComplete) {
      if (context.isPromoter) {
        return menuPromoter;
      } else {
        return menuUser;
      }
    } else {
      return menuWithoutLogIn;
    }
  }

  return (
    <div className={classes.root} id="header">
      {renderMenu()}
      {/* LogIn Modal */}
      <Modal
        aria-labelledby="logIn-modal"
        aria-describedby="login-form"
        className={classes.modal}
        open={openLogIn}
        onClose={handleCloseLogIn}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openLogIn}>
          <div className={classes.paperLogin} style={{ position: 'relative' }}>
            <CloseModal onClick={() => setOpenLogIn(false)} />
            <Grid container justify="center" alignItems="center">
              <Grid item xs={12} md={10} lg={10}>
                <Paper elevation={0}>
                  <Box pr={{ md: 5, xs: 1 }} pl={{ md: 5, xs: 1 }}>
                    <Grid container justify="center" alignItems="center">
                      <Grid item xs={12} md={10} lg={10}>
                        <LogIn
                          setComesFromLogin={setComesFromLogin}
                          dismissModal={handleCloseLogIn}
                          changeToRegister={changeToRegister}
                          setFederated={setFederated}
                          federated={federated}
                        />
                      </Grid>
                    </Grid>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </div>
        </Fade>
      </Modal>

      {/* Register Modal */}
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

export const Header = ChangeUserToPromoter(HeaderComponent);
