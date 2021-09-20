import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Box, Typography, SnackbarContent} from "@material-ui/core";
// import CloseIcon from '@material-ui/icons/Close';
import ErrorIcon from '../../assets/errorIcon.svg';
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

    button: {
        color: '#D8D8D8',
        marginLeft: 40,
    },
    paper: {
        outline: 'none',
        color:"#1E0E6f",
        borderLeft: '4px solid #FF0000',
        '& img': {
            marginRight: 20
        }
    },
   
    root: {
        outline: 'none',
        backgroundColor: "white",
        color: '#1E0E6f',
        borderLeft: '6px solid #FF0000',
        '& img': {
            marginRight: 20
        }
      }

}));
export function ErrorModal(props) {
    /* 
    props ===========
    alarmText = string, text to be rendered
    buttons = boolean, if true render [cancel] and [ok] else render span
    open = boolean, open or close
    handleClose = !open, toggle open
  */
    const classes = useStyles();


    const modal = (
        <React.Fragment>
            <Grid container justify="center" alignItems="center" >

                <Grid item xs={12}>

                    {/*<Paper className={classes.paper}>*/}
                        <Box p={2} pt={4} pb={4}>
                            <Grid container justify='center' alignItems='center'>
                                <Grid item >
                                    <img src={ErrorIcon} alt='Error' />
                                </Grid>
                                <Grid item >
                                    <Typography  variant="h6">Error</Typography>
                                    <Typography className={classes.greyText} variant="body2">{props.alarmText}</Typography>

                                </Grid>
 
                                {/* <Grid item>
                                        <IconButton className={classes.button} onClick={handleClose}>
                                            <CloseIcon fontSize='small' />
                                        </IconButton>
                                    </Grid> */}
                            </Grid>

                        </Box>
                    {/*</Paper>*/}

                </Grid>
            </Grid>
        </React.Fragment>

    )

    return (
        <React.Fragment>
            <Snackbar
                open={props.open}
                onClose={props.handleClose}
                TransitionComponent={SlideTransition}>
                <SnackbarContent
                className={classes.root}
                 message={modal} 
                />
               
            </Snackbar>

        </React.Fragment>
    );
}
