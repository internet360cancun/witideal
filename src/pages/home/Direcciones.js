import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const Direcciones = () => {
  return (
    <Container className="py-5">
      <Row>
        <Col md={4} className="d-flex justify-content-center">
          <div>
            <p className="subtitle py-3">Ubicaciones principales</p>
            <div className="card-direcciones card-hover">
              <div className="py-5 text-white text-left px-4 list-item">
                <li>
                  <Link
                    className="text-white"
                    to="propiedades/Casa/Rentar/MX/CDMX/Benito-Juárez/Col-del-Valle-Centro"
                  >
                    Casa en del Valle
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-white"
                    to="propiedades/Casa/Rentar/MX/CDMX/Cuauhtémoc/Colonia-Condesa"
                  >
                    Casa en Condesa
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-white"
                    to="propiedades/Departamento/Rentar/MX/CDMX/Cuauhtémoc/Colonia-Condesa"
                  >
                    Departamento en Condesa
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-white"
                    to="propiedades/Casa/Rentar/MX/CDMX/Miguel-Hidalgo/Polanco-I-Secc"
                  >
                    Casa en Polanco
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-white"
                    to="propiedades/Departamento/Rentar/MX/CDMX/Miguel-Hidalgo/Polanco-I-Secc"
                  >
                    Departamento en Polanco
                  </Link>
                </li>
              </div>
            </div>
          </div>
        </Col>
        <Col md={4} className="d-flex justify-content-center">
          <div>
            <p className="subtitle py-3">Propiedades en renta</p>
            <div className="card-direcciones card-hover">
              <div className="py-5 text-white text-left px-4 list-item">
                <li>
                  <Link
                    to="propiedades/Casa/Rentar/MX/CDMX/Iztacalco"
                    className="text-white"
                  >
                    Iztacalco CDMX
                  </Link>
                </li>
                <li>
                  <Link
                    to="propiedades/Casa/Rentar/MX/CDMX/Benito-Juárez/Col-del-Valle-Centro"
                    className="text-white"
                  >
                    Colonia del Valle
                  </Link>
                </li>
                <li>
                  <Link
                    to="propiedades/Casa/Rentar/MX/CDMX/Álvaro-Obregón/Santa-Fe"
                    className="text-white"
                  >
                    Santa Fe
                  </Link>
                </li>
                <li>
                  <Link
                    to="propiedades/Casa/Rentar/MX/CDMX/Álvaro-Obregón/Jardines-del-Pedregal"
                    className="text-white"
                  >
                    Jardines del Pedregal
                  </Link>
                </li>
                <li>
                  <Link
                    to="propiedades/Casa/Rentar/MX/CDMX/Tlalpan/San-Andrés-Totoltepec"
                    className="text-white"
                  >
                    Tlalpuente
                  </Link>
                </li>
                <li>
                  <Link
                    to="propiedades/Casa/Rentar/MX/CDMX/Tlalpan/Bosques-del-Pedregal"
                    className="text-white"
                  >
                    Bosques del Pedregal
                  </Link>
                </li>
              </div>
            </div>
          </div>
        </Col>
        <Col md={4} className="d-flex justify-content-center">
          <div>
            <p className="subtitle py-3">Propiedades en venta</p>
            <div className="card-direcciones card-hover">
              <div className="py-5 text-white text-left px-4 list-item">
                <li>
                  <Link
                    to="propiedades/Casa/Comprar/MX/CDMX/Iztacalco"
                    className="text-white"
                  >
                    Iztacalco CDMX
                  </Link>
                </li>
                <li>
                  <Link
                    to="propiedades/Casa/Comprar/MX/CDMX/Benito-Juárez/Col-del-Valle-Centro"
                    className="text-white"
                  >
                    Colonia del Valle
                  </Link>
                </li>
                <li>
                  <Link
                    to="propiedades/Casa/Comprar/MX/CDMX/Álvaro-Obregón/Santa-Fe"
                    className="text-white"
                  >
                    Santa Fe
                  </Link>
                </li>
                <li>
                  <Link
                    to="propiedades/Casa/Comprar/MX/CDMX/Álvaro-Obregón/Jardines-del-Pedregal"
                    className="text-white"
                  >
                    Jardines del Pedregal
                  </Link>
                </li>
                <li>
                  <Link
                    to="propiedades/Casa/Comprar/MX/CDMX/Tlalpan/San-Andrés-Totoltepec"
                    className="text-white"
                  >
                    Tlalpuente
                  </Link>
                </li>
                <li>
                  <Link
                    to="propiedades/Casa/Comprar/MX/CDMX/Tlalpan/Bosques-del-Pedregal"
                    className="text-white"
                  >
                    Bosques del Pedregal
                  </Link>
                </li>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Direcciones;
