import React, { useEffect, useState } from 'react';
import "../../style/Home.css";
import MultiItemCarousel from "./MultiItemCarousel";
import { Divider, PaginationItem } from "@mui/material";
import CategoryMenu from "../Category/CategoryMenu";
import ProductCard from "../Product/ProductCard";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsAction } from "../State/Product/Action";
import CartModal from '../Cart/CartModal';
import { NavbarHomePage } from "../Navbar/NavbarHomePage";

const Home = () => {
    const dispatch = useDispatch();
    const { products } = useSelector(store => store);
   // const {categories} = useSelector(store => store);
    const [cart, setCart] = useState([]);
    const [openCartModal, setOpenCartModal] = useState(false);
    const itemsPerPage = 8;
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        dispatch(getAllProductsAction());
    }, [dispatch]);

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('cart'));
        if (savedCart) {
            setCart(savedCart);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product, quantity) => {
        const existingProduct = cart.find(item => item.id === product.id);
        if (existingProduct) {
            // Update quantity
            const updatedCart = cart.map(item =>
                item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
            );
            setCart(updatedCart);
        } else {
            // Add new product to cart
            setCart([...cart, { ...product, quantity }]);
        }
    };

    const updateCart = (product, newQuantity) => {
        if (newQuantity > 0) {
            const updatedCart = cart.map(item =>
                item.id === product.id ? { ...item, quantity: newQuantity } : item
            );
            setCart(updatedCart);
        } else {
            // Remove product from cart
            const updatedCart = cart.filter(item => item.id !== product.id);
            setCart(updatedCart);
        }
    };

    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    const currentProducts = products && products.products ? products.products.slice(indexOfFirstProduct, indexOfLastProduct) : [];

    const handleChange = (event, value) => {
        setCurrentPage(value);
    };

    const handleOpenCart = () => {
        setOpenCartModal(true);
    };

    const handleCloseCart = () => {
        setOpenCartModal(false);
    };

    const totalPrice = cart.reduce((total, item) => {
        const originalPrice = item.unitSellPrice || 0;
        const discount = item.discount || 0;
        const discountPrice = originalPrice * (1 - discount);
        return total + (discountPrice * item.quantity);
    }, 0);

    return (
        <div>
            <NavbarHomePage />
            <section className="banner -z-50 relative flex flex-col items-center">
                <div className="w-[50vw] z-10 text-center">
                    <p className="text-2xl lg:text-5xl font-bold z-10 py-5 mt-9" style={{ color: "#019376" }}>
                        Grocery
                    </p>
                    <p className="z-10 text-black-400 text-xl lg:text-2xl">
                        Get your healthy foods & snacks delivered at your doorsteps all day every day
                    </p>
                </div>
            </section>
            <Divider />
            <section className="p-10 lg:py-10 lg:px-20">
                <p className="text-2xl font-semibold text-black-400 py-3 pb-10" style={{ color: "#019376" }}>
                    Top Product
                </p>
                <MultiItemCarousel />
            </section>

            <section className="pt-[2rem] lg:flex relative">
                <div className="space-y-10 w-[300px] filter" style={{ backgroundColor: '#ffffff', padding: '1rem' }}>
                    <div className="box spacey-8 items-center lg:sticky top-28">
                        <CategoryMenu />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mx-auto ml-8" style={{ width: '100%', maxWidth: '1600px' }}>
                    {
                        currentProducts.map((item) =>
                            <ProductCard
                                key={item.id}
                                item={item}
                                addToCart={addToCart} // Directly pass addToCart
                            />
                        )
                    }
                </div>
            </section>

            <Stack spacing={2} className="mt-5" alignItems="center" sx={{ marginBottom: "30px" }}>
                <Pagination
                    count={Math.ceil((products && products.products ? products.products.length : 0) / itemsPerPage)}
                    page={currentPage}
                    onChange={handleChange}
                    color="primary"
                    renderItem={(item) => (
                        <PaginationItem {...item} className="pagination-item" />
                    )}
                />
            </Stack>

            <div className="fixed bottom-10 right-10 cart-modal">
                <button
                    className="text-white p-3 rounded-lg shadow-lg"
                    onClick={handleOpenCart}
                >
                    View Cart ({cart.length})
                </button>
            </div>

            <CartModal
                open={openCartModal}
                onClose={handleCloseCart}
                cartItems={cart}
                updateCart={updateCart}
                totalPrice={totalPrice}
            />
        </div>
    );
}

export default Home;
