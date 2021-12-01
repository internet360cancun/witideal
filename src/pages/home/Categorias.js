import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";

const Categorias = () => {
  const categorias = [
    { id: 1, title: "Inmuebles en venta" },
    { id: 2, title: "Inmuebles en renta" },
    { id: 3, title: "Oficinas en renta" },
    { id: 4, title: "Propiedades comerciales en renta" },
    { id: 5, title: "Departamentos en renta" },
    { id: 6, title: "Terrenos" },
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
      <h1 className="title-2">Categorías populares</h1>
      <Container>
        <Row>
          {categorias.map((categoria) => (
            <Col
              key={categoria.id}
              md={4}
              xs={6}
              className="d-flex justify-content-center"
            >
              <Card>
                <p>{categoria.title}</p>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Categorias;
