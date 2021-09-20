import React from 'react';
import {Grid,Box} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PromoForm from "../PromoForm/promoForm";



const useStyles = makeStyles(theme => ({
    container:{
        backgroundColor: '#F9F7FC'
    }
  }));


export function LandingPromoter() {
    const classes = useStyles();

    

    return (
        <React.Fragment>
            <Box p={{xs: 2, sm: 4}} className={classes.container}>
                <Grid container justify='center'>
                    <Grid item xs={12} md={11}>
                        <PromoForm />

                    </Grid>
                </Grid>
            </Box>
        </React.Fragment>
    )
}
