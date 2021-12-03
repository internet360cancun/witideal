import React from "react";
import { Card } from "react-bootstrap";

const PublicaCard = ({ id, img, title, desc }) => {
  return (
    <Card style={{ width: "18rem" }} className="my-3 card-hover">
      <Card.Body>
        <div className="d-flex justify-content-around">
          <div>
            <img src={img} alt={title} className="mt-4" />
          </div>
          <div>
            <p className="card-number">{id}</p>
          </div>
        </div>
        <div className="text-left">
          <p className="subtitle">{title}</p>
          <p className="text">{desc}</p>
        </div>
      </Card.Body>
    </Card>
  );
};

export default PublicaCard;
