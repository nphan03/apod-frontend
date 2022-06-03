import React from 'react'

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from "swiper";

const ImageList = (props) => {
  const {
    images, 
    chooseImg
  } = props

  return <section className='image__list'>
    <Swiper 
      slidesPerView={2}
      spaceBetween={20}
      centeredSlides={true}
      pagination={{
        clickable: true,
      }}
      modules={[Pagination]}
      className="mySwiper container">
        {images.map((img,index)=>
            <SwiperSlide key={index} className='image' onClick={()=>chooseImg(img)}>
                <div className='image__ofDate'>
                    <img src={img.url} alt='of the Date' />
                </div>
                <small className='date'>{img.date}</small>
            </SwiperSlide>
        )}
    </Swiper>
  </section>
}

export default ImageList