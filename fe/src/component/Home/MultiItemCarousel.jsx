import React from 'react';
import { TopProduct } from "./TopProduct";
import CarouselItem from "./CarouselItem";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const MultiItemCarousel = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: false
    };

    return (
        <div>
            <Slider {...settings}>
                {TopProduct.map((item, index) => (
                    <CarouselItem key={item.id || index} image={item.image} title={item.title} />
                ))}
            </Slider>
        </div>
    );
}

export default MultiItemCarousel;
