import React from "react";
import {
  Grid,
  Typography,
  Paper,
  Box,
  Button,
  makeStyles,
  Hidden,
} from "@material-ui/core";

const wdDarkBlue = "#1E0E6F";
// const wdRegularBlue = '#303f9f';

const useStyles = makeStyles({
  title: {
    color: wdDarkBlue,
    fontWeight: 700,
  },
  subtitle: {
    // color: wdRegularBlue,
    fontWeight: 700,
    color: "#3F19F9",
  },
  buttons: {
    borderColor: "#41B8F9",
    color: "#3F19F9",
    textTransform: "none",
    fontSize: 17,
  },
});

export const SearchOrAnnounce = (props) => {
  /*
    ====== props
    setClient = function 
    setPromoter = function
    optionSelected = boolean
  */

  const promotor = () => {
    props.setPromoter();
    window.gtag("event", "conversion", {
      send_to: "AW-307620621/5IkJCKbbioADEI3W15IB",
    });
  };

  const classes = useStyles();

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Hidden mdUp>
        <Grid item xs={12}>
          <Typography
            className={classes.title}
            align="center"
            variant="h6"
            gutterBottom
          >
            {" "}
            Empecemos con tu cuenta
          </Typography>
        </Grid>
      </Hidden>

      <Hidden smDown>
        <Grid item md={10}>
          <Typography
            className={classes.title}
            align="center"
            variant="h5"
            gutterBottom
          >
            {" "}
            Empecemos con tu cuenta
          </Typography>
        </Grid>
      </Hidden>

      <Grid item xs={10} md={11}>
        <Grid
          container
          justifyContent="center"
          alignItems="stretch"
          spacing={2}
        >
          <Grid item xs={12} sm={6}>
            <Paper
              elevation={2}
              style={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box p={{ xs: 2, md: 3 }}>
                <Grid
                  container
                  justifyContent="center"
                  alignItems="stretch"
                  spacing={2}
                >
                  <Grid item xs={12}>
                    <Typography
                      className={classes.subtitle}
                      align="center"
                      variant="h6"
                    >
                      Quiero buscar propiedades
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      size="small"
                      style={{ borderRadius: "50px", textTransform: "none" }}
                      onClick={props.setClient}
                      fullWidth
                      variant="contained"
                      color="primary"
                    >
                      Buscador
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper
              elevation={2}
              style={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box p={{ xs: 2, md: 3 }}>
                <Grid
                  container
                  justifyContent="center"
                  alignItems="stretch"
                  spacing={2}
                >
                  <Grid item xs={12}>
                    <Typography
                      className={classes.subtitle}
                      align="center"
                      variant="h6"
                    >
                      Quiero anunciar inmuebles
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      size="small"
                      style={{ borderRadius: "50px", textTransform: "none" }}
                      onClick={promotor}
                      fullWidth
                      variant="contained"
                      color="primary"
                    >
                      Promotor
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
