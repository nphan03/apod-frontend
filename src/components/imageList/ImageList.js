import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";


import "swiper/css";
import "swiper/css/pagination";

import './imagelist.css';

import { Pagination } from "swiper";

class ImageList extends React.Component {
    render(){
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
                    {this.props.images.map((img,index)=>
                        <SwiperSlide key={index} className='image' onClick={()=>this.props.chooseImg(img)}>
                            <div className='image__ofDate'>
                                <img src={img.url} alt='Image of the Date'></img>
                            </div>
                            <small className='date'>{img.date}</small>
                        </SwiperSlide>
                    )}
                </Swiper>
            </section>
        ;
    }
}

export default ImageList;
