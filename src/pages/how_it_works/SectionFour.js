import React from "react";
import centro from "../../assets/howitworks/centro.png";
import izquierda1 from "../../assets/howitworks/izq-1.png";
import izquierda2 from "../../assets/howitworks/izq-2.png";
import derecha1 from "../../assets/howitworks/der-1.png";
import derecha2 from "../../assets/howitworks/der-2.png";
import vertical from "../../assets/howitworks/vertical-anuncio.png";

const ForthSection = () => {
  return (
    <div className="view viewstyle4" id="section4" style={{backgroundColor: '#ffffff', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
      <div className="container" style={{marginTop: 118}}>
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
          <div className="row d-flex justify-content-evelyn filafull">
            
            <div className="col-lg-4 text-center">

              <div className="row">
                <div className="col mb-2">
                  <center>
                    <img src={izquierda1} alt=""  width="100%"/>
                  </center>
                </div>
              </div>

              <div className="row">
                <div className="col mt-2">
                  <center>
                    <img src={izquierda2} alt=""  width="100%"/>
                  </center>
                </div>
              </div>

            </div>


            <div className="col-lg-4">
              <center>
                <img src={centro}  alt="" />
              </center>
            </div>


            <div className="col-lg-4 text-center">

              <div className="row">
                <div className="col mb-2">
                  <center>
                    <img src={derecha1} alt=""  width="100%"/>
                  </center>
                </div>
              </div>

              <div className="row">
                <div className="col mt-2">
                  <center>
                    <img src={derecha2} alt=""  width="100%"/>
                  </center>
                </div>
              </div>

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
