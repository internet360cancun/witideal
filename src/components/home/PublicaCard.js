import React from "react";
import { Card } from "react-bootstrap";

const PublicaCard = ({ id, img, title, desc }) => {
  return (
    <Card>
      <div className="d-flex justify-content-around">
        <div>{img}</div>
        <div>{id}</div>
      </div>
      <div>
        <p>{title}</p>
        <p>{desc}</p>
      </div>
    </Card>
  );
};

export default PublicaCard;
