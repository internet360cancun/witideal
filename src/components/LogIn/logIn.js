import React, { useState } from "react";
import {
  Grid,
  Box,
  Typography,
  TextField,
  makeStyles,
  Button,
  styled,
} from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
// import Facebook from '../../assets/face.svg';
import Google from "../../assets/google.svg";
import { Divider } from "@material-ui/core";
import { Link } from "react-router-dom";
import useFormValidation from "../../Hooks/useFormValidation";
import validateAuth from "../../functions/validateAuth";
import useFirebaseTools from "../../Hooks/useFirebaseTools";
import * as ROUTES from "../../constants/routes";
import { ErrorModal } from "../ErrorModal/errorModal";
import CircularProgress from "@material-ui/core/CircularProgress";
import { registerOrLoginWidthGoogle } from "../../firebase/user";
import { setAlert } from "../Alert/alert";

const wdDarkBlue = "#1E0E6F";
const wdRegularBlue = "#3F19F9";
// const wdLightGreen = '#32FFD2';

const RegisterLink = styled("span")({
  color: "var(--blue)",
  textDecoration: "underline",
  marginLeft: "10px",
  cursor: "pointer",
});

const useStyles = makeStyles((theme) => ({
  buttonLogIn: {
    marginTop: theme.spacing(3),
    borderRadius: 50,
    fontWeight: 700,
    fontSize: 14,
    backgroundColor: wdRegularBlue,
    color: "white",
    textTransform: "none",
    "&:hover": {
      backgroundColor: wdDarkBlue,
    },
  },
  buttonRegister: {
    padding: "10px 0px",
    marginTop: theme.spacing(3),
    borderColor: "#41B8F9",
    textDecoration: "none",
    textTransform: "none",
    borderRadius: 50,
    fontWeight: 700,
    marginBottom: 30,
    fontSize: 12,
    color: wdRegularBlue,
    "&:hover": {
      borderColor: wdRegularBlue,
    },
  },
  buttonGoogle: {
    paddingLeft: theme.spacing(0.5),
    textTransform: "none",
    borderRadius: 50,
    fontWeight: 700,
    color: "#757575",
    height: 40,
    fontSize: 14,
  },
  // buttonFacebook: {
  //     textTransform: 'none',
  //     borderRadius: 50,
  //     fontWeight: 700,
  //     color: '#777777',
  //     height: 40,
  //     fontSize: 13
  // },
  loader: {
    position: "relative",
    left: "45%",
  },
  logoSocial: {
    marginRight: theme.spacing(1),
  },
  linkColor: {
    color: wdRegularBlue,
    transition: "0.2s",
    "&:hover": {
      color: wdDarkBlue,
      fontWeight: 700,
      cursor: "pointer",
    },
  },
  linkDecoration: {
    textDecoration: "none",
  },
  typeSubtitle: {
    color: wdDarkBlue,
  },
  typeTitle: {
    color: wdDarkBlue,
    fontWeight: 700,
  },
  textField: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#41B8F9",
        // borderRadius: 50,
      },
      "&:hover fieldset": {
        borderColor: wdRegularBlue,
      },
      "&.Mui-focused fieldset": {
        borderColor: wdRegularBlue,
      },
    },
  },
}));

const initialState = {
  email: "",
  password: "",
};

