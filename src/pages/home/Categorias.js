import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const Categorias = () => {
  const categorias = [
    {
      id: 1,
      title: "Inmuebles en venta",
      background:
        "https://firebasestorage.googleapis.com/v0/b/witideal-b1f99.appspot.com/o/assets%2Ficons%2Fthumb%40inmuebles-ventas.png?alt=media&token=80b8d1df-6683-44b4-b049-4c2c46178a87",
    },
    {
      id: 2,
      title: "Inmuebles en renta",
      background:
        "https://firebasestorage.googleapis.com/v0/b/witideal-b1f99.appspot.com/o/assets%2Ficons%2Fthumb%40inmuebles-renta.png?alt=media&token=3121d797-baf7-4269-b06e-3b1172de57f8",
    },
    {
      id: 3,
      title: "Oficinas en renta",
      background:
        "https://firebasestorage.googleapis.com/v0/b/witideal-b1f99.appspot.com/o/assets%2Ficons%2Fthumb%40oficinas-renta.png?alt=media&token=15236913-66da-4b7a-9b11-cff7339b2642",
    },
    {
      id: 4,
      title: "Propiedades comerciales en renta",
      background:
        "https://firebasestorage.googleapis.com/v0/b/witideal-b1f99.appspot.com/o/assets%2Ficons%2Fthumb%40comerciales.png?alt=media&token=9fd9c97f-2113-4f62-824f-5918e42ce1b1",
    },
    {
      id: 5,
      title: "Departamentos en renta",
      background:
        "https://firebasestorage.googleapis.com/v0/b/witideal-b1f99.appspot.com/o/assets%2Ficons%2Fthumb%40departamentos.png?alt=media&token=84d721d3-e386-4274-b8a8-ef9b1eefa046",
    },
    {
      id: 6,
      title: "Terrenos",
      background:
        "https://firebasestorage.googleapis.com/v0/b/witideal-b1f99.appspot.com/o/assets%2Ficons%2Fthumb%40terrenos.png?alt=media&token=fd00b872-8c09-4c04-a9db-09ee266d1b15",
    },
  ];

  return (
    <div
      style={{
        background: "linear-gradient(180deg, #3f19f9 0%, #2c0cc5 100%)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        borderRadius: "0px 298px",
      }}
    >
      <Container>
        <h1 className="title-2 text-left py-5">Categorías populares</h1>
        <Row className="pb-5">
          {categorias.map((categoria) => (
            <Col
              key={categoria.id}
              md={4}
              xs={6}
              className="d-flex justify-content-center"
            >
              <div
                style={{
                  backgroundImage: `url(${categoria.background})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  width: "425.6px",
                  height: "238.15px",
                }}
              >
                <div className="d-flex justify-content-center">
                  <p className="text-white subtitle-3 pt-5 mt-5">
                    {categoria.title}
                  </p>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Categorias;
