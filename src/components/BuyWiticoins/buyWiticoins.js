/* eslint-disable no-redeclare */
import React, { useState, useEffect, useContext } from 'react';
import {Grid,Typography,Button,TextField,Paper,Box, Checkbox, CircularProgress } from '@material-ui/core'
import Divider from '@material-ui/core/Divider';
import NumberFormat from "react-number-format";
import { Dropdown } from '../Dropdown/dropdown';
import { witiPackages } from '../../assets/Strings';
import { MultiToggleButton } from '../MultiToggleButton/multiToggleButton';
import { PackageSelecter } from '../PackageSelecter/packageSelecter';
import useOpenpay from '../../Hooks/useOpenpay';
import SesContext from "../../contexts/sessionContext";
import { AnimationBackdrop } from '../LogoAnimation/logoAnimation';
import { ReceiptPayment } from '../ReceiptPayment/receiptPayment';
import { ErrorModal } from '../ErrorModal/errorModal';
import axios from 'axios';
import { cardError } from '../../functions/paymentErrorDictionary';
import { openPayAPI_Prefix } from '../../constants/globalConstraints';
import useStyles from  './styles'
import Paypal from './paypal_form'
import CardIcons from './card_icnos'
import { createOrderId } from '../../firebase/pays'
import OpenpayLogo from './openpayLogo'
import StoresIcon from './storeIcons'
import { Check as CheckBase } from '@material-ui/icons'
import { styled } from '@material-ui/core/styles'
import user from '../../firebase/user'
import { setAlert } from '../Alert/alert'
import analytics from 'react-ga'
import conversion from '../../helpers/convresion'
import { isProduction } from '../../constants/globalConstraints'
import SuccessCard from './successCard'
import FullWidthCentered from '../../layouts/FlexFullWidthCentered'
import promos from '../../firebase/promo'
import useFetch from '../../Hooks/useFetch'
import CardForm from './cardForm'
import SelccionarPaquete from '../PackageSelecter/SelccionarPaquete';

const errorCardTransform = {
  3001:	'La tarjeta fue rechazada.',
  3002:	'La tarjeta ha expirado.',
  3003:	'tarjeta declinada.',
  3004:	'tarjeta declinada.',
  3005:	'La tarjeta ha sido rechazada por el sistema antifraudes.',
}


const Check = styled(CheckBase)({
  display: 'block',
  fontSize: '50px',
  margin: 'auto',
  fontWeight: 'bold',
  marginBottom: '20px'
})

const CheckBoxControl = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  '& h6': {
    margin: '0px',
    marginLeft: '10px'
  }
})

