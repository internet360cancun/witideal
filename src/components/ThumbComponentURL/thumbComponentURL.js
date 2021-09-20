import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const wdPurpleSubtitle = "#1E0E6F";
const wdLightPurple = "#F9F7FC";
const wdDarkPurple = "#E0D7EE";

const useStyles = makeStyles(theme => ({
  buttonIcon: {
    color: 'blue',
    boxShadow: theme.shadows[5],
  },
  thumb: {
    display: "inline-flex",
    borderRadius: 2,
    border: "1px solid #eaeaea",
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: "border-box",
    transition: "0.3s",
    "&:hover": {
      cursor: "pointer",
      boxShadow: "2px 2px 3px rgba(0,0,0,0.4)"
    }
  },
  thumbInner: {
    display: "flex",
    minWidth: 0,
    overflow: "hidden"
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    // padding: theme.spacing(2, 4, 3)
  },
  imgContainer: {
    transition: '0.3s',
    minWidth: 200,
    height: 130,
    maxHeight: 130,
    overflow: 'hidden',
    '&:hover': {
      boxShadow: '5px 5px 11px rgba(0,0,0,0.4)',
      cursor: 'pointer',
    }
  },
  img: {
    display: "block",
    width: "100%",
    transition: "5s",
    '&:hover': {

    }
  },
  imgBtn: {
    backgroundColor: 'red',
    borderRadius: '100%'
  },
  dragContainer: {
    backgroundColor: wdLightPurple,
    borderRadius: 10,
    borderStyle: "dashed",
    borderWidth: 1,
    borderColor: wdPurpleSubtitle,
    transition: "0.3s",
    "&:hover": {
      backgroundColor: wdDarkPurple,
      borderStyle: "solid",
      boxShadow: "2px 2px 5px rgba(0,0,0,0.2)",
      cursor: "pointer"
    }
  },
  dragContainer_hover: {
    backgroundColor: wdDarkPurple,
    borderRadius: 10,
    borderStyle: "solid",
    borderWidth: 1,
    boxShadow: "2px 2px 5px rgba(0,0,0,0.2)",
    borderColor: wdPurpleSubtitle
  },
  deleteIconContainer: {
    position: 'relative',
    right: -5,
    bottom: 125,
    backgroundColor: 'white',
    width: 30,
    height: 30,
    borderRadius: 50
  }
}));

export const ThumbComponentURL = props => {
  const classes = useStyles();

  const [isCompVisible, setIsCompVisible] = React.useState(true);
  //const [auxObj,setAuxObj] = React.useState({});

  const handleModal = () => {
    props.modalSetter(props.files);
    props.openModal();
  };

  const handleDel = () => {
    props.delUrl(props.files,props.section);
  };

  // useEffect(()=>{

  // })

  //console.log('links',props.files)

  return (
    <React.Fragment>
      {isCompVisible ? (
        <React.Fragment>
          {/* <div className={classes.thumb}>
            <div className={classes.thumbInner}>
              <img
                onClick={handleModal}
                src={props.children}
                className={classes.img}
                alt="miniatura de la imagen que se acaba de subir"
              />
            </div>
          </div>
          <IconButton onClick={handleDel} className={classes.button} aria-label="delete">
            <DeleteIcon />
          </IconButton> */}

          <Grid container justify='center' alignItems='center'>
            <Grid className={classes.imgContainer} item xs={12}>
              <img
                onClick={handleModal}
                src={props.files}
                className={classes.img}
                alt="miniatura de la imagen que se acaba de subir"
              />
            </Grid>
          </Grid>
          <div className={classes.deleteIconContainer}>
            <IconButton size='small'  onClick={handleDel} aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </div>

        </React.Fragment>
      ) : (
          <span />
        )}
    </React.Fragment>
  );
};
