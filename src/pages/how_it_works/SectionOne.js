import React, { useState } from "react";
import ModalVideo from "react-modal-video";

import t1 from "../../assets/howitworks/t1.png";
import t2 from "../../assets/howitworks/t2.png";
import t3 from "../../assets/howitworks/t3.png";
import macX from "../../assets/howitworks/mac-index.png";

const SectionOne = ({ sectionTwoRef, sectionFourRef, sectionSevenRef }) => {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => setIsOpen(false);

  const onOpen = () => setIsOpen(true);

  const scrollSectionTwo = () => sectionTwoRef.current.scrollIntoView();

  const scrollSectionFour = () => sectionFourRef.current.scrollIntoView();

  const scrollSectionSeven = () => sectionSevenRef.current.scrollIntoView();

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
              <p
                onClick={scrollSectionTwo}
                className="btn custombtn customcople1 waves-effect waves-light"
              >
                ¿Por qué utilizar Witideal?
              </p>
            </div>
            <div className="col col-sm-3 col-md-4">
              <p
                onClick={scrollSectionFour}
                className="btn custombtn customcople2 waves-effect waves-light"
              >
                ¿Cuanto cuesta?
              </p>
            </div>
            <div className="col col-sm-4 col-md-4">
              <p
                onClick={scrollSectionSeven}
                className="btn custombtn customcople3 waves-effect waves-light"
              >
                ¿Cómo se ordenan los anuncios?
              </p>
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
                Ver vídeo
              </div>
              <br />
              <div className="triangulo-1">
                <img src={t1} alt="" />
              </div>
              <div className="triangulo-2">
                <img src={t2} alt="" />
              </div>
              <div className="triangulo-3" style={{cursor: "pointer"}}  onClick={scrollSectionTwo} >
                <img src={t3} alt="" />
              </div>
            </div>
            <div className="col-md-6 mb-4">
              <img className="first" src={macX} alt="" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SectionOne;
