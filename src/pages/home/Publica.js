import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import PublicaCard from "../../components/home/PublicaCard";

const img =
  "https://firebasestorage.googleapis.com/v0/b/witideal-b1f99.appspot.com/o/assets%2Ficons%2Fthumb%40frame.svg?alt=media&token=9116d954-5f68-4266-bb5e-1cafe947a61e";

const Publica = () => {
  const data = [
    {
      id: 1,
      img: "https://firebasestorage.googleapis.com/v0/b/witideal-b1f99.appspot.com/o/assets%2Ficons%2Fthumb%40paper.svg?alt=media&token=52180a4f-4b61-44a2-a453-666dc93d77c4",
      title: "Registra tu inmueble",
      desc: "Agrega los datos de tu inmueble",
    },
    {
      id: 2,
      img: "https://firebasestorage.googleapis.com/v0/b/witideal-b1f99.appspot.com/o/assets%2Ficons%2Fthumb%40map-location%201.svg?alt=media&token=02b23d14-4663-466f-b6ef-9a71abf1c164",
      title: "Agrega ubicación",
      desc: "Agrega la ubicación de la propiedad en mapa",
    },
    {
      id: 3,
      img: "https://firebasestorage.googleapis.com/v0/b/witideal-b1f99.appspot.com/o/assets%2Ficons%2Fthumb%40image-gallery.svg?alt=media&token=779df776-449c-41b5-aef8-e8534027bf89",
      title: "Agrega datos específicos",
      desc: "Agrega características físicas, estado de conservación",
    },
    {
      id: 4,
      img: "https://firebasestorage.googleapis.com/v0/b/witideal-b1f99.appspot.com/o/assets%2Ficons%2Fthumb%40folder-management.svg?alt=media&token=08b99819-0a27-42ca-992c-76da09db649c",
      title: "Agrega tus imágenes",
      desc: "Agrega la imagen principal y fotos del inmueble.",
    },
  ];

  return (
    <div className="mb-5">
      <h1 className="title pt-5">Publica tus propiedades</h1>
      <p className="text-witideal">
        En <span className="witideal"> Witideal</span> es fácil y ágil
        anunciarse
      </p>
      <Container>
        <Row>
          {data.map((info) => (
            <Col
              sm={6}
              lg={3}
              key={info.id}
              className="d-flex justify-content-center"
            >
              <PublicaCard
                id={info.id}
                img={info.img}
                title={info.title}
                desc={info.desc}
              />
            </Col>
          ))}
        </Row>
        <div className="mt-5 ">
          <div className="d-flex justify-content-center">
            <div className="background-anunciar pt-4 card-hover">
              <img src={img} alt="anuncia ahora" />
              <p className="subtitle-2">Publica tus propiedades ahora</p>
              <p className="subtitle-3 text-white">
                Aumenta tus oportunidades de venta
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Publica;
