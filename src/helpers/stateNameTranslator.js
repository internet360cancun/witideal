const statesDiccionary = {
  'aguascalientes': "Aguascalientes",
  'baja california': "baja california",
  'baja california sur': "baja california sur",
  'ciudad de mexico': "ciudad de mexico",
  'campeche': "campeche",
  'chihuahua.': "chihuahua.",
  'chiapas': "chiapas",
  'oahuila': "oahuila",
  'Colima': "Colima",
  'durango': "durango",
  'guerrero': "guerrero",
  'guanajuato': "guanajuato",
  'hidalgo': "hidalgo",
  'jalisco': "jalisco",
  'michoacan': "michoacan",
  'morelos': "morelos",
  'estado de mexico': "estado de mexico",
  'nuevo leon': "nuevo leon",
  'nayarit': "nayarit",
  'oaxaca': "oaxaca",
  'puebla': "puebla",
  'quintana roo': "quintana roo",
  'queretaro.': "queretaro.",
  'san luis potosi': "san luis potosi",
  'sinaloa': "sinaloa",
  'Sonora': "Sonora",
  'tabasco': "tabasco",
  'tamaulipas': "tamaulipas",
  'tlaxcala': "tlaxcala",
  'Veracruz': "Veracruz",
  'yucatan': "yucatan",
  'zacatecas': "zacatecas",
};
// const statesDiccionary = {
//   'Ags.': "Aguascalientes",
//   'B.C.': "baja california",
//   'B.C.S.': "baja california sur",
//   'ciudad de': "ciudad de mexico",
//   'Camp.': "campeche",
//   'Chih.': "chihuahua.",
//   'Chis.': "chiapas",
//   'Coah.': "oahuila",
//   'Col.': "Colima",
//   'Dgo.': "durango",
//   'Gro.': "guerrero",
//   'Gto.': "guanajuato",
//   'Hgo.': "hidalgo",
//   'Jal.': "jalisco",
//   'Mich.': "michoacan",
//   'Mor.': "morelos",
//   'Méx.': "estado de mexico",
//   'N.L.': "nuevo leon",
//   'Nay.': "nayarit",
//   'Oax.': "oaxaca",
//   'Pue.': "puebla",
//   'Q.R.': "quintana roo",
//   'Qro.': "queretaro.",
//   'S.L.P.': "san luis potosi",
//   'Sin.': "sinaloa",
//   'Son.': "Sonora",
//   'Tab.': "tabasco",
//   'Tamps.': "tamaulipas",
//   'Tlax.': "tlaxcala",
//   'Ver.': "Veracruz",
//   'Yuc.': "yucatan",
//   'Zac.': "zacatecas",
// };

const stateNameTranslator = (name) => {
  if (statesDiccionary[name]) return statesDiccionary[name];
  for (const keyname in statesDiccionary) {
    const completename = statesDiccionary[keyname];
    if (name === completename) return keyname;
  }
  return name;
}

export default stateNameTranslator;
