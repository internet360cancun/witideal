import React from "react";
import card1 from "../../assets/howitworks/card1.png";
import pup from "../../assets/howitworks/pup.png";
import i1 from "../../assets/howitworks/i-1.png";
import i2 from "../../assets/howitworks/i-2.png";
import d1 from "../../assets/howitworks/d-1.png";
import d2 from "../../assets/howitworks/d-2.png";

import free from "../../assets/howitworks/free.png";

const SectionTwo = () => {
  return (
    <div
      id="section2"
      className="view"
      style={{
        backgroundColor: "#ffffff",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      {/* Content */}
      <div
        id="section2"
        className="container2 container2movil"
        style={{ marginTop: 118 }}
      >
        {/*Section: Primer view*/}
        <section className="mt-5">
          <div className="custom-container2   row align-items-center">
            <div className="col-md-6 mb-4">
              <h1 className="BannerTitle2 text-md-left text-center">
                ¿Por qué usar Witideal?
              </h1>
              <hr className="subwrite" />
              <br />
              <p className="parrafo1">
                En Witideal publicar anuncios inmobiliarios es
              </p>
              <br />
              <p className="gratis text-left">GRATIS</p>
              <img className="sign" src={free} alt />
              <br />
              <p className="btnlargo">Publica todos tus inmuebles</p>
              <div className="borderbtn">
                <img src={pup} alt />
              </div>
              <img className="izq-1" src={i1} alt />
              <img className="izq-2" src={i2} alt />
            </div>
            {/*CARDS*/}
            <div className="col-md-6 mb-4 ">
              <div
                className="card align-content-center card1"
                style={{ backgroundColor: "#e7e7e7" }}
              >
                <img src={card1} className="card-img-top" alt="..." />
                <div className="card-body text-center">
                  <h5 className="card-title">$100,000</h5>
                  <p className="card-text">Casa para comprar</p>
                  <br />
                  <p className="cardbtn">CONTACTAR AHORA</p>
                </div>
              </div>
              <div
                className="card align-content-center card2"
                style={{ backgroundColor: "#e7e7e7" }}
              >
                <img src={card1} className="card-img-top" alt="..." />
                <div className="card-body text-center">
                  <h5 className="card-title">$100,000</h5>
                  <p className="card-text">Casa para comprar</p>
                  <br />
                </div>
              </div>
              <div
                className="card align-content-center card3"
                style={{ backgroundColor: "#e7e7e7" }}
              >
                <img src={card1} className="card-img-top" alt="..." />
                <div className="card-body text-center">
                  <h5 className="card-title">$100,000</h5>
                  <p className="card-text">Casa para comprar</p>
                  <br />
                </div>
              </div>
              <img className="der-1" src={d1} alt />
              <img className="der-2" src={d2} alt />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SectionTwo;
