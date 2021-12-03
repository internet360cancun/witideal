import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useMediaQuery } from "@material-ui/core";

const Categorias = () => {
  const categorias = [
    {
      id: 1,
      title: "Inmuebles en venta",
      background:
        "https://firebasestorage.googleapis.com/v0/b/witideal-b1f99.appspot.com/o/assets%2Ficons%2Fthumb%40inmuebles-ventas.png?alt=media&token=ec4b5d9f-e0e8-401e-acf5-e6cd038c1e25",
    },
    {
      id: 2,
      title: "Inmuebles en renta",
      background:
        "https://firebasestorage.googleapis.com/v0/b/witideal-b1f99.appspot.com/o/assets%2Ficons%2Fthumb%40inmuebles-renta.png?alt=media&token=1f15eed7-9f5b-41a5-8f09-4208b370b954",
    },
    {
      id: 3,
      title: "Oficinas en renta",
      background:
        "https://firebasestorage.googleapis.com/v0/b/witideal-b1f99.appspot.com/o/assets%2Ficons%2Fthumb%40oficinas-renta.png?alt=media&token=5678533a-49c8-49d8-9d35-29368cfcff40",
    },
    {
      id: 4,
      title: "Propiedades comerciales en renta",
      background:
        "https://firebasestorage.googleapis.com/v0/b/witideal-b1f99.appspot.com/o/assets%2Ficons%2Fthumb%40propiedad-comercial.png?alt=media&token=5e0bac0b-8bba-4e1f-b763-a0f5dcb1eafc",
    },
    {
      id: 5,
      title: "Departamentos",
      background:
        "https://firebasestorage.googleapis.com/v0/b/witideal-b1f99.appspot.com/o/assets%2Ficons%2Fthumb%40departamento-renta.png?alt=media&token=4a2e74a1-1743-48eb-954c-bd84f4413f46",
    },
    {
      id: 6,
      title: "Terrenos",
      background:
        "https://firebasestorage.googleapis.com/v0/b/witideal-b1f99.appspot.com/o/assets%2Ficons%2Fthumb%40terrenos.png?alt=media&token=822e8cd8-611a-41d4-be6e-92e588a5840e",
    },
  ];

  const tablet = useMediaQuery("(min-width:1200px)");

  return (
    <div
      style={{
        background: "linear-gradient(180deg, #3f19f9 0%, #2c0cc5 100%)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        borderRadius: tablet ? `0px 298px` : "0px 150px",
      }}
    >
      <Container>
        <br />
        <br />
        <h1 className="title-2 text-left py-5">Categorías populares</h1>
        <Row className="pb-5">
          {categorias.map((categoria) => (
            <Col
              key={categoria.id}
              md={4}
              xs={6}
              className="d-flex justify-content-center py-3"
            >
              <div
                className="card-hover pointer"
                style={{
                  backgroundImage: `linear-gradient(69.69deg, rgba(50, 255, 210, 0.9), rgba(65, 184, 249, 0.9)), url("${categoria.background}")`,
                  backgroundPosition: "center",
                  width: "480px",
                  height: "238.15px",
                  borderRadius: "19.6542px",
                }}
              >
                <div className="d-flex justify-content-center">
                  <p className={`text-white subtitle-3     pt-5 mt-5`}>
                    {categoria.title}
                  </p>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default Categorias;
