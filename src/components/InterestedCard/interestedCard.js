import React, { useState, Fragment } from 'react'
import { styled } from '@material-ui/core/styles'
import { propertyType_es, action_es } from '../../assets/Strings'
import { Box , Card, Avatar} from '@material-ui/core';
import Edificios from '../../assets/specificDataIcons/edificio.svg'
import formatPrice from '../../helpers/formatPrice'
import { useHistory } from 'react-router-dom'
import { Menu, MenuItem, CircularProgress } from '@material-ui/core'
import { MoreVert as MoreVertIcon } from '@material-ui/icons'
import  formatNumber from '../../helpers/formatNumber'
import urlTranslator from '../../helpers/urlTranslator'

function InterestedCard(props) {
  const history = useHistory()
  const [menu, setMenu] = useState(null)

  const handleClick = () => {
    history.push(`/propiedad/${urlTranslator(props.gender)}/${urlTranslator(props.action)}/${props.pId}`)
  }

  const onMenuClick = event => {
    event.stopPropagation()
    event.preventDefault()
    setMenu(event.currentTarget)
  }

  return (
    <ContainerCard>
      {!props.loading && (
        <>
          <MoreVert onClick={onMenuClick} />
          <Menu anchorEl={menu} open={!!menu} onClose={_event => setMenu(null)} onClick={_event => setMenu(null)}>
            <MenuItem onClick={event => props.onDeleteClick(props, event)}>Eliminar</MenuItem>
          </Menu>
          <PictureContainer onClick={handleClick}>
            <Picture src={props.principalPhotoPath}/>
          </PictureContainer>
          <Data onClick={handleClick}>
            <PropertyData>
              <Place>{props.administrative_area_level_1 || ''}, {props.administrative_area_level_2_3 || ''}</Place>
              <Row>
                <img src={Edificios} alt="edificio" /> {propertyType_es[props.gender]} para {action_es[props.action]}
              </Row>
              <Row>
                <Price>$ {formatPrice(props.price)} {props.currency}</Price>
              </Row>
            </PropertyData>
            <UserData>
              
              <UserContact>
                <RowFlexExtended>
                  <Avatar src={props.photo} /> 
                  <Title>{props.name}</Title>
                </RowFlexExtended>
                <Row>{props.mail}</Row>
                <Row> {(props.showMainPhone !== false) && (`tel: ${formatNumber(props.phone)}`)}</Row>
                {!!props.extraPhones && props.extraPhones.map((phone, index) => (
                  <Row key={index}>
                    tel: {formatNumber(phone)}
                  </Row>
                ))}
              </UserContact>
            </UserData>
          </Data>
        </>
      )}
      {props.loading && (
        <CircularProgress />
      )}
    </ContainerCard>
  );
}
const UserContact = styled('div')({
  marginLeft: '10px',
  textAlign: 'left'
})

const UserData = styled('div')({
  paddingTop: '10px',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
})

export default InterestedCard
const Price = styled('span')(({theme}) => ({
  fontSize: '1.2em',
  fontWeight: 'bold',
}))

const Row = styled('div')({
  '& img': {
    width: '18px'
  }
})

const RowFlexExtended = styled(Row)({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  '& img': {
    width: 'auto',
    marginRight: '10px!important',
    display: 'block',
  },
  '& .MuiAvatar-root': {
    marginRight: '10px',
  }
})

const Data = styled(Box)(({theme}) => ({
  width: '70%',
  color: theme.colors.blue_black,
  paddingLeft: '10px',
  boxSizing: 'border-box',
}))

const Title = styled('h2')(({theme}) => ({
  color: theme.colors.blue_black,
  margin: '0px',
  padding: '0px 0px',
  fontSize: '1em'
}))

const Place = styled(Title)({
  maxWidth: '100%',
  boxSizing: 'border-box'
})

const PropertyData = styled('div')({
  borderBottom: '1px dashed',
  textAlign: 'left',
  paddingBottom: '10px',
})

const ContainerCard = styled(Card)({
  height: '100%',
  boxSizing: 'border-box',
  padding: '10px',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'lefth',
  fontSize: '.9em',
  cursor: 'pointer',
  minHeight: '160px',
})

const PictureContainer = styled('div')({
  minWidth: '120px',
  minHeight: '140px',
  height: '100%',
  overflow: 'hidden',
  position: 'relative',
  borderRadius: '5px',
  
})

const Picture = styled('img')({
  position: "absolute",
  minWidth: "1000%",
  minHeight: "1000%",
  left: "50%",
  top: "50%",
  transform: "translateX(-50%) translateY(-50%) scale(0.1)",
  zIndex: "1",
})


const MoreVert = styled(MoreVertIcon)({
  color: "#1e0e6f",
  position: "absolute",
  right: "10px",
  top: "10px",
  cursor: 'pointer',
})