// TopProduct.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllProductsAction } from '../State/Product/Action';
import MultiItemCarousel from './MultiItemCarousel';

const TopProduct = () => {
    const dispatch = useDispatch();
    const { products } = useSelector(store => store);
    useEffect(() => {
        dispatch(getAllProductsAction());
    }, [dispatch]);
    console.log("products top 10",products);


    // Filter products with averageRating > 3 and limit to 10
    const topRatedProducts = products
        .filter(product => product.averageRating > 3)
        .slice(0, 10);

    return (
        <div>
            {/*<h2>Top Rated Products</h2>*/}
            <MultiItemCarousel items={topRatedProducts} />
        </div>
    );
};

export default TopProduct;
