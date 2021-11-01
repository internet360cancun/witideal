//General Data Model
export const minimumRent = 2000
export const minimumSell = 20000

export const currentVersion = "1.0.27"
export const contact = {
    number: ['55 1971 3247 (soporte)', '33 1527 6156 (ventas)'],
    email: 'contacto@witideal.com'
}

export const action_array = ['rent', 'buy'];
export const action_es_array = ['Rentar', 'Comprar'];
export const pAction_array = ['rent', 'sell'];
export const pAction_es_array = ['Rentar', 'Vender'];
export const habitational_es_array = ['Casa', 'Casa en Condominio', 'Departamento', 'Edificio', 'Terreno'];
export const comercial_es_array = ['Local', 'Oficina', 'Casa','Edificio', 'Bodega', 'Terreno',  ];
export const credit_es_array = ['Si', 'No'];
export const genderArray = [
    'Casa', //0
    'Casa en Condominio', //1
    'Departamento', //2
    'Local', //3
    'Oficina', //4
    'Terreno', //5
    'Desarrollo', //6
    'Casa Uso de Suelo', //7 
    'Edificio', //8
    'Bodega'//9
    ];

export const dollarValue = 19

/*
------------ Genero --------------------
    0-Casa
    1-CasaCondo
    2-Depto
    3-Local
    4-Oficina
    5-Terreno
    6-Tipos(Desarrollo)
    7-CasaUsoSuelo
    8-Edificio
    9-Bodega
*/



export const propertyType = {
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
};

export const propertyType_es = {
    singleHouse: 'Casa',
    condoHouse: 'Casa en Condominio',
    apartment: 'Departamento',
    local: 'Local',
    office: 'Oficina',
    terrain: 'Terreno',
    develop: 'Desarrollo',
    //landUseHouse : 'Casa Uso de Suelo', 
    warehouse: 'Bodega',
    building: 'Edificio',
}


export const action = {
    Rentar: 'rent',
    Vender: 'buy',
    Comprar: 'buy',
    Traspasar: 'transfer',
    Desarrollo: 'develop',
}

export const action_es = {
    rent: 'Rentar',
    buy: 'Comprar',
    transfer: 'Traspasar',
    develop: 'Desarrollo'
}
export const pAction_es = {
    rent: 'Rentar',
    buy: 'Vender',
    transfer: 'Traspasar',
    develop: 'Desarrollo'
}

export const credit = {
    'Si': 'yes',
    'No': 'no'
}

export const credit_es = {
    yes: 'Si',
    no: 'No'
}

export const tags ={
    action : 'Acción',
    propertyType : 'Tipo de Propiedad',
    minPrice : 'Precio Min.',
    maxPrice : 'Precio Max.',
    bankSale : 'Remate Bancario',
    landUse : 'Uso de Suelo',
}


// Specific Data Model
export const singleHouseInteriorBool = ['kitchen', 'serviceRoom', 'tvRoom', 'study', 'familyRoom', 'laundry', 'airConditioner']
export const singleHouseInteriorNum = ['bathroom', 'halfbath', 'bedroom', 'parking']
export const singleHouseExteriorBool = ['balcony', 'cellar', 'garden', 'roofGarden', 'terrace', 'closedStreet']
export const singleHouseSecurityBool = ['wireFence', 'electricFence', 'cctv', 'alarm']
export const singleHouseAmenitiesBool = ['pool', 'gym']

export const developInteriorBool = ['kitchen', 'serviceRoom', 'tvRoom', 'study', 'familyRoom', 'laundry', 'airConditioner']
export const developInteriorNum = ['bathroom', 'halfbath', 'bedroom', 'parking']
export const developExteriorBool = ['cellar', 'balcony', 'garden', 'roofGarden', 'terrace', 'closedStreet', 'elevator']
export const developSecurityBool = ['wireFence', 'electricFence', 'cctv', 'janitor', 'alarm', 'security247']
export const developAmenitiesBool = ['pool', 'sportFiled', 'swimmingLane', 'bussinessCentre', 'playGround', 'Gym']

export const officeInteriorBool = ['kitchen', 'serviceRoom', 'airConditioner']
export const officeInteriorNum = ['bathroom']
export const officeExteriorBool = ['balcony', 'cellar', 'elevator', 'insideCorp', 'closedStreet']
export const officeSecurityBool = ['wireFence', 'electricFence', 'cctv', 'janitor', 'alarm', 'security247']
export const officeAmenitiesBool = []

export const condoHouseInteriorBool = ['kitchen', 'serviceRoom', 'tvRoom', 'study', 'familyRoom', 'laundry', 'airConditioner']
export const condoHouseInteriorNum = ['bathroom', 'halfbath', 'bedroom', 'parking']
export const condoHouseExteriorBool = ['balcony', 'cellar', 'garden', 'roofGarden', 'terrace', 'closedStreet']
export const condoHouseSecurityBool = ['wireFence', 'electricFence', 'cctv', 'janitor', 'alarm', 'security247']
export const condoHouseAmenitiesBool = ['pool', 'gym', 'sportsField', 'swimmingLane', 'bussinessCentre', 'playGround']

export const buildingInteriorBool = ['airConditioner']
export const buildingInteriorNum = ['parking']
export const buildingExteriorBool = ['closedStreet', 'elevator']
export const buildingSecurityBool = ['wireFence', 'electricFence', 'cctv', 'alarm', 'security247']
export const buildingAmenitiesBool = []

export const terrainInteriorBool = []
export const terrainInteriorNum = ['m2']
export const terrainExteriorBool = ['closedStreet']
export const terrainSecurityBool = ['wireFence', 'electricFence', 'cctv', 'janitor', 'alarm', 'security247']
export const terrainAmenitiesBool = []

export const apartmentInteriorBool = ['kitchen', 'serviceRoom', 'tvRoom', 'study', 'familyRoom', 'laundry', 'airConditioner']
export const apartmentInteriorNum = ['bathroom', 'halfbath', 'bedroom', 'parking']
export const apartmentExteriorBool = ['balcony', 'cellar', 'garden', 'roofGarden', 'terrace', 'closedStreet', 'elevator']
export const apartmentSecurityBool = ['wireFence', 'electricFence', 'cctv', 'janitor', 'alarm', 'security247']
export const apartmentAmenitiesBool = ['pool', 'gym', 'sportsField', 'swimmingLane', 'bussinessCentre', 'playGround']

export const localInteriorBool = ['kitchen', 'airConditioner']
export const localInteriorNum = ['bathroom', 'parking']
export const localExteriorBool = ['cellar', 'closedStreet', 'insideMall', 'insideCorp']
export const localSecurityBool = ['wireFence', 'electricFence', 'cctv', 'janitor', 'alarm', 'security247']
export const localAmenitiesBool = []

export const warehouseInteriorBool = ['trailerPlat', 'airConditioner']
export const warehouseInteriorNum = ['bathroom', 'parking']
export const warehouseExteriorBool = ['cellar', 'closedStreet']
export const warehouseSecurityBool = ['wireFence', 'electricFence', 'cctv', 'janitor', 'alarm', 'security247']
export const warehouseAmenitiesBool = []




