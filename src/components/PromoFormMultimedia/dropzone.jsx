import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Grid, Box, Typography } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import {WarningModal} from '../WarningModal/warningModal';
import { getRandomInt } from '../../firebase/storage'

function DropZoneComp(props) {
  const [warning,setWarning] = useState({
    open: false,
    alarmText:''
  })

  const handleWarning = (alarmText) =>{
    setWarning({
      open: !warning.open,
      alarmText:`${alarmText}`
    })
  }


  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/jpeg, image/png, image/jpg",
    onDrop: (acceptedFiles, rejectedFiles) => {
    let num_pictures = props.pictures.length
    let availableMemory = props.maxPhotos - num_pictures
    if (acceptedFiles.length <= availableMemory) keepFiles(acceptedFiles)
    else handleWarning(`Aún dispones de ${availableMemory} espacios para fotos, pero estás intentando subir ${acceptedFiles.length} fotos.`)
    rejectedFiles.map(file => {
      return <p>El archivo {file.path} no tiene formato .jpg o .png</p>;
    })
    }
  })

  //for limite files
  function keepFiles(filesToKeep) {
    var limitedFiles = [];
    for (let i = 0; i < filesToKeep.length; i++) {
      if (i < props.maxPhotos - props.pictures.length) {
        limitedFiles[i] = filesToKeep[i];
        limitedFiles[i].preview = URL.createObjectURL(limitedFiles[i])
      }
    }
    console.log('limitedFiles', limitedFiles)
    limitedFiles = limitedFiles.map(file => {
      file.customName = `${getRandomInt(1,999999)}_${file.name}`
      return file
    })
    props.setPictures(limitedFiles)
  }

  return (
    <React.Fragment>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive && (
          <DragContainerHover p={2}>
            <SubtitleText variant="h5"> Suelta los archivos </SubtitleText>
          </DragContainerHover>
        )}
        {!isDragActive && props.pictures.length < props.maxPhotos && (
          <Grid item xs={12}>
            <DragContainer p={2}>
              <SubtitleText variant="h5">Arrastra los archivos o presiona para seleccionar</SubtitleText>
              <Typography variant='subtitle1'>
                {`(Fotos disponibles para subir: ${props.maxPhotos - props.pictures.length} )`}
                {/* (Fotos disponibles para subir: {props.maxPhotos - props.pictures.length}  */}
              </Typography>
            </DragContainer>
          </Grid>
        )}
      </div>
      <WarningModal
        open={warning.open}
        alarmText={warning.alarmText}
        handleClose={handleWarning}
      />
    </React.Fragment>
  );
}

const SubtitleText = styled(Typography)({
  color: "#1E0E6F",
  fontWeight: 700
})

const DragContainerHover = styled(Box)({
  backgroundColor: '#E0D7EE',
  borderRadius: 10,
  borderStyle: "solid",
  borderWidth: 1,
  boxShadow: "2px 2px 5px rgba(0,0,0,0.2)",
  borderColor: '#1E0E6F'
})

const DragContainer = styled(Box)({
  backgroundColor: '#F9F7FC',
  borderRadius: 10,
  borderStyle: "dashed",
  borderWidth: 1,
  borderColor: "#1E0E6F",
  transition: "0.3s",
  "&:hover": {
    backgroundColor: "#E0D7EE",
    borderStyle: "solid",
    boxShadow: "2px 2px 5px rgba(0,0,0,0.2)",
    cursor: "pointer"
  }
})

export default DropZoneComp