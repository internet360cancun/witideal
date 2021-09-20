import { makeStyles } from '@material-ui/core'

const wdHighlightBlue = '#3F19F9';
const wdDarkBlue = '#3F19F9';

const useStyles = makeStyles({
  container: {
    backgroundColor: '#F9F7FC',
    paddingBottom: '10%'
  },
  textHighLightBlue2: {
    color: wdHighlightBlue,
    fontWeight: 700
  },
  textWhite: {
    color: 'white',
    fontWeight: 700
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
        borderColor: wdDarkBlue,
      },
    }
  },
  textHighLightBlue: {
    color: '#1E0E6F',
    fontWeight: 700
  },
  textRegularBlue: {
    color: 
    '#1E0E6F'
  },
  topSeparator: {
    marginTop: 50
  },
  formTitle: {
    color: '#1E0E6F',
    fontWeight: 700,
    marginBottom: 10
  },
  buyButton: {
    backgroundColor: '#3F19F9',
    color: "white",
    textTransform: "none",
    fontSize: 17,
    '&:hover': {
      backgroundColor: "#1E0E6F"
    }
  },
  billButton: {
    borderColor: "#41B8F9",
    textTransform: "none",
    color: '#3F19F9',
    fontSize: 17
  },
  outlinedButton:{
    textTransform:"none",
    fontSize: 17,
  }
})

export default useStyles
