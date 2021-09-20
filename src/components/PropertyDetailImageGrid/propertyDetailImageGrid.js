import React from 'react';
import { Grid, Hidden } from '@material-ui/core';
import { ImageGrid } from '../ImageGrid/imageGrid';

export const PropertyDetailImageGrid = props => {

  /*
    principalPhoto = string
    photos = array of photos
  */

  
  return (
    <Grid container justify='center' alignItems='center'>
      <Hidden smDown>
        <Grid item xs={12} md={3}>
          <ImageGrid imageLink={props.photos[0]} imageHeight={props.height !== undefined ? props.height : 350} />
        </Grid>
      </Hidden>

      <Grid item xs={12} md={6}>
        <ImageGrid imageLink={props.principalPhoto} imageHeight={props.height !== undefined ? props.height : 350} />
      </Grid>
      <Hidden smDown>
        <Grid item xs={12} md={3}>
          <ImageGrid imageLink={props.photos[1]} imageHeight={props.height !== undefined ? props.height : 350} />
        </Grid>
      </Hidden>
    </Grid>
  )
}