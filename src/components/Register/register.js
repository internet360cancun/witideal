/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unreachable */
/* eslint-disable array-callback-return */
import React, { useState, useContext, useEffect } from "react";
import { Grid, Box, CircularProgress, Typography } from "@material-ui/core";
// import { Divider, MuiThemeProvider } from '@material-ui/core';
import useFormValidation from "../../Hooks/useFormValidation";
import validateReg from "../../functions/validateRegister";
import SesContext from "../../contexts/sessionContext";
import useFirebaseTools from "../../Hooks/useFirebaseTools";
import { ErrorModal } from "../ErrorModal/errorModal";
import { VeryModal } from "../VeryficationModalTest/veryModal";
import { SearchOrAnnounce } from "../SearchOrAnnounce/searchOrAnnounce";
import useStyles from "./styles";
import GoogleFace from "./googleface";
import {
  unlinkPhone,
  registerOrLoginWidthGoogle,
  register,
} from "../../firebase/user";
import { setAlert } from "../Alert/alert";
import analytics from "react-ga";
import { isProduction } from "../../constants/globalConstraints";
import firebase from "firebase/compat/app";
import { SessionButton } from "./styles";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import Form from "./form";
import PromoterType from "./promoterType";

/* 
  API Key for Captcha Client: 6LeeDrcUAAAAAKIXNaZwWMKoAybwfgzbiVQNiG_F    (This one is ACTIVE)
  API Key for reCAPTCHA Server Side: 6LeeDrcUAAAAAMB69qEzOqSmLx6Uwc7xQKiKcw-s   (This one in INACTIVE, because it does not work with the react library but we keep it just in case it's necessary some time)
  visit: https://developers.google.com/recaptcha/docs/display for more information
  visit: https://github.com/dozoisch/react-google-recaptcha for the react library for captcha
  The owner of the CAPTCHA is rodrigo.witideal@gmail.com
*/

export const initialState = {
  email: "",
  password: "",
  cpassword: "",
  promoter: "none",
  name: "",
  lastname: "",
  phone: "",
  companyName: "",
  notify: true,
  termsNconditions: true,
};

