import React from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  makeStyles,
  Button,
} from "@material-ui/core";
import Background from "../../assets/background_landing.png";

const wdDarkBlue = "#1E0E6F";
const wdRegularBlue = "#3F19F9";

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    backgroundImage: `url(${Background})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "bottom",
    paddingTop: 100,
    paddingBottom: 50,
  },
  typeTitle: {
    color: wdRegularBlue,
    fontWeight: 700,
  },
  typeSubtitle: {
    color: wdDarkBlue,
    fontWeight: 700,
  },
  restoreBtn: {
    borderRadius: 50,
    backgroundColor: wdRegularBlue,
    fontWeight: 700,
  },
}));

export function MailValidation() {
  const classes = useStyles();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <React.Fragment>
      <Box p={{ xs: 2, sm: 5, md: 6 }} className={classes.mainContainer}>
        <Grid container justify="center">
          <Grid item xs={12} md={5} lg={5} xl={4}>
            <Paper elevation={5}>
              <Box p={{ xs: 2, sm: 5, md: 5, lg: 12 }}>
                <Grid container justify="center" spacing={2}>
                  <Grid item sm={12}>
                    <Typography
                      color="primary"
                      variant="h5"
                      className={classes.typeTitle}
                    >
                      Confirma tu cuenta en el correo electrónico que te
                      acabamos de enviar.
                    </Typography>
                  </Grid>

                  <Grid item sm={12}>
                    <Button
                      className={classes.restoreBtn}
                      fullWidth={true}
                      color="primary"
                      variant="contained"
                      size="large"
                    >
                      Volver a Enviar Correo
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
}