//Español

export const singleHouseInteriorBool_es = ['Cocina', 'Cuarto de servicio', 'Cuarto de TV', 'Estudio', 'Family room', 'Cuarto de lavado', 'Aire acondicionado']
export const singleHouseInteriorNum_es = ['Baños', 'Medios baños', 'Recamaras', 'Estacionamiento']
export const singleHouseExteriorBool_es = ['Balcón', 'Bodega', 'Jardín', 'Roof garden', 'Terraza', 'Calle cerrada']
export const singleHouseSecurityBool_es = ['Cerca de alambre', 'Cerca electrica', 'Circuito cerrado de TV', 'Sistema de alarma']
export const singleHouseAmenitiesBool_es = ['Alberca', 'Gym']

export const developInteriorBool_es = ['Cocina', 'Cuarto de servicio', 'Cuarto de TV', 'Estudio', 'Family room', 'Cuarto de lavado', 'Aire acondicionado']
export const developInteriorNum_es = ['Baños', 'Medios baños', 'Recamaras', 'Estacionamiento']
export const developExteriorBool_es = ['Bodega', 'Balcón', 'Jardín', 'Roof garden', 'Terraza', 'Calle cerrada', 'Elevador']
export const developSecurityBool_es = ['Cerca de alambre', 'Cerca electrica', 'Circuito cerrado de TV', 'Concerje', 'Sistema de alarma', 'Seguridad 24/7']
export const developAmenitiesBool_es = ['Alberca', 'Canchas deportivas', 'Carril de nado', 'Centro de negocios', 'Juegos infantiles', 'Gym']

export const officeInteriorBool_es = ['Cocina', 'Cuarto de servicio', 'Aire acondicionado']
export const officeInteriorNum_es = ['Baños']
export const officeExteriorBool_es = ['Balcón', 'Bodega', 'Elevador', 'En edificio corpotativo', 'Calle cerrada']
export const officeSecurityBool_es = ['Cerca de alambre', 'Cerca electrica', 'Circuito cerrado de TV', 'Concerje', 'Sistema de alarma', 'Seguridad 24/7']
export const officeAmenitiesBool_es = []

export const condoHouseInteriorBool_es = ['Cocina', 'Cuarto de servicio', 'Cuarto de TV', 'Estudio', 'Family room', 'Cuarto de lavado', 'Aire acondicionado']
export const condoHouseInteriorNum_es = ['Baños', 'Medios baños', 'Recamaras', 'Estacionamiento']
export const condoHouseExteriorBool_es = ['Balcón', 'Bodega', 'Jardín', 'Roof garden', 'Terraza', 'Calle cerrada']
export const condoHouseSecurityBool_es = ['Cerca de alambre', 'Cerca electrica', 'Circuito cerrado de TV', 'Concerje', 'Sistema de alarma', 'Seguridad 24/7']
export const condoHouseAmenitiesBool_es = ['Alberca', 'Gym', 'Canchas deportivas', 'Carril de nado', 'Centro de negocios', 'Juegos infantiles']

export const buildingInteriorBool_es = ['Aire acondicionado']
export const buildingInteriorNum_es = ['Estacionamiento']
export const buildingExteriorBool_es = ['Calle cerrada', 'Elevador']
export const buildingSecurityBool_es = ['Cerca de alambre', 'Cerca electrica', 'Circuito cerrado de TV', 'Sistema de alarma', 'Seguridad 24/7']
export const buildingAmenitiesBool_es = []

export const terrainInteriorBool_es = []
export const terrainInteriorNum_es = ['Metros cuadrados']
export const terrainExteriorBool_es = ['Calle cerrada']
export const terrainSecurityBool_es = ['Cerca de alambre', 'Cerca electrica', 'Circuito cerrado de TV', 'Concerje', 'Sistema de alarma', 'Seguridad 24/7']
export const terrainAmenitiesBool_es = []

export const apartmentInteriorBool_es = ['Cocina', 'Cuarto de servicio', 'Cuarto de TV', 'Estudio', 'Family room', 'Cuarto de lavado', 'Aire acondicionado']
export const apartmentInteriorNum_es = ['Baños', 'Medios baños', 'Recamaras', 'Estacionamiento']
export const apartmentExteriorBool_es = ['Balcón', 'Bodega', 'Jardín', 'Roof garden', 'Terraza', 'Calle cerrada', 'Elevador']
export const apartmentSecurityBool_es = ['Cerca de alambre', 'Cerca electrica', 'Circuito cerrado de TV', 'Concerje', 'Sistema de alarma', 'Seguridad 24/7']
export const apartmentAmenitiesBool_es = ['Alberca', 'Gym', 'Canchas deportivas', 'Carril de nado', 'Centro de negocios', 'Juegos infantiles']

export const localInteriorBool_es = ['Cocina', 'Aire acondicionado']
export const localInteriorNum_es = ['Baños', 'Estacionamiento']
export const localExteriorBool_es = ['Bodega', 'Calle cerrada', 'En plaza comercial', 'En edificio corpotativo']
export const localSecurityBool_es = ['Cerca de alambre', 'Cerca electrica', 'Circuito cerrado de TV', 'Concerje', 'Sistema de alarma', 'Seguridad 24/7']
export const localAmenitiesBool_es = []

export const warehouseInteriorBool_es = ['Plataforma para traíler', 'Aire acondicionado']
export const warehouseInteriorNum_es = ['Baños', 'Estacionamiento']
export const warehouseExteriorBool_es = ['Bodega', 'Calle cerrada']
export const warehouseSecurityBool_es = ['Cerca de alambre', 'Cerca electrica', 'Circuito cerrado de TV', 'Concerje', 'Sistema de alarma', 'Seguridad 24/7']
export const warehouseAmenitiesBool_es = []


/*

Genero --------------------

0-CasaSola
1-CasaCondo
2-Depto
3-Local
4-Oficina
5-Terreno
6-Tipos(Desarrollo)
7-CasaUsoSuelo
8-Edificio
9-Bodega
*/

/*
    Types ----------------
    
    numbers
    text

}

export con
    radio
    checkbox
    switch
    date

*/

