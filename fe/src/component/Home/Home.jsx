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
import { findCart, addItemToCart } from '../State/Cart/Action';
import {getUser} from "../State/Authentication/Action";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const Home = () => {
    const dispatch = useDispatch();
    const { products } = useSelector(store => store);
    const jwt = localStorage.getItem("jwt");
    const {carts} = useSelector(store => store);

    const [cart, setCart] = useState(null);
    const [openCartModal, setOpenCartModal] = useState(false);
    const itemsPerPage = 8;
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedPrice, setSelectedPrice] = useState('all');
    const [userId, setUserId] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    // Fetch products
    useEffect(() => {
        dispatch(getAllProductsAction());
    }, [dispatch]);

    // Fetch user details and then fetch the cart once the userId is set
    useEffect(() => {
        if (jwt) {
            dispatch(getUser(jwt)).then((data) => {
                setUserId(data.result.id);
            }).catch((error) => {
                console.error('Error getting user:', error);
            });
        }
    }, [dispatch, jwt]);

    console.log("user id:", userId);
    console.log("product",products);
    // Fetch cart after userId is set
    useEffect(() => {
        if (userId && jwt) {
            dispatch(findCart(userId, jwt))
                .then((data) => {
                    setCart(data);  // Properly set the cart data after fetching
                    console.log("Cart data:", data);  // Debugging the cart data
                })
                .catch((error) => {
                    console.error('Error fetching cart:', error);
                });
        }
    }, [dispatch, userId, jwt]);  // Include jwt and userId as dependencies


    console.log("cart new:" ,cart);
    const addToCart = (buyUnit, quantity, item) => {
        if (userId) {
            const productDetails = {
                buyUnit,
                quantity,
                productId: item.productId
            };
            dispatch(addItemToCart(userId, productDetails, jwt));
        } else {
            console.error('User is not logged in');
        }
    };

    const filteredProducts = products?.products?.filter((product) => {
        const matchesCategory = selectedCategory === 'all' || product.category.categoryName === selectedCategory;
        const matchesPrice = (selectedPrice === 'low' && product.unitSellPrice <= 50) || (selectedPrice === 'high' && product.unitSellPrice > 50) || selectedPrice === 'all';
        const matchesSearch = product.productName.toLowerCase().includes(searchQuery);

        return matchesCategory && matchesPrice && matchesSearch;
    }) || [];

    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const handleChange = (event, value) => {
        setCurrentPage(value);
    };

    const handleOpenCart = () => {
        setOpenCartModal(true);
    };

    const handleCloseCart = () => {
        setOpenCartModal(false);
    };

    //Ensure carts is an array or empty array if it's not available
    const totalPrice = cart?.result?.totalPrice || 0;


    return (
        <div>
            <NavbarHomePage setSearchQuery={setSearchQuery}/>
            <section className="banner -z-50 relative flex flex-col items-center">
                <div className="w-[50vw] z-10 text-center">
                    <p className="text-2xl lg:text-5xl font-bold z-10 py-5 mt-9" style={{ color: "#019376" }}>Grocery</p>
                    <p className="z-10 text-black-400 text-xl lg:text-2xl">Get your healthy foods & snacks delivered at your doorsteps all day every day</p>
                </div>
            </section>
            <Divider />
            <section className="p-10 lg:py-10 lg:px-20">
                <p className="text-2xl font-semibold text-black-400 py-3 pb-10" style={{ color: "#019376" }}>Top Product</p>
                <MultiItemCarousel />
            </section>

            <section className="pt-[2rem] lg:flex relative">
                <div className="space-y-10 w-[300px] filter" style={{ backgroundColor: '#ffffff', padding: '1rem' }}>
                    <div className="box spacey-8 items-center lg:sticky top-28">
                        <CategoryMenu setSelectedCategory={setSelectedCategory} setSelectedPrice={setSelectedPrice} />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mx-auto ml-8" style={{ width: '100%', maxWidth: '1600px' }}>
                    {currentProducts.map((item) => (
                        <ProductCard
                            key={item.id}
                            item={item}
                            addToCart={(buyUnit, quantity) => addToCart(buyUnit, quantity, item)}
                        />
                    ))}
                </div>
            </section>

            <Stack spacing={2} className="mt-setBackdropStyle5" alignItems="center" sx={{ marginBottom: "30px", marginTop: "15px" }}>
                <Pagination
                    count={Math.ceil(filteredProducts.length / itemsPerPage)}
                    page={currentPage}
                    onChange={handleChange}
                    color="primary"
                    renderItem={(item) => <PaginationItem {...item} className="pagination-item-home-page" />}
                />
            </Stack>

            <div className="fixed bottom-10 right-10 cart-modal">
                <button className="text-white p-3 rounded-lg shadow-lg" onClick={handleOpenCart}>
                    <AddShoppingCartIcon /> View Cart
                </button>
            </div>

            <CartModal
                open={openCartModal}
                onClose={handleCloseCart}
                cart={cart?.result?.cartItems || []}  // Pass cart items or an empty array
                addToCart={addToCart}
                totalPrice={totalPrice}  // Pass total price
            />
        </div>
    );
};

export default Home;
