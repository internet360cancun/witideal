import React from 'react';
import {makeStyles} from '@material-ui/core';

export const ImageGrid = props =>{

    //https://firebasestorage.googleapis.com/v0/b/witideal-b1f99.appspot.com/o/wi…ll%2FYAWQLlBbekFZA65Ng3oc%2Fthumb%401100_IMG_20191201_165225.jpg?alt=media
    //https://firebasestorage.googleapis.com/v0/b/witideal-b1f99.appspot.com/o/witideal%2Fnull%2FYAWQLlBbekFZA65Ng3oc%2Fthumb%401100_IMG_20191201_165225.jpg?alt=media


    //props.imageLink https://firebasestorage.googleapis.com/v0/b/witideal-b1f99.appspot.com/o/witideal%2FgWkpV98dMgPjMkjieo8CqimMFbC3%2F7TPX6x2WtMyDvRqn4MHt%2FprincipalPhotoPath%2Fthumb%401100_Boda C & R 156.jpg?alt=media

    // console.log('props.imageLink',typeof(props.imageLink) === 'string' ? 'props.imageLink.replace(/ /g,"%20")': 'no pasa')

    const useStyles = makeStyles({
        imageBack:{
            backgroundImage: `url(${typeof(props.imageLink) === 'string' ? props.imageLink.replace(/ /g,"%20"): 'no pasa'})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            width: '100%',
            height: props.imageHeight,
            opacity:1,
            transition: '0.3s',
            '&:hover':{
                backgroundSize:'110%',
                opacity:0.8,
                cursor: 'pointer'
            }
        }
    })

    const classes = useStyles();
    
    return(
        <React.Fragment>
            <div className={classes.imageBack}></div>
        </React.Fragment>
    )
}