export const specificDataSection = {
    //fisicas
    "Metros Cuadrados de Terreno": 'm2Terrain',
    "Metros Cuadrados Construidos": 'm2Build',
    "Niveles Construidos": 'floors',
    "Total de Unidades": 'totalUnits',
    "Unidades en Venta": 'unitsForSale',
    "Niveles del Edificio": 'totalBuildingFloors',
    "Nivel en el que se encuentra": 'floorNumber',
    "Metros de Frente": 'mFront',
    "Metros de Fondo": 'mDepth',
    "Metros de Altura": 'mHeight',
    "Metros Cuadrados Bodega": 'm2Storage',
    "Metros Cuadrados Oficina": 'm2Office',
    "Ubicación": 'ubication',
    "Forma del Terreno": 'terrainShape',
    "Estado de Conservación del Inmueble": 'preservationState',
    //espacios
    "Recámaras": 'room',
    "Baños Completos": 'bath',
    "Medios Baños": 'halfBath',
    "Estacionamientos": 'parkingSlots',
    "Número de Departamentos / Oficinas": 'numDepBuilding',
    "Cocina": 'kitchen',
    "Cuarto de Servicio": 'serviceRoom',
    "Área de Lavado": 'laundry',
    "Bodega": 'cellar',
    "Balcón": 'balcony',
    "Terraza": 'terrace',
    "Roof Garden": 'roofGarden',
    "Jardín": 'garden',
    "Family Room": 'familyRoom',
    "Estudio": 'study',
    "Cuarto de TV": 'tvRoom',
    "Elevautos": 'carElevator',
    "Equipamiento": 'equipment',
    "Oficinas Privadas": 'privateOffice',
    //seguridad
    "Alambrado": 'wireFence',
    "Cerca Eléctrica": 'electricFence',
    "Calle Cerrada": 'closedStreet',
    "CCTV": 'cctv',
    "Alarmas": 'alarm',
    "Concerjería": 'janitor',
    "Vigilancia 24/7": 'security247',
    "Alarma de Incendio": 'fireAlarm',
    //amenidades
    "Alberca": 'pool',
    "Canchas": 'sportsField',
    "Carril de Nado": 'swimmingLane',
    "Centro de Negocios": 'bussinessCentre',
    "Juegos Infantiles": 'playground',
    "Salón de Fiestas": 'partyRoom',
    "Gym": 'gym',
    "Extras": 'extras',
    //especiales
    'pet Friendly': 'petFriendly',
    "Costo del Mantenimiento": 'mantainance',
    "Mantenimiento Incluido (sólo renta)": 'isMantainceIncluded',
    "Aire Acondicionado": 'airConditioner',
    "Tipo de Gas": 'gasType',
    "Elevador": 'elevator',
    "En Centro Comercial": 'insideMall',
    "En Centro Corporativo": 'insideCorp',
    "A pie de calle": 'onstreet',
    "Agua": 'water',
    "Luz": 'electricity',
    "Cisterna": 'cistern',
    "Andén para Trailer": 'trailerPlat',
    "Uso de Suelo": 'landuse',
    //entorno
    "Centros Comerciales": 'malls',
    "Tiendas de Autoservicio": 'shops',
    "Bancos": 'banks',
    "Escuelas": 'schools',
    "Hospitales": 'hospitals',
    "Avenidas Principales": 'mainavs',
    "Estaciones de Metro": 'subway',
    "Estaciones de Metrobus": 'metrobus',
    //tiempo
    "Antigüedad (años)": 'antiquity'
}

// import {m2Storage_icon} from '../assets/specificDataIcons/m2Storage.svg'
// import {bathroom_icon} from '../assets/specificDataIcons/bathroom.svg'
// import {deliveryDate_icon} from '../assets/specificDataIcons/deliveryDate.svg'
// import {logIn_icon} from '../assets/specificDataIcons/logIn.svg'
// import {m2build_icon} from '../assets/specificDataIcons/m2build.svg'
// import {parking_icon} from '../assets/specificDataIcons/parking.svg'
// import {halfBath_icon} from '../assets/specificDataIcons/halfBath.svg'
// import {m2Terrain_icon} from '../assets/specificDataIcons/m2Terrain.svg'

/*Genero --------------------

    'Casa', //0 *
    'Casa en Condominio', //1 *
    'Departamento', //2 *
    'Local', //3 *
    'Oficina', //4 *
    'Terreno', //5 *
    'Desarrollo', //6
    'Casa Uso de Suelo', //7 
    'Edificio', //8 *
    'Bodega'//9 *
*/







export const fisicas = {
    'm2Terrain': { "genders": [0, 1, 5, 7, 8, 9], "tipo": "numbers", "name": "M2 Terreno", "icons": [5]},
    'm2Build': { "genders": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], "tipo": "numbers", "name": "M2 Construidos","icons":[0, 1, 2, 3, 8, 9] },
    'floors': { "genders": [0, 1,3, 4, 7, 9], "tipo": "numbers", "name": "Niveles Construidos", "icons":[8] },
    'totalUnits': { "genders": [1, 2, 6], "tipo": "numbers", "name": "Total de Unidades del Conjunto", "icons":[8] },
    'unitsForSale': { "genders": [6], "tipo": "numbers", "name": "Unidades en Venta" },
    'totalBuildingFloors': { "genders": [2,8], "tipo": "numbers", "name": "Niveles del Edificio" },
    'floorNumber': { "genders": [2], "tipo": "numbers", "name": "Nivel en el que se encuentra" },
    'locationInBuilding' : { "genders": [2], "tipo": "radio", "name": "Ubicación en Edificio", "options": ["Interior", "Exterior"] },
    'mFront': { "genders": [5], "tipo": "numbers", "name": "Mts de Frente", "icons":[5]},
    'mDepth': { "genders": [5], "tipo": "numbers", "name": "Mts de Fondo", "icons":[5]},
    'mHeight': { "genders": [9], "tipo": "numbers", "name": "Mts de Altura", "icons":[9]},
    'm2Storage': { "genders": [9], "tipo": "numbers", "name": "M2 Bodega", "icons":[9]},
    'm2Office': { "genders": [9], "tipo": "numbers", "name": "M2 Oficina", "icons":[4, 9]},
    'ubication': { "genders": [2], "tipo": "dropdown", "name": "Ubicación", "options": [""] },
    // 'terrainShape': { "genders": [5], "tipo": "text", "name": "Forma del Terreno" },
    'preservationState': { "genders": [0, 1, 2, 3, 4, 7, 8, 9], "tipo": "radio", "name": "Estado de Conservación", "options": ["Excelente", "Bueno", "Regular", "Remodelar"] }
}


