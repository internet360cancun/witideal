import { makeStyles, styled } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'

export const ButtonStyled = styled(Button)(({theme}) => ({
  marginTop: theme.spacing(6),
  marginRight: theme.spacing(1),
  textTransform: "none",
  borderColor:'#41B8F9',
  '&:hover': {
  background: props => props.hover
}
}));

export const useStyles = makeStyles(theme => ({
  root: {
    width: '90%',
  },

  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  paperWrapper: {
    overflow: 'hidden'
  },
  label: {
    color: '#1E0E6F',
    [theme.breakpoints.down('sm')]: {
      display: "none",
    },
  },
  link: {
    textDecoration: 'none'
  },
  stepper: {
    paddingRight: 75,
    paddingLeft: 75,
    '& .MuiStepIcon-root.MuiStepIcon-active': {
      color: '#3F19F9'
    },
    '& .MuiStepIcon-root.MuiStepIcon-completed': {
      color: '#3F19F9'
    },
    [theme.breakpoints.down("sm")]: {
      paddingRight: 30,
      paddingLeft: 30,
    }
  },
 
  text: {
    color: "#1E0E6F"
  }
}));
