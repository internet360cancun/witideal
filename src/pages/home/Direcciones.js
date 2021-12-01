import React from "react";
import { Card, Col, Row } from "react-bootstrap";

const Direcciones = () => {
  return (
    <Row>
      <Col md={4} className="d-flex justify-content-center">
        <div>
          <p>Ubicaciones principales</p>
          <Card>
            <ul>
              <li>Casa en del Valle</li>
              <li>Casa en Condesa</li>
              <li>Departamento en Condesa</li>
              <li>Casa en Polanco</li>
              <li>Departamento en Polanco</li>
            </ul>
          </Card>
        </div>
      </Col>
      <Col md={4} className="d-flex justify-content-center">
        <div>
          <p>propiedades en renta</p>
          <Card>
            <ul>
              <li>Iztacalco DF/CDMX</li>
              <li>Colonia del Valle</li>
              <li>Santa Fe</li>
              <li>Jardines del Pedregal</li>
              <li>Tlalpuente</li>
              <li>Bosques del Pedregal</li>
            </ul>
          </Card>
        </div>
      </Col>
      <Col md={4} className="d-flex justify-content-center">
        <div>
          <p>propiedades en venta</p>
          <Card>
            <div>
              <ul>
                <li>Iztacalco DF/CDMX</li>
                <li>Colonia del Valle</li>
                <li>Santa Fe</li>
                <li>Jardines del Pedregal</li>
                <li>Tlalpuente</li>
                <li>Bosques del Pedregal</li>
              </ul>
            </div>
          </Card>
        </div>
      </Col>
    </Row>
  );
};

export default Direcciones;
