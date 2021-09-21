import  React, { useEffect, useState } from 'react'
import { styled } from '@material-ui/core/styles'
import { Button as ButtonBase, Box, Paper, Grid } from '@material-ui/core'
import { FilterTags } from '../FilterTags/filterTags';
import mapObjects from '../../helpers/mapObjects'
import deleteObjectKeys from '../../helpers/delete_object_key'

const Header = (props) => {
  const [isVisible, setVisible] = useState(true)
  const [headerHeight, setHeaderHeight] = useState(80)

  const PaperStyle = styled(Paper)({
    position: 'fixed',
    width: '100%',
    right: 0,
    top: isVisible ? `60px` : `-${headerHeight}px`,
    left: 0,
    zIndex: 99,
    transition: 'all 1s',
    '@media (max-width:960px)': {
      top: isVisible ? '50px' : `-${headerHeight}px`,
    }
  })

  


  useEffect(() => {
    var latestPagesOfset = window.pageYOffset
    setTimeout(() => {
      props.setHeight(document.getElementById('headerQuickSearch').clientHeight)
    }, 200)
    const handleScroll = event => {
      if (window.pageYOffset > latestPagesOfset && window.pageYOffset  > (document.getElementById('headerQuickSearch').clientHeight - 40) && isVisible) setVisible(false)
      if (window.pageYOffset < latestPagesOfset && !isVisible) setVisible(true)
      latestPagesOfset = window.pageYOffset
      var clientHeight = document.getElementById('headerQuickSearch').clientHeight;
      if (headerHeight !== clientHeight) {
        setHeaderHeight(clientHeight)
        props.setHeight(clientHeight)
        console.log('updated header height')
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isVisible, props.filters])

  var filters = deleteObjectKeys(props.filters, [
    'm2Build', 'm2Terrain',
    'street_number',
    'route',
    'sublocality_level_1',
    'locality',
    'administrative_area_level_1',
    'country',
    'postal_code',
    'lat',
    'lng',
    'currency'
  ])
  
  const undeletable = ['action', 'propertyType', 'minPrice',  'maxPrice', 'bankSale']
  filters = mapObjects(filters, (label, value, index) => ({ index,label,value, isDeletable: !undeletable.includes(label)}))
  
  // delete items with no value
  filters = filters.filter(item => !!item.value)
  filters = filters.filter(item => item.label !== 'landUse')

  
  const deleteTagFromForm = label => {
    delete props.filters[label]
    props.setFilters({
      ...props.filters
    })
  }

  return (
    <PaperStyle id='headerQuickSearch'>
      <Box pt={3} pb={3}>
        <Grid container justifyContent='center'>
          <Grid item xs={12} lg={11} container justifyContent='center' alignItems='center' spacing={1}>
            <Grid item xs={12} lg={8}>
              <FilterTags
                currency={props.filters.currency}
                tags={filters}
                delAndUpd={deleteTagFromForm}
              />
            </Grid>
            <Grid item xs={12} lg={4} container spacing={1}>
              <Grid item xs={6} >
                <Button
                  size='medium'
                  fullWidth
                  onClick={props.activeQuickSearch}
                  variant='outlined'
                  color='primary'>Búsqueda Rápida</Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  contained="#1E0E6F"
                  size='medium'
                  fullWidth
                  onClick={props.activeAdvanceFilter}
                  variant='contained'
                  color='primary'>Filtros Avanzados</Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </PaperStyle>
  )
}

const Button = styled(ButtonBase)({
  textTransform: "none",
  fontSize: 17,
  borderColor:'#41B8F9',
  '&:hover':{
    backgroundColor: props => props.contained
  },
  '@media (max-width:500px)': {
    fontSize: '14px',
  },
  '@media (max-width:400px)': {
    fontSize: '12px',
  }
})

export default Header