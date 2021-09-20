import React, { useState } from 'react';
import { Button, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import {MultiToggleButton} from '../MultiToggleButton/multiToggleButton';


export function NumToggleButton(props) {

    const wdLightBlue = '#41B8F9';

    const useStyles = makeStyles(theme => ({
        numTogTitle:{
            color:'#1E0E6F',
            fontWeight: 700
        }
        
    }));
    const classes = useStyles();

    const grades = ['1','2','3','+4'];

    return (
        <React.Fragment>
            <Grid container>
                <Grid item xs={12}>
                    <Typography align='left' variant='h6' className={classes.numTogTitle}>{props.children}</Typography>
                </Grid>
                <Grid item sm>
                    <MultiToggleButton btns={grades}/>
                </Grid>
                
            </Grid>
        </React.Fragment>
    )
}
