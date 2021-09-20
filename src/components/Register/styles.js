import { makeStyles } from '@material-ui/core/styles'
import Background from '../../assets/background_landing.png';
import { createTheme, styled } from '@material-ui/core'

const wdDarkBlue = '#1E0E6F';
const wdRegularBlue = '#303f9f';
const wdLightGreen = '#32FFD2';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#3F19F9',
    },
  },
});


export const ExtraNumberContent = styled('div')({
  position: 'relative',
  '& svg': {
    top: '15px',
    right: '8px',
    position: "absolute",
    cursor: 'pointer',
    color: 'var(--blue-light)',
    '&:hover': {
      color: 'var(--blue-hover)'
    }
  }
})

export const SessionButton = styled('span')({
  color: 'var(--blue)',
  textDecoration: 'underline',
  marginLeft: '10px',
  cursor: 'pointer',
})

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  buttonLogIn: {
    borderRadius: 50,
    marginTop: 10,
    fontWeight: 700,
    backgroundColor: '#3F19F9',
    color: "white",
    textTransform: "none",
    '&:hover': {
      backgroundColor: "#1E0E6F"
    }
  },
  addPhone: {
    color: "var(--blue)",
    borderRadius: 50,
    marginTop: 10,
    fontWeight: 700,
    backgroundColor: '#fff',
  },
  buttonRegister: {
    marginTop: 50,
    borderRadius: 50,
    fontWeight: 700,
    backgroundColor: '#3F19F9',
    color: "white",
    textTransform: "none",
    '&:hover': {
      backgroundColor: "#1E0E6F"
    }
  },

  buttonSocMed: {
    marginBottom: theme.spacing(1),
    borderRadius: 50,
    fontWeight: 700,
    height: 40,
    borderColor: wdLightGreen,
    color: "#3f51b5"
  },
  // buttonFacebook: {
  //     textTransform: 'none',
  //     borderRadius: 50,
  //     fontWeight: 700,
  //     color: '#777777',
  //     height: 40,
  //     fontSize: 13
  // },
  buttonGoogle: {
    paddingLeft: theme.spacing(0.5),
    textTransform: 'none',
    borderRadius: 50,
    fontWeight: 700,
    color: '#757575',
    height: 40,
    fontSize: 13
  },
  checkBox: {
    marginTop: 2,
  },
  // facebookColor: {
  //     marginBottom: theme.spacing(1),
  //     borderRadius: 50,
  //     fontWeight: 700,
  //     height: 40
  // },
  linkColor: {
    color: wdRegularBlue,
    "&:hover": {
      color: wdLightGreen,

      cursor: 'pointer'
    }
  },
  logoSocial: {
    marginRight: theme.spacing(1),
  },
  mainContainer: {
    backgroundImage: `url(${Background})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'bottom',
    paddingTop: 100,
    paddingBottom: 50
  },
  selectedBtn: {
    marginBottom: theme.spacing(1),
    borderColor: wdLightGreen,
    borderRadius: 50,
    fontWeight: 700,
    height: 40,
    backgroundColor: "#3f51b5",
    color: 'white',
    '&:hover': {
      borderColor: wdLightGreen,
      cursor: 'pointer',
      backgroundColor: wdRegularBlue,
    }


  },
  formControl: {
    margin: theme.spacing(1),
  },
  typeSubtitle: {
    color: wdDarkBlue
  },
  borderColorRadioAndCheck: {
    color: '#41B8F9',
    padding: '0px 10px',
  },
  textField: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#41B8F9',

      },
      '&:hover fieldset': {
        borderColor: '#3F19F9',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#3F19F9',
      },
    },
  }
}));

export default useStyles