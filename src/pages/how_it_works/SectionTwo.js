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
    <div className="view viewstyle2" style={{backgroundColor: '#ffffff', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
      {/* Content */}
      <div className="container2" style={{marginTop: 118}}>
        <section className="mt-5">
        <div className="imgs">
            <img className="izq-1" src={i1}/>
            <img className="izq-2" src={i2}/>
            <img className="der-1" src={d1} />
            <img className="der-2" src={d2} />
          </div>
          <div className="row">
            <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 mb-4 text-left">
              <h1 className="BannerTitle2">¿Por qué usar Witideal?</h1>
              <hr className="subwrite" />
              <br />
              <p className="parrafo1 text-left">
                En Witideal publicar anuncios inmobiliarios es
              </p>
              <br />
              <div className="gratis">GRATIS</div>
              <img className="sign" src={free}/>
              <br />
              <div className="btnlargo">Publica todos tus inmuebles</div>
              <div className="borderbtn">
                <img src={pup}/>
              </div>
            </div>
            {/*CARDS*/}
            <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 mb-4 text-left">
              <div className="card align-content-center card1" style={{backgroundColor: '#e7e7e7'}}>
                <img src={card1} className="card-img-top"/>
                <div className="card-body text-center">
                  <h5 className="card-title">$100,000</h5>
                  <p className="card-text">Casa para comprar</p>
                  <br />
                  <a href="#" className="cardbtn">CONTACTAR AHORA</a>
                </div>
              </div>
              <div className="card align-content-center card2" style={{backgroundColor: '#e7e7e7'}}>
                <img src={card1} className="card-img-top"/>
                <div className="card-body text-center">
                  <h5 className="card-title">$100,000</h5>
                  <p className="card-text">Casa para comprar</p>
                  <br />
                </div>
              </div>
              <div className="card align-content-center card3" style={{backgroundColor: '#e7e7e7'}}>
                <img src={card1} className="card-img-top"/>
                <div className="card-body text-center">
                  <h5 className="card-title">$100,000</h5>
                  <p className="card-text">Casa para comprar</p>
                  <br />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SectionTwo;
