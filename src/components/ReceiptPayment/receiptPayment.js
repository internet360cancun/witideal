import React from 'react';
import { Grid, Typography, Box, makeStyles } from '@material-ui/core';
import { witidealPhoneNumber, witidealSupportMail } from '../../constants/globalConstraints';
import formatPrice from '../../helpers/formatPrice'

const wdRegularBlue = '#1E0E6F';
const wdHighlightBlue = '#3F19F9';
const wdBlueLight = '#33CCFF';
const wdGreenLight = '#32FFD2';

const useStyles = makeStyles({
    regularBlueText: {
        color: wdRegularBlue
    },
    boldRegularBlueText: {
        color: wdRegularBlue,
        fontWeight: 700
    },
    highLightBlue: {
        color: wdHighlightBlue
    },
    boldHighLightBlue: {
        color: wdHighlightBlue,
        fontWeight: 700
    },
    whiteText: {
        color: 'white',
        fontWeight: 700
    },
    blueBox: {
        backgroundColor: wdBlueLight,
        borderRadius: 10
    },
    boldGreenText: {
        color: wdGreenLight,
        fontWeight: 700
    }
})

export const ReceiptPayment = props => {

    /*
     === props
        receiptAnswer = object answer from openpay
    */

    //    oId: "12WMJi21923690"
    //    charge:
    //    id: "trlb0eyxorfqiijtmsrd"
    //    authorization: null
    //    operation_type: "in"
    //    method: "bank_account"
    //    transaction_type: "charge"
    //    status: "in_progress"
    //    conciliated: false
    //    creation_date: "2020-02-20T15:09:24-06:00"
    //    operation_date: "2020-02-20T15:09:24-06:00"
    //    description: "Compra de witicoins"
    //    error_message: null
    //    order_id: "12WMJi21923690"
    //    customer_id: "akwz5a5jlensw5enkj0i"
    //    due_date: "2020-03-21T23:59:59-06:00"
    //    currency: "MXN"
    //    amount: 114.84
    //    payment_method:{
    //      type: "bank_transfer"
    //      bank: "BBVA Bancomer"
    //      clabe: "000000000000000001"
    //      agreement: "0000000"
    //      name: "11178025144123146221"
    //    }


    const classes = useStyles();


    var creditCard = (
        <React.Fragment>
            <Grid container justify='center' alignItems='center'>
                <Grid item xs={12} md={12}>
                    <Typography className={classes.boldRegularBlueText} gutterBottom variant='h2'> Tu compra de witicoins <br/> se realizó con éxito ! </Typography>
                    <Typography className={classes.boldRegularBlueText} gutterBottom variant='h5'> La actualización de tus witicoins puede tardar un momento, para cualquier duda o aclaración favor de contactarse al {`${witidealPhoneNumber} o mandar un correo a ${witidealSupportMail}`} </Typography>
                    <Typography className={classes.regularBlueText} variant='subtitle1'>Número de orden OID: {props.oId !== undefined ? props.oId : ''}</Typography>
                </Grid>
            </Grid>
        </React.Fragment>
    )

    var paypal = (
        <React.Fragment>
            <Grid container justify='center' alignItems='center'>
                <Grid item xs={12} md={12}>
                    <Typography className={classes.boldRegularBlueText} gutterBottom variant='h2'> Tu compra de witicoins <br/> se realizó con éxito ! </Typography>
                    <Typography className={classes.boldRegularBlueText} gutterBottom variant='h5'> La actualización de tus witicoins puede tardar un momento, para cualquier duda o aclaración favor de contactarse al {`${witidealPhoneNumber} o mandar un correo a ${witidealSupportMail}`} </Typography>
                </Grid>
            </Grid>
        </React.Fragment>
    )

    var spei = (
        <React.Fragment>
            <Grid container justify='center' alignItems='center' spacing={3}>
                <Grid item xs={12} md={12}>
                    <Typography className={classes.boldRegularBlueText} gutterBottom variant='h2'> Orden de Pago </Typography>
                    <Typography className={classes.regularBlueText} variant='subtitle1'>ID: {props.oId !== undefined ? props.oId : ''}</Typography>
                </Grid>
                <Grid item xs={12} md={12}>
                    <Typography className={classes.boldHighLightBlue} variant='h5'>Fecha Límite de Pago</Typography>
                    <Typography className={classes.regularBlueText} variant='subtitle1'>{props.receiptAnswer.due_date !== undefined ? props.receiptAnswer.due_date : ''}</Typography>
                </Grid>
                <Grid item xs={12} md={12}>
                    <Typography className={classes.boldHighLightBlue} variant='h5'>Beneficiario</Typography>
                    <Typography className={classes.regularBlueText} variant='subtitle1'>Desarrolladora de Tecnologías ARD S.A. de C.V.</Typography>
                </Grid>
                <Grid item xs={12} md={12}>
                    <Typography variant='h5'>Transferencia Interbancaria (SPEI)</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box className={classes.blueBox} p={5}>
                        <Typography variant='h4' className={classes.whiteText}>Total a pagar / MXN</Typography>
                        <Typography variant='h3' className={classes.whiteText}>${formatPrice(props.receiptAnswer.amount)}</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} md={12}>
                    <Typography className={classes.boldHighLightBlue} variant='h5'>Detalles de la compra</Typography>
                    {/* <Typography className={classes.regularBlueText} variant='subtitle1'>Compra de los siguientes paquetes de witicoins: </Typography> */}
                    {/* {props.packagesDescription.map((element, index) => { return (<Typography gutterBottom key={index}>{`${element.qty} ${element.name} `}</Typography>) })} */}
                    <Typography className={classes.regularBlueText} variant='subtitle1'>Compra de witicoins </Typography>
                    <Typography className={classes.regularBlueText} variant='subtitle1'>Fecha y hora: {props.receiptAnswer.operation_date} </Typography>
                </Grid>
                <Grid item xs={12} md={12}>
                    <Typography variant='h3' className={classes.boldRegularBlueText}>Pasos para realizar el pago</Typography>
                </Grid>
                <Grid item xs={12} md={12}>
                    <Typography className={classes.boldHighLightBlue} variant='h5'>Desde BBVA</Typography>
                </Grid>

                <Grid item xs={2}>
                    <Typography align='right' className={classes.boldGreenText} variant='h2'>1)</Typography>
                </Grid>
                <Grid item xs={10}>
                    <Typography align='left'>Dentro del menú de "Pagar" seleccione la opción "De Servicios" e ingrese al siguiente "Número de convenio CIE"</Typography>
                </Grid>
                <Grid item xs={12} md={12}>
                    <Typography className={classes.boldRegularBlueText} variant='h5'>Número de Convenio CIE</Typography>
                    <Typography className={classes.regularBlueText} variant='subtitle1'>{props.receiptAnswer.payment_method !== undefined ? props.receiptAnswer.payment_method.agreement : ''}</Typography>
                </Grid>

                <Grid item xs={2}>
                    <Typography align='right' className={classes.boldGreenText} variant='h2'>2)</Typography>
                </Grid>
                <Grid item xs={10}>
                    <Typography align='left'>Ingrese los datos de registro para concluir con la operación.</Typography>
                </Grid>
                <Grid item xs={12} md={12}>
                    <Typography className={classes.boldRegularBlueText} variant='h5'>Referencia</Typography>
                    <Typography className={classes.regularBlueText} variant='subtitle1'>{props.receiptAnswer.payment_method !== undefined ? props.receiptAnswer.payment_method.name : ''}</Typography>
                </Grid>
                <Grid item xs={12} md={12}>
                    <Typography className={classes.boldRegularBlueText} variant='h5'>Importe</Typography>
                    <Typography className={classes.regularBlueText} variant='subtitle1'>${formatPrice(props.receiptAnswer.amount)}</Typography>
                </Grid>
                <Grid item xs={12} md={12}>
                    <Typography className={classes.boldRegularBlueText} variant='h5'>Concepto</Typography>
                    {/* {props.packagesDescription.map((element, index) => { return (<Typography className={classes.regularBlueText} key={index}>{`${element.qty} ${element.name} `}</Typography>) })} */}
                    <Typography className={classes.regularBlueText} variant='subtitle1'>Compra de witicoins</Typography>
                </Grid>

                <Grid item xs={12} md={12}>
                    <Typography className={classes.boldHighLightBlue} variant='h5'>Desde cualquier otro banco</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography align='right' className={classes.boldGreenText} variant='h2'>1)</Typography>
                </Grid>
                <Grid item xs={10}>
                    <Typography align='left'>Ingresa a la selección de transferencia y pagos o pagos a otros bancos y proporciona los datos de la transferencia:</Typography>
                </Grid>
                <Grid item xs={12} md={12}>
                    <Typography className={classes.boldRegularBlueText} variant='h5'>Beneficiario</Typography>
                    <Typography className={classes.regularBlueText} variant='subtitle1'>Desarrolladora de Tecnologías ARD S.A. de C.V.</Typography>
                </Grid>
                <Grid item xs={12} md={12}>
                    <Typography className={classes.boldRegularBlueText} variant='h5'>Banco Destino</Typography>
                    <Typography className={classes.regularBlueText} variant='subtitle1'>BBVA Bancomer</Typography>
                </Grid>
                <Grid item xs={12} md={12}>
                    <Typography className={classes.boldRegularBlueText} variant='h5'>CLABE</Typography>
                    <Typography className={classes.regularBlueText} variant='subtitle1'>{props.receiptAnswer.payment_method !== undefined ? props.receiptAnswer.payment_method.clabe : ''}</Typography>
                </Grid>
                <Grid item xs={12} md={12}>
                    <Typography className={classes.boldRegularBlueText} variant='h5'>Concepto de Pago</Typography>
                    <Typography className={classes.regularBlueText} variant='subtitle1'>{props.receiptAnswer.payment_method !== undefined ? props.receiptAnswer.payment_method.name : ''}</Typography>
                </Grid>
                <Grid item xs={12} md={12}>
                    <Typography className={classes.boldRegularBlueText} variant='h5'>Referencia</Typography>
                    <Typography className={classes.regularBlueText} variant='subtitle1'>{props.receiptAnswer.payment_method !== undefined ? props.receiptAnswer.payment_method.agreement : ''}</Typography>
                </Grid>
                <Grid item xs={12} md={12}>
                    <Typography className={classes.regularBlueText} variant='subtitle1'>En caso de dudas, favor de comunicarse a Witideal al teléfono 55 3418 2227 o al correo contacto@witideal.com</Typography>
                </Grid>
                <Grid item xs={12} md={12}>
                    <Typography className={classes.regularBlueText} variant='h5'>¿Quieres conocer los bancos disponibles para nuestro servicio SPEI?</Typography>
                </Grid>
                <Grid item xs={12} md={12}>
                    <Typography className={classes.boldRegularBlueText} variant='h5'>Visita: www.openpay.mx/bancos.html</Typography>
                </Grid>
                <Grid item xs={12} md={12}>
                    <Typography className={classes.regularBlueText} variant='caption'>powered by</Typography>
                </Grid>
                <Grid item xs={12} md={12}>
                    <img src={'https://firebasestorage.googleapis.com/v0/b/witideal-develop.appspot.com/o/assets%2Fmailing%2Fthumb%40openpay.png?alt=media&token=d8bc986f-ce77-462a-842b-d6c938539506'} width={100} alt='openpaylogo' />
                </Grid>
            </Grid>
        </React.Fragment>
    )

    var stores = (
        <React.Fragment>
            <Grid container justify='center' alignItems='center' spacing={3}>
                <Grid item xs={12} md={12}>
                    <Typography className={classes.boldRegularBlueText} gutterBottom variant='h2'> Orden de Pago para Tiendas de Autoservicio </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography className={classes.regularBlueText} variant='subtitle1'>Orden OID: {props.oId !== undefined ? props.oId : ''}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography  className={classes.regularBlueText} variant='h5'>Servicio a Pagar</Typography>
                </Grid>
                <Grid item xs={12}>
                    <img width={150} src={'https://firebasestorage.googleapis.com/v0/b/witideal-b1f99.appspot.com/o/assets%2FMailingMkt%2Fthumb%40logo_paynet1.png?alt=media&token=8278bb1a-b053-4aa5-b8b7-86cd421797d5'} alt='paynet'/>
                </Grid>
                
                <Grid item xs={12}>
                    <Typography className={classes.boldHighLightBlue} variant='h5'>Fecha Límite de Pago</Typography>
                    <Typography>{props.receiptAnswer.due_date}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <img width={150} src={props.receiptAnswer.payment_method !== undefined ? props.receiptAnswer.payment_method.barcode_url:''} alt='paynet barcode'/>
                    <Typography gutterBottom className={classes.regularBlueText} variant='subtitle1'>{props.receiptAnswer.payment_method !== undefined ? props.receiptAnswer.payment_method.reference : ''}</Typography>
                    <Typography className={classes.regularBlueText} variant='subtitle1'>En caso de no poder leer el código de barras, escribir el código tal como se muestra.</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box className={classes.blueBox} p={5}>
                        <Typography variant='h4' className={classes.whiteText}>Total a pagar / MXN</Typography>
                        <Typography variant='h3' className={classes.whiteText}>${formatPrice(props.receiptAnswer.amount)}</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} md={12}>
                    <Typography className={classes.boldHighLightBlue} variant='h5'>Detalles de la compra</Typography>
                    {/* <Typography className={classes.regularBlueText} variant='subtitle1'>Compra de los siguientes paquetes de witicoins: </Typography>
                    {props.packagesDescription.map((element, index) => { return (<Typography gutterBottom key={index}>{`${element.qty} ${element.name} `}</Typography>) })} */}
                    <Typography className={classes.regularBlueText} variant='subtitle1'>Compra de witicoins </Typography>
                    <Typography className={classes.regularBlueText} variant='subtitle1'>Fecha y hora: {props.receiptAnswer.operation_date} </Typography>
                </Grid>
                <Grid item xs={12} md={12}>
                    <Typography variant='h3' className={classes.boldRegularBlueText}>Pasos para realizar el pago</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography align='right' className={classes.boldGreenText} variant='h2'>1)</Typography>
                </Grid>
                <Grid item xs={10}>
                    <Typography align='left'>Acude a cualquier tienda afiliada.</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography align='right' className={classes.boldGreenText} variant='h2'>2)</Typography>
                </Grid>
                <Grid item xs={10}>
                    <Typography align='left'>Entrega al cajero el código de barras y menciona que realizarás un pago de servicio Paynet</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography align='right' className={classes.boldGreenText} variant='h2'>3)</Typography>
                </Grid>
                <Grid item xs={10}>
                    <Typography align='left'>Realizar el pago en efectivo por ${formatPrice(props.receiptAnswer.amount)} MXN</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography align='right' className={classes.boldGreenText} variant='h2'>4)</Typography>
                </Grid>
                <Grid item xs={10}>
                    <Typography align='left'>Conserva el ticket para cualquier aclaración</Typography>
                </Grid>
                <Grid item xs={12} md={12}>
                    <Typography className={classes.regularBlueText} variant='subtitle1'>En caso de dudas, favor de comunicarse a Witideal al teléfono 55 4731 8243 o al correo contacto@witideal.com</Typography>
                </Grid>

                <Grid item xs={12} md={12}>
                    <Typography className={classes.boldHighLightBlue} variant='h5'>Instrucciones para el cajero</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography align='right' className={classes.boldGreenText} variant='h2'>1)</Typography>
                </Grid>
                <Grid item xs={10}>
                    <Typography align='left'>Ingresar al menú de Pago de Servicios</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography align='right' className={classes.boldGreenText} variant='h2'>2)</Typography>
                </Grid>
                <Grid item xs={10}>
                    <Typography align='left'>Seleccionar Paynet</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography align='right' className={classes.boldGreenText} variant='h2'>3)</Typography>
                </Grid>
                <Grid item xs={10}>
                    <Typography align='left'>Escanear el código de barras o ingresar el núm. de referencia</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography align='right' className={classes.boldGreenText} variant='h2'>4)</Typography>
                </Grid>
                <Grid item xs={10}>
                    <Typography align='left'>Ingresa la cantidad total a pagar</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography align='right' className={classes.boldGreenText} variant='h2'>5)</Typography>
                </Grid>
                <Grid item xs={10}>
                    <Typography align='left'>Cobrar al cliente el monto total más la comisión</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography align='right' className={classes.boldGreenText} variant='h2'>6)</Typography>
                </Grid>
                <Grid item xs={10}>
                    <Typography align='left'> Confirmar la transacción y entregar el ticket al cliente</Typography>
                </Grid>
                <Grid item xs={12} md={12}>
                    <Typography className={classes.regularBlueText} variant='subtitle1'>Para cualquier duda sobre como cobrar, por favor llamar al teléfono 55 4731 8243 en un horario de 8am a 9pm de lunes a domingo</Typography>
                </Grid>
                <Grid item xs={12}>
                    <img width={'100%'} src={'https://firebasestorage.googleapis.com/v0/b/witideal-develop.appspot.com/o/assets%2Fmailing%2Fthumb%40tiendas.gif?alt=media&token=6200b2b2-e343-430f-b5ac-938f3297b484'} alt={'tiendas'}/>
                </Grid>
                <Grid item xs={12} md={12}>
                    <Typography className={classes.regularBlueText} variant='h5'>¿Quieres pagar en otras tiendas?</Typography>
                </Grid>
                <Grid item xs={12} md={12}>
                    <Typography className={classes.boldRegularBlueText} variant='h5'>Visita: www.openpay.mx/tiendas</Typography>
                </Grid>
                <Grid item xs={12} md={12}>
                    <Typography className={classes.regularBlueText} variant='caption'>powered by</Typography>
                </Grid>
                <Grid item xs={12} md={12}>
                    <img src={'https://firebasestorage.googleapis.com/v0/b/witideal-develop.appspot.com/o/assets%2Fmailing%2Fthumb%40openpay.png?alt=media&token=d8bc986f-ce77-462a-842b-d6c938539506'} width={100} alt='openpaylogo' />
                </Grid>

            </Grid>
        </React.Fragment>
    )

    var errorCard = (
        <React.Fragment>
            <Grid container justify='center' alignItems='center'>
                <Typography>Lo sentimos, parece que hubo un error en el cargo</Typography>
            </Grid>
        </React.Fragment>
    )

    const renderReceipt = () => {
        console.log('metodo de pago', props.receiptAnswer.method)
        if (props.receiptAnswer !== undefined) {
            if (props.receiptAnswer.method === 'card') {
                return (creditCard)
            } else if (props.receiptAnswer.method === 'bank_account') {
                return (spei)
            } else if (props.receiptAnswer.method === 'store') {
                return (stores)
            } else {
                return (errorCard)
            }
        }
    }

    React.useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <React.Fragment>
            <Box pt={10} p={3}>
                {props.receiptAnswer.method === 'paypal' && (paypal)}
                {props.receiptAnswer.method !== 'paypal' && (renderReceipt())}
            </Box>
        </React.Fragment>
    )
}