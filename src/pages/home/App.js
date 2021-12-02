import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useMediaQuery } from "@material-ui/core";

const img =
  "https://firebasestorage.googleapis.com/v0/b/witideal-b1f99.appspot.com/o/assets%2Ficons%2Fthumb%40app.png?alt=media&token=b2ac6728-dff9-47f5-8818-b2dd84d21ed5";

const playstore =
  "https://firebasestorage.googleapis.com/v0/b/witideal-b1f99.appspot.com/o/assets%2Ficons%2Fthumb%40playstore.png?alt=media&token=69c54a95-21fd-4bb9-bea8-cb1871246bb9";

const bannerApp =
  "https://firebasestorage.googleapis.com/v0/b/witideal-b1f99.appspot.com/o/assets%2Ficons%2Fthumb%40banner-app.png?alt=media&token=0af6dc4f-b3b3-4956-88b5-fb414f434e5b";

const bannerAppRespo =
  "https://firebasestorage.googleapis.com/v0/b/witideal-b1f99.appspot.com/o/assets%2Ficons%2Fthumb%40banner-app-resp.png?alt=media&token=2a204f10-3d6d-4cfd-98ba-920e9d5d45a6";

const App = () => {
  const tablet = useMediaQuery("(min-width:992px)");

  return (
    <>
      {tablet ? (
        <div
          className="pt-5"
          style={{
            backgroundImage: `url(${bannerApp})`,
          }}
        >
          <Container>
            <Row>
              <Col md={6}>
                <div>
                  <br />
                  <br />
                  <p className="title-3">Descarga nuestra App</p>
                  <h2 className="text-white text-left">
                    Realiza tus publicaciones o búsquedas de la forma más
                    sencilla
                  </h2>
                  <ul className="text-app text-white text-left">
                    <li>
                      <span style={{ color: "#32ffd2" }}>Encuentra</span> casas,
                      departamentos, oficinas, terreno y más
                    </li>
                    <li>
                      <span style={{ color: "#32ffd2" }}>Administra</span>
                      tus propiedades y recibe notificaciones desde tu celular
                    </li>
                  </ul>
                  <div className="d-flex justify-content-center">
                    <img
                      src={playstore}
                      alt="descarga nuestra app en playstore"
                    />
                  </div>
                </div>
              </Col>
              <Col md={6}>
                <div className="d-flex justify-content-center align-items-end">
                  <img src={img} alt="descarga nuestra pp" />
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      ) : (
        <div
          className="pt-5"
          style={{
            backgroundImage: `url(${bannerAppRespo})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <Container>
            <Row>
              <Col>
                <div>
                  <br />
                  <p className="title-3">Descarga nuestra App</p>
                  <h3 className="text-white text-left py-1">
                    Realiza tus publicaciones o búsquedas de la forma más
                    sencilla
                  </h3>
                  <ul className="text-app text-white text-left">
                    <li>
                      <span style={{ color: "#32ffd2" }}>Encuentra</span> casas,
                      departamentos, oficinas, terreno y más
                    </li>
                    <li>
                      <span style={{ color: "#32ffd2" }}>Administra</span>
                      tus propiedades y recibe notificaciones desde tu celular
                    </li>
                  </ul>
                  <div className="d-flex justify-content-center">
                    <img
                      className="playstore"
                      src={playstore}
                      alt="descarga nuestra app en playstore"
                    />
                  </div>
                </div>
              </Col>
              <Col>
                <div className="d-flex justify-content-center align-items-end">
                  <img
                    className="phone-app"
                    src={img}
                    alt="descarga nuestra pp"
                  />
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      )}
    </>
  );
};

export default App;
