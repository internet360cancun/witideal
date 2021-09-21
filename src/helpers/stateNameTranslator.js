const statesDiccionary = {
  'Ags.': "Aguascalientes",
  'B.C.': "baja california",
  'B.C.S.': "baja california sur",
  'CDMX': "ciudad de mexico",
  'Camp.': "campeche",
  'Chih.': "chihuahua.",
  'Chis.': "chiapas",
  'Coah.': "oahuila",
  'Col.': "Colima",
  'Dgo.': "durango",
  'Gro.': "guerrero",
  'Gto.': "guanajuato",
  'Hgo.': "hidalgo",
  'Jal.': "jalisco",
  'Mich.': "michoacan",
  'Mor.': "morelos",
  'Méx.': "estado de mexico",
  'N.L.': "nuevo leon",
  'Nay.': "nayarit",
  'Oax.': "oaxaca",
  'Pue.': "puebla",
  'Q.R.': "quintana roo",
  'Qro.': "queretaro.",
  'S.L.P.': "san luis potosi",
  'Sin.': "sinaloa",
  'Son.': "Sonora",
  'Tab.': "tabasco",
  'Tamps.': "tamaulipas",
  'Tlax.': "tlaxcala",
  'Ver.': "Veracruz",
  'Yuc.': "yucatan",
  'Zac.': "zacatecas",
};

const stateNameTranslator = (name) => {
  if (statesDiccionary[name]) return statesDiccionary[name];
  for (const keyname in statesDiccionary) {
    const completename = statesDiccionary[keyname];
    if (name === completename) return keyname;
  }
  return name;
}

export default stateNameTranslator;
