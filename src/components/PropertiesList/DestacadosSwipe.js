import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { Grid } from '@material-ui/core';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import DestacadosCard from './DestacadosCard';

const DestacadosSwipe = () => {
  const is1546px = useMediaQuery({ query: '(max-width:1546px)' });

  return (
    <Swiper spaceBetween={20} slidesPerView={is1546px ? 5 : 6.5}>
      <Grid item xs={12} sm={6} md={4} xl={1}>
        <SwiperSlide>
          <DestacadosCard />
        </SwiperSlide>
      </Grid>
      <Grid item xs={12} sm={6} md={4} xl={1}>
        <SwiperSlide>
          <DestacadosCard />
        </SwiperSlide>
      </Grid>
      <Grid item xs={12} sm={6} md={4} xl={1}>
        <SwiperSlide>
          <DestacadosCard />
        </SwiperSlide>
      </Grid>
      <Grid item xs={12} sm={6} md={4} xl={1}>
        <SwiperSlide>
          <DestacadosCard />
        </SwiperSlide>
      </Grid>
      <Grid item xs={12} sm={6} md={4} xl={1}>
        <SwiperSlide>
          <DestacadosCard />
        </SwiperSlide>
      </Grid>
      <Grid item xs={12} sm={6} md={4} xl={1}>
        <SwiperSlide>
          <DestacadosCard />
        </SwiperSlide>
      </Grid>
      <Grid item xs={12} sm={6} md={4} xl={1}>
        <SwiperSlide>
          <DestacadosCard />
        </SwiperSlide>
      </Grid>
      <Grid item xs={12} sm={6} md={4} xl={1}>
        <SwiperSlide>
          <DestacadosCard />
        </SwiperSlide>
      </Grid>
      <Grid item xs={12} sm={6} md={4} xl={1}>
        <SwiperSlide>
          <DestacadosCard />
        </SwiperSlide>
      </Grid>
      <Grid item xs={12} sm={6} md={4} xl={1}>
        <SwiperSlide>
          <DestacadosCard />
        </SwiperSlide>
      </Grid>
      <Grid item xs={12} sm={6} md={4} xl={1}>
        <SwiperSlide>
          <DestacadosCard />
        </SwiperSlide>
      </Grid>
    </Swiper>
  );
};
export default DestacadosSwipe;
