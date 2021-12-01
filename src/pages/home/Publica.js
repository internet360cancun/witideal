import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import PublicaCard from "../../components/home/PublicaCard";

const Publica = () => {
  const data = [
    {
      id: 1,
      img: 1,
      title: "Registra tu inmueble",
      desc: "Agrega los datos de tu inmueble",
    },
    {
      id: 2,
      img: 1,
      title: "Agrega ubicación",
      desc: "Agrega la ubicación de la propiedad en mapa",
    },
    {
      id: 3,
      img: 1,
      title: "Agrega datos específicos",
      desc: "Agrega características físicas, estado de conservación",
    },
    {
      id: 4,
      img: 1,
      title: "Agrega tus imágenes",
      desc: "Agrega la imagen principal y fotos del inmueble.",
    },
  ];

  return (
    <div>
      <h1 className="title">Publica tus propiedades</h1>
      <p>En Witideal es fácil y ágil anunciarse</p>
      <Container>
        <Row>
          {data.map((info) => (
            <Col md={3} key={info.id} className="d-flex justify-content-center">
              <PublicaCard
                id={info.id}
                img={info.img}
                title={info.title}
                desc={info.desc}
              />
            </Col>
          ))}
        </Row>

        <div>
          <p>imagen</p>
          <p>Publicar ahora</p>
          <p>Aumenta tus oportunidades de venta</p>
        </div>
      </Container>
    </div>
  );
};

export default Publica;
