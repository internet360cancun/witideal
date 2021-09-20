import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';
import NumberFormat from 'react-number-format';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { styled } from '@material-ui/core/styles'


const wdLightBlue = '#41B8F9';

const wdDarkBlue = '#3F19F9';

const CssTextField = styled(TextField)({
    textAlign: 'center',
      '& .MuiOutlinedInput-input': {
        '@media (max-width:600px)': {
          padding: '8px 12px',
        },
      },
      '& .MuiInputLabel-outlined': { 
        '@media (max-width:600px)': {
          transform: 'translate(20px, 10px) scale(1)'
        },
      },
      '& .MuiInputLabel-outlined.MuiInputLabel-shrink': { 
        '@media (max-width:600px)': {
          transform: 'translate(14px, -6px) scale(0.75)'
        },
      },

    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: wdLightBlue,
        borderRadius: 50,
      },
      '&:hover fieldset': {
        borderColor: wdDarkBlue,
      },
      '&.Mui-focused fieldset': {
        borderColor: wdDarkBlue,
      },
    },
})

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },

  formControl: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    borderRadius: 50
  },
}));

function TextMaskCustom(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
      placeholderChar={'\u2000'}
      showMask
    />
  );
}

TextMaskCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
};

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            value: values.value <= 9 ? values.value : values.value.slice(0,9),
          },
        });
      }}
      thousandSeparator
      prefix="$"
      allowNegative={false}
    />
  );
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export function Currency(props) {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    numberformat: props.children,
  });

  const handleChange = name => event => {
    console.log('numero de elementos en price:', event.target.value.length)
    if (event.target.value.length <= 9) {
      console.log('estas cambiando el precio')
      setValues({
        ...values,
        [name]: event.target.value,
      });
    }else{
      console.log('ya te pasaste')
    }

  };

  React.useEffect(() => {
    // props.setter(values.numberformat)
    if (typeof (props.setter) === 'function') {
      props.setter(values.numberformat);
    }
  }, [values.numberformat])

  return (
    <div className={classes.container}>
      <CssTextField
        className={classes.margin}
        fullWidth={true}
        id={props.label}
        name={props.label}
        label={props.label}
        variant="outlined"
        value={values.numberformat || props.value}
        onChange={handleChange('numberformat')}
        InputProps={{
          inputComponent: NumberFormatCustom,
        }}
      />
    </div>
  );
}

