import React from 'react'
import { Skeleton } from '@material-ui/lab'
import { Grid } from '@material-ui/core'



const SkeletonComponent = () => (
  <Grid item xs={12} sm={6} md={4} xl={3}>
    <Skeleton variant="rect" height={350} />
    <Skeleton variant="text" width={250} />
    <Skeleton variant="text" />
    <Skeleton variant="text" width={250} />
  </Grid>
)

const SkeletonList = () => (
  <Grid container spacing={2}>
    <SkeletonComponent />
    <SkeletonComponent />
    <SkeletonComponent />
    <SkeletonComponent />
    <SkeletonComponent />
    <SkeletonComponent />
    <SkeletonComponent />
    <SkeletonComponent />
  </Grid>
)

export default SkeletonList