import React from "react";
import { Col, Row } from "react-bootstrap";

const App = () => {
  return (
    <div>
      <Row>
        <Col md={6}>
          <p>Descarga nuestra App</p>
          <p>Realiza tus publicaciones o búsquedas de la forma más sencilla</p>
          <ul>
            <li>Encuentra casas, departamentos, oficinas, terreno y más</li>
            <li>
              Administra tus propiedades y recibe notificaciones desde tu
              celular
            </li>
          </ul>
          <div>Descarga desde playstore</div>
        </Col>
        <Col md={6}>
          <div>Imagen de la app</div>
        </Col>
      </Row>
    </div>
  );
};

export default App;
