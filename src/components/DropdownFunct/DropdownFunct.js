import React from 'react';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {makeStyles} from '@material-ui/core'

const wdLightBlue = '#41B8F9';
const wdLightGreen = '#32FFD2';

const useStyles = makeStyles(theme => ({
    wdDropDown: {
        '& fieldset':{
            borderRadius: 50,
            borderColor: wdLightBlue
        },
        '&:hover':{
            borderColor: wdLightGreen,
            cursor: 'pointer'
        }
    }
}));


export function DropdownFunct(props) {
    const classes = useStyles();
    
    const [values, setValues] = React.useState({
        vecValue: '',
        name: 'hai',
    });

    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    React.useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    function handleChange(event) {
        setValues(oldValues => ({
            ...oldValues,
            [event.target.name]: event.target.value,
        }));
    }

    return (
        <div>

            <FormControl
                fullWidth={true}
                variant="outlined"
                className={classes.wdDropDown}
                >
                <InputLabel
                    ref={inputLabel}
                    htmlFor="outlined-vecValue-simple">
                    Inmueble
                        </InputLabel>
                <Select
                    value={values.vecValue}
                    onChange={handleChange}
                    input={
                        <OutlinedInput
                            labelWidth={labelWidth}
                            name="vecValue"
                            id="outlined-vecValue-simple"
                        />
                    }
                >
                    {props.elements.map((element,index)=>{
                        return <MenuItem value={element} key={index}>{element}</MenuItem>    
                    })}
                </Select>
            </FormControl>
        </div >
    );
}