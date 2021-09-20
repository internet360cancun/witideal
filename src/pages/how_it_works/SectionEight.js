import React from 'react';
import { Carousel } from 'react-bootstrap';
import vive from '../../assets/howitworks/slides/vive.png';
import remax from '../../assets/howitworks/slides/remax.png';
import logo from '../../assets/howitworks/slides/logo.jpeg';

const SectionEight = () => {
  return (
    <div className="container2">
      <Carousel variant="dark">
        <Carousel.Item>
          <div className="col-xs-3 col-sm-3 col-md-3 mt-5 mb-3">
            <img src={vive} alt="" />
          </div>
          <div className="col-xs-3 col-sm-3 col-md-3 mt-5 mb-3">
            <img src={remax} alt="" />
          </div>
          <div className="col-xs-3 col-sm-3 col-md-3 mt-5 mb-3">
            <img src={logo} alt="" />
          </div>
          <div className="col-xs-3 col-sm-3 col-md-3 mt-5 mb-3">
            <img src={vive} alt="" />
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="col-xs-3 col-sm-3 col-md-3 mt-5 mb-3">
            <img src={vive} alt="" />
          </div>
          <div className="col-xs-3 col-sm-3 col-md-3 mt-5 mb-3">
            <img src={remax} alt="" />
          </div>
          <div className="col-xs-3 col-sm-3 col-md-3 mt-5 mb-3">
            <img src={logo} alt="" />
          </div>
          <div className="col-xs-3 col-sm-3 col-md-3 mt-5 mb-3">
            <img src={vive} alt="" />
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="col-xs-3 col-sm-3 col-md-3 mt-5 mb-3">
            <img src={vive} alt="" />
          </div>
          <div className="col-xs-3 col-sm-3 col-md-3 mt-5 mb-3">
            <img src={remax} alt="" />
          </div>
          <div className="col-xs-3 col-sm-3 col-md-3 mt-5 mb-3">
            <img src={logo} alt="" />
          </div>
          <div className="col-xs-3 col-sm-3 col-md-3 mt-5 mb-3">
            <img src={vive} alt="" />
          </div>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default SectionEight;