export const espacios = {
    'room': { "genders": [0, 1, 2, 6], "tipo": "numbers", "name": "Recámaras", "icons":[0, 1, 2] },
    'bath': { "genders": [0, 1, 2, 3,  6, 7, 8, 9], "tipo": "numbers", "name": "Baños Completos", "icons":[0, 1, 2] },
    'halfBath': { "genders": [0, 1, 2, 3, 4, 6, 7, 8, 9], "tipo": "numbers", "name": "Medios Baños", "icons":[3, 4]},
    'parkingSlots': { "genders": [0, 1, 2, 3, 4, 6, 7, 8, 9], "tipo": "numbers", "name": "Estacionamientos", "icons":[0, 1, 2, 3, 4, 8]},
    'numDepBuilding': { "genders": [8], "tipo": "numbers", "name": "Número de Departamentos / Oficinas" },
    'kitchen': { "genders": [0, 1, 2, 3, 4, 6, 7], "tipo": "radio", "name": "Cocina", "options": ["Abierta", "Cerrada"] },
    'serviceRoom': { "genders": [0, 1, 2, 6], "tipo": "checkbox", "name": "Cuarto de Servicio" },
    'laundry': { "genders": [0, 1, 2, 6], "tipo": "checkbox", "name": "Área de Lavado" },
    'cellar': { "genders": [0, 1, 2, 3, 4, 6, 7], "tipo": "checkbox", "name": "Bodega", "defaultValue": "false" },
    'balcony': { "genders": [0, 1, 2, 6], "tipo": "checkbox", "name": "Balcón" },
    'terrace': { "genders": [0, 1, 2, 6], "tipo": "checkbox", "name": "Terraza" },
    'roofGarden': { "genders": [0, 1, 2, 6], "tipo": "checkbox", "name": "Roof Garden" },
    'garden': { "genders": [0, 1], "tipo": "checkbox", "name": "Jardín" },
    'familyRoom': { "genders": [0, 1, 2, 6], "tipo": "checkbox", "name": "Family Room" },
    'study': { "genders": [0, 1, 2, 6], "tipo": "checkbox", "name": "Estudio" },
    'tvRoom': { "genders": [0, 1, 2, 6], "tipo": "checkbox", "name": "Cuarto de TV" },
    'carElevator': { "genders": [2, 6], "tipo": "checkbox", "name": "Elevautos" },
    'equipment': { "genders": [3], "tipo": "checkbox", "name": "Equipamiento" },
    'privateOffice': { "genders": [4, 6, 7], "tipo": "numbers", "name": "Oficinas Privadas", "icons":[4] }
}

export const seguridad = {
    'wireFence': { "genders": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], "tipo": "checkbox", "name": "Alambrado" },
    'electricFence': { "genders": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], "tipo": "checkbox", "name": "Cerca Eléctrica" },
    'closedStreet': { "genders": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], "tipo": "checkbox", "name": "Calle Cerrada" },
    'cctv': { "genders": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], "tipo": "checkbox", "name": "CCTV" },
    'alarm': { "genders": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], "tipo": "checkbox", "name": "Alarmas" },
    'janitor': { "genders": [1, 2, 6], "tipo": "checkbox", "name": "Concerjería" },
    'security247': { "genders": [1, 2, 3, 4, 5, 6, 8, 9], "tipo": "checkbox", "name": "Vigilancia 24/7" },
    'fireAlarm': { "genders": [8, 9], "tipo": "checkbox", "name": "Alarma de Incendios" }
}

export const amenidades = {
    'pool': { "genders": [1, 2, 6], "tipo": "checkbox", "name": "Alberca" },
    'sportsField': { "genders": [1, 2, 6], "tipo": "checkbox", "name": "Canchas" },
    'swimmingLane': { "genders": [1, 2, 6], "tipo": "checkbox", "name": "Carril de Nado" },
    'bussinessCentre': { "genders": [1, 2, 6], "tipo": "checkbox", "name": "Centro de Negocios" },
    'playground': { "genders": [1, 2, 6], "tipo": "checkbox", "name": "Juegos Infantiles" },
    'partyRoom': { "genders": [1, 2, 6], "tipo": "checkbox", "name": "Salón de Fiestas" },
    'gym': { "genders": [1, 2, 6], "tipo": "checkbox", "name": "Gym" },
    'extras': { "genders": [1, 2, 6], "tipo": "text", "name": "Otros" }
    
}

export const especiales = {
    'elevator': { "genders": [2, 6, 8], "tipo": "checkbox", "name": "Elevador" },
    'airConditioner': { "genders": [0, 1, 2, 3, 4, 6, 7, 8, 9], "tipo": "checkbox", "name": "Aire Acondicionado" },
    'cistern': { "genders": [8, 9], "tipo": "checkbox", "name": "Cisterna" },
    'water': { "genders": [5, 9], "tipo": "checkbox", "name": "Agua" },
    'electricity': { "genders": [5, 9], "tipo": "checkbox", "name": "Luz" },
    'trailerPlat': { "genders": [9], "tipo": "checkbox", "name": "Andén para Trailer" },
    'isMantainceIncluded': { "genders": [1, 2, 3, 4, 9], "tipo": "checkbox", "name": "Mantenimiento Incluido (sólo renta)" },//renta
    'mantainance': { "genders": [1, 2, 3, 4, 6, 9], "tipo": "text", "name": "Costo del Mantenimiento" },
    'gasType': { "genders": [0, 1, 2, 3, 4, 6, 7, 8, 9], "tipo": "radio", "name": "Tipo de Gas", "options": ["LP", "Natural","No Instalado"] },
    'landUseCode' : { "genders": [5], "tipo": "text", "name": "Uso de Suelo", "icons":[5]},
    petFriendly: { "genders": [0,1,2,3,4,8], "tipo": "checkbox", "name": "pet Friendly" },
    // 'landuse': { "genders": [5, 9], "tipo": "checkbox", "name": "Uso de Suelo" }
    //GirosPermitidos={],
}

export const entorno = {
    'insideIndust': { "genders": [9], "tipo": "checkbox", "name": "En Parque Industrial" },
    'insideCorp': { "genders": [4], "tipo": "checkbox", "name": "En Centro Corporativo" },
    'insideMall': { "genders": [3,4], "tipo": "checkbox", "name": "En Centro Comercial" },
    'onstreet': { "genders": [3], "tipo": "checkbox", "name": "A pie de calle" },
    'malls': { "genders": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], "tipo": "text", "name": "Centros Comerciales", },
    'shops': { "genders": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], "tipo": "text", "name": "Tiendas de Autoservicio" },
    'banks': { "genders": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], "tipo": "text", "name": "Bancos" },
    'schools': { "genders": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], "tipo": "text", "name": "Escuelas" },
    'hospitals': { "genders": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], "tipo": "text", "name": "Hospitales" },
    'mainavs': { "genders": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], "tipo": "text", "name": "Avs. Principales" },
    'subway': { "genders": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], "tipo": "text", "name": "Estaciones de Metro" },
    'metrobus': { "genders": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], "tipo": "text", "name": "Estaciones de Metrobús" }
}

export const tiempo = {
    'deliverydate': { "genders": [0, 1, 2, 3, 4, 6, 8,9], "tipo": "text", "name": "Fecha de Entrega",},
    'antiquity': { "genders": [0, 1, 2, 3, 4, 6, 8, 9], "tipo": "radio", "name": "Antigüedad (años)", "options": ["0-5", "5-10", "10-25", "25+"] },
}

    /*

Genero --------------------

0-Casa
1-CasaCondo
2-Depto
3-Local
4-Oficina
5-Terreno
6-Tipos(Desarrollo)
7-CasaUsoSuelo
8-Edificio
9-Bodega
*/