export function Register(props) {
  /*
    ===== props
    changeToLogin = function to change modal into LogIn
    dismissModal = function to close the modal
  */

  let mountedFlag = true;

  const [verifier, setVerifier] = useState();
  const { registerFirestoreUsr, linkPhone, logOut } = useFirebaseTools();
  const context = useContext(SesContext);
  const classes = useStyles();
  const [uId, setuId] = useState(undefined);
  const [ShowPass, setShowPass] = useState(false);
  const [ShowCPass, setShowCPass] = useState(false);
  const { handleChange, handleBlur, Errors, Values, setValues, setErrors } =
    useFormValidation(initialState, validateReg);
  const [loading, setLoading] = React.useState(false);
  const [errorModal, setErrorModal] = useState({ open: false, alarmText: "" });
  const [code, setcode] = useState("");
  const [veryModal, setveryModal] = useState({ open: false, alarmText: "" });
  const [extraPhones, setExtraPhones] = useState([]);
  const [extraPhoneErrors, setExtraPhoneErrors] = useState([]);
  const [showMainPhone, setShowMainPhone] = useState(true);
  const [reMail, setRemail] = useState("");
  const [errorReMail, setErrorReMail] = useState(false);
  const [preventOpenModal] = useState(window.preventOpenSuccessModal || false);

  window.preventOpenSuccessModal = false;

  const handleChangePhone = (event) => {
    var { value } = event.target;
    value = isNaN(parseInt(value)) ? "" : parseInt(value).toString();
    if (value.length > 10) return false;
    event.target.value = value;
    handleChange(event);
  };

  const handleChangeShowMainPhone = (event) => {
    if (event.target.checked) return setShowMainPhone(true);
    if (extraPhones.length === 0)
      return setAlert(
        null,
        " ",
        "Primero agrega otro número de teléfono",
        "error"
      );
    setAlert(
      () => setShowMainPhone(false),
      " ",
      "Si desactivas el teléfono principal los usuarios no recibirán este número como dato de contacto",
      "warning",
      "Aceptar"
    );
  };

  const addExtraPhones = (_event) => {
    if (extraPhones.length < 2) setExtraPhones([...extraPhones, ""]);
  };

  const handleChangeExtraPhones = (event) => {
    var { value, name } = event.target;
    value = isNaN(parseInt(value)) ? "" : parseInt(value).toString();
    if (value.length > 10) return false;
    extraPhones[name] = value;
    setExtraPhones([...extraPhones]);
  };

  const handleRemoveErrorExtraNumber = (event) => {
    const Currentindex = event.target.name;
    setExtraPhoneErrors(
      extraPhoneErrors.filter(
        (error) => error.toString() !== Currentindex.toString()
      )
    );
  };

  const handleValidateExtraPhoneNumbers = () => {
    const error = [];
    extraPhones.map((value, index) => {
      if (value.toString().length !== 8 && value.toString().length !== 10)
        error.push(index.toString());
    });
    return error || null;
  };

  const handleDeleteExtraPhones = (indexToDelete) => {
    setExtraPhoneErrors([]);
    const newExtraPhones = extraPhones.filter(
      (phone, index) => index !== indexToDelete
    );
    setExtraPhones(newExtraPhones);
    if (newExtraPhones.length === 0) setShowMainPhone(true);
  };

  //unlink user phone when component is unmounting
  useEffect((_any) => unlinkPhone, []);

  useEffect(() => {
    props.setComesFromLogin(false);
    if (!props.comesFromLogin) {
      props.setComesFromLogin(false);
      props.setFederated(false);
    }
  }, []);

  // sycn data comes from login
  useEffect(() => {
    if (props.comesFromLogin) {
      setValues({
        ...Values,
        email: props.comesFromLogin.email,
        lastname: props.comesFromLogin.family_name,
        name: props.comesFromLogin.given_name,
        phone: props.comesFromLogin.phoneNumber || "",
        photo: props.comesFromLogin.photoURL,
      });
    }
  }, [props.comesFromLogin]);

  const handleErrorModal = () => {
    setErrorModal({
      ...errorModal,
      open: false,
    });
  };

  const closeVerifyModal = () => {
    setTimeout(() => setLoading(false), 2000);
    setveryModal({
      ...veryModal,
      open: false,
    });
  };

  const sendDataToAnalytics = (data) => {
    if (isProduction) {
      analytics.event({
        action: "register",
        ...data,
      });
    }

    if (isProduction && !Values.promoter) {
      console.log("searcher register traqued by google tag");
      // window.gtag('event', 'conversion', {'send_to': 'AW-625232540/i0BVCNWs1dQBEJyVkaoC'})
    }

    if (isProduction && Values.promoter) {
      console.log("promoter register tracked by google tag");
      // window.gtag('event', 'conversion', {'send_to': 'AW-625232540/g19QCLn129oBEJyVkaoC'})
    }
  };

  const verificateSMSCode = async (code) => {
    try {
      const status = await verifier.confirm(code);
      return status;
    } catch (error) {
      console.log("verificateSMSCode", error);
      const errorStatus =
        error.code === "auth/credential-already-in-use"
          ? "Este número ya se encuentra registrado"
          : "Código no válido";
      return { error: errorStatus };
    }
  };

  const saveToDatabase = async () => {
    const user = firebase.auth().currentUser;
    closeVerifyModal();
    await registerFirestoreUsr(user.uid, {
      isPromoter: Values.promoter,
      isRegisterComplete: true,
      lastname: Values.lastname,
      mail: Values.email,
      phone: Values.phone,
      name: Values.name,
      photo: user.photoURL,
      companyName: Values.companyName || "",
      promoterType: Values.promoterType || "",
      extraPhones,
      showMainPhone,
      sendAdvertising: Values.notify || false,
    });
    sendDataToAnalytics({
      category: user.uid,
      label: Values.promoter ? "promoter" : "searcher",
    });
    unlinkPhone();
    setcode("");
    await user.reload();
    await user.getIdToken(true);
    props.dismissModal();
    setLoading(false);
    try {
      if (Values.promoter && !preventOpenModal) window.successRegister.open();
    } catch (error) {
      console.log(error);
    }
  };

  // validate code
  const handleCode = async (e) => {
    const code = e.target.value;
    if (code.toString().length > 6) return false;
    setcode(code);
    if (code.toString().length < 6) return false;

    const status = await verificateSMSCode(code);

    if (!status.error) {
      await saveToDatabase();
    } else {
      setcode("");
      setErrorModal({
        ...errorModal,
        open: true,
        alarmText: status.error,
      });
    }
  };

  const revalidate = async () => {
    setcode("");
    let resp = await linkPhone(Values.phone);
    if (resp.error_code) {
      setErrorModal({
        ...errorModal,
        open: true,
        alarmText: `code: ${resp.error_code} - message: ${resp.description}`,
      });
      setLoading(false);
    }
  };

  const handleClickCreate = () => {
    const errors = handleValidateExtraPhoneNumbers();
    if (errors.length) {
      setErrorModal({
        ...errorModal,
        open: true,
        alarmText: "El número de telefono no es válido",
      });
      return setExtraPhoneErrors(errors);
    }

    if (Values.email !== reMail && !props.federated) {
      setErrorReMail(true);
      return setAlert(null, " ", "Los correos no coinciden", "error");
    }
    createOrValidate();
  };

  const createOrValidate = async () => {
    setLoading(true);
    if (Object.keys(Errors).length === 0) {
      //no error
      if (
        Values.email.length !== 0 &&
        (Values.password.length !== 0 || props.federated) &&
        Values.phone.length !== 0 &&
        Values.name.length !== 0 &&
        Values.lastname.length !== 0 &&
        (Values.cpassword.length !== 0 || props.federated)
      ) {
        if (props.federated) {
          //comes from loggin
          return await saveToDatabase();
        } else {
          let { error, message, id } = await register({
            isPromoter: Values.promoter,
            isRegisterComplete: true,
            lastname: Values.lastname,
            mail: Values.email,
            phone: Values.phone,
            name: Values.name,
            companyName: Values.companyName || "",
            promoterType: Values.promoterType || "",
            extraPhones,
            showMainPhone,
            sendAdvertising: Values.notify || false,
            password: Values.password,
          });

          if (error) {
            setErrorModal({
              ...errorModal,
              open: true,
              alarmText: message,
            });
          } else {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            context.refresh();
            sendDataToAnalytics({
              category: id,
              label: Values.promoter ? "promoter" : "searcher",
            });
            props.dismissModal();
            try {
              if (Values.promoter && !preventOpenModal)
                window.successRegister.open();
            } catch (error) {
              console.log(error);
            }
          }
          setLoading(false);
        }
      } else {
        const __errors__ = await validateReg(Values, "All");
        if (props.federated) {
          delete __errors__.password;
          delete __errors__.cpassword;
        }
        setErrors(__errors__);
        console.log("Sin error pero inputs vacios cliente");
        setErrorModal({
          ...errorModal,
          open: true,
          alarmText: "Existen campos obligatorios que no están completos",
        });
        setLoading(false);
      }
    } else {
      setErrorModal({
        ...errorModal,
        open: true,
        alarmText: `Existen campos obligatorios que no están completos`,
      });
      setLoading(false);
    }
  };

  const handleMouseDownPassword = (event) => event.preventDefault();

  const handleMouseDownPasswordConfirm = (event) => event.preventDefault();

  const handleClickShowPassword = () => setShowPass(!ShowPass);

  const handleClickShowCPassword = () => setShowCPass(!ShowCPass);

  // login with google's account
  const handleLogInG = async () => {
    const response = await registerOrLoginWidthGoogle();
    props.setFederated(true);
    if (response.success && response.isComplete) {
      props.dismissModal();
    } else if (response.success && !response.isComplete) {
      setErrors({});
      setValues({
        ...Values,
        email: response.email,
        lastname: response.family_name,
        name: response.given_name,
        phone: response.phoneNumber || "",
        photo: response.photoURL,
      });
    } else if (response.error) {
      setAlert(
        null,
        " ",
        "El correo ya se encuentra registrado, incia sesión nuevamente",
        "error"
      );
      props.setFederated(false);
    } else {
      props.setFederated(false);
    }
  };

  const setPromoter = () => setValues({ ...Values, promoter: true });

  const setClient = () => setValues({ ...Values, promoter: false });

  const onUpdateNumber = async (event) => {
    let resp = await linkPhone(Values.phone);
    if (!resp.error_code) {
      setVerifier(resp);
      return true;
    } else {
      setErrorModal({
        ...errorModal,
        open: true,
        alarmText: `code: ${resp.error_code} - message: ${resp.description}`,
      });
      return false;
    }
  };

  const handlePromoterTypeChange = ({ companyName, promoterType }) => {
    setValues({
      ...Values,
      companyName,
      promoterType,
    });
  };

  return (
    <React.Fragment>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        spacing={2}
        style={{ maxHeight: "85vh" }}
      >
        {typeof Values.promoter === "string" && (
          <>
            <GoogleFace
              federated={props.federated}
              handleLogInG={handleLogInG}
            />
            <Grid item xs={12}>
              <SearchOrAnnounce
                setClient={setClient}
                setPromoter={setPromoter}
                optionSelected={Values.promoter}
              />
            </Grid>
          </>
        )}
        {typeof Values.promoter !== "string" && loading && (
          <React.Fragment>
            <Box p={10}>
              <CircularProgress />
            </Box>
          </React.Fragment>
        )}
        {Values.promoter === true && !loading && !Values.promoterType && (
          <PromoterType
            promoterType={Values.promoterType}
            onSet={handlePromoterTypeChange}
          />
        )}
        {typeof Values.promoter !== "string" &&
          !loading &&
          (!!Values.promoterType || Values.promoter === false) && (
            <Form
              handleMouseDownPassword={handleMouseDownPassword}
              handleMouseDownPasswordConfirm={handleMouseDownPasswordConfirm}
              ShowPass={ShowPass}
              ShowCPass={ShowCPass}
              handleClickShowCPassword={handleClickShowCPassword}
              handleClickShowPassword={handleClickShowPassword}
              federated={props.federated}
              handleLogInG={handleLogInG}
              onDeleteExtraPhone={handleDeleteExtraPhones}
              onChangeShowMainPhone={handleChangeShowMainPhone}
              showMainPhone={showMainPhone}
              addExtraPhones={addExtraPhones}
              onChangePhone={handleChangePhone}
              errorReMail={errorReMail}
              onErrorRemail={setErrorReMail}
              remail={reMail}
              onRemailChange={setRemail}
              errors={Errors}
              values={Values}
              onChange={handleChange}
              onBlur={handleBlur}
              extraPhoneErrors={extraPhoneErrors}
              onRemoveExtraPhoneError={handleRemoveErrorExtraNumber}
              onChangeExtraPhones={handleChangeExtraPhones}
              extraPhones={extraPhones}
              handleClickCreate={handleClickCreate}
            />
          )}

        {Values.promoter === "none" && (
          <Grid item xs={12}>
            <Typography
              variant="subtitle1"
              align="center"
              style={{ fontWeight: "bold", color: "gray" }}
            >
              ¿Ya tienes cuenta?
              <SessionButton onClick={props.changeToLogIn}>
                {" "}
                Inicia Sesión{" "}
              </SessionButton>
              ?
            </Typography>
          </Grid>
        )}
      </Grid>
      <ErrorModal
        alarmText={errorModal.alarmText}
        open={errorModal.open}
        handleClose={handleErrorModal}
      />
      <div id="capcha"></div>
      <VeryModal
        number={Values.phone || ""}
        setNumber={handleChange}
        alarmText={veryModal.alarmText}
        open={veryModal.open}
        handleClose={closeVerifyModal}
        code={code}
        setCode={handleCode}
        reVerif={revalidate}
        updateNumber={onUpdateNumber}
      />
    </React.Fragment>
  );
}
