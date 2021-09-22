import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from 'swiper';
import "swiper/swiper-bundle.css";
import vive from "../../assets/howitworks/slides/vivedelasrentas.png";
import remax from "../../assets/howitworks/slides/remax.png";
import mundoinmobiliario from "../../assets/howitworks/slides/mundoinmobiliario.png";
import calmena from '../../assets/howitworks/slides/calmena.png'
import crediconsulting from '../../assets/howitworks/slides/crediconsulting.png'
import lgc from '../../assets/howitworks/slides/lgc.png'
import lgcres from '../../assets/howitworks/slides/lgcres.png'
import remate from '../../assets/howitworks/slides/remate.png'


SwiperCore.use([Autoplay]);


const SectionEight = () => {
  return (
    <div className="container2" id="section8">
      <div className="BannerTitle8">Nuestros Aliados</div>
      <Swiper loop={true} autoplay={true} >
        <SwiperSlide>
          <div className="col-xs-3 col-sm-3 col-md-3 mt-5 mb-3">
            <img src={vive} alt="" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="col-xs-3 col-sm-3 col-md-3 mt-5 mb-3">
            <img src={remax} alt="" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="col-xs-3 col-sm-3 col-md-3 mt-5 mb-3">
            <img src={lgc} alt="" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="col-xs-3 col-sm-3 col-md-3 mt-5 mb-3">
            <img src={calmena} alt="" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="col-xs-3 col-sm-3 col-md-3 mt-5 mb-3">
            <img src={crediconsulting} alt="" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="col-xs-3 col-sm-3 col-md-3 mt-5 mb-3">
            <img src={lgcres} alt="" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="col-xs-3 col-sm-3 col-md-3 mt-5 mb-3">
            <img src={mundoinmobiliario} alt="" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="col-xs-3 col-sm-3 col-md-3 mt-5 mb-3">
            <img src={remate} alt="" />
          </div>
        </SwiperSlide>

      </Swiper>
    </div>
  );
};

export default SectionEight;
