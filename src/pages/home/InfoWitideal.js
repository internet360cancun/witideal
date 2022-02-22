import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useMediaQuery } from "@material-ui/core";

const chica =
  "https://firebasestorage.googleapis.com/v0/b/witideal-b1f99.appspot.com/o/assets%2Ficons%2Fthumb%40chica2.png?alt=media&token=ce90ed38-d193-4c0c-9bf3-32d531958650";

const InfoWitideal = () => {
  const tablet = useMediaQuery("(min-width:991px)");

  return (
    <Container className="pt-5">
      {tablet ? (
        <Row>
          <Col md={6} className="text-left">
            {tablet ? <></> : null}
            <div className="center-vertical">
              <h1 className="title ml-3">
                ¿Por qué usar <br /> Witideal?
              </h1>
              <br />
              <p className="text ml-3">
                En Witideal tenemos una gran variedad de propiedades,
                departamentos, casas, renta y venta de local comercial y
                terrenos encuentra la propiedad que se ajusta a tus necesidades
                con un clic.
              </p>
              <p className="text ml-3">
                Si necesitas vender o rentar, sube tus propiedades, es Gratis
                con Witideal registra todas tus propiedades y vende o renta más
                rápido, podrás administrar tus propiedades facilmente desde
                nuestra plataforma via web o con nuestra App.
              </p>
            </div>
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
          <Col xs={12} className="text-left">
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
          <Col xs={12}>
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
