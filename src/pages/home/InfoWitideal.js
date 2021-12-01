import React from "react";
import { Col, Row } from "react-bootstrap";

const InfoWitideal = () => {
  return (
    <div>
      <Row>
        <Col md={6}>
          <h1 className="title">¿Por qué usar Witideal?</h1>
          <p>
            En Witideal tenemos una gran variedad de propiedades, departamentos,
            casas, renta y venta de local comercial y terrenos encuentra la
            propiedad que se ajusta a tus necesidades con un clic.
          </p>
          <p>
            Si necesitas vender o rentar, sube tus propiedades, es Gratis con
            Witideal registra todas tus propiedades y vende o renta más rápido,
            podrás administrar tus propiedades facilmente desde nuestra
            plataforma via web o con nuestra App.
          </p>
        </Col>
        <Col md={6}>
          <div>Imagen</div>
        </Col>
      </Row>
    </div>
  );
};

export default InfoWitideal;
