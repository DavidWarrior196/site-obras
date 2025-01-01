import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay, Parallax } from "swiper/modules";

import "swiper/css";
import 'swiper/css/pagination';

import "../styles/globals.css";

export default function Slider({ slides }) {
  
    return (
        <div className="carousel">
            <div className="carousel__display">
                <Swiper 
                    centeredSlides={true}
                    speed={800}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: true,
                    }}
                    loop={true}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={{
                        nextEl: "#carousel__arrow--right",
                        prevEl: "#carousel__arrow--left"
                    }}
                    parallax={true}
                    modules={[Pagination, Navigation, Autoplay, Parallax]}
                >
                    {slides.map((slide, index) => 
                        <SwiperSlide key={index}>
                            <div className="carousel__slide">
                                <div className="carousel__slide_image_container">
                                    <img 
                                        src={`/images/carousel/${slide.imageSrc}`}
                                        alt={slide.imageAlt}
                                        className="carousel__slide_image"
                                    />
                                </div>
                                <div className="carousel__slide_text_container">
                                    <div className="carousel__slide_text">
                                        <h1 className="carousel__slide_title light_text" data-swiper-parallax="-300">
                                            {slide.title}
                                        </h1>
                                        <span className="carousel__slide_description light_text" data-swiper-parallax="-500">
                                            {slide.description}
                                        </span>
                                        <div className="carousel__slide_button" data-swiper-parallax="-700">
                                            <ExploreButton 
                                                text="Explora Mais"
                                                url="/"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    )}
                </Swiper>
            </div>
            <div className="carousel__controls">
                <button 
                    className="carousel__arrow"
                    id="carousel__arrow--left"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-left"><path d="m15 18-6-6 6-6"/></svg>
                </button>
                <button 
                    className="carousel__arrow"
                    id="carousel__arrow--right"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>
                </button>
            </div>
        </div>
    );
}

function ExploreButton({ text, url }) {
    return (
        <a 
            className="button--primary"
            href={url}
        >
            {text}
        </a>
    );
}
