import React from 'react'
import { Modal, Box, ButtonContent, Button, Text } from './styled'


const ModalComponent = props => (
  <Modal open={props.open} onClose={props.type === 'confirmation' ? () => {} : props.onClose}>
    <Box>
      <Text>
        {props.message}
      </Text>
      <ButtonContent>
        {props.type === 'confirmation' && (
          <Button onClick={props.secondaryAction}>
            {props.secondaryActionText || 'Cancelar'}
          </Button>
        )}
        {props.type !== 'confirmation' && (
          <Button onClick={props.onClose}>
            {props.secondaryActionText || 'Cancelar'}
          </Button>
        )}
        <Button onClick={props.primaryAction}>
          {props.primaryActionText || 'Aceptar'}
        </Button>
      </ButtonContent>
    </Box>
  </Modal>
)

export default ModalComponent

