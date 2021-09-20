import React, { useContext, useEffect, useState } from 'react';
import firebase from 'firebase/compat/app';
import { Grid, Paper, Box, makeStyles } from '@material-ui/core';
import DestacadosSwipe from './DestacadosSwipe';
import useFirebaseTools from '../../Hooks/useFirebaseTools';
import sessionContext from '../../contexts/sessionContext';
import { useParams } from 'react-router';

const useStyles = makeStyles((theme) => ({
  paperRoot: {
    backgroundColor: '#Faf9df',
    height: '305px',
  },
}));

const Destacados = (props) => {
  const db = firebase.firestore();

  const { uId } = useContext(sessionContext);
  const classes = useStyles();

  return (
    <Grid
      style={{ width: '100%', margin: 'auto' }}
      container
      justifyContent="center"
      alignItems="center"
      spacing={1}
    >
      <Grid item xs={12} lg={11}>
        <Paper className={classes.paperRoot} elevation={3}>
          <Box p={3}>
            <Grid
              container
              justifyContent="center"
              alignItems="stretch"
              spacing={2}
            >
              <DestacadosSwipe />
            </Grid>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Destacados;
