import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { SnackbarContent, Grid, IconButton, Button, Box, Typography, Paper } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import SuccessIcon from '../../assets/successIcon.png'
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
    blueText: {
        color: '#1E0E6f',
        fontWeight: 700,
    },

    button: {
        color: '#D8D8D8',
        marginLeft: 40,
    },
    paper: {
        outline: 'none',
        borderLeft: '4px solid #00C66D',
        '& img': {
            marginRight: 20
        }
    },
    root: {
        outline: 'none',
        borderLeft: '4px solid #00C66D',
        backgroundColor: "white",
        '& img': {
            marginRight: 20
        }
    }


}));

/* 
  props ===========
  alarmText = string, text to be rendered
  open = boolean, open or close
  handleClose = !open, toggle open
*/

export function SuccessModal(props) {
    const classes = useStyles();



    const modal = (<Box p={{ xs: 3 }}>
        <Grid container justify="center" alignItems="center" >

            <Grid item xs={12}>
                {/* <Paper className={classes.paper}>*/}
                <Box p={2} pt={4} pb={4}>
                    <Grid container justify='center' alignItems='center'>
                        <Grid item >
                            <img src={SuccessIcon} alt='Error' />
                        </Grid>
                        <Grid item >
                            <Typography className={classes.blueText} variant="h6">¡Muy Bien!</Typography>
                            <Typography className={classes.greyText} variant="body2">{props.alarmText}</Typography>

                        </Grid>
                        {/*<Grid item>
                                    <IconButton className={classes.button} onClick={handleClose}>
                                        <CloseIcon fontSize='small' />
                                    </IconButton>
                                </Grid>*/}
                    </Grid>

                </Box>
                {/* </Paper>*/}
            </Grid>
        </Grid>
    </Box>)
    return (
        <React.Fragment>
            <Snackbar
                open={props.open}
                onClose={props.handleClose}
                TransitionComponent={SlideTransition}
            >

                <SnackbarContent
                    className={classes.root}
                    message={modal}
                />
            </Snackbar>

        </React.Fragment>

    );
}
