import React from "react";
import { Container } from "react-bootstrap";
import { useMediaQuery } from "@material-ui/core";

const Separator = () => {
  const tablet = useMediaQuery("(min-width:768px)");

  return (
    <>
      {tablet ? (
        <div className="separator d-flex justify-content-center align-items-center">
          <Container>
            <p className="text-white separator-title">
              La mejor manera de enamorarte de <br /> tu próxima casa está en{" "}
              <span className="separator-witideal">Witideal</span>
            </p>
            <h2 className="text-white">
              En witideal encontrarás el hogar ideal para cumplir tus sueños,{" "}
              <br />
              tenemos la propiedad para ti, renta o compra tu nuevo hogar.
            </h2>
          </Container>
        </div>
      ) : (
        <div className="separator-2 d-flex justify-content-center align-items-center">
          <Container>
            <p className="text-white separator-title">
              La mejor manera de enamorarte de <br /> tu próxima casa está en{" "}
              <span className="separator-witideal">Witideal</span>
            </p>
            <h3 className="text-white">
              En witideal encontrarás el hogar ideal para cumplir tus sueños,{" "}
              <br />
              tenemos la propiedad para ti, renta o compra tu nuevo hogar.
            </h3>
          </Container>
        </div>
      )}
    </>
  );
};
export default Separator;
