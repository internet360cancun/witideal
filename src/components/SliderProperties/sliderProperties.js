import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import { Fade, Typography, Button, Grid, IconButton} from "@material-ui/core";
import MobileStepper from "@material-ui/core/MobileStepper";
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import CloseIcon from '@material-ui/icons/Close';


const useStyles = makeStyles(theme => ({
    bg: props => ({
        backgroundImage: `url(${props.src})`,
        width: "100%",
        height: '60vh',
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundColor: 'black',
        position:"relative"
    }),
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(236, 232, 252, 0.1)"
    },
    principalContainer: {
        width: '60vw',
        maxWidth: 800,
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],

    },
    textDescription: {
        color: '#160A53',
        fontWeight: 700
    },
    textActiveStepper: {
        color: '#3F19F9'
    },
    buttonClose: {
        position: 'absolute',
        top: 15,
        right: 15,
        borderRadius: 100,
        zIndex: 1,
        color:"white"
    },


}));

export default function SliderProperties(props) {
    /* 
   props ===========
   src= shows the background image of the current url
   description = describe the place that the current image shows
   steps = total number of images
   activeStep = active image position
   disabled = disable the next button its value is {activeStep === maxSteps - 1}
   open = boolean, open or close
   handleClose = !open, toggle open
   handleNext = function to get the following image 
   handleBack = function to return to the previous image

 */
    const theme = useTheme()
    const classes = useStyles(props);
    
    const renderFade = () => {
        return (
            <React.Fragment>
                <Grid container justify="center" alignItems="center" className={classes.principalContainer}  >
                    
                    <Grid item xs={12}>
                    
                        <div className={classes.bg} >
                       <IconButton className={classes.buttonClose} onClick={props.onClose}>
                           <CloseIcon/>
                       </IconButton>
                        </div>
                    </Grid>
                    <Grid item xs={11} md={7}>
                        <Grid container justify="space-between" alignItems="center" >
                            <Grid item >
                                <Typography className={classes.textDescription}>{props.description}</Typography>
                            </Grid>
                            <Grid item>
                                <MobileStepper
                                    className={classes.textActiveStepper}
                                    steps={props.steps}
                                    position="static"
                                    variant="text"
                                    activeStep={props.activeStep} />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={11} md={7} >
                        <Grid container justify="space-between" aligItems="center" >
                            <Grid item >
                                <Button size="medium" onClick={props.handleBack} disabled={props.activeStep === 0}>
                                    {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}

                                </Button>
                            </Grid>
                            <Grid item >
                                <Button size="small" onClick={props.handleNext} disabled={props.disabled}>

                                    {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                                </Button>
                            </Grid>




                        </Grid>
                    </Grid>
                </Grid>
            </React.Fragment >
        )
    }

    return (
        
        <Modal
           className={classes.modal}
            open={props.open}
            //onClose={props.onClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500
            }}
        >
            <Fade in={props.open}>
                {renderFade()}
            </Fade>
        </Modal>
    

    );
}
