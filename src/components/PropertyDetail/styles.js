import { makeStyles, styled } from '@material-ui/core/styles'
import MoreVertIcon from '@material-ui/icons/MoreVert';

export const MoreVert = styled(MoreVertIcon)({
  color: "#1e0e6f",
  position: "absolute",
  right: "10px",
  top: "10px",
  cursor: 'pointer',
})

const wdPurpleSubtitle = '#1E0E6F';
const wdBlue = '#3F19F9';
const wdExtraLightPurple = '#F7F6FF';
const wdLightGrey = '#F7F6FF';

const useStyles = makeStyles(theme => ({

  mainContainer: {
    backgroundColor: wdExtraLightPurple
  },
  subtitleText: {
    color: wdPurpleSubtitle,
    fontWeight: 700
  },
  subtitleText2: {
    color: wdBlue,
    fontWeight: 700
  },
  floatingCard: {
    [theme.breakpoints.up('lg')]: {
      borderRadius: 10,
      top: 0,
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
      [theme.breakpoints.up('xl')]: {
        width: 600
      },
      [theme.breakpoints.down('lg')]: {
        width: '35%'
      },
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
  mapContainer: {
    width: '100%',
    overflow: 'hidden'
  },
  promoterImgWrapper: {
    backgroundColor: wdLightGrey,
    display: 'block',
    margin: 'auto',
    width: theme.spacing(10),
    height: theme.spacing(10)
  },
  button: {
    backgroundColor: '#3F19F9',
    textTransform: "none",
    color: "white",
    //borderRadius: 50,
    marginTop: 10,
    '&:hover': {
      backgroundColor: '#1E0E6F'
    }
  }

}))


export default useStyles