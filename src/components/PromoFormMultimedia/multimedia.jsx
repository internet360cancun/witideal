import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import  Dropzone from './dropzone';
import { styled} from '@material-ui/core/styles';
import  ListImagesDragable from './listImagesDragable'

const Title = styled(Typography)({
  color: '#1E0E6F',
  fontWeight: 700,
  marginTop: '25px'
})

export function PromoFormMultimedia(props) {

  const setPrincipalPhotoPath = (files) => {
    props.setPrincipalPhotoPath(files[0])
  }

  const setPictures = (array_of_pictures) => {
    const before_files = props.orderedPictures.filter (item => typeof item != 'string')
    const array_of_names_of_files = before_files.map(item => item.name)
    const filtered_array_of_pictures = array_of_pictures.filter(item => !array_of_names_of_files.includes(item.name))
    props.setOrderedPictures([...props.orderedPictures, ...filtered_array_of_pictures])
  }

  return (
    <Grid container spacing={4} justify='flex-start' alignItems='center'>
      
      <Grid item xs={12}>
        <Title variant='h5' align='left'>Foto Principal</Title>
        <Dropzone
          maxPhotos={1}
          setPictures={setPrincipalPhotoPath}
          pictures={props.principalPhotoPath ? [props.principalPhotoPath] : []} // transform to array required
        />
        <ListImagesDragable 
          orderedPictures={props.principalPhotoPath ? [props.principalPhotoPath] : []} // transfom to array required
          setOrderedPictures={setPrincipalPhotoPath}
          disabled={true}
        />
        <Title variant='h5' align='left'>Fotos del inmueble</Title>
        <Dropzone
          maxPhotos={30}
          setPictures={setPictures}
          pictures={props.orderedPictures}
        />
        <ListImagesDragable 
          orderedPictures={props.orderedPictures}
          setOrderedPictures={props.setOrderedPictures}
        />
      </Grid>
    </Grid>
  )
}