export const imgCategories = {
    'PrincipalPhoto': { 'genders': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 'section': 'principalPhotoPath', 'title': 'Foto Principal', 'maxPhotos': 1 },
    'Extras': { 'genders': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 'section': 'extras', 'title': 'Fotos', 'maxPhotos': 30 },
    // 'Frontage': { 'genders': [0, 1, 2, 3, 4, 7, 8, 9], 'section': 'frontage', 'title': 'Fachada', 'maxPhotos': 1 },
    // 'Area': { 'genders': [5, 8], 'section': 'area', 'title': 'Espacios', 'maxPhotos': 5 },
    // 'Zenith': { 'genders': [5, 6, 8], 'section': 'zenith', 'title': 'Imagen Aerea', 'maxPhotos': 1 },
    // 'Street': { 'genders': [5, 8, 9], 'section': 'street', 'title': 'Calle', 'maxPhotos': 1 },
    // 'Lounge': { 'genders': [0, 1, 2, 7], 'section': 'lounge', 'title': 'Sala', 'maxPhotos': 2 },
    // 'DiningRoom': { 'genders': [0, 1, 2, 6, 7], 'section': 'diningRoom', 'title': 'Comedor', 'maxPhotos': 2 },
    // 'Kitchen': { 'genders': [0, 1, 2, 7], 'section': 'kitchen', 'title': 'Cocina', 'maxPhotos': 2 },
    // 'Rooms': { 'genders': [0, 1, 2, 7], 'section': 'rooms', 'title': 'Recámaras', 'maxPhotos': 3 },
    // 'Interiors': { 'genders': [3, 4, 9], 'section': 'interiors', 'title': 'Interiores', 'maxPhotos': 3 }, 
    // 'Bathroom': { 'genders': [0, 1, 2, 3, 4, 7, 8,9], 'section': 'bathroom', 'title': 'Baños', 'maxPhotos': 2 },
    // 'Cellar': { 'genders': [0, 1, 2, 3, 4, 7], 'section': 'cellar', 'title': 'Bodega', 'maxPhotos': 1 },
    // 'Exteriors': { 'genders': [0, 1, 2, 7,8], 'section': 'exteriors', 'title': 'Exteriores', 'maxPhotos': 3 },
    // 'Parking': { 'genders': [0, 1, 2, 3, 4, 6, 7, 8, 9], 'section': 'parking', 'title': 'Estacionamiento', 'maxPhotos': 1 },
    // 'Amenities': { 'genders': [1, 2, 6,8], 'section': 'amenities', 'title': 'Amenidades', 'maxPhotos': 5 },
    // 'Renders': { 'genders': [6], 'section': 'renders', 'title': 'Renders', 'maxPhotos': 20 },
    // 'Mall': { 'genders': [3, 4], 'section': 'mall', 'title': 'Centro Comercial', 'maxPhotos': 2 },
    // 'Corp': { 'genders': [3, 4], 'section': 'corp', 'title': 'Centro Corporativo', 'maxPhotos': 2 },
    // 'Extras': { 'genders': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 'section': 'extras', 'title': 'Extras', 'maxPhotos': 3 },
}



/*
FILTERS
Genero --------------------

0-CasaSola
1-CasaCondo
2-Depto
3-Local
4-Oficina
5-Terreno
6-Tipos(Desarrollo)
8-Edificio
9-Bodega
*/

/*
    Types ----------------
    
    numbers
    text
    radio
    checkbox
    switch
    date

*/

export const fFisicas = {
    // 'm2Terrain': { "genders": [5], "tipo": "numbers", "name": "Metros Cuadrados de Terreno" },
    // 'm2Build': { "genders": [0, 1, 2, 3, 4, 6, 8, 9], "tipo": "numbers", "name": "Metros Cuadrados Construidos" },
    'floors': { "genders": [0, 1, 4, 8, 9], "tipo": "numbers", "name": "Niveles Construidos" },
    // 'totalUnits': { "genders": [ 6], "tipo": "numbers", "name": "Total de Unidades del Conjunto" },
    'unitsForSale': { "genders": [6], "tipo": "numbers", "name": "Unidades en Venta" },
    //'totalBuildingFloors': { "genders": [], "tipo": "numbers", "name": "Niveles del Edificio" },
    'floorNumber': { "genders": [2], "tipo": "numbers", "name": "Nivel en el que se encuentra" },
    'ubication': { "genders": [2], "tipo": "dropdown", "name": "Ubicación", "options": [""] },
    // 'terrainShape': { "genders": [5], "tipo": "text", "name": "Forma del Terreno" },
    // 'mFront': { "genders": [5], "tipo": "numbers", "name": "Metros de Frente" },
    // 'mDepth': { "genders": [5], "tipo": "numbers", "name": "Metros de Fondo" },
    'mHeight': { "genders": [9], "tipo": "numbers", "name": "Metros de Altura" },
    'm2Storage': { "genders": [9], "tipo": "numbers", "name": "Metros Cuadrados Bodega" },
    'm2Office': { "genders": [9], "tipo": "numbers", "name": "Metros Cuadrados Oficina" },
    'preservationState': { "genders": [0, 1, 2, 3, 4, 8, 9], "tipo": "radio", "name": "Estado de Conservación del Inmueble", "options": ["Excelente", "Bueno", "Regular", "Remodelar"] },
}


export const fEspacios = {
    'room': { "genders": [0, 1, 2, 6], "tipo": "numbers", "name": "Recámaras" },
    'bath': { "genders": [0, 1, 2, 6, 8], "tipo": "numbers", "name": "Baños Completos" },
    'halfBath': { "genders": [3, 4, 6], "tipo": "numbers", "name": "Medios Baños" },
    'parkingSlots': { "genders": [0, 1, 2, 3, 4, 6, 8, 9], "tipo": "numbers", "name": "Estacionamientos" },
    'numDepBuilding': { "genders": [8], "tipo": "numbers", "name": "Número de Departamentos / Oficinas" },
    //'kitchen': { "genders": [0, 1, 2, 3, 4, 6, 7], "tipo": "radio", "name": "Cocina", "options":["Abierta","Cerrada"] },
    'serviceRoom': { "genders": [0, 1, 2, 6], "tipo": "checkbox", "name": "Cuarto de Servicio" },
    'laundry': { "genders": [2, 6], "tipo": "checkbox", "name": "Área de Lavado" },
    'cellar': { "genders": [0, 1, 2, 6], "tipo": "checkbox", "name": "Bodega" },
    'balcony': { "genders": [0, 1, 2, 6], "tipo": "checkbox", "name": "Balcón" },
    'terrace': { "genders": [0, 1, 2, 6], "tipo": "checkbox", "name": "Terraza" },
    'roofGarden': { "genders": [0, 1, 2, 6], "tipo": "checkbox", "name": "Roof Garden" },
    'garden': { "genders": [0, 1], "tipo": "checkbox", "name": "Jardín" },
    'familyRoom': { "genders": [0, 1, 2, 6], "tipo": "checkbox", "name": "Family Room" },
    'study': { "genders": [0, 1, 2, 6], "tipo": "checkbox", "name": "Estudio" },
    'tvRoom': { "genders": [0, 1, 2, 6], "tipo": "checkbox", "name": "Cuarto de TV" },
    //'carElevator': { "genders": [2, 6], "tipo": "checkbox", "name": "Elevautos" },
    // 'equipment': { "genders": [3], "tipo": "checkbox", "name": "Equipamiento" },
    'privateOffice': { "genders": [4], "tipo": "checkbox", "name": "Oficinas Privadas" }
}

