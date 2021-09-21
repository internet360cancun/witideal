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

const Destacados = () => {
  const db = firebase.firestore();
  const classes = useStyles();
  const [allDestacados, setAllDestacados] = useState([]);


  const getRandomDest = () => {
    db.collection("destProperties")
      .get()
      .then((querySnapshot) => {
        const documents = querySnapshot.docs.map((doc) => {
          doc.data().destProperties.forEach((element) => {
            element.get().then((snap) => {
              setAllDestacados((oldArray) => [...oldArray, {id: snap.id,  ...snap.data()}]);
            });
          });
        });
      });
  };

  useEffect(() => {
    getRandomDest();
  }, []);

console.log('alldestacados',allDestacados)

  return (
    <>
      {allDestacados.length > 0 && (
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
                  <DestacadosSwipe allDestacados={allDestacados} />
                </Grid>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Destacados;
