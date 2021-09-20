import React, { Fragment, useState } from 'react'
import {Avatar} from '@material-ui/core'
import { styled } from '@material-ui/core/styles'
import EditIcon from '@material-ui/icons/Edit';
import { useDropzone } from "react-dropzone";

const Picture = styled(Avatar)({
  width: '100%',
  height: '100%',
})

const ContentPicture = styled('div')({
  width: '80px',
  height: '80px',
  borderRadius: '50%',
  margin: 'auto',
  position: 'relative',
  marginBottom: '20px',
})

const IconStyled = styled('div')({
  background: '#fff',
  borderRadius: '50%',
  border: '1px solid #cdcdcd',
  width: '30px',
  height: '30px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute', 
  bottom: '-12px',
  right: '32%',
  cursor: 'pointer'
})

const DropZoneCOmponent = styled('div')({
  background: '#f9f7fc',
  cursor: 'pointer',
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  borderRadius: '50%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  border: '1px dashed #41B8F9',
  outline: 'none',
  '&:hover' : {
    background: '#e0d7ee',
    border: '1px solid #41B8F9',
  }
})

const AvataComponent = (props) => {
  const [isDropZoneActive, setIsDropZoneActive] = useState(false)
  
  const accept = "image/jpeg, image/png, image/jpg"
  const onDrop =  (acept, reject)  =>  { 
    props.setPhoto(URL.createObjectURL(acept[0]))
    setIsDropZoneActive(false)
    props.setNewPhoto(acept[0])
  }

  const  { getRootProps , getInputProps , isDragActive }  =  useDropzone ( { onDrop, accept, multiple: false } )

  return (
    <ContentPicture>
      {(!isDropZoneActive && props.photo) && (
        <Fragment>
          <Picture src={props.photo}/>
          <IconStyled>
            <EditIcon 
              onClick={() => setIsDropZoneActive(true)}
            />
          </IconStyled>
        </Fragment>
      )}
      {(isDropZoneActive || !props.photo) && (
        <DropZoneCOmponent { ... getRootProps ( ) } > 
         <input {...getInputProps ()}  /> 
         {isDragActive && (
           <p> Suelte el archivo aquí ... </p>
         )}
         {!isDragActive && (
           <p> Subir foto</p>
         )}
        </DropZoneCOmponent>
      )}
    </ContentPicture>
  )
}

export default AvataComponent