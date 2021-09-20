import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const wdLightBlue = '#41B8F9';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    formControl: {
        borderStyle: 'solid',
        borderWidth: 1,
        width: '100%',
        borderRadius: 50,
        borderColor: wdLightBlue,
        fontWeight: 700,
        padding: '0 20px',
        '&:hover':{
            backgroundColor: 'rgba(0,0,255,0.1)'
        }
    },
}));

export function CheckboxGroup(props) {
    const classes = useStyles();
    const [state, setState] = React.useState({
        pressed: false
    });

    const handleChange = name => event => {
        setState({ ...state, [name]: event.target.checked });
    };

    const { pressed } = state;

    return (
        <FormControlLabel
        className={classes.formControl}
            control={
                <Checkbox
                color='primary'
                checked={pressed}
                onChange={handleChange('pressed')}
                value={props.children} />}
                label={props.children}
        />
    );
}