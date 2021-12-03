import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useHistory } from "react-router";

import urlTranslator from "../../helpers/urlTranslator";

const card =
  "https://firebasestorage.googleapis.com/v0/b/witideal-b1f99.appspot.com/o/witideal%2F04YNDRJKQQfjQ9p4AKqQiRFUGOi1%2Fs2qi1S0k58xZfyoZspW0%2Fthumb%401100_579259_9.jpg?alt=media&token=3dee3acb-6641-44fc-ac2a-1c3b154cdbe3";

const Destacados = ({ allDestacados }) => {
  const destacados = [
    {
      id: 1,
      img: 1,
      price: 10000,
      title: "Casa para rentar",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur temporibus repudiandae",
    },
    {
      id: 1,
      img: 1,
      price: 14000,
      title: "Casa para rentar",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur temporibus repudiandae",
    },
    {
      id: 1,
      img: 1,
      price: 18000,
      title: "Casa para rentar",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur temporibus repudiandae ",
    },
    {
      id: 1,
      img: 1,
      price: 25000,
      title: "Casa para rentar",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur temporibus repudiandae ",
    },
    {
      id: 1,
      img: 1,
      price: 90000,
      title: "Casa para rentar",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur temporibus repudiandae ",
    },
    {
      id: 1,
      img: 1,
      price: 12000,
      title: "Casa para rentar",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur temporibus repudiandae ",
    },
    {
      id: 1,
      img: 1,
      price: 10000,
      title: "Casa para rentar",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur temporibus repudiandae ",
    },
    {
      id: 1,
      img: 1,
      price: 19000,
      title: "Casa para rentar",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur temporibus repudiandae ",
    },
    {
      id: 1,
      img: 1,
      price: 13000,
      title: "Casa para rentar",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur temporibus repudiandae",
    },
  ];

  const history = useHistory();

  const goToProperty = (propertyType, action, id) => {
    history.push(
      `propiedad/${urlTranslator(propertyType)}/${urlTranslator(action)}/${id}`
    );
  };

  return (
    <div>
      <Container>
        <h1 className="text-left title py-5 ml-3">Destacados</h1>
        <Row>
          {allDestacados.map((destacado) => (
            <Col
              onClick={() =>
                goToProperty(
                  destacado.propertyType,
                  destacado.action,
                  destacado.id
                )
              }
              md={4}
              key={destacado.id}
              className="d-flex justify-content-center py-2 pointer"
            >
              <Card className="card-hover" style={{ width: "426px" }}>
                <Card.Img
                  variant="top"
                  src={destacado.principalPhotoPath}
                  style={{ height: "160px" }}
                />
                <Card.Body>
                  <div className="d-flex justify-content-around">
                    <p className="price">
                      ${destacado.price} {destacado.currency}{" "}
                    </p>
                    <p className="action">
                      {urlTranslator(destacado.propertyType)} para{" "}
                      {urlTranslator(destacado.action)}{" "}
                    </p>
                  </div>
                  <p className="text-destacado text-left px-2">
                    {destacado.sublocality_level_1 &&
                      `${destacado.sublocality_level_1}, `}
                    {destacado.administrative_area_level_2_3 &&
                      `${destacado.administrative_area_level_2_3} ,`}
                    {destacado.administrative_area_level_1 &&
                      `${destacado.administrative_area_level_1} ,`}
                    {destacado.country || ""}
                  </p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Destacados;
