import React, { useEffect, useState } from "react";
import useHeaderHeight from "../../Hooks/useHeaderHeight";
import styled from "styled-components";
// import Cover from './cover'
// import WhyToUse from './WhyToUse'
// import Formula from './formula'
// import Witicoins from './witicoins'
// import Calculator from './calculator'
// import EffectiveAdd from './effectiveAd'
// import Phones from './phones'
// import HowMuchDoesItCost from './howMuchDoesItCost'
// import HowToOrderAnnouncements from './HowToOrderAnnouncements'
// import HowToOrderAnnouncementsMobile from './HowToOrderAnnouncementsMobile'
import { useMediaQuery } from "@material-ui/core";
// import Head from '../../components/head'
import SectionOne from "./SectionOne";
import SectionTwo from "./SectionTwo";
import ThirdSection from "./SectionThree";
import ForthSection from "./SectionFour";
import FifthSection from "./SectionFive";
import SectionSix from "./SectionSix";
import SectionSeven from "./SectionSeven";
import SectionEight from "./SectionEight";
import SelccionarPaquete from "../../components/PackageSelecter/SelccionarPaquete";

const Container = styled.div`
  margin-top: ${(props) => `${props.$top}px`};
`;

const HowItWorks = (props) => {
  const headerHeight = useHeaderHeight();
  const isMobile = useMediaQuery("(max-width:700px)");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container $top={headerHeight}>
      {/* <Head title='¿hCómo funciona?' description='Conoce la nueva manera de anunciar inmuebles' /> */}
      <SectionOne />
      <SectionTwo />
      <ThirdSection />
      <ForthSection />
      <FifthSection />
      <SectionSix />
    
      <SelccionarPaquete />
      <SectionEight />
      <div className="py-5"></div>
      {/* <Cover /> */}
      {/* <WhyToUse /> */}
      {/* <EffectiveAdd /> */}
      {/* <HowMuchDoesItCost /> */}
      {/* <Formula /> */}
      {/* <Calculator /> */}
      {/* <Witicoins /> */}
      {/* {isMobile && (
        <HowToOrderAnnouncementsMobile />
      )} */}
      {/* {!isMobile && (
        <HowToOrderAnnouncements />
      )} */}
      {/* <Phones /> */}
    </Container>
  );
};

export default HowItWorks;
