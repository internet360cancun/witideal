import React, { useEffect, useRef } from "react";
import styled from "styled-components";

import useHeaderHeight from "../../Hooks/useHeaderHeight";
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
    document.title = "Witideal | ¿Cómo funciona?";
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sectionTwoRef = useRef(null);
  const sectionFourRef = useRef(null);
  const sectionSevenRef = useRef(null);

  return (
    <Container $top={headerHeight}>
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
    </Container>
  );
};

export default HowItWorks;
