import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {
  Navigation, Pagination, Scrollbar, A11y,
} from 'swiper';
import 'swiper/swiper.scss';


import { FullScreen, useFullScreenHandle } from "react-full-screen";

function Gallery(props) {
  const handle = useFullScreenHandle();
  const [fsMode, fsModeSet] = useState(false);
  
  SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);
  return <FullScreen handle={handle} className={fsMode ? 'FS' : 'FSNone'}>
    <Swiper breakpoints={{
      320: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 3,
      },
    }}
    spaceBetween={50}
    navigation
    pagination={{ clickable: true }}
    scrollbar={{ draggable: true }}
    onDoubleClick={handle.enter}>
      {props.arrAttractions.map((el, index) => (
        <SwiperSlide onDoubleClick={handle.enter} key={index} className="slider-item">
          <div className="slider-img-wrap">
          <img src={el.photoUrl} alt={el.localizations[props.lang].name}></img>
          </div>
          <p key={index} className="slide-title">{el.localizations[props.lang].name}</p>
          <p>{el.localizations[props.lang].description}</p>
        </SwiperSlide>
      ))
      }
    </Swiper>
    </FullScreen>;
}

Gallery.propTypes = {
  arrAttractions: PropTypes.array.isRequired,
  lang: PropTypes.number.isRequired,
};

export default Gallery;
