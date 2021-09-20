import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
    List,
    ListItem,
    Divider,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Typography,
    Box,
    Grid
} from "@material-ui/core";

const wdGeneralText = "#160A53";
const wdRegularBlue = "#3f19f9";

const useStyles = makeStyles(theme => ({
    inline: {
        display: "inline",
        color: wdRegularBlue,
        fontWeight: 400
    },
    generalTextPrimary: {
        color: wdGeneralText,
        fontWeight: 700
    },
    generalText: {
        color: wdGeneralText
    },
    imgContact: {
        width: 80,
        height: 80,
        maxWidth: 100,
        maxHeight: 100
    }
}));

/*
Props 
profilePicture
contactName
promoterName
phoneNumber
promoterEmail 
alt : show the initial username, if there is no photo
*/

export default function ListContact(props) {
    const classes = useStyles();

    return (
        <React.Fragment>
            <Grid item xs={12} sm={6} md={6}>
                <List>
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar
                                className={classes.imgContact}
                                alt={props.alt}
                                srcSet={props.profilePicture}
                            />
                        </ListItemAvatar>
                        <Box pl={2}>
                            <ListItemText
                                primary={
                                    <Typography className={classes.generalTextPrimary} gutterBottom variant="h5" >
                                        {props.contactName}
                                   </Typography>
                                }
                                secondary={
                                    <React.Fragment>
                                        <Typography variant="body2" className={classes.inline}>
                                            {props.promoterName}
                                        </Typography>
                                        <Typography className={classes.generalText}>
                                            {props.phoneNumber}
                                         </Typography>
                                        <Typography className={classes.generalText}>
                                            {props.promoterEmail}
                                        </Typography>
                                    </React.Fragment>
                                }
                            />
                        </Box>
                    </ListItem>
                    <Divider component="li" />
                </List>
            </Grid>
        </React.Fragment>
    );
}
