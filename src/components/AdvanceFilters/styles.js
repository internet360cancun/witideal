import { makeStyles } from '@material-ui/core/styles'

const wd_bgColor = '#F9F7FC';
const wd_bgBotBorder = '#3F19F9';
const wdPurpleSubtitle = '#1E0E6F';
const wdLightBlue = '#41B8F9';
const wdDarkBlue = '#3F19F9';

const useStyles = makeStyles(theme => ({
    subtitleText: {
        color: wdPurpleSubtitle,
        fontWeight: 700
    },
    bgBox: {
        backgroundColor: wd_bgColor,
        borderBottomStyle: 'dashed',
        borderBottomWidth: 1,
        borderBottomColor: wd_bgBotBorder,
    },
    textField: {
        // borderColor: wdLightBlue
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: '#41B8F9',
            borderRadius: 30,
          },
          '&:hover fieldset': {
            borderColor: '#3F19F9',
          },
          '&.Mui-focused fieldset': {
            borderColor: wdDarkBlue,
          },
        }
    },
    formControl: {
        // marginRight:2,
        marginLeft:2,
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 50,
        borderColor: wdLightBlue,
        fontWeight: 700,
        width: '100%',
        '&:hover': {
            backgroundColor: 'rgba(0,0,255,0.1)'
        }
    },
    borderColorRadioAndCheck: {
      color: '#41B8F9'
    }
}));

export default useStyles