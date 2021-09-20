function defineTypes (userType = 'promoter') {
  const actionTypes = {
    Rentar: 'rent', 
    Comprar: 'buy',
  }
  
  const PromoterActionTypes = {
    Rentar: 'rent', 
    Vender: 'buy',
  }

  const propertyType = {
    'Casa': 'singleHouse',
    'Casa en Condominio': 'condoHouse',
    'Departamento': 'apartment',
    'Local': 'local',
    'Oficina': 'office',
    'Terreno': 'terrain',
    //'Desarrollo': 'develop',
    //'Casa Uso de Suelo': 'landUseHouse', 
    'Bodega': 'warehouse',
    'Edificio': 'building',
  }

  return {
    actionType: userType === 'promoter'
      ? PromoterActionTypes
      : actionTypes,
    propertyType
  }
  
}

export default defineTypes