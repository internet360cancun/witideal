import React from "react";
import { Grid, Paper, Box, makeStyles } from "@material-ui/core";
import DestacadosSwipe from "./DestacadosSwipe";

const useStyles = makeStyles((theme) => ({
  paperRoot: {
    backgroundColor: "#Faf9df",
    height: "305px",
  },
}));

const Destacados = ({ allDestacados, action, propertyType, area1 }) => {
  const classes = useStyles();

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
              <DestacadosSwipe
                allDestacados={allDestacados}
                action={action}
                propertyType={propertyType}
                area1={area1}
              />
            </Grid>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Destacados;
