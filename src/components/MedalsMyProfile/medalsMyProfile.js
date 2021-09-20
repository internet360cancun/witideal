import React from 'react';
import { Grid, Box, Typography, Paper, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const useStyle = makeStyles(theme => ({
    sizelogo: {
        maxWidth: 50
    },
}));



const MedalsMyprofile = props => {

    const classes = useStyle();

    return (
        <React.Fragment>
            <Grid item >
                <Paper className={props.className}>
                    <Box p={2}>
                        <img className={classes.sizelogo} src={props.srcMedals} alt='cellMockup with Witideal Logo' />
                        <Typography variant='body2'>{props.children}</Typography>
                    </Box>
                </Paper>
            </Grid>

        </React.Fragment>

    )
}
export default MedalsMyprofile;