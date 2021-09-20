import React from 'react'
import { ButtonGroup, Button} from '@material-ui/core'
import { styled } from '@material-ui/core/styles'
import generatePage from '../../helpers/generatePages'

const ButtonNumer = styled(Button)({
  paddingLeft: '20px',
  paddingRight: '20px',
})

const ButtonContainer = styled(ButtonGroup)({
  marginTop: '25px'
})



const PaginationItems = (props) => {
  const { currentPage, numItems, itemsForPage } = props
  const pages = generatePage(currentPage, numItems, itemsForPage)
  
  return (
    <ButtonContainer color="primary" aria-label="outlined primary button group">
      {props.currentPage > 1 && (
        <Button onClick={() => {props.handler(props.currentPage - 1)}}>Atras</Button>
      )}
      {
        pages.map(n => 
        <ButtonNumer
          onClick={() => props.handler(n)}
          key={n}>{n}
        </ButtonNumer>  
        )
      }
      <Button onClick={() => {props.handler(props.currentPage + 1)}}>Siguente</Button>
    </ButtonContainer>
  )
}

export default PaginationItems