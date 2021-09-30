import React from "react";
import { Grid } from "@material-ui/core";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import DestacadosCard from "./DestacadosCard";
import urlTranslator from "../../helpers/urlTranslator";

const DestacadosSwipe = ({ allDestacados, action, propertyType, area1 }) => {
  const randomDestacado = (array) => {
    let i = array.length - 1;
    for (; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  };

  const random = randomDestacado(allDestacados);
  return (
    <>
      <Swiper
        
        autoplay={{ delay: 3000, disableOnInteraction: false }}
      
        breakpoints={{
          320: { width: 300, slidesPerView: 1 },
          360: { width: 360, slidesPerView: 1.5 },
          460: { width: 500, slidesPerView: 2 },
          560: { width: 600, slidesPerView: 2.5 },
          680: { width: 650, slidesPerView: 3 },
          850: { width: 720, slidesPerView: 3.5 },
          1000: { width: 820, slidesPerView: 4 },
          1200: { width: 1100, slidesPerView: 5 },
          1500: { width: 1400, slidesPerView: 6.5 },
        }}
        loop
        spaceBetween={10}
      >
        {random &&
          random
            .filter((keyword) => {
              return keyword.propertyType === urlTranslator(propertyType);
            })
            .filter((keyword) => {
              return keyword.action === urlTranslator(action);
            })
            .filter((keyword) => {
              return (
                keyword.administrative_area_level_1 === urlTranslator(area1)
              );
            })

            .map((destacado) => (
              <Grid key={destacado.id} item xs={12} sm={6} md={4} xl={1}>
                <SwiperSlide>
                  <DestacadosCard destacado={destacado} />
                </SwiperSlide>
              </Grid>
            ))}
      </Swiper>
    </>
  );
};
export default DestacadosSwipe;
