import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import '../../../style/AdminDashboard.css';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import {getTop10ProductsByHighestAverageRating} from "../../State/Admin/Action";

const TopProducts = () => {
    const [products, setProducts] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const result = await getTop10ProductsByHighestAverageRating();
                const mappedProducts = result.result.map((product) => ({
                    name: product.productName,
                    description: product.description,
                    price: `${product.unitSellPrice.toFixed(0)} VND`,
                    rating: product.averageRating,
                    image: product.pictureUrl,
                }));
                setProducts(mappedProducts);
            } catch (error) {
                console.error("Error fetching top products:", error);
            }
        };
        fetchProducts();
    }, []);

    const pagination = {
        clickable: true,
        renderBullet: function (index, className) {
            return '<span class="' + className + '">'+'</span>';
        },
    };

    const getStarIcons = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (rating >= i) {
                // Full star
                stars.push(<span key={i} className="text-yellow-500">★</span>);
            } else if (rating >= i - 0.5) {
                // Half star
                stars.push(
                    <span key={i} className="relative inline-block text-yellow-500 overflow-hidden" style={{ width: '0.5em' }}>
                    ★
                </span>
                );
            } else if (rating >= i - 0.25) {
                // Quarter star
                stars.push(
                    <span key={i} className="relative inline-block text-yellow-500 overflow-hidden" style={{ width: '0.25em' }}>
                    ★
                </span>
                );
            } else {
                // Empty star
                stars.push(<span key={i} className="text-gray-300">☆</span>);
            }
        }
        return stars;
    };

    return (
        <div className="card">
            <div className='summary-header'>
                <h2 className='text-2xl font-semibold'>Top 10 Most Rating Products</h2>
            </div>
            <Swiper pagination={pagination} modules={[Pagination]} className="mySwiper">
                <div className="slider-wrapper" style={{transform: `translateX(-${currentSlide * 100}%)`}}>
                    {products.map((product, index) => (
                        <div className="slide" key={index}>
                            <SwiperSlide className=''>
                                <div
                                    className='flex aspect-square items-center justify-center overflow-hidden rounded-xl border 2xl:aspect-[1/0.88]'>
                                    <img src={product.image} alt={product.name} className="product-image"/>
                                </div>
                                <div className='flex items-start justify-between pt-4'>
                                    <div className='w-full max-w-[calc(100%-110px)]'>
                                        <h4 className='mb-1.5 truncate text-base font-semibold'>{product.name}</h4>
                                        <p className='mb-3 text-sm font-normal text-gray-500 truncate'>{product.description}</p>
                                        <span className='text-base font-semibold text-heading/80'>{product.price}</span>
                                    </div>
                                    <span className="rating">{getStarIcons(product.rating)}</span>
                                </div>
                            </SwiperSlide>
                        </div>
                    ))}
                </div>
            </Swiper>
        </div>
    );
};

export default TopProducts;