export const BuyWiticoins = () => {
  const classes = useStyles();
  const { DevId, getToken } = useOpenpay();
  const context = useContext(SesContext);
  const [numberPackages, setNumberPackages] = useState({})
  const [payMode, setPayMode] = useState('T. Crédito/Débito');
  const [loaderAnimation, setLoaderAnimation] = useState(false);
  const [invitingCode, setInvitingCode] = useState({ view: 'form'})
  const [paymentObject, setPaymentObject] = useState('card');
  const [receiptAnswer, setReceiptAnswer] = useState(null)
  const [firstPackPromoValid, setFirstPackPromoValid] = useState(false)

  // get firstPackPromoValid
  useFetch (async () => {
    const isValid  = await promos.firstPackPromo(context.uId)
    setFirstPackPromoValid(isValid)
  }, [context.uId])
  
  useEffect(() => {
    window.scrollTo(0,0)
  }, [receiptAnswer])

  const [cardData, setCardData] = useState({
    cardNumber: '',
    holderName: '',
    expirationYear: '',
    expirationMonth: '',
    cvv2: ''
  })

  const [rfc, setRfc] = useState({
    open: false,
    willFact: false,
    rfc: '',
    razon: '',
    fullname: '',
  })

  const [errorMsg, SetErrorMsg] = useState({
    open: false,
    alarmText: ''
  })

  

  const onInvitingCodeChange = event => {
    setInvitingCode({
      ...invitingCode,
      [event.target.name]: event.target.value
    })
  }

  const handleValidateCode = async _event => {
    setInvitingCode({ ...invitingCode, view: 'loading' })
    const result = await user.validateCode(invitingCode.code, context.uId)
    if (!result.error && invitingCode.code !== context.uId ) {
      setInvitingCode({
        ...invitingCode,
        validCode: true,
        view: 'success',
        discount: result.discount || null
      })
    } else {
      setInvitingCode({
        ...invitingCode,
        code: '',
        view: 'form',
        validCode: false
      })
      setAlert(
        null,
        'Error',
        result.errorMessage || 'Código inválido',
        'error'
      )
    }
  }

  const handleChangeDebitCreditCard = event => {
    if (event.target.id === 'cardNumber') {
      var value = event.target.value
      value = value.toString()
      if (value.length > 16 ) return null
      value = parseInt(value)
      value = isNaN(value) ? '' : value
      setCardData({
        ...cardData,
        [event.target.id !== undefined ? event.target.id : event.target.name]: value
      })
    } else if (event.target.id === 'cvv2') {
      var value = event.target.value
      value = value.toString()
      if (value.length > 4 ) return null
      value = parseInt(value)
      value = isNaN(value) ? '' : value
      setCardData({
        ...cardData,
        [event.target.id !== undefined ? event.target.id : event.target.name]: value
      })
    } else {
      setCardData({
        ...cardData,
        [event.target.id !== undefined ? event.target.id : event.target.name]: event.target.value
      })
    }

  }

  const handleChange = event => {
    setPayMode('T. Crédito/Débito')
    setNumberPackages({
      ...numberPackages,
      [event.target.name]: event.target.value
    })
  }

  const addTotalWiticoins = () => {
    var witicoinsCount = 0;
    if (Object.entries(numberPackages).length > 0) {
      for (let singlePackage in numberPackages) {
        witicoinsCount += (numberPackages[singlePackage] * witiPackages[singlePackage].witicoins) + (numberPackages[singlePackage] * witiPackages[singlePackage].promoWiticoins)
      }
    }
    return witicoinsCount
  }

  const addTotalPrice = () => {
    let priceCount = 0;

    if (Object.entries(numberPackages).length > 0) {
      for (let singlePackage in numberPackages) {
        priceCount += (numberPackages[singlePackage] * witiPackages[singlePackage].price)
      }
    }
    if (invitingCode.validCode && invitingCode.discount) {
      priceCount = (priceCount - ((invitingCode.discount * priceCount) / 100))
    }
    return priceCount.toFixed(0)
  }

  const amount = ((addTotalPrice() * 1.16).toFixed(2)).toString()
  
  const makePackagesObj = () => {
    let arrayOfPacakages = [];
    if (Object.entries(numberPackages).length > 0) {
      for (let singlePackage in numberPackages) {
        if ((numberPackages[singlePackage]).toString() !== '0') {
          arrayOfPacakages.push({
            'displayName': witiPackages[singlePackage].displayName,
            'name': witiPackages[singlePackage].name,
            'price': (witiPackages[singlePackage].price).toString(),
            'qty': (numberPackages[singlePackage]).toString()
          })
        }
      }
    }
    return (arrayOfPacakages);
  }
  
  const sendStatisticsOfPackagesToAnalytics = _any => {
    const packages = []
    makePackagesObj().forEach(package_ => {
      if (package_.qty === 1) return packages.push({ category: context.uId, action: 'buy witicoin pack', label: package_.name })
      else { 
        for (let index = 0; index < parseInt(package_.qty); index++) {
          packages.push({ category: context.uId, action: 'buy witicoin pack', label: package_.name })     
        }
      }
    })
    if (isProduction) {
      packages.map(pack => analytics.event(pack))
    }
  }

  const handleCloseError = () => {
    SetErrorMsg({
      ...errorMsg,
      open: false,
    })
  }

  const handleErrorModal = (error) => {
    SetErrorMsg({
      open: true,
      alarmText: error
    })
    setLoaderAnimation(false);
  }


  const handleClickDebiCreditCard = () => {
    setLoaderAnimation(true);
    if (makePackagesObj().length < 1) {
      SetErrorMsg({
        open: true,
        alarmText: 'Selecciona al menos un paquete'
      })
      setLoaderAnimation(false)
      window.scrollTo(0, 0);
    } else {
      let obj = {
        card_number: cardData.cardNumber,
        holder_name: cardData.holderName,
        expiration_year: cardData.expirationYear,
        expiration_month: cardData.expirationMonth,
        cvv2: cardData.cvv2,
      }
      getToken(obj, (data) => {
        const payload = {
          token: data.id.toString(),
          method: paymentObject,
          description: 'Compra de witicoins',
          deviceId: DevId.toString(),
          phone: context.phone===undefined?(context.authPhone).toString():(context.phone).toString(),
          name: (context.Name).toString(),
          mail: (context.Email).toString(),
          uId: (context.uId).toString(),
          prefix: "11",
          packages: makePackagesObj(),
          willFact: rfc.willFact,
          infoFact: {
            rfc: rfc.rfc,
            razon: rfc.razon,
            cfdi: rfc.cfdi,
          }
        }
        if (invitingCode.validCode) payload.code = invitingCode.code
        axios.post(`${openPayAPI_Prefix}cloudfunctions.net/makeCharge`, payload).then(res => {
          console.log('responseSucecess', res)
          console.log('responseSucecessData', res.data)
          if (isProduction) {
            conversion(amount)
            analytics.event({
              category: context.uId,
              action: 'witicoins method pay',
              label: 'card',
            })
          }

          sendStatisticsOfPackagesToAnalytics()
          setReceiptAnswer(res.data || '');
          setLoaderAnimation(false);
        }).catch(err => {
          console.log(err)
          console.log(err.response)
          let newERR = err.response.data
          handleErrorModal(errorCardTransform[newERR.error_code] || cardError(newERR.error_code))
        })

      }, handleErrorModal)
    }
  }

  const handleClickSPEI = () => {
    setLoaderAnimation(true);
    console.log('click a spei')
    if (makePackagesObj().length < 1) {
      SetErrorMsg({
        open: true,
        alarmText: 'Selecciona al menos un paquete'
      })
      setLoaderAnimation(false)
      window.scrollTo(0, 0);
    } else {
      try {
        let objectToPost = {
          token: '',
          method: paymentObject,
          description: 'Compra de witicoins',
          deviceId: DevId,
          name: context.Name,
          phone:  context.phone===undefined?(context.authPhone).toString():(context.phone).toString(),
          mail: context.Email,
          uId: context.uId,
          packages: makePackagesObj(),
          prefix: (13).toString(),
          willFact: rfc.willFact,
          infoFact: {
            rfc: rfc.rfc,
            razon: rfc.razon,
            cfdi: rfc.cfdi,
          }
        }
        if (invitingCode.validCode) objectToPost.code = invitingCode.code
        axios.post(`${openPayAPI_Prefix}cloudfunctions.net/makeCharge`,
          objectToPost
        ).then(res => {

          if (isProduction) {
            analytics.event({
              category: context.uId,
              action: 'witicoins method pay',
              label: 'spei pending',
            })
            conversion(amount)
          }

          sendStatisticsOfPackagesToAnalytics()
          console.log('res', res);
          console.log('res.data', res.data);
          setReceiptAnswer(res.data !== undefined ? res.data : '');
          setLoaderAnimation(false);
        }).catch(err => {

          let newERR = err.response.data
          handleErrorModal(cardError(newERR.error_code))
        })
        console.log('objectToPost', objectToPost);
      } catch (error) {
        console.log('error', error)
        setLoaderAnimation(false);
      }
    }
  }

  const handleClickStores = () => {
    setLoaderAnimation(true);
    console.log('click a store')
    if (makePackagesObj().length < 1) {
      SetErrorMsg({
        open: true,
        alarmText: 'Selecciona al menos un paquete'
      })
      setLoaderAnimation(false)
      window.scrollTo(0, 0);
    } else {
      try {
        let objectToPost = {
          method: paymentObject,
          description: 'Compra de witicoins',
          name: context.Name,
          mail: context.Email,
          uId: context.uId,
          phone:  context.phone===undefined?(context.authPhone).toString():(context.phone).toString(),
          packages: makePackagesObj(),
          prefix: (12).toString(),
          willFact: rfc.willFact,
          infoFact: {
            rfc: rfc.rfc,
            razon: rfc.razon,
            cfdi: rfc.cfdi,
          }
        }
        if (invitingCode.validCode) objectToPost.code = invitingCode.code
        axios.post(`${openPayAPI_Prefix}cloudfunctions.net/makeCharge`,
          objectToPost
        ).then(res => {

          if (isProduction) {
            analytics.event({
              category: context.uId,
              action: 'witicoins method pay',
              label: 'store pending',
            })
            conversion(amount)
          }

          sendStatisticsOfPackagesToAnalytics()
          console.log('res.data', res.data);
          setReceiptAnswer(res.data !== undefined ? res.data : '');
          setLoaderAnimation(false);

        }).catch(err => {
          let newERR = err.response.data
          handleErrorModal(cardError(newERR.error_code))
        })
        console.log('objectToPost', objectToPost);
      } catch (error) {
        console.log('error', error)
        setLoaderAnimation(false);
      }
    }

  }


  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const debitCreditCard = (
    <CardForm
      {...cardData}
      onChange={handleChangeDebitCreditCard}
      onPay={handleClickDebiCreditCard}
    />
  )

  const debitCreditCardWarning = (
    <React.Fragment>
      <Grid container justify='center' alignItems='center' spacing={1}>
        <Grid item xs={12}>
          <Typography gutterBottom className={classes.formTitle} variant='h6'> Para pago mayores a $6,000.00 MXN, selecciona otro método de pago.</Typography>
        </Grid>
        <Grid item xs={12}>
          <Button className={classes.outlinedButton} variant='outlined' disabled>Realizar Pago</Button>
        </Grid>
      </Grid>
    </React.Fragment>
  )

  const spei = (
    <React.Fragment>
      <Grid container justify='center' alignItems='center' spacing={1}>
        <Grid item xs={12}>
          <Typography gutterBottom className={classes.formTitle} variant='h6'> Presiona el botón para que te enviemos una orden de pago a tu correo para que realices el pago en tu banco. También puedes consultar tu formato de pago en la siguiente liga:</Typography>

        </Grid>
        <Grid item xs={12}>
          <Button variant='contained' color='primary' className={classes.buyButton} onClick={handleClickSPEI}>Consultar SPEI</Button>
        </Grid>
      </Grid>
    </React.Fragment>
  )

  const store = (
    <React.Fragment>
      <Grid container justify='center' alignItems='center' spacing={1}>
        <Grid item xs={12}>
          <Typography gutterBottom className={classes.formTitle} variant='h6'> Presiona el botón para que te enviemos una orden de pago a tu correo para que realices el pago en tu tienda preferida. También puedes consultar tu formato de pago en la siguiente liga:</Typography>

        </Grid>
        <Grid item xs={12}>
          <Button variant='contained' className={classes.buyButton} onClick={handleClickStores}>Generar Orden de Pago</Button>
          {/* <Button variant='contained' color='primary'>Consultar SPEI</Button> */}
        </Grid>
      </Grid>
    </React.Fragment>
  )

  const storeWarningPayment = (
    <React.Fragment>
      <Grid container justify='center' alignItems='center' spacing={1}>
        <Grid item xs={12}>
          <Typography gutterBottom className={classes.formTitle} variant='h6'> Para pago mayores a $9,999.99 MXN, selecciona otro método de pago.</Typography>
        </Grid>
        <Grid item xs={12}>
          <Button className={classes.outlinedButton} variant='outlined' disabled>Generar Orden de Pago</Button>
          {/* <Button variant='contained' color='primary'>Consultar SPEI</Button> */}
        </Grid>
      </Grid>
    </React.Fragment>
  )


  const renderPaymentMode = () => {
    if (payMode === 'T. Crédito/Débito') {
      if (addTotalPrice() * 1.16 <= 6000) {
        return (
          <React.Fragment>
            <Grid container justify='center' alignItems='center'>
              <Grid item xs={11} md={8}>
                {debitCreditCard}
              </Grid>
            </Grid>
            <CardIcons />
            <OpenpayLogo />
          </React.Fragment>
        )
      } else {
        return (
          <React.Fragment>
            <Grid container justify='center' alignItems='center'>
              <Grid item xs={11} md={8}>
                {debitCreditCardWarning}
              </Grid>
            </Grid>
          </React.Fragment>
        )

      }

    } else if (payMode === 'SPEI') {
      return (
        <React.Fragment>
          <Grid container justify='center' alignItems='center'>
            <Grid item xs={11} md={8}>
              {spei}
            </Grid>
          </Grid>
          <CardIcons type='spei' />
          <OpenpayLogo />
        </React.Fragment>
      )
    } else if (payMode === 'Tiendas') {
      if (addTotalPrice() * 1.16 <= 9999) {
        return (
          <React.Fragment>
            <Grid container justify='center' alignItems='center'>
              <Grid item xs={11} md={8}>
                {store}
              </Grid>
            </Grid>
            <StoresIcon />
            <OpenpayLogo />
          </React.Fragment>
        )
      } else {
        return (
          <React.Fragment>
            <Grid container justify='center' alignItems='center'>
              <Grid item xs={11} md={8}>
                {storeWarningPayment}
              </Grid>
            </Grid>
          </React.Fragment>
        )
      }

    }
  }

  const handleRFC = event => {
    setRfc({
      ...rfc,
      [event.target.id]: event.target.value
    })
  }

  const handleRFC_withName = event => {
    setRfc({
      ...rfc,
      [event.target.name]: event.target.value
    })
  }

  const handleRfcActive = event => {
    setRfc({
      ...rfc,
      open: event.target.checked,
      willFact: event.target.checked
    })
  }

  let PaypalMetadata = {
    oId: createOrderId(context.uId),
    method: paymentObject,
    amount: amount,
    description: 'Compra de witicoins',
    name: context.Name,
    mail: context.Email,
    uId: context.uId,
    phone:  context.phone===undefined?(context.authPhone).toString():(context.phone).toString(),
    witicoins: (addTotalWiticoins()).toString(),
    subtotal: (addTotalPrice()).toString(),
    iva: (addTotalPrice() * 0.16).toString(),
    packages: makePackagesObj(),
    prefix: '14',
    willFact: rfc.willFact,
    code: invitingCode.validCode ? invitingCode.code : '',
    infoFact: {
      rfc: rfc.rfc || null ,
      razon: rfc.razon || null,
      cfdi: rfc.cfdi || null,
    }
  }

  const hasRfc = (
    <>
      <CheckBoxControl>
        <Checkbox checked={rfc.open} onChange={handleRfcActive} color='primary' name="willfact" />
        <Typography variant='h6' gutterBottom className={classes.formTitle}>Quiero facturar</Typography>
      </CheckBoxControl>
      {rfc.open && (
        <Grid container justify='center' alignItems='center' spacing={1}>
          <Grid item xs={12}>
            <TextField
              onChange={handleRFC}
              value={rfc.razon}
              className={classes.textField}
              fullWidth
              id='razon'
              label='Razón Social'
              variant='outlined'></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              onChange={handleRFC}
              value={rfc.rfc}
              className={classes.textField}
              fullWidth
              id='rfc'
              label='RFC'
              variant='outlined'></TextField>
          </Grid>
          <Grid item xs={12}>
            <Dropdown
              inputLabel='Concepto de CFDI'
              value={rfc.cfdi}
              handler={handleRFC_withName}
              name='cfdi'
              fullWidth={true}
              valuesArray={
                ['01010101 : Otro no especificado en el catálogo',
                  '80131601 : Corredores o agentes inmobiliarios',
                  '80141600 : Actividades de ventas y promoción de negocios',
                  '81111500 : Ingeniería de Software o hardware',
                  '81111508 : Servicios de implementación de aplicaciones',
                  '82101603 : Publicidad en Internet'
                ]}
            />
          </Grid>
        </Grid>
      )}
    </>
  )

  useEffect(() => {
    if (payMode === 'T. Crédito/Débito') {
      setPaymentObject('card')
    } else if (payMode === 'SPEI') {
      setPaymentObject('bank_account')
    } else if (payMode === 'Tiendas') {
      setPaymentObject('store')
    } else if (payMode === 'Paypal') {
      setPaymentObject('Paypal')
    }
  }, [payMode])

  const renderPackages = () => {
    var packages = [];

    for (let singlePackage in witiPackages) {
      singlePackage = witiPackages[singlePackage];
      packages.push(
        <Grid item xs={12}>
          <PackageSelecter
            numberPackages={numberPackages[singlePackage.id]}
            witiPackage={singlePackage}
            handler={handleChange}
          />
        </Grid>
      )
    }

    return packages
  }

  return (
    <React.Fragment>
    <AnimationBackdrop open={loaderAnimation} />
      {!receiptAnswer && (
      <Box className={classes.container} pb={2} pt={{ xs: 10 }}>
        <Grid container justify='center' alignItems='center'>
          <Grid item xs={11} md={10} lg={8} xl={6}>
            <Paper elevation={3}>
              <Box p={{ xs: 2, sm: 6, md: 12, lg: 8 }}>
                {/* body start here */}
                <Grid container justify='center' alignItems='center' spacing={3}>
                  <Grid item xs={12}>
                    <Typography variant='h5' gutterBottom className={classes.formTitle}>Indica el paquete que te interesa comprar</Typography>
                  </Grid>

                  {renderPackages().map((element, index) => <Grid item key={index} xs={12}>{element}</Grid>)}
                  <Grid item xs={12}>
                    <Divider variant="middle" />
                  </Grid>
                  {/* Results */}
                  <Grid item xs={12} md={5}>
                    <Grid container justify='center' alignItems='center'>
                      <Grid item xs={9} sm={8} md={12} lg={12}>
                        <Grid container justify='center' alignItems='center'>
                          <Grid item xs={4}>
                            <Typography className={classes.textRegularBlue} align='left' variant='subtitle1'>Subtotal</Typography>
                          </Grid>
                          <Grid item xs={8}>
                            <NumberFormat
                              value={addTotalPrice()}
                              displayType={'text'}
                              thousandSeparator={true}
                              prefix={'$ '}
                              suffix={'.00'}
                              renderText={value => <Typography className={classes.textRegularBlue} align='right' variant='subtitle1'>{value}</Typography>}
                            />
                          </Grid>
                          <Grid item xs={4}>
                            <Typography className={classes.textRegularBlue} align='left' variant='subtitle1'>Impuestos</Typography>
                          </Grid>
                          <Grid item xs={8}>
                            <NumberFormat
                              value={(addTotalPrice() * 0.16).toFixed(2)}
                              displayType={'text'}
                              thousandSeparator={true}
                              prefix={'$ '}
                              renderText={value => <Typography className={classes.textRegularBlue} align='right' variant='subtitle1'>{value}</Typography>}
                            />
                          </Grid>
                          <Grid item xs={3}>
                            <Typography className={classes.textHighLightBlue2} align='left' variant='h5'>Total</Typography>
                          </Grid>
                          <Grid item xs={9}>
                            <NumberFormat
                              value={(addTotalPrice() * 1.16).toFixed(2)}
                              displayType={'text'}
                              thousandSeparator={true}
                              prefix={'$ '}
                              suffix={' MXN'}
                              renderText={value => <Typography className={classes.textHighLightBlue2} align='right' variant='h5'>{value}</Typography>}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                   
                  <Grid item xs={12} md={5}>
                    <Typography variant='h5' gutterBottom className={classes.textHighLightBlue}>
                      Con tu compra adquieres
                    </Typography>
                    <Grid container >
                      <Grid item xs={12}>
                        <NumberFormat
                          value={addTotalWiticoins()}
                          displayType={'text'}
                          thousandSeparator={true}
                          renderText={value => <Typography className={classes.textHighLightBlue2} variant='h5'>{value}</Typography>}
                        />
                        {!!addTotalWiticoins() && firstPackPromoValid && (<Typography className={classes.textHighLightBlue2} variant='h5'>+100 regalo</Typography>)}
                        <Typography className={classes.textHighLightBlue2} variant='h5'>Witicoins</Typography>
                        
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xs={12}>
                    <Divider variant="middle" />
                  </Grid>

                  <Grid item xs={12} md={8}>
                    {hasRfc}
                  </Grid>

                  <Grid item xs={12}>
                    <Divider variant="middle" />
                  </Grid>


                  {invitingCode.view === 'form' && (
                    <>
                      <Grid item xs={12} md={8}>
                        <Typography variant='h5' gutterBottom className={classes.formTitle}>¿Tienes un código de promoción?</Typography>
                        <TextField
                          name='code'
                          onChange={onInvitingCodeChange}
                          value={invitingCode.code || ''}
                          className={classes.textField}
                          fullWidth
                          label='Código de promoción'
                          variant='outlined'>
                        </TextField>
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          disabled={!(invitingCode.code && invitingCode.code.length > 5)}
                          onClick={handleValidateCode}
                          size='large' variant='contained' 
                          className={classes.buyButton} >Aplicar código
                        </Button>
                      </Grid>
                    </>
                  )}
                  {invitingCode.view === 'loading' && (
                    <Box paddingTop={6} paddingBottom={6}>
                      <CircularProgress />
                    </Box>
                  )}
                  {invitingCode.view === 'success' && (
                    <Box paddingTop={4} paddingBottom={4}>
                      <Typography variant='h5' className={classes.formTitle}><Check />Código aplicado correctamente</Typography>
                    </Box>
                  )}
                  <Grid item xs={12}>
                    <Divider variant="middle" />
                  </Grid>


                  <Grid item xs={12}>
                    <Typography variant='h5' gutterBottom className={classes.formTitle}>Selecciona tu forma de pago</Typography>
                  </Grid>

                  <Grid item xs={12} md={12}>
                    <MultiToggleButton
                      btns={ parseInt((addTotalPrice() * 1.16)) > 110000 ? ['T. Crédito/Débito', 'SPEI', 'Tiendas'] : ['T. Crédito/Débito', 'SPEI', 'Tiendas', /*'Paypal'*/]} 
                      selectedOption={payMode}
                      setter={setPayMode}
                    ></MultiToggleButton>
                  </Grid>

                  <Grid item xs={12}>
                    {payMode === 'Paypal' && (
                      <Paypal
                        sendStatisticsOfPackagesToAnalytics={sendStatisticsOfPackagesToAnalytics}
                        metadata={PaypalMetadata}
                        amount={((addTotalPrice() * 1.16).toFixed(2)).toString()}
                        startProcess={event => setLoaderAnimation(true)}
                        endProcess={event => setLoaderAnimation(false)}
                        onSuccess={event => setReceiptAnswer({charge: {method: 'paypal'}, oId: PaypalMetadata.oId})}
                        onError={event => SetErrorMsg({ open: true, alarmText: 'Selecciona al menos un paquete' })}
                      />
                    )}
                    {payMode !== 'Paypal' && renderPaymentMode()}
                    
                  </Grid>
                  {/* body start here */}
                </Grid>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
      )}


      {!!receiptAnswer && (paymentObject === 'card' || paymentObject === 'Paypal') && (
        <FullWidthCentered>
          <SuccessCard data={receiptAnswer} />
        </FullWidthCentered>
      )}

      
      {!!receiptAnswer && paymentObject !== 'card' && paymentObject !== 'Paypal' && (
        <Box className={classes.container} p={5} pb={10}>
          <Grid container justify='center' alignItems='center'>
            <Grid item md={8}>
              <Paper elevation={5}>
                <ReceiptPayment
                  oId={receiptAnswer.oId}
                  receiptAnswer={receiptAnswer.charge}
                  packagesDescription={makePackagesObj()}
                />
              </Paper>
            </Grid>
          </Grid>
        </Box>
      )}

      <ErrorModal
        alarmText={errorMsg.alarmText}
        open={errorMsg.open}
        handleClose={handleCloseError} 
      />
    </React.Fragment>
  )
}
