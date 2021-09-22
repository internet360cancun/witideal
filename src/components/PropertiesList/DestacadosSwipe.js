import React from "react";
import { Grid } from "@material-ui/core";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import DestacadosCard from "./DestacadosCard";
import { useMediaQuery } from "react-responsive";

const DestacadosSwipe = ({ allDestacados }) => {
  const isDestkop = useMediaQuery({ query: "(min-width: 1224px)" });
  const isPhone = useMediaQuery({ query: "(min-width: 320px)" });
  return (
    <>
      <Swiper spaceBetween={10} slidesPerView={2}>
        {allDestacados &&
          allDestacados.map((destacado) => (
            <Grid item xs={12} sm={6} md={4} xl={1}>
              <SwiperSlide key={destacado.lat}>
                <DestacadosCard destacado={destacado} />
              </SwiperSlide>
            </Grid>
          ))}
      </Swiper>
    </>
  );
};
export default DestacadosSwipe;
