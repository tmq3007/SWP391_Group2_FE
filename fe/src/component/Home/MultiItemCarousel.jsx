// MultiItemCarousel.js
import React, { useEffect } from 'react';
import CarouselItem from './CarouselItem';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsAction } from "../State/Product/Action";

// Tạo thành phần MultiItemCarousel
const MultiItemCarousel = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5, // Hiển thị 5 sản phẩm cùng lúc
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: true, // Bật nút mũi tên để điều hướng
    };

    const dispatch = useDispatch();
    const { products } = useSelector(store => store);

    useEffect(() => {
        dispatch(getAllProductsAction());
    }, [dispatch]);

    console.log("products top 10", products);

    // Lọc sản phẩm với averageRating > 3
    const topRatedProducts = products?.products?.filter(product => product.averageRating > 3);

    return (
        <div style={{ padding: '20px' }}>
            {topRatedProducts && topRatedProducts.length > 0 ? (
                <Slider {...settings}>
                    {topRatedProducts.slice(0, 10).map((item, index) => (
                        <CarouselItem key={item.productId || index} image={item.pictureUrl} title={item.productName} />
                    ))}
                </Slider>
            ) : (
                <p>Loading...</p>
            )}
        </div>


    );
};

export default MultiItemCarousel;
