import React from 'react'
import { Grid } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'


const SkeletonComponent = () => {
  return (
    <Grid container justify="center" alignItems='center' spacing={4}>
      <Grid item xs={12} md={5}>
        <Skeleton variant="text" height={40} />
        <Skeleton variant="text" height={40} />
      </Grid>
      <Grid item xs={12} md={5}>
        <Skeleton variant="text" height={40} />
        <Skeleton variant="text" height={40} />
      </Grid>
      <Grid item xs={12} md={5}>
        <Skeleton variant="text" height={40} />
        <Skeleton variant="text" height={40} />
      </Grid>
      <Grid item xs={12} md={5}>
        <Skeleton variant="text" height={40} />
        <Skeleton variant="text" height={40} />
      </Grid>
      <Grid item xs={12} md={5}>
        <Skeleton variant="text" height={40} />
        <Skeleton variant="text" height={40} />
      </Grid>
      <Grid item xs={12} md={5}>
        <Skeleton variant="text" height={40} />
        <Skeleton variant="text" height={40} />
      </Grid>
    </Grid>
  )
}

export default SkeletonComponent