export const fSeguridad = {
    'wireFence': { "genders": [0, 1, 2, 3, 4, 5, 6, 8, 9], "tipo": "checkbox", "name": "Alambrado" },
    'electricFence': { "genders": [0, 1, 2, 3, 4, 5, 6, 8, 9], "tipo": "checkbox", "name": "Cerca Eléctrica" },
    'closedStreet': { "genders": [0, 1, 2, 3, 4, 5, 6, 8, 9], "tipo": "checkbox", "name": "Calle Cerrada" },
    'cctv': { "genders": [0, 1, 2, 3, 4, 5, 6, 8, 9], "tipo": "checkbox", "name": "CCTV" },
    'alarm': { "genders": [0, 1, 2, 3, 4, 5, 6, 8, 9], "tipo": "checkbox", "name": "Alarmas" },
    'janitor': { "genders": [1, 2, 6], "tipo": "checkbox", "name": "Concerjería" },
    'security247': { "genders": [1, 2, 5, 8, 9], "tipo": "checkbox", "name": "Vigilancia 24/7" }, // [1, 2, 3, 4, 5, 6, 8, 9]
    'fireAlarm': { "genders": [8, 9], "tipo": "checkbox", "name": "Alarma de Incendio" }
}

export const fAmenidades = {
    'pool': { "genders": [1, 2, 6], "tipo": "checkbox", "name": "Alberca" },
    'sportsField': { "genders": [1, 2, 6], "tipo": "checkbox", "name": "Canchas" },
    'swimmingLane': { "genders": [1, 2, 6], "tipo": "checkbox", "name": "Carril de Nado" },
    'bussinessCentre': { "genders": [1, 2, 6], "tipo": "checkbox", "name": "Centro de Negocios" },
    'playground': { "genders": [1, 2, 6], "tipo": "checkbox", "name": "Juegos Infantiles" },
    'partyRoom': { "genders": [1, 2, 6], "tipo": "checkbox", "name": "Salón de Fiestas" },
    'gym': { "genders": [1, 2, 6], "tipo": "checkbox", "name": "Gym" },
    //'extras': { "genders": [1, 2, 6], "tipo": "text", "name": "Extras" }
}

export const fEspeciales = {
    //'mantainance': { "genders": [1, 2, 3, 4, 6], "tipo": "number", "name": "Costo del Mantenimiento" },
    'isMantainceIncluded': { "genders": [1, 2, 3, 4], "tipo": "checkbox", "name": "Mantenimiento Incluido (sólo renta)" },//renta
    //'airConditioner': { "genders": [0, 1, 2, 3, 4, 6, 7, 8, 9], "tipo": "checkbox", "name": "Aire Acondicionado" },
    //'gasType': { "genders": [0, 1, 2, 3, 4, 6, 7, 8, 9], "tipo": "radio", "name": "Tipo de Gas","options":["LP","Natural"] },
    'elevator': { "genders": [2, 6, 8], "tipo": "checkbox", "name": "Elevador" },
    'insideMall': { "genders": [3], "tipo": "checkbox", "name": "En Centro Comercial" },
    'insideCorp': { "genders": [4], "tipo": "checkbox", "name": "En Centro Corporativo" },
    'onstreet': { "genders": [3], "tipo": "checkbox", "name": "A pie de calle" },
    //'water': { "genders": [5, 8], "tipo": "checkbox", "name": "Agua" },
    //'electricity': { "genders": [5, 8], "tipo": "checkbox", "name": "Luz" },
    'cistern': { "genders": [9], "tipo": "checkbox", "name": "Cisterna" },
    'trailerPlat': { "genders": [9], "tipo": "checkbox", "name": "Andén para Traíler" },
    // 'landuse': { "genders": [5, 8], "tipo": "checkbox", "name": "Uso de Suelo" }
    petFriendly: { "genders": [0,1,2,3,4,8], "tipo": "checkbox", "name": "pet Friendly" },
}

export const fEntorno = {
    /*'malls': { "genders": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], "tipo": "text", "name": "Centros Comerciales" },
    'shops': { "genders": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], "tipo": "text", "name": "Tiendas de Autoservicio" },
    'banks': { "genders": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], "tipo": "text", "name": "Bancos" },
    'schools': { "genders": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], "tipo": "text", "name": "Escuelas" },
    'hospitals': { "genders": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], "tipo": "text", "name": "Hospitales" },
    'mainavs': { "genders": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], "tipo": "text", "name": "Avenidas Principales" },
    'subway': { "genders": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], "tipo": "text", "name": "Estaciones de Metro" },
    'metrobus': { "genders": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], "tipo": "text", "name": "Estaciones de Metrobus" }*/
}

export const fTiempo = {
    //'gasType': { "genders": [0, 1, 2, 3, 4, 6, 7, 8, 9], "tipo": "radio", "name": "Tipo de Gas","options":["LP","Natural"] },
    'antiquity': { "genders": [0, 1, 2, 3, 4, 6, 8, 9], "tipo": "radio", "name": "Antigüedad (años)","options": ["0-5", "5-10", "10-25", "25+"] },
    //'deliverydate': { "genders": [0, 1, 2, 3, 4, 6, 8], "tipo": "text", "name": "Fecha de Entrega" }
}


/*

    addwights variables to be ponderated in search functions

*/

export const lowAtt = [
    'preservationState',
    'mFront',
    'mBack',
    'halfBath',
    'kitchen',
    'laundry',
    'carElevator',
    'equipment',
    'privateOffice',
    'wireFence',
    'electricFence',
    'closedStreet',
    'cctv',
    'alarm',
    'janitor',
    'fireAlarm',
    'pool',
    'sportsField',
    'swimmingLane',
    'bussinessCentre',
    'playground',
    'partyRoom',
    'gym',
    'airConditioner',
    'gasType',
    'height',
    'm2Cellar',
    'hasConstruction',
    'water',
    'electricity',
    'cistern',
    'trailerPlat',
    'floorNumber'
] //1pt attributes

export const midAtt = [
    'serviceRoom',
    'cellar',
    'balcony',
    'terrace',
    'roofGarden',
    'garden',
    'familyRoom',
    'study',
    'tvRoom',
    'security247',
    'elevator',
    'onStreet',
    'm2Build',
    'm2Office',
    'bath',
    'numDepOfis',
    'insideMall',
    'insideCorp',
    'floors',
    'preservationState',
    'antiquity',
    'totalBuildingFloors',
    'numDepBuilding',
    'mHeight'
] //2pt attributes

