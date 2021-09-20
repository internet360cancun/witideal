import React from 'react'
import { Helmet } from "react-helmet"
import propTypes from 'prop-types'

const Head = props => {
  return (
    <Helmet>
      <title>{props.title ? `Witideal | ${props.title}`: 'Witideal'}</title>
      <meta name="description" content={props.description || 'Sitio de promoción de inmuebles en renta y venta. Encuentra el espacio que buscas en menos tiempo; comparte tu espacio al mejor precio.'} />
      <meta name="keywords" content="Witideal, witideal, witi deal, huitidil, guitideal, guitidil, witi dil, witidil" />
      <link rel= "canonical" href={window.location.href} />
    </Helmet>
  )
}

Head.propTypes = {
  title: propTypes.string,
  description: propTypes.string
}

export default Head
