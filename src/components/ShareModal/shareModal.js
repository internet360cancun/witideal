import React,{useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button, Box, Typography, TextField, SnackbarContent } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import Slide from "@material-ui/core/Slide";


function SlideTransition(props) {
    return <Slide {...props} direction="up" />;
}

const useStyles = makeStyles(theme => ({
    modal: {
        justifyContent: "center",
        alignItems: "center",
        display: "flex",

    },
    greyText: {
        color: '#545454'
    },
    title: {
        fontWeight: 700
    },
    button: {
        color: '#D8D8D8',
        marginLeft: 40,
    },
    buttonSendSMS:{
        borderRadius: 200
    },
    paper: {
        outline: 'none',
        borderLeft: '4px solid #D8D8D8',
        '& img': {
            marginRight: 20
        }
    },
    snackbarContent: {
        outline: 'none',
        backgroundColor: "white",
        color: '#1E0E6f',
        borderLeft: '6px solid #1E0E6f',
    }

}));
export function ShareModal(props) {
    /* 
    props ===========
    alarmText = string, text to be rendered
    open = boolean, open or close
    handleClose = !open, toggle open
  */
    const classes = useStyles();

    // const handleCopy = event =>{
    //     return navigator.clipboard.writeText(event.target.value)
    // }

    // useEffect(()=>{
    //     navigator.clipboard.writeText(props.alarmText)
    // },[])
    

    const modal = (
        <React.Fragment>
            <Grid container justify="center" alignItems="center" >

                <Grid item xs={12}>

                    {/* <Paper className={classes.paper}> */}
                    <Box >
                        <Grid container justify='center' alignItems='center' spacing={1}>

                            <Grid item xs={12} md={12}>
                                <Typography className={classes.title} gutterBottom align='center' variant="h5">El link se ha copiado !</Typography>
                                {/* <TextField
                                    variant='outlined'
                                    fullWidth
                                    value = { props.alarmText}
                                    id='linkToCopy'
                                    onClick={handleCopy}
                                /> */}
                            </Grid>

                        </Grid>

                    </Box>
                    {/* </Paper> */}

                </Grid>
            </Grid>
        </React.Fragment>

    )

    return (
        <React.Fragment>
            <Snackbar
                open={props.open}
                onClose={props.handleClose}
                TransitionComponent={SlideTransition}

            >
                <SnackbarContent
                    className={classes.snackbarContent}
                    message={modal}
                />
            </Snackbar>

        </React.Fragment>
    );
}