export function LogIn(props) {
  /*
    ===== props
    changeToRegister = function to change modal into register
    dismissModal = function to close the modal
  */

  const { nLog, fLog } = useFirebaseTools();
  const { handleChange, handleBlur, Errors, Values, setErrors } =
    useFormValidation(initialState, validateAuth);

  const classes = useStyles();
  const [ShowPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [errorModal, setErrorModal] = useState({
    open: false,
    alarmText: "",
  });

  const handleErrorModal = () => {
    setErrorModal({
      ...errorModal,
      open: false,
    });
  };

  const handleLogIn = () => {
    setIsLoading(true);
    logIn();
  };

  console.log("loading...", isLoading);

  const logIn = async (e) => {
    if (Object.keys(Errors).length === 0) {
      if (Values.email.length !== 0 && Values.password.length !== 0) {
        let res = await nLog(Values.email, Values.password);
        if (res.error_code === undefined) {
          if (res.isRegisterComplete) {
            props.dismissModal();
            setIsLoading(false);
          } else {
            props.setFederated(true);
            props.changeToRegister();
            setIsLoading(false);
          }
        } else {
          console.log(`code: ${res.error_code} - message: ${res.description}`);
          setErrorModal({
            ...errorModal,
            open: true,
            alarmText: `${res.description}`,
          });
          setIsLoading(false);
        }
      } else {
        setErrors(validateAuth(Values, "All"));
        setErrorModal({
          ...errorModal,
          open: true,
          alarmText: "Existen campos obligatorios que no están completos",
        });
        setIsLoading(false);
      }
    } else {
      setErrorModal({
        ...errorModal,
        open: true,
        alarmText: "Favor de revisar todos los campos",
      });
      setIsLoading(false);
    }
  };

  const handleLogInG = async () => {
    props.setFederated(true);
    let res = await registerOrLoginWidthGoogle();
    console.log("resresresres", res);
    if (res.success && res.isComplete) {
      props.dismissModal();
    } else if (res.success && !res.isComplete) {
      props.setComesFromLogin(res);
      props.changeToRegister();
    } else if (res.error) {
      setAlert(
        null,
        " ",
        "El correo ya se encuentra registrado, incia sesión nuevamente",
        "error"
      );
    } else {
      props.setFederated(false);
    }
  };

  const handleLogInF = async () => {
    props.setFederated(true);
    let res = await fLog();
    console.log("res", res);
    if (res.error_code === undefined) {
      if (res.isRegisterComplete) {
        props.dismissModal();
      } else {
        props.changeToRegister();
      }
    } else {
      console.log(`${res.description}`);
      setErrorModal({
        ...errorModal,
        open: true,
        alarmText: `${res.description}`,
      });
    }
  };

  const handleClickShowPassword = () => {
    setShowPass(!ShowPass);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <React.Fragment>
      <Grid container justify="center" alignItems="center" spacing={2}>
        {isLoading ? (
          <Grid item xs={12}>
            <Box pt={10} pb={10}>
              <Grid container justify="center" alignItems="center">
                <Grid item xs={12}>
                  <CircularProgress className={classes.loader} />
                </Grid>
              </Grid>
            </Box>
          </Grid>
        ) : (
          <React.Fragment>
            {/* <Grid item xs={12}>
                                <Button
                                    onClick={handleLogInF}
                                    className={classes.buttonFacebook}
                                    fullWidth={true}
                                    variant='outlined'
                                    size='large'><img className={classes.logoSocial} src={Facebook} alt="Inicia Sesión con tu cuenta de Facebook a Witideal para disfrutar nuestros beneficios en la búsqueda de tu inmueble" />
                                    Continuar con Facebook
                        </Button>
                            </Grid> */}

            <Grid item xs={12}>
              <Button
                onClick={handleLogInG}
                className={classes.buttonGoogle}
                fullWidth={true}
                variant="outlined"
                size="large"
              >
                <img
                  className={classes.logoSocial}
                  src={Google}
                  alt="Inicia Sesión con tu cuenta de Google a Witideal para disfrutar nuestros beneficios en la búsqueda de tu inmueble"
                ></img>
                Continuar con Google
              </Button>
            </Grid>
            <Grid item xs={5}>
              <Divider />
            </Grid>

            <Grid item xs={2}>
              <Typography className={classes.typeSubtitle} align="center">
                {" "}
                o{" "}
              </Typography>
            </Grid>

            <Grid item xs={5}>
              <Divider />
            </Grid>

            <Grid item xs={12}>
              <TextField
                className={classes.textField}
                id="outlined-email-input"
                label="Correo Electrónico"
                error={Errors.email !== undefined}
                type="email"
                name="email"
                value={Values.user}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="email"
                margin="normal"
                variant="outlined"
                fullWidth={true}
                helperText={Errors.email !== undefined ? Errors.email : ""}
              />
              <TextField
                className={classes.textField}
                id="outlined-adornment-password"
                variant="outlined"
                type={ShowPass ? "text" : "password"}
                name="password"
                label="Contraseña"
                value={Values.password}
                fullWidth={true}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Errors.password !== undefined}
                helperText={
                  Errors.password !== undefined ? Errors.password : ""
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {ShowPass ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                onClick={handleLogIn}
                className={classes.buttonLogIn}
                fullWidth={true}
                variant="contained"
                size="large"
                disabled={isLoading}
              >
                Iniciar Sesión
              </Button>
              <Box mt={2}>
                <Link
                  onClick={props.dismissModal}
                  to={ROUTES.FORGOT}
                  className={classes.linkDecoration}
                >
                  <Typography
                    className={classes.linkColor}
                    display="block"
                    align="center"
                  >
                    Olvidé mi contraseña...
                  </Typography>
                </Link>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>

            <Grid item xs={12}>
              <Typography
                variant="subtitle1"
                align="center"
                style={{ fontWeight: "bold", color: "gray" }}
              >
                ¿No tienes cuenta?
                <RegisterLink onClick={props.changeToRegister}>
                  {" "}
                  Regístrate{" "}
                </RegisterLink>
              </Typography>
            </Grid>
          </React.Fragment>
        )}

        <Grid item xs={12}>
          {/* Aquí va tu captcha Cristian */}
        </Grid>
      </Grid>

      <ErrorModal
        alarmText={errorModal.alarmText}
        open={errorModal.open}
        handleClose={handleErrorModal}
      />
    </React.Fragment>
  );
}
