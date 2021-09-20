import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
    formControl: {
        margin: 2,
        fontSize: '12px',
        minWidth: 120,
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: '#41B8F9',
    
          },
          '&:hover fieldset': {
            borderColor: '#3F19F9',
          },
          '&.Mui-focused fieldset': {
            borderColor:'#3F19F9',
          },
        }
    },
});


export function Dropdown(props) {

    /*
        inputLable = Name to be rendered in label
        value = value of the component
        handler = handler
        name = id or name
        valuesArray = [array of values or options]
    */

    const classes = useStyles();

    const values = props.valuesArray

    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);

    React.useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    const optionalProps = {}
    if (props.error) optionalProps.error = props.error
    if (props.onFocus) optionalProps.onFocus = props.onFocus

    return (
        <React.Fragment>
            <FormControl variant="outlined" fullWidth={props.fullWidth} className={classes.formControl} {...optionalProps}>
                <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
                    {props.inputLabel}
                </InputLabel>
                <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={props.value !== undefined ? props.value : ''}
                    onChange={props.handler}
                    name={props.name}
                    labelWidth={labelWidth}
                >
                    {values.map(element => <MenuItem value={element} key={element}>{element}</MenuItem>)}
                </Select>
            </FormControl>
        </React.Fragment>
    );

}