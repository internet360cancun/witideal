import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import { Grid, Paper, Box, makeStyles } from "@material-ui/core";
import DestacadosSwipe from "./DestacadosSwipe";

const useStyles = makeStyles((theme) => ({
  paperRoot: {
    backgroundColor: "#Faf9df",
    height: "305px",
  },
}));

const Destacados = ({ allDestacados,match }) => {
  const classes = useStyles();

  console.log("alldestacados", allDestacados);

  return (
    <Grid
      style={{ width: "100%", margin: "auto" }}
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
              <DestacadosSwipe allDestacados={allDestacados} match={match} />
            </Grid>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Destacados;
