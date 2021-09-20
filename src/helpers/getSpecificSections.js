import { specificDataSection } from '../assets/Strings'
import mapObjects from './mapObjects'

const getSpecificDataSection = () => {
  const array_of_spesificsDataSections = mapObjects(specificDataSection, (keyname, value, index) => {
    return value
  })
  return array_of_spesificsDataSections
}

export default getSpecificDataSection