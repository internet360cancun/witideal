/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react'
import { Drawer, Box, Grid, Button } from '@material-ui/core'
import { AdvanceFilters } from '../AdvanceFilters/advanceFilters'
import { styled } from '@material-ui/core/styles'
import { useEffect } from 'react'
import { setAlert } from '../Alert/alert'
// 

const AdvanceFiltersComponent = (props) => {
  const [scopedFilters, setScopedFilters] = useState({ ...props.filters })
  
  const AplyFilters = _event => {
    

    // validate correct area
    if(!isNaN(parseInt(scopedFilters.minArea)) && !isNaN(parseInt(scopedFilters.maxArea)) && parseInt(scopedFilters.maxArea) <= parseInt(scopedFilters.minArea)){
      return setAlert(
        null, ' ', 'Las medidas no son válidas', 'warning'
      )
    } 
    props.handleClose()
    props.setFilters(scopedFilters)
  }
  
  const closeFilters = _event => {
    props.handleClose()
  }

  useEffect(() => {
    setScopedFilters({...props.filters})
  }, [props.open])

  return (
    <Drawer open={props.open} onClose={closeFilters} >
      <Container style={{ minHeight: '115vh' }}>
        <Box pr={2}pl={2} style={{minHeight: '100vh',}}>
          <AdvanceFilters
            withoutBorder={true}
            properData={scopedFilters}
            setProperData={setScopedFilters}
          />
        </Box>
        <ActionContainer pr={2}pl={2}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Button variant='outlined' color='primary' fullWidth onClick={closeFilters} style={{textTransform: 'none', borderRadius: '50px'}}>
                Cerrar filtros
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button variant='contained' color='primary' fullWidth onClick={AplyFilters} style={{textTransform: 'none', borderRadius: '50px'}}>
                Aplicar filtros
              </Button>
            </Grid>
          </Grid>
        </ActionContainer>
      </Container>
    </Drawer>
  )
}

const Container = styled(Box)({
  width: '100%',
  maxWidth: '510px',
  boxSizing: "border-box",
})

const ActionContainer = styled(Box)({
  zIndex: 10,
  backgroundColor: '#fff',
  boxShadow: '-5px 0 10px 0px #5f5f5f',
  padding: '15px',
  position: 'sticky',
  bottom: 0,
})

export default AdvanceFiltersComponent