export const hiAtt = [
    'petFriendly',
    'parkingSlots',
    'm2Terrain',
    'room',
    'allowedBusiness',
    'credit',
    'm2Storage'
] //3pt attributes

//attriutes that need a range check
export const rangeMatchAtt = ['numDepOfis', 'bath', 'halfBath', 'parkingSlots', 'room','totalBuildingFloors','numDepBuilding','mHeight','m2Storage']

//attriutes that need a equality check
export const eqMatch = [
    'petFriendly',
    'preservationState',
    'kitchen',
    'serviceRoom',
    'laundry',
    'cellar',
    'balcony',
    'terrace',
    'roofGarden',
    'garden',
    'familyRoom',
    'study',
    'tvRoom',
    'carElevator',
    'equipment',
    'privateOffice',
    'wireFence',
    'electricFence',
    'closedStreet',
    'cctv',
    'alarm',
    'janitor',
    'security247',
    'fireAlarm',
    'pool',
    'sportsField',
    'swimmingLane',
    'bussinessCentre',
    'playground',
    'partyRoom',
    'gym',
    'airConditioner',
    'isMantainceIncluded',
    'elevator',
    'onStreet',
    'hasConstruction',
    'insideMall',
    'insideCorp',
    'water',
    'electricity',
    'cistern',
    'trailerPlat',
    'landUse',
    'allowedBusiness',
    'credit',
    'floors',
    'antiquity',
    'floorNumber'
    ]

export const intervalMatch = ['m2Terrain', 'm2Build', 'mFront', 'mBack', 'height', 'm2Cellar', 'm2Office', 'garden',]


export const witiPackages = {
    'PAQUETE10C': {
        id: 'PAQUETE10C',
        witicoins: 600,
        price: 570,
        promoWiticoins:30,
        name: 'PAQUETE10C',
        displayName: 'Básico'
    },
    'PAQUETE30C': {
        id: 'PAQUETE30C',
        witicoins: 1800,
        price: 1710,
        promoWiticoins:90,
        name: 'PAQUETE30C',
        displayName: 'Plata'
    },
    'PAQUETE60C': {
        id: 'PAQUETE60C',
        witicoins: 3600,
        price: 3420,
        promoWiticoins:180,
        name: 'PAQUETE60C',
        displayName: 'Oro'
    },
    'PAQUETE90C': {
        id: 'PAQUETE90C',
        witicoins: 5400,
        price: 5130,
        promoWiticoins:270,
        name: 'PAQUETE90C',
        displayName: 'Platino'
    },
}






