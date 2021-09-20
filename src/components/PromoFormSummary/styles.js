
import { makeStyles } from '@material-ui/core/styles'

const wdPurpleSubtitle = '#1E0E6F';
const wdExtraLightPurple = '#F7F6FF';
const wdDarkBlue = '#1E0E6F';
const wdRegularBlue = '#3F19F9';

const useStyles = makeStyles(theme => ({
  subtitleText: {
    color: wdPurpleSubtitle,
    fontWeight: 700
  },
  listOption: {
    background: wdExtraLightPurple,
    padding: '10px 6px',
    borderRadius: 10,
    fontWeight: 700,
    color: wdPurpleSubtitle
  },
  iconCard: {
    backgroundColor: wdExtraLightPurple,
    borderRadius: 10,
    color: wdPurpleSubtitle,
    fontWeight: 700,
    height: 150
  },
  bulletCard: {
    backgroundColor: wdExtraLightPurple,
    borderRadius: 10,
    color: wdPurpleSubtitle,
    fontWeight: 700,
  },
  mainPhoto: {
    width: '100%'
  },
  floatingCard: {
    [theme.breakpoints.up('lg')]: {
      borderRadius: 10,
      top: 0,
      marginTop: 78,
    },
    [theme.breakpoints.down('md')]: {
      bottom: 0,
      left: 0,
      zIndex: 1,
      position: 'fixed',
      width: '100vw'
    }


  },
  floatingCard_fixed: {
    [theme.breakpoints.up('lg')]: {
      borderRadius: 10,
      top: 0,
      marginTop: 78,
      width: 400,
      zIndex: 1,
      position: 'fixed',
    },
    [theme.breakpoints.down('md')]: {
      bottom: 0,
      left: 0,
      zIndex: 1,
      position: 'fixed',
      width: '100vw'
    }


  },
  confirm: {
    backgroundColor: wdRegularBlue,
    textTransform: "none",
    color: "white",
    marginTop: 10,
    '&:hover': {
      backgroundColor: wdDarkBlue
    }
  },
  card: {
    backgroundColor: wdExtraLightPurple,
    borderRadius: 10,
    padding: theme.spacing(1),
  },

  cardTextRes: {
    color: wdRegularBlue,
    fontWeight: 700
  },
  subtitles:{
    color:wdDarkBlue
  }

}));

export default useStyles
