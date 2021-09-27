import React from "react";
import centro from "../../assets/howitworks/centro.png";
import izquierda from "../../assets/howitworks/izquierda.png";
import derecha from "../../assets/howitworks/derecha.png";
import vertical from "../../assets/howitworks/vertical-anuncio.png";

const ForthSection = () => {
  return (
    <div className="view viewstyle4" id="section4" style={{backgroundColor: '#ffffff', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
      <div className="container2" style={{marginTop: 118}}>
        <section className="mt-5">
          <div className="row align-items-center text-center">
            <div className="col text-center col-md-12">
              <h1 className="BannerTitle2">¿Cuánto cuesta anunciar?</h1>
              <br />
              <div className="subtitulo4">
                <p>
                  En Witideal es
                  <strong style={{color: '#41b8f9'}}> gratis</strong> siempre.
                </p>
              </div>
            </div>
          </div>
          <div className="row align-content-md-between filafull">
            <div className="col text-center d-flex align-items-stretch">
              <img src={izquierda} alt=""  width="100%" />
            </div>
            <div className="col text-center d-flex align-items-stretch">
              <img src={centro}  alt="" width="100%" />
            </div>
            <div className="col text-center d-flex align-items-stretch">
              <img src={derecha} alt="" width="100%" />
            </div>
          </div>
          <div className="row align-content-md-between">
            <div className="col align-items-center">
              <div className="vertical">
                <img src={vertical} alt=""  width="100%" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ForthSection;
