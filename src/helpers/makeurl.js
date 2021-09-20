import urlTranslator from './urlTranslator'
import stateNameTranslator from './stateNameTranslator';

const makeUrl = searchPropertyObject => {
  const keysForURL = ['propertyType', 'action', 'country', 'administrative_area_level_1', 'administrative_area_level_2_3', 'sublocality_level_1', 'route', 'street_number']
  const values = keysForURL.map(keyname => urlTranslator(searchPropertyObject[keyname]))
  
  //translate state name
  if (values[3]) {
    values[3] = stateNameTranslator(values[3])
  }

  return  values.map(data => data !== undefined ? data : 'null').join('/').split('/null')[0].replace(/ /g,"-")
}

export default makeUrl
