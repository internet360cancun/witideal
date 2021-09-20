import React from 'react';
import {Box,Paper, Typography, Grid, Button, makeStyles} from '@material-ui/core';
import Background from '../../assets/background_landing2.jpg';
import {Link} from 'react-router-dom';

const wdDarkBlue = '#1E0E6F';
const wdRegularBlue = '#3F19F9';

const useStyles = makeStyles(theme => ({
    mainContainer: {
        backgroundImage: `url(${Background})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'bottom',
        paddingTop: 100,
        paddingBottom: 50,
        height:'70vh'

    },
    typeTitle:{
        color: wdRegularBlue,
        fontWeight: 700
    },
    typeSubtitle: {
        color: wdDarkBlue,
        fontWeight: 700
    },
    restoreBtn:{
        borderRadius: 50,
        backgroundColor: wdRegularBlue,
        fontWeight: 700
    },
    linkDec: {
        textDecoration: 'none'
    }
}));

export function NotFound(){

    const classes = useStyles();

    return(
        <React.Fragment>
            <Box p={{ xs: 2, sm: 5, md: 12 }} className={classes.mainContainer}>
                <Grid container justify='center'>
                    <Grid item xs={12} md={5} lg={5} xl={4}>
                        <Paper elevation={5}>
                            <Box p={{ xs: 2, sm: 5, md: 5, lg: 12 }}>
                                <Grid container justify='center' spacing={2}>
                                    <Grid item sm={12}>
                                        <Typography variant='h2'>404</Typography>
                                        <Typography color="primary" variant='h5' className={classes.typeTitle}>Lo sentimos, la página que buscas no está disponible.</Typography>
                                    </Grid>

                                    <Grid item sm={12}>
                                        <Link to="/" className={classes.linkDec}>
                                            <Button
                                            className={classes.restoreBtn}
                                            fullWidth={true}
                                            color="primary"
                                            variant='contained'
                                            size='large'>Volver a la página principal</Button>
                                        </Link>
                                    </Grid>

                                </Grid>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </React.Fragment>
    )
}