/*

//objs
export const singleHouse = {
    interior: {
        'kitchen': '',
        'serviceRoom': '',
        'tvRoom': '',
        'study': '',
        'familyRoom': '',
        'laundry': '',
        'airConditioner': '',
        'bathroom': '',
        'halfbath': '',
        'bedroom': '',
        'parking': ''
    },
    exterior: {
        'balcony': '',
        'cellar': '',
        'garden': '',
        'roofGarden': '',
        'terrace': '',
        'closedStreet': ''
    },
    security: {
        'wireFence': '',
        'electricFence': '',
        'cctv': '',
        'alarm': ''
    },
    amenities: {
        'pool': '',
        'gym': '',
    }
}

export const develop = {
    interior: {
        'kitchen': '',
        'serviceRoom': '',
        'tvRoom': '',
        'study': '',
        'familyRoom': '',
        'laundry': '',
        'airConditioner': '',
        'bathroom': '',
        'parking': '',
        'halfBath': '',
        'bedRoom': ''
    },
    exterior: {
        'cellar': '',
        'balcony': '',
        'garden': '',
        'roofGarden': '',
        'terrace': '',
        'closedStreet': '',
        'elevator': ''
    },
    security: {
        'wireFence': '',
        'electricFence': '',
        'cctv': '',
        'janitor': '',
        'alarm': '',
        'security247': ''
    },
    amenities: {
        'pool': '',
        'sportFiled': '',
        'swimmingLane': '',
        'bussinessCentre': '',
        'playGround': '',
        'gym': ''
    }
}
export const office = {
    interior: {
        'kitchen': '',
        'serviceRoom': '',
        'airConditioner': '',
        'bathroom': ''
    },
    exterior: {
        'balcony': '',
        'cellar': '',
        'elevator': '',
        'insideCorp': '',
        'closedStreet': ''
    },
    security: {
        'wireFence': '',
        'electricFence': '',
        'cctv': '',
        'janitor': '',
        'alarm': '',
        'security247': ''
    },
    amenities: {}
}
export const condoHouse = {
    interior: {
        'kitchen': '',
        'serviceRoom': '',
        'tvRoom': '',
        'study': '',
        'familyRoom': '',
        'laundry': '',
        'airConditioner': '',
        'bathroom': '',
        'halfbath': '',
        'bedroom': '',
        'parking': ''
    },
    exterior: {
        'balcony': '',
        'cellar': '',
        'garden': '',
        'roofGarden': '',
        'terrace': '',
        'closedStreet': ''
    },
    security: {
        'wireFence': '',
        'electricFence': '',
        'cctv': '',
        'janitor': '',
        'alarm': '',
        'security247': ''
    },
    amenities: {
        'pool': '',
        'gym': '',
        'sportsField': '',
        'swimmingLane': '',
        'bussinessCentre': '',
        'playGround': ''
    }
}
export const building = {
    interior: {
        'airConditioner': '',
        'parking': ''
    },
    exterior: {
        'elevator': '',
        'closedStreet': ''
    },
    security: {
        'wireFence': '',
        'electricFence': '',
        'cctv': '',
        'alarm': '',
        'security247': ''
    },
    amenities: {}
}
export const terrain = {
    interior: {
        'm2': ''
    },
    exterior: {
        'closedStreet': ''
    },
    security: {
        'wireFence': '',
        'electricFence': '',
        'cctv': '',
        'janitor': '',
        'alarm': '',
        'security247': ''
    },
    amenities: {}
}
export const apartment = {
    interior: {
        'kitchen': '',
        'serviceRoom': '',
        'tvRoom': '',
        'study': '',
        'familyRoom': '',
        'laundry': '',
        'airConditioner': '',
        'bathroom': '',
        'halfbath': '',
        'bedroom': '',
        'parking': ''
    },
    exterior: {
        'balcony': '',
        'cellar': '',
        'garden': '',
        'roofGarden': '',
        'terrace': '',
        'elevator': '',
        'closedStreet': ''
    },
    security: {
        'wireFence': '',
        'electricFence': '',
        'cctv': '',
        'janitor': '',
        'alarm': '',
        'security247': ''
    },
    amenities: {
        'pool': '',
        'gym': '',
        'sportsField': '',
        'swimmingLane': '',
        'bussinessCentre': '',
        'playGround': ''
    }
}
export const local = {
    interior: {
        'kitchen': '',
        'airConditioner': '',
        'bathroom': '',
        'parking': ''
    },
    exterior: {
        'cellar': '',
        'closedStreet': '',
        'insideMall': '',
        'insideCorp': ''
    },
    security: {
        'wireFence': '',
        'electricFence': '',
        'cctv': '',
        'janitor': '',
        'alarm': '',
        'security247': ''
    },
    amenities: {}
}
export const warehouse = {
    interior: {
        'trailerPlat': '',
        'airConditioner': '',
    },
    exterior: {
        'cellar': '',
        'closedStreet': ''
    },
    security: {
        'wireFence': '',
        'electricFence': '',
        'cctv': '',
        'janitor': '',
        'alarm': '',
        'security247': ''
    },
    amenities: {}
}


//objs
export const singleHouse_es = {
    interior_es: {
        'Cocina': '',
        'Cuarto de servicio': '',
        'Cuarto de TV': '',
        'Estudio': '',
        'Family room': '',
        'Cuarto de lavado': '',
        'Aire acondicionado': '',
        'Baños': '',
        'Medios baños': '',
        'Recamaras': '',
        'Estacionamiento': ''
    },
    exterior_es: {
        'Balcón': '',
        'Bodega': '',
        'Jardín': '',
        'Roof garden': '',
        'Terraza': '',
        'Calle cerrada': ''
    },
    security_es: {
        'Cerca de alambre': '',
        'Cerca electrica': '',
        'Circuito cerrado de TV': '',
        'Sistema de alarma': ''
    },
    amenities_es: {
        'Alberca': '',
        'Gym': '',
    }
}

export const develop_es = {
    interior_es: {
        'Cocina': '',
        'Cuarto de servicio': '',
        'Cuarto de TV': '',
        'Estudio': '',
        'Family room': '',
        'Cuarto de lavado': '',
        'Aire acondicionado': '',
        'Baños': '',
        'Estacionamiento': '',
        'Medios baños': '',
        'Recamaras': ''
    },
    exterior_es: {
        'Bodega': '',
        'Balcón': '',
        'Jardín': '',
        'Roof garden': '',
        'Terraza': '',
        'Calle cerrada': '',
        'Elevador': ''
    },
    security_es: {
        'Cerca de alambre': '',
        'Cerca electrica': '',
        'Circuito cerrado de TV': '',
        'Concerje': '',
        'Sistema de alarma': '',
        'Seguridad 24/7': ''
    },
    amenities_es: {
        'Alberca': '',
        'Canchas deportivas': '',
        'Carril de nado': '',
        'Centro de negocios': '',
        'Juegos infantiles': '',
        'Gym': ''
    }
}
export const office_es = {
    interior_es: {
        'Cocina': '',
        'Cuarto de servicio': '',
        'Aire acondicionado': '',
        'Baños': ''
    },
    exterior_es: {
        'Balcón': '',
        'Bodega': '',
        'Elevador': '',
        'En edificio corpotativo': '',
        'Calle cerrada': ''
    },
    security_es: {
        'Cerca de alambre': '',
        'Cerca electrica': '',
        'Circuito cerrado de TV': '',
        'Concerje': '',
        'Sistema de alarma': '',
        'Seguridad 24/7': ''
    },
    amenities_es: {}
}
export const condoHouse_es = {
    interior_es: {
        'Cocina': '',
        'Cuarto de servicio': '',
        'Cuarto de TV': '',
        'Estudio': '',
        'Family room': '',
        'Cuarto de lavado': '',
        'Aire acondicionado': '',
        'Baños': '',
        'Medios baños': '',
        'Recamaras': '',
        'Estacionamiento': ''
    },
    exterior_es: {
        'Balcón': '',
        'Bodega': '',
        'Jardín': '',
        'Roof garden': '',
        'Terraza': '',
        'Calle cerrada': ''
    },
    security_es: {
        'Cerca de alambre': '',
        'Cerca electrica': '',
        'Circuito cerrado de TV': '',
        'Concerje': '',
        'Sistema de alarma': '',
        'Seguridad 24/7': ''
    },
    amenities_es: {
        'Alberca': '',
        'Gym': '',
        'Canchas deportivas': '',
        'Carril de nado': '',
        'Centro de negocios': '',
        'Juegos infantiles': ''
    }
}
export const building_es = {
    interior_es: {
        'Aire acondicionado': '',
        'Estacionamiento': ''
    },
    exterior_es: {
        'Elevador': '',
        'Calle cerrada': ''
    },
    security_es: {
        'Cerca de alambre': '',
        'Cerca electrica': '',
        'Circuito cerrado de TV': '',
        'Sistema de alarma': '',
        'Seguridad 24/7': ''
    },
    amenities_es: {}
}
export const terrain_es = {
    interior: {
        'Metros cuadrados': ''
    },
    exterior: {
        'Calle cerrada': ''
    },
    security: {
        'Cerca de alambre': '',
        'Cerca electrica': '',
        'Circuito cerrado de TV': '',
        'Concerje': '',
        'Sistema de alarma': '',
        'Seguridad 24/7': ''
    },
    amenities_es: {}
}
export const apartment_es = {
    interior_es: {
        'Cocina': '',
        'Cuarto de servicio': '',
        'Cuarto de TV': '',
        'Estudio': '',
        'Family room': '',
        'Cuarto de lavado': '',
        'Aire acondicionado': '',
        'Baños': '',
        'Medios baños': '',
        'Recamaras': '',
        'Estacionamiento': ''
    },
    exterior_es: {
        'Balcón': '',
        'Bodega': '',
        'Jardín': '',
        'Roof garden': '',
        'Terraza': '',
        'Elevador': '',
        'Calle cerrada': ''
    },
    security_es: {
        'Cerca de alambre': '',
        'Cerca electrica': '',
        'Circuito cerrado de TV': '',
        'Concerje': '',
        'Sistema de alarma': '',
        'Seguridad 24/7': ''
    },
    amenities_es: {
        'Alberca': '',
        'Gym': '',
        'Canchas deportivas': '',
        'Carril de nado': '',
        'Centro de negocios': '',
        'Juegos infantiles': ''
    }
}
export const local_es = {
    interior_es: {
        'Cocina': '',
        'Aire acondicionado': '',
        'Baños': '',
        'Estacionamiento': ''
    },
    exterior_es: {
        'Bodega': '',
        'Calle cerrada': '',
        'En plaza comercial': '',
        'En edificio corpotativo': ''
    },
    security_es: {
        'Cerca de alambre': '',
        'Cerca electrica': '',
        'Circuito cerrado de TV': '',
        'Concerje': '',
        'Sistema de alarma': '',
        'Seguridad 24/7': ''
    },
    amenities: {}
}
export const warehouse_es = {
    interior: {
        'Plataforma para trailer': '',
        'Aire acondicionado': '',
    },
    exterior: {
        'Bodega': '',
        'Calle cerrada': ''
    },
    security: {
        'Cerca de alambre': '',
        'Cerca electrica': '',
        'Circuito cerrado de TV': '',
        'Concerje': '',
        'Sistema de alarma': '',
        'Seguridad 24/7': ''
    },
    amenities: {}
}
*/