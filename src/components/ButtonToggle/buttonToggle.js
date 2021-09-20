import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core';

export function ButtonToggle(props) {
    
    const wdLightBlue = '#41B8F9';    

    const useStyles = makeStyles(theme => ({
        wdBtnItem: {
            border: 'solid',
            padding: 5,
            borderWidth: 1,
            borderRadius: 50,
            paddingRight: 20,
            height: 50,
            marginLeft: '0.1vw',
            borderColor: wdLightBlue,
            transition: '0.5s',
            '& .MuiIconButton-label':{
                
                width: 1,
                height: 1,
                '&:checked':{
                    color:'red'
                },
            }
        },
    }));
    
    const classes = useStyles();

    const [value, setValue] = React.useState(props.elements[0]);
    
    function handleChange(event) {
        setValue(event.target.value);
        
    }

    return (
        <FormControl
            component="fieldset"
        >
            <RadioGroup
                aria-label="position"
                name="position"
                value={value}
                onChange={handleChange}
                row
                >
                {props.elements.map((element) => {
                    return (
                        <FormControlLabel
                            value={element}
                            control={<Radio color="primary" />}
                            label={element}
                            key={element}
                            id = {element}
                            className={classes.wdBtnItem}
                            labelPlacement="end"
                        />
                    );
                })}
            </RadioGroup>
        </FormControl>
    );
}

