import React from "react";
import { makeStyles, styled } from "@material-ui/core/styles";
import { List, ListItem, ListItemText, Avatar, Typography, Grid, Hidden } from "@material-ui/core";
import formatNumber from '../../helpers/formatNumber'


const wdGeneralText = "#160A53";

const Container = styled(List)({
  height: '100%'
})

const ListItemStyled = styled(ListItem)({
  borderBottom: props => props.current === 'true' ? '' : '1px dashed #CABEFD',
  height: '100%',
  width: '100%'
})

const UserContent= styled('div')({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '10px',
  '& p': {
    marginLeft: '10px'
  }
})

const useStyles = makeStyles(theme => ({
  root: {
    border: props => props.current ? '1px solid #1E0E6F' : '',
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    padding: ' 0px 15px', 
    boxSizing: 'border-box',
  },
  textPromoter: {
    display: "inline",
    color: '#1E0E6F',
    fontWeight: 'bold'

  },
  generalTextPrimary: {
    color: wdGeneralText,
    fontWeight: 700,
  },
  generalText: {
    // color: wdGeneralText,
    color:"#1E0E6F"
  },
  imgContact: {
    width: 60,
    height: 60,
    maxWidth: 60,
    maxHeight: 60,
    margin: 'auto',
  }
}));

export default function ContactCard(props) {
  const classes = useStyles(props);

  return (
    <Container className={classes.root}>
      <ListItemStyled alignItems="center" current={props.current ? 'true' : 'false'} >
        <Grid container spacing={3} alignItems='center' >
          <Hidden mdDown>
            <Grid item xs={3}>
              <Avatar
                className={classes.imgContact}
                alt={props.alt}
                src={props.photo}
              />
            </Grid>
          </Hidden>
          <Grid item xs={12} lg={9}>
            <ListItemText>
                <Hidden lgUp>
                  <UserContent>
                    <Avatar
                      alt={props.alt}
                      src={props.photo}
                    />
                    <Typography className={classes.textPromoter}>{props.name || ''}</Typography>
                  </UserContent>
                </Hidden>
              <Hidden mdDown>
                <Typography className={classes.textPromoter}>{props.name || ''}</Typography>
              </Hidden>
              <Typography className={classes.generalText}>
                {`tel: ${formatNumber(props.phone)}`}
              </Typography>
              {!!props.extraPhones && (props.extraPhones.map(phone => (
                <Typography className={classes.generalText} key={phone}>
                  tel: {formatNumber(phone)}
                </Typography>
              )))}
              <Typography className={classes.generalText}>{props.mail} </Typography>
            </ListItemText>
          </Grid>
        </Grid>
      </ListItemStyled>    
    </Container>
  );
}