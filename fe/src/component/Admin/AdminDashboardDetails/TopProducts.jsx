import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import '../../../style/AdminDashboard.css';

import 'swiper/css';
import 'swiper/css/pagination';

import { Pagination } from 'swiper/modules';

const products = [
    {
        name: "Brussels Sprout",
        description: "The Brussels sprout is a member of the Gemmifera Group...",
        price: "$3.00",
        rating: 5,
        image: "https://pickbazar-react-admin-rest.vercel.app/_next/image?url=https%3A%2F%2Fpickbazarlaravel.s3.ap-southeast-1.amazonaws.com%2F20%2FVeggiePlatter.jpg&w=1920&q=75"
    },
    {
        name: "Brussels Sprout",
        description: "The Brussels sprout is a member of the Gemmifera Group...",
        price: "$3.00",
        rating: 5,
        image: "https://pickbazar-react-admin-rest.vercel.app/_next/image?url=https%3A%2F%2Fpickbazarlaravel.s3.ap-southeast-1.amazonaws.com%2F20%2FVeggiePlatter.jpg&w=1920&q=75"
    },
    // Add more product objects here
];

const TopProducts = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const pagination = {
        clickable: true,
        renderBullet: function (index, className) {
            return '<span class="' + className + '">'+'</span>';
        },
    };

    return (
        <div className="card">
            <div className='summary-header'>
                <h2 className='text-2xl font-semibold'>Top 10 most rated products</h2>
            </div>
            <Swiper pagination={false} modules={[Pagination]} className="mySwiper">

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
                                    <span className="rating">{'★'.repeat(product.rating)}</span>
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