import React, { Fragment, useState, useRef } from 'react'
import { SortableContainer , SortableElement } from  'react-sortable-hoc' ;
import moveArray from '../../helpers/moveArray'
import { styled } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import GalleryModal from '../../layouts/galleryModal'
import Property from '../../assets/specificDataIcons/edificio.svg'


// import Modal from "@material-ui/core/Modal";
// import Backdrop from "@material-ui/core/Backdrop";
// import Fade from "@material-ui/core/Fade";


const SortableItem = SortableElement(props => {
  const refImage = useRef(null)

  return (
    <Box>
      <DeleteIconStyled onClick={() => props.handleDelete(props.item)} />
      <Picture 
        onClick={() => props.setPictureIndexModal(props.indexpicture)}
        src={props.item && typeof props.item === 'object' ? props.item.preview : props.item}
        ref={refImage}
        onError={error => refImage.current.src = Property}
      />
    </Box>
  )
})

const SortableList = SortableContainer(props => {
  return (
    <Container>
      {props.items.map((value, index) => (
        <SortableItem 
          key={index} 
          index={index}
          indexpicture={index}
          item={value} 
          disabled={props.disabled}
          handleDelete={props.handleDelete}
          setPictureIndexModal={props.setPictureIndexModal}
        />
      ))}
    </Container>
  );
});

//props.orderedPictures [url || File]
const ListImageDragable = (props) => {
  const [indexPictureModal, setPictureIndexModal] = useState(null)
  
  const onSortEnd = ({oldIndex, newIndex}) => {
    const new_order_items = moveArray(props.orderedPictures, oldIndex, newIndex)
    props.setOrderedPictures(new_order_items)
  }  
  
  const handleDelete = (item_to_delete) => {
    const new_pictures = props.orderedPictures.filter(item => {
      console.log('item:', item, 'item_to_delete:', item_to_delete)
      return item !== item_to_delete
    })
    props.setOrderedPictures(new_pictures)
  }
  
  return (
    <Fragment>
      {indexPictureModal !== false && indexPictureModal !== null && (
        <GalleryModal
          photos={[...props.orderedPictures.map(item => item && typeof item === 'object' ? item.preview : item )]}
          handleClose={() => setPictureIndexModal(false)}
          index={indexPictureModal}
        />
      )}
      <SortableList
        handleDelete={handleDelete}
        items={props.orderedPictures} 
        onSortEnd={onSortEnd} 
        axis='xy'
        transitionDuration={500}
        disabled={props.disabled}
        distance={1}
        setPictureIndexModal={setPictureIndexModal}
      />
      
    </Fragment>
  )
}

export default ListImageDragable

// const ContainerModal = styled('div')({
//   maxWidth: '70vw',
//   maxHeight: '85vh',
//   width: '800px',
//   overflow: 'hidden',
//   margin: 'auto',
//   ['@media (max-width:450px)']: {
//     width: '90vw',
//     maxWidth: '90vw',
//     maxHeight: '85vh',
//   },
//   '& img': {
//     maxWidth: '100%',
//     width: '100%'
//   }
// })
const Container = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  flexWrap: "wrap",
})

const Box = styled('div')({
  width: '150px',
  height: '150px',
  padding: '10px',
  margin: '10px',
  border: '1px dashed #41b8f9',
  cursor: 'move',
  borderRadius: '5px',
})

const Picture = styled('img')({
  width: '150px',
  height: '150px',
})

const DeleteIconStyled = styled(DeleteIcon)({
  position: 'absolute',
  zIndex: 10,
  cursor: 'pointer',
  // color: 'gray',
  color:'#3F19F9',
  '&:hover': {
    color: '#41b8f9'
  }
})








