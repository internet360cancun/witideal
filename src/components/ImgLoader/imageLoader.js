import React from 'react'
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Paper, Box, Grid, LinearProgress, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const wdPurpleSubtitle = '#1E0E6F';

const useStyles = makeStyles(theme => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    subtitleText: {
        color: wdPurpleSubtitle,
        fontWeight: 700
    },
}));

export const ImgLoader = props => {

    /* ======== props
        open = boolean value
        handleClose = function to close backdrop
        uploadedElems = how many elems are uploaded
        maxUploadedElem  = limit of how many elements can be pushed
    */

    const classes = useStyles();

    return (
        <React.Fragment>
            <Backdrop
                className={classes.backdrop}
                open={props.open}
                onClick={props.handleClose}
            >
                <Grid container justify='center' alignItems='center'>
                    <Grid item md={6}>
                        <Paper elevation={3}>
                            <Box p={10}>

                                <Grid container justify='center' alignItems='center' spacing={3}>
                                    <Grid item xs={12}>
                                        <Typography
                                        className={classes.subtitleText}
                                        variant='h4'
                                        gutterBottom> Gracias por la espera, estamos subiendo tu inmueble.</Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <CircularProgress color="primary" />
                                    </Grid>
                                    
                                        <Grid item xs={12}>
                                            <LinearProgress variant="determinate" value={(props.uploadedElems / props.total_to_upload) * 100} />
                                        </Grid>
                                    {props.total_to_upload > 0 && (
                                        <Grid item xs={12}>
                                            <Typography className={classes.subtitleText} align='center' variant='h6'>{`${props.uploadedElems}/${props.total_to_upload}`}</Typography>
                                        </Grid>
                                    )}
                                </Grid>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Backdrop>
        </React.Fragment>
    )
}