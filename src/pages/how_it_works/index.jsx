import React, { useEffect, useRef } from "react";
import styled from "styled-components";

import useHeaderHeight from "../../Hooks/useHeaderHeight";
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
// import Head from '../../components/head'
import SectionOne from "./SectionOne";
import SectionTwo from "./SectionTwo";
import ThirdSection from "./SectionThree";
import ForthSection from "./SectionFour";
import FifthSection from "./SectionFive";
import SectionSix from "./SectionSix";
import SectionEight from "./SectionEight";
import SelccionarPaquete from "../../components/PackageSelecter/SelccionarPaquete";

const Container = styled.div`
  margin-top: ${(props) => `${props.$top}px`};
`;

const HowItWorks = (props) => {
  const headerHeight = useHeaderHeight();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sectionTwoRef = useRef(null);
  const sectionFourRef = useRef(null);
  const sectionSevenRef = useRef(null);

  return (
    <Container $top={headerHeight}>
      {/* <Head title='¿hCómo funciona?' description='Conoce la nueva manera de anunciar inmuebles' /> */}
      <SectionOne
        sectionTwoRef={sectionTwoRef}
        sectionFourRef={sectionFourRef}
        sectionSevenRef={sectionSevenRef}
      />
      <SectionTwo sectionTwoRef={sectionTwoRef} />
      <ThirdSection />
      <ForthSection sectionFourRef={sectionFourRef} />
      <FifthSection />
      <SectionSix />

      <SelccionarPaquete sectionSevenRef={sectionSevenRef} />
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
