import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useMediaQuery } from "@material-ui/core";

const chica =
  "https://firebasestorage.googleapis.com/v0/b/witideal-b1f99.appspot.com/o/assets%2Ficons%2Fthumb%40chica.png?alt=media&token=779116d9-82b4-4372-be24-db14418f0e6f";

const InfoWitideal = () => {
  const tablet = useMediaQuery("(min-width:991px)");

  return (
    <Container className="py-5">
      {tablet ? (
        <Row>
          <Col md={6} className="text-left">
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />

            <h1 className="title">
              ¿Por qué usar <br /> Witideal?
            </h1>
            <p className="text">
              En Witideal tenemos una gran variedad de propiedades,
              departamentos, casas, renta y venta de local comercial y terrenos
              encuentra la propiedad que se ajusta a tus necesidades con un
              clic.
            </p>
            <p className="text">
              Si necesitas vender o rentar, sube tus propiedades, es Gratis con
              Witideal registra todas tus propiedades y vende o renta más
              rápido, podrás administrar tus propiedades facilmente desde
              nuestra plataforma via web o con nuestra App.
            </p>
          </Col>
          <Col md={6}>
            <div className="d-flex justify-content-center">
              <img
                src={chica}
                alt="¿por qué usar witideal?"
                className="chica"
              />
            </div>
          </Col>
        </Row>
      ) : (
        <Row>
          <Col className="text-left">
            <h1 className="title text-center">
              ¿Por qué usar <br /> Witideal?
            </h1>
            <div className="d-flex justify-content-center">
              <img
                src={chica}
                alt="¿por qué usar witideal?"
                className="chica"
              />
            </div>
          </Col>
          <Col>
            <div>
              <p className="text text-justify">
                En Witideal tenemos una gran variedad de propiedades,
                departamentos, casas, renta y venta de local comercial y
                terrenos encuentra la propiedad que se ajusta a tus necesidades
                con un clic.
              </p>
              <p className="text text-justify">
                Si necesitas vender o rentar, sube tus propiedades, es Gratis
                con Witideal registra todas tus propiedades y vende o renta más
                rápido, podrás administrar tus propiedades facilmente desde
                nuestra plataforma via web o con nuestra App.
              </p>
            </div>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default InfoWitideal;
