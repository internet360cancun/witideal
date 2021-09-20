import React, { useState } from 'react';
import { Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';


export function ToggleYesOrNo(props) {

    const wdLightBlue = '#41B8F9';

    const useStyles = makeStyles(theme => ({
        wdBtnItem: {
            border: 'solid',
            borderWidth: 1,
            borderRadius: 50,
            borderColor: wdLightBlue,
            fontWeight: 700,
        },
        wdBtnContainer:{
            '& .MuiButton-contained':{
                backgroundColor: 'red'
            }
        }
        
    }));
    const classes = useStyles();

    let valores = ['Si', 'No'];

    let [chRent, setCheck] = useState(0);
    let [varianTog_ha,setVariant_ha] = useState('outlined');
    let [varianTog_co,setVariant_co] = useState('outlined');

    function handleClick_hab() {
        setCheck(0);
        
        let actualVariant_ha = varianTog_ha === 'outlined' ? 'contained' : 'outlined';
        
        setVariant_ha(actualVariant_ha);
        setVariant_co('outlined');
    }

    function handleClick_com() {
        setCheck(1);

        let actualVariant_co = varianTog_co === 'outlined' ? 'contained' : 'outlined';
        
        setVariant_ha('outlined');
        setVariant_co(actualVariant_co);
    }


    //console.log(valores[chRent])
    return (
        <React.Fragment>
            <Grid container spacing={1}>
                <Grid item sm>
                    <Button size='large' fullWidth={true} color='primary' variant={varianTog_ha} className={classes.wdBtnItem} onClick={handleClick_hab}>{valores[0]}</Button>
                </Grid>
                <Grid item sm>
                    <Button size='large' fullWidth={true} color='primary' variant={varianTog_co} className={classes.wdBtnItem} onClick={handleClick_com}>{valores[1]}</Button>
                </Grid>
            </Grid>
            {props.handler(valores[chRent])}
        </React.Fragment>
    )
}
