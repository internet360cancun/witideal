import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from 'swiper';
import "swiper/swiper-bundle.css";
import vive from "../../assets/howitworks/slides/vive.png";
import remax from "../../assets/howitworks/slides/remax.png";
import logo from "../../assets/howitworks/slides/logo.jpeg";
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
          {" "}
          <div className="col-xs-3 col-sm-3 col-md-3 mt-5 mb-3">
            <img src={remax} alt="" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <div className="col-xs-3 col-sm-3 col-md-3 mt-5 mb-3">
            <img src={logo} alt="" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <div className="col-xs-3 col-sm-3 col-md-3 mt-5 mb-3">
            <img src={vive} alt="" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <div className="col-xs-3 col-sm-3 col-md-3 mt-5 mb-3">
            <img src={remax} alt="" />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default SectionEight;
