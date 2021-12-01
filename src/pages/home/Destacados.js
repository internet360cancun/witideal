import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";

const Destacados = () => {
  const destacados = [
    {
      id: 1,
      img: 1,
      price: 1,
      title: "Casa para rentar",
      desc: "lorem ipsum dolor sit amet, consectetur",
    },
    {
      id: 1,
      img: 1,
      price: 1,
      title: "Casa para rentar",
      desc: "lorem ipsum dolor sit amet, consectetur",
    },
    {
      id: 1,
      img: 1,
      price: 1,
      title: "Casa para rentar",
      desc: "lorem ipsum dolor sit amet, consectetur",
    },
    {
      id: 1,
      img: 1,
      price: 1,
      title: "Casa para rentar",
      desc: "lorem ipsum dolor sit amet, consectetur",
    },
    {
      id: 1,
      img: 1,
      price: 1,
      title: "Casa para rentar",
      desc: "lorem ipsum dolor sit amet, consectetur",
    },
    {
      id: 1,
      img: 1,
      price: 1,
      title: "Casa para rentar",
      desc: "lorem ipsum dolor sit amet, consectetur",
    },
    {
      id: 1,
      img: 1,
      price: 1,
      title: "Casa para rentar",
      desc: "lorem ipsum dolor sit amet, consectetur",
    },
    {
      id: 1,
      img: 1,
      price: 1,
      title: "Casa para rentar",
      desc: "lorem ipsum dolor sit amet, consectetur",
    },
    {
      id: 1,
      img: 1,
      price: 1,
      title: "Casa para rentar",
      desc: "lorem ipsum dolor sit amet, consectetur",
    },
  ];

  return (
    <div>
      <Container>
        <h1 className="text-left title">Destacados</h1>
        <Row>
          {destacados.map((destacado) => (
            <Col
              md={4}
              key={destacado.id}
              className="d-flex justify-content-center"
            >
              <Card>
                <p>imagen</p>
                <p>{destacado.price}</p>
                <p>{destacado.title}</p>
                <p>{destacado.desc}</p>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Destacados;
