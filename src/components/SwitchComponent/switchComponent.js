import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

export function SwitchComponent(props) {
  const [state, setState] = React.useState({
    checkedB: false,
  });

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
    props.handler(event)
  };

  return (
      <FormControlLabel
        control={
          <Switch
            checked={state.checkedB}
            onChange={handleChange('checkedB')}
            id={props.id}
            value={props.children}
            name={props.name}
            color="primary"
          />
        }
        label={props.children}
      />
  );
}