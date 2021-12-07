import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useMediaQuery } from "@material-ui/core";
import { useHistory } from "react-router";

const Categorias = () => {
  const history = useHistory();

  const categorias = [
    {
      id: 1,
      title: "Inmuebles en venta",
      link: "propiedades/Casa/Comprar/MX/CDMX",
      icon: "https://firebasestorage.googleapis.com/v0/b/witideal-b1f99.appspot.com/o/assets%2Ficons%2Fthumb%40inmuebles-ventas.png?alt=media&token=ec4b5d9f-e0e8-401e-acf5-e6cd038c1e25",
    },
    {
      id: 2,
      title: "Inmuebles en renta",
      link: "propiedades/Casa/Rentar/MX/CDMX",
      icon: "https://firebasestorage.googleapis.com/v0/b/witideal-b1f99.appspot.com/o/assets%2Ficons%2Fthumb%40inmuebles-rentas.png?alt=media&token=f7c53053-1291-4c51-a069-726f6a6c6cd3",
    },
    {
      id: 3,
      title: "Oficinas en renta",
      link: "propiedades/Oficina/Rentar/MX/CDMX",
      icon: "https://firebasestorage.googleapis.com/v0/b/witideal-b1f99.appspot.com/o/assets%2Ficons%2Fthumb%40work-space.png?alt=media&token=31261db9-bd02-447c-abd0-fa4911b2b71a",
    },
    {
      id: 4,
      title: "Locales en renta",
      link: "propiedades/Local/Rentar/MX/CDMX",
      icon: "https://firebasestorage.googleapis.com/v0/b/witideal-b1f99.appspot.com/o/assets%2Ficons%2Fthumb%40locales.png?alt=media&token=ee0ea600-fe60-4d3f-a1fe-9d777cc7d7ba",
    },
    {
      id: 5,
      title: "Departamentos en renta",
      link: "propiedades/Departamento/Rentar/MX/CDMX",
      icon: "https://firebasestorage.googleapis.com/v0/b/witideal-b1f99.appspot.com/o/assets%2Ficons%2Fthumb%40office-building.png?alt=media&token=0b7728ea-940c-4d95-9cb3-8994fa42e782",
    },
    {
      id: 6,
      title: "Terrenos en venta",
      link: "propiedades/Terreno/Comprar/MX/CDMX",
      icon: "https://firebasestorage.googleapis.com/v0/b/witideal-b1f99.appspot.com/o/assets%2Ficons%2Fthumb%40terrenos.png?alt=media&token=822e8cd8-611a-41d4-be6e-92e588a5840e",
    },
  ];
  const tablet = useMediaQuery("(min-width:1200px)");
  const isTablet = useMediaQuery("(min-width:768px)");
  const handleToSearch = (link) => history.push(link);

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
              xs={12}
              sm={12}
              md={4}
              lg={2}
              key={categoria.id}
              className="my-2"
            >
              {isTablet ? (
                <div>
                  <div
                    onClick={() => handleToSearch(categoria.link)}
                    className="pointer border-hover category-text"
                  >
                    <img src={categoria.icon} alt={categoria.title} />
                    <div className="subtitle-3 px-3 py-2">
                      {categoria.title}
                    </div>
                  </div>

                  <br />
                  <br />
                </div>
              ) : (
                <Row
                  onClick={() => handleToSearch(categoria.link)}
                  className="d-flex align-items-center"
                >
                  <Col xs={5} sm={5}>
                    <img src={categoria.icon} alt={categoria.title} />
                  </Col>
                  <Col xs={7} sm={6}>
                    <div className="category-text-m text-left">
                      {categoria.title}
                    </div>
                  </Col>
                </Row>
              )}
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
