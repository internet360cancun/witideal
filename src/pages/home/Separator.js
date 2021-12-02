import React from "react";
import { Container } from "react-bootstrap";

const Separator = () => {
  return (
    <div className="separator d-flex justify-content-center align-items-center">
      <Container>
        <p className="text-white separator-title">
          La mejor manera de enamorarte de <br /> tu próxima casa está en{" "}
          <span className="separator-witideal">Witideal</span>
        </p>
        <h2 className="text-white font-weight-bold">
          En witideal encontrarás el hogar ideal para cumplir tus sueños, <br />
          tenemos la propiedad para ti, renta o compra tu nuevo hogar.
        </h2>
      </Container>
    </div>
  );
};
export default Separator;
