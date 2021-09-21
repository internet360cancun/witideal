import React from "react";
import { useMediaQuery } from "react-responsive";
import { Grid } from "@material-ui/core";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import DestacadosCard from "./DestacadosCard";

const DestacadosSwipe = ({ allDestacados }) => {
  const is1546px = useMediaQuery({ query: "(max-width:1546px)" });

  console.log(allDestacados, "alldestacados");

  return (
    <>
      <Swiper spaceBetween={20}>
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
