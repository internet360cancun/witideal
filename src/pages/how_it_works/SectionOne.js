import React, { useEffect, useState } from "react";
import firebase from "firebase/compat/app";

import ModalVideo from "react-modal-video";
import { Link } from "react-scroll";

import t1 from "../../assets/howitworks/t1.png";
import t2 from "../../assets/howitworks/t2.png";
import t3 from "../../assets/howitworks/t3.png";
import vecw from "../../assets/howitworks/vecw.png";
import vecb from "../../assets/howitworks/vecb.png";
import mac from "../../assets/howitworks/mac.png";

const SectionOne = () => {


  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
  };
  const onOpen = () => {
    setIsOpen(true);
  };

  return (
    <div
      className="view customview1"
      style={{
        background: "linear-gradient(180deg, #3f19f9 0%, #2c0cc5 100%)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover !important",
      }}
    >
      {/* Content */}
      <div className="container" style={{ marginTop: 40 }}>
        {/*Section: Primer view*/}
        <section className="mt-5">
          <div className="row text-center">
            <div className="col col-sm-3 col-md-4">
              <Link
                to="#section2"
                smooth={true}
                duration={750}
                className="btn custombtn customcople1 waves-effect waves-light"
              >
                ¿Por qué utilizar Witideal?
              </Link>
            </div>
            <div className="col col-sm-3 col-md-4">
              <Link
                to="section4"
                smooth={true}
                duration={1000}
                className="btn custombtn customcople2 waves-effect waves-light"
              >
                ¿Cuanto cuesta?
              </Link>
            </div>
            <div className="col col-sm-4 col-md-4">
              <Link
                to="section4"
                smooth={true}
                duration={1200}
                className="btn custombtn customcople3 waves-effect waves-light"
              >
                ¿Cómo se ordenan los anuncios?
              </Link>
            </div>
          </div>
          <div className="row d-flex justify-content-left">
            <div className="col-md-11 col-xl-6 mb-4">
              <div className="BannerTitle text-left">
                Conoce la nueva manera de anunciar inmuebles.
              </div>
              <br />
              <ModalVideo
                channel="youtube"
                autoplay
                isOpen={isOpen}
                videoId="qrsS5_oVB-w"
                onClose={onClose}
              />
              <div className="btn custombtnindex" onClick={onOpen}>
                <i className="fas fa-play mx-3" />
                Ver video
              </div>
              <br />
              <a className="triangulo-1">
                <img src={t1} />
              </a>
              <a className="triangulo-2">
                <img src={t2} />
              </a>
              <a className="triangulo-3">
                <img src={t3} />
              </a>
            </div>
            <div className="col-md-6 mb-4">
              <img className="first" src={vecw}  />
              <img className="second" src={vecb}  />
              <img className="third" src={mac}  />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SectionOne;
