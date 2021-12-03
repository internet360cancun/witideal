import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const Direcciones = () => {
  return (
    <Container className="py-5">
      <Row>
        <Col md={4} className="d-flex justify-content-center">
          <div>
            <p className="subtitle py-3">Ubicaciones principales</p>
            <div className="card-direcciones card-hover">
              <div className="py-5 text-white text-left px-4 list-item">
                <li>Casa en del Valle</li>
                <li>Casa en Condesa</li>
                <li>Departamento en Condesa</li>
                <li>Casa en Polanco</li>
                <li>Departamento en Polanco</li>
              </div>
            </div>
          </div>
        </Col>
        <Col md={4} className="d-flex justify-content-center">
          <div>
            <p className="subtitle py-3">Propiedades en renta</p>
            <div className="card-direcciones card-hover">
              <div className="py-5 text-white text-left px-4 list-item">
                <li>Iztacalco CDMX</li>
                <li>Colonia del Valle</li>
                <li>Santa Fe</li>
                <li>Jardines del Pedregal</li>
                <li>Tlalpuente</li>
                <li>Bosques del Pedregal</li>
              </div>
            </div>
          </div>
        </Col>
        <Col md={4} className="d-flex justify-content-center">
          <div>
            <p className="subtitle py-3">Propiedades en venta</p>
            <div className="card-direcciones card-hover">
              <div className="py-5 text-white text-left px-4 list-item">
                <li>Iztacalco CDMX</li>
                <li>Colonia del Valle</li>
                <li>Santa Fe</li>
                <li>Jardines del Pedregal</li>
                <li>Tlalpuente</li>
                <li>Bosques del Pedregal</li>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Direcciones;
