import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";
import "swiper/swiper-bundle.css";
import vive from "../../assets/howitworks/slides/vivedelasrentas.png";
import remax from "../../assets/howitworks/slides/remax.png";
import mundoinmobiliario from "../../assets/howitworks/slides/mundoinmobiliario.png";
import calmena from "../../assets/howitworks/slides/calmena.png";
import crediconsulting from "../../assets/howitworks/slides/crediconsulting.png";
import lgc from "../../assets/howitworks/slides/lgc.png";
import lgcres from "../../assets/howitworks/slides/lgcres.png";
import remate from "../../assets/howitworks/slides/remate.png";

SwiperCore.use([Autoplay]);

const SectionEight = () => {
  return (
    <div className="container2" id="section8">
      <div className="BannerTitle8">Nuestros Aliados</div>
      <Swiper
        loop
        autoplay
        centeredSlides
        breakpoints={{
          576: { width: 576, slidesPerView: 2 },
          768: { width: 768, slidesPerView: 2 },
          992: { width: 900, slidesPerView: 3 },
          1200: { width: 1200, slidesPerView: 4 },
        }}
      >
        <SwiperSlide>
          <div className="col-xs-3 col-sm-3 col-md-3 mt-5 mb-3">
            <a href="https://www.vivedelasrentas.com/" target="_blank" rel="noopener noreferrer">
              <img className="imgcontainer" src={vive} alt="" />
            </a>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="col-xs-3 col-sm-3 col-md-3 mt-5 mb-3">
            <a href="https://remax.com.mx/" target="_blank" rel="noopener noreferrer">
              <img className="imgcontainer" src={remax} alt="" />
            </a>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="col-xs-3 col-sm-3 col-md-3 mt-5 mb-3">
            <a href="https://legalglobalconsulting.com/lgc/" target="_blank" rel="noopener noreferrer">
              <img className="imgcontainer" src={lgc} alt="" />
            </a>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="col-xs-3 col-sm-3 col-md-3 mt-5 mb-3">
            <a href="https://www.calmena.mx/" target="_blank" rel="noopener noreferrer">
              <img className="imgcontainer" src={calmena} alt="" />
            </a>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="col-xs-3 col-sm-3 col-md-3 mt-5 mb-3">
            <a href="https://crediconsulting.com/" target="_blank" rel="noopener noreferrer">
              <img className="imgcontainer" src={crediconsulting} alt="" />
            </a>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="col-xs-3 col-sm-3 col-md-3 mt-5 mb-3">
            <a href="https://www.lgcrealestateschool.mx/" target="_blank" rel="noopener noreferrer">
              <img className="imgcontainer" src={lgcres} alt="" />
            </a>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="col-xs-3 col-sm-3 col-md-3 mt-5 mb-3">
            <a href="http://mundoinmobiliario.tv/" target="_blank" rel="noopener noreferrer">
              <img className="imgcontainer" src={mundoinmobiliario} alt="" />
            </a>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="col-xs-3 col-sm-3 col-md-3 mt-5 mb-3">
            <a href="https://www.rematecasas.mx/" target="_blank" rel="noopener noreferrer">
              <img className="imgcontainer" src={remate} alt="" />
            </a>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default SectionEight;
