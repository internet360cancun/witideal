import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const Direcciones = () => {
  const direcciones = [
    {
      id: 1,
      title: "Ubicaciones principales",
      dir: [
        {
          id: 1,
          dir: "Casa en renta en del Valle",
          link: "propiedades/Casa/Rentar/MX/CDMX/Benito-Juárez/Col-del-Valle-Centro",
        },
        {
          id: 2,
          dir: "Casa en renta en Condesa",
          link: "propiedades/Casa/Rentar/MX/CDMX/Cuauhtémoc/Colonia-Condesa",
        },
        {
          id: 3,
          dir: "Departamento en renta en Condesa",
          link: "propiedades/Departamento/Rentar/MX/CDMX/Cuauhtémoc/Colonia-Condesa",
        },
        {
          id: 4,
          dir: "Casa en renta en Polanco",
          link: "propiedades/Casa/Rentar/MX/CDMX/Miguel-Hidalgo/Polanco-I-Secc",
        },
        {
          id: 5,
          dir: "Departamento en renta en Polanco",
          link: "propiedades/Departamento/Rentar/MX/CDMX/Miguel-Hidalgo/Polanco-I-Secc",
        },
      ],
    },
    {
      id: 2,
      title: "Casas en renta",
      dir: [
        {
          id: 1,
          dir: "Iztacalco CDMX",
          link: "propiedades/Casa/Rentar/MX/CDMX/Iztacalco",
        },
        {
          id: 2,
          dir: "Colonia del Valle",
          link: "propiedades/Casa/Rentar/MX/CDMX/Benito-Juárez/Col-del-Valle-Centro",
        },
        {
          id: 3,
          dir: "Santa Fe",
          link: "propiedades/Casa/Rentar/MX/CDMX/Álvaro-Obregón/Santa-Fe",
        },
        {
          id: 4,
          dir: "Jardines del Pedregal",
          link: "propiedades/Casa/Rentar/MX/CDMX/Álvaro-Obregón/Jardines-del-Pedregal",
        },
        {
          id: 5,
          dir: "Tlalpuente",
          link: "propiedades/Casa/Rentar/MX/CDMX/Tlalpan/San-Andrés-Totoltepec",
        },
        {
          id: 6,
          dir: "Bosques del Pedregal",
          link: "propiedades/Casa/Rentar/MX/CDMX/Tlalpan/Bosques-del-Pedregal",
        },
      ],
    },
    {
      id: 3,
      title: "Casas en venta",
      dir: [
        {
          id: 1,
          dir: "Iztacalco CDMX",
          link: "propiedades/Casa/Comprar/MX/CDMX/Iztacalco",
        },
        {
          id: 2,
          dir: "Colonia del Valle",
          link: "propiedades/Casa/Comprar/MX/CDMX/Benito-Juárez/Col-del-Valle-Centro",
        },
        {
          id: 3,
          dir: "Santa Fe",
          link: "propiedades/Casa/Comprar/MX/CDMX/Álvaro-Obregón/Santa-Fe",
        },
        {
          id: 4,
          dir: "Jardines del Pedregal",
          link: "propiedades/Casa/Comprar/MX/CDMX/Álvaro-Obregón/Jardines-del-Pedregal",
        },
        {
          id: 5,
          dir: "Tlalpuente",
          link: "propiedades/Casa/Comprar/MX/CDMX/Tlalpan/San-Andrés-Totoltepec",
        },
        {
          id: 6,
          dir: "Bosques del Pedregal",
          link: "propiedades/Casa/Comprar/MX/CDMX/Tlalpan/Bosques-del-Pedregal",
        },
      ],
    },
  ];

  return (
    <Container className="py-5">
      <Row>
        {direcciones.map((direccion) => (
          <Col
            key={direccion.id}
            md={4}
            className="d-flex justify-content-center"
          >
            <div>
              <p className="subtitle py-3">{direccion.title}</p>
              <div className="card-direcciones card-hover">
                <div className="py-5 text-white text-left px-4 list-item">
                  {direccion.dir.map((dire) => (
                    <li key={dire.id} className="right-hover">
                      <Link className="text-white" to={dire.link}>
                        {dire.dir}
                      </Link>
                    </li>
                  ))}
                </div>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Direcciones;
