import React from "react";
import line from "../../assets/howitworks/line.png";
import mudoinv from "../../assets/howitworks/mudoinv.png";
import legalglobal from "../../assets/howitworks/legalglobal.png";
import rematecasas from "../../assets/howitworks/remateccasas.png";
import radio from "../../assets/howitworks/radio-back.png";

const SectionSix = () => {
  return (
    <div className="view viewstyle6" style={{background: 'linear-gradient(254.35deg, #3f19f9 8.47%, #41b8f9 94.38%)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
      <div className="container2 containerdp5" style={{marginTop: 118}}>
        <section className="mt-5">
          <div className="row align-items-center text-center">
            <div className="col text-center col-md-12">
              <div className="BannerTitle5">
                Algunas de nuestras redes donde podrían <strong style={{color: '#32ffd2'}}>verse tus anuncios y tus marcas</strong>
              </div>
              <br />
            </div>
          </div>
          <div className="brandsstyle d-flex justify-content-center">
            <div className="row justify-content-center justify-content-md-center">
              <div className="col-4 mx-auto">
                <div className="d-flex justify-content-center">
                  <img src={mudoinv} width="550vh" />
                </div>
              </div>
              <div className="col-0 mx-auto">
                <div className="text-center">
                  <img src={line}/>
                </div>
              </div>
              <div className="col-4 mx-auto">
                <div className="d-flex justify-content-center">
                  <img src={legalglobal} width="100%" />
                </div>
              </div>
              <div className="col-0 mx-auto">
                <div className="text-center">
                <img src={line}/>
                </div>
              </div>
              <div className="col-3 mx-auto">
                <div className="d-flex justify-content-center">
                  <img src={rematecasas} />
                </div>
              </div>
            </div>
          </div>
          <div className="brandsstylemobile justify-content-center">
            <div className="row">
              <div className="col mx-auto">
                <div className="d-flex justify-content-center">
                  <img className="brand1" src={mudoinv} />
                </div>
                <br />
                <div className="d-flex justify-content-center">
                  <img className="brand1" src={legalglobal}/>
                </div>
                <br />
                <div className="d-flex justify-content-center">
                  <img src={rematecasas}/>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="bannerbajo">
        <div className="d-flex justify-content-center">
          <img className="imgradio" src={radio}/>
        </div>
        <div className="container2">
          <div className="row">
            <div className="col">
              <div className="textbanner text-center">
                Además menciones en el programa de
                <strong style={{color: 'aqua'}}>RADIO +</strong> reconocido del
                <strong style={{color: 'aqua'}}>GIRO</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default SectionSix;
