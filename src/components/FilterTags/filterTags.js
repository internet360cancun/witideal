import React from 'react';
import { makeStyles, MuiThemeProvider, createTheme, styled } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import currencyParser, { formatHumanNumber } from '../../helpers/currencyParser'

import {
  tags,
  propertyType_es,
  action_es,
  fFisicas,
  fEspacios,
  fSeguridad,
  fAmenidades,
  fEspeciales,
  fTiempo
} from '../../assets/Strings';
import { Typography, Grid, Hidden } from '@material-ui/core';

const toSpanish = {
  maxArea: 'Área max',
  minArea: 'Área min'
}

const filtersObj = {
  ...fFisicas,
  ...fEspacios,
  ...fSeguridad,
  ...fAmenidades,
  ...fEspeciales,
  ...fTiempo,
}

const translater = {
  ...propertyType_es,
  ...action_es,
  ...tags
}
const theme = createTheme({
  palette: {
    primary: {
      main: '#3F19F9',
    },
  },
});
const wdLightBlue = "#41B8F9";

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: theme.spacing(0.5),
    textAlign: 'left'
  },
  chip: {
    margin: theme.spacing(0.5),
    borderColor: wdLightBlue,
    fontSize: 15
  },
}));

const Scroollable = styled(Grid)({
  overflow: 'scroll',
  display: 'flex',
  '&::-webkit-scrollbar': {
    display: 'none'
  }
})

export function FilterTags(props) {
  const classes = useStyles();

  const handleDelete = chipToDelete => () => {
    props.delAndUpd(chipToDelete.label)
  };

  const renderLabel = (data) => {
    if (tags[data.label]) {
      return renderTextInTag(data.label, data.value, translater)
    } else if (filtersObj[data.label] !== undefined) {
      return renderTextInTagFilter(data.label, data.value, filtersObj)
    } else if (toSpanish[data.label]){
      return `${toSpanish[data.label]}: ${currencyParser.formatHumanNumber(data.value, 0)}`
    }
  }

  const renderTextInTag = (label, value, dictionary) => {
    switch (typeof (value)) {
      case 'string':
        return `${dictionary[value]}`
      case 'boolean':
        if (!value) {
          return false
        } else {
          return `${ label === 'bankSale' ? 'Excluir remate bancario' : dictionary[label]}`
        }
      case 'number':
        return isNaN(value) ? false : `${dictionary[label]}: ${formatHumanNumber(value, 0)} ${props.currency}`
      default:
        return false;
    }
  }

  const renderTextInTagFilter = (label, value, dictionary) => {
    switch (typeof (value)) {
      case 'string':
        return `${dictionary[label].name}: ${value}`
      case 'boolean':
        if (!value) {
          return false
        } else {
          return `${dictionary[label].name}`
        }
      case 'number':
        return `${dictionary[label].name}: ${formatHumanNumber(value, 0)}`
      default:
        return `${label},${formatHumanNumber(value, 0)}`;
    }
  }


  return (
    <div className={classes.root}>
      <MuiThemeProvider theme={theme}>
        <Grid container justifyContent='center' alignItems='center' spacing={0}>
          <Hidden lgUp>
            <Scroollable item xs={12}>
              {Array.isArray(props.tags) && props.tags.map((data, index)  => (
                <React.Fragment key={index}>
                  {renderLabel(data) && !data.isDeletable && (
                    <Chip
                      label={renderLabel(data)}
                      className={classes.chip}
                      variant='outlined'
                      color='primary'
                      size='small'
                    />
                  )}
                </React.Fragment>
              ))}
            </Scroollable>

            <Scroollable item xs={12}>
              {Array.isArray(props.tags) && props.tags.map((data, index)  => (
                <React.Fragment key={index}>
                  {renderLabel(data) && data.isDeletable && (
                    <Chip
                      label={renderLabel(data)}
                      onDelete={handleDelete(data)}
                      className={classes.chip}
                      color='primary'
                      size='small'
                    />
                  )}
                </React.Fragment>
              ))}
            </Scroollable>
          </Hidden>

          <Hidden mdDown>
            <Grid item xs={12}>
              <Typography color='primary' variant='subtitle2' align='left'>Resumen de Búsqueda: </Typography>
            </Grid>
            <Grid item xs={12}>
              {Array.isArray(props.tags) && props.tags.map((data, index)  => (
                <React.Fragment key={index}>
                  {renderLabel(data) && data.isDeletable && (
                    <Chip
                      label={renderLabel(data)}
                      onDelete={handleDelete(data)}
                      className={classes.chip}
                      color='primary'
                      size='small'
                    />
                  )}
                  {renderLabel(data) && !data.isDeletable && (
                    <Chip
                      label={renderLabel(data)}
                      className={classes.chip}
                      variant='outlined'
                      color='primary'
                      size='small'
                    />
                  )}
                </React.Fragment>
              ))}
            </Grid>
          </Hidden>
        </Grid>
      </MuiThemeProvider>
    </div>
  );
}