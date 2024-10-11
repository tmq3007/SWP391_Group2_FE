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
import {getUser} from "../State/Authentication/Action"; // Giả sử bạn có các action này cho giỏ hàng

const Home = () => {
    const dispatch = useDispatch();
    const { products, carts } = useSelector(store => store);  // Lấy sản phẩm, giỏ hàng và auth từ store
    const cart = carts.items || [];  // Assuming your cart reducer has items
    const  jwt=  localStorage.getItem("jwt");


    const [openCartModal, setOpenCartModal] = useState(false);  // State để mở/đóng modal giỏ hàng
    const itemsPerPage = 8;
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState('all');  // State cho danh mục đã chọn
    const [selectedPrice, setSelectedPrice] = useState('all');  // State cho giá đã chọn
    const [userId,setUserId] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    // Fetch products
    useEffect(() => {
        dispatch(getAllProductsAction()); // Gọi action để lấy dữ liệu sản phẩm
    }, [dispatch]);


    useEffect(() => {

            dispatch(getUser(jwt)).then((data) => {
                setUserId(data.result.id);
            })
                .catch((error) => {
                console.error('Error get user:', error);
        });

    }, [dispatch]);
    console.log("user:",userId)


    // Lưu cart vào localStorage khi state cart thay đổi
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));  // Lưu giỏ hàng vào localStorage
    }, [cart]);
    console.log("cart:",cart)

    const addToCart = (buyUnit, quantity, item) => {
        if (userId) {
            const productDetails = {
                buyUnit,       // e.g. "2kg"
                quantity,      // e.g. 1
                productId: item.productId // Assuming item.id is the product ID
            };
            dispatch(addItemToCart(userId, productDetails, jwt)); // Dispatch action with new object
        } else {
            console.error('User is not logged in');
        }
    };



    // Lọc sản phẩm dựa trên danh mục và giá trị đã chọn
    const filteredProducts = products && products.products ? products.products.filter((product) => {
        const matchesCategory = selectedCategory === 'all' || product.category.categoryName === selectedCategory;
        const matchesPrice = (selectedPrice === 'low' && product.unitSellPrice <= 50) || (selectedPrice === 'high' && product.unitSellPrice > 50) || selectedPrice === 'all';
        const matchesSearch = product.productName.toLowerCase().includes(searchQuery);  // Lọc theo từ khóa tìm kiếm

        return matchesCategory && matchesPrice && matchesSearch;
    }) : [];

    // Sản phẩm hiện tại dựa trên trang và itemsPerPage
    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    // Xử lý khi thay đổi trang
    const handleChange = (event, value) => {
        setCurrentPage(value); // Cập nhật trang hiện tại
    };

    // Hàm mở và đóng modal giỏ hàng
    const handleOpenCart = () => {
        setOpenCartModal(true);
    };

    const handleCloseCart = () => {
        setOpenCartModal(false);
    };

    // Tính tổng giá từ giỏ hàng
    const totalPrice = cart.reduce((total, item) => total + (item.discountPrice || item.unitSellPrice), 0);

    return (
        <div>
            <NavbarHomePage setSearchQuery={setSearchQuery}/>
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
                        <CategoryMenu setSelectedCategory={setSelectedCategory} setSelectedPrice={setSelectedPrice} />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mx-auto ml-8" style={{ width: '100%', maxWidth: '1600px' }}>
                    {
                        currentProducts.map((item) =>
                            <ProductCard
                                key={item.id}
                                item={item}
                                addToCart={(buyUnit,quantity) => addToCart(buyUnit,quantity,item)} // Pass the additional parameters
                            />

                        )  // Dùng item.id làm key
                    }
                </div>
            </section>

            <Stack spacing={2} className="mt-setBackdropStyle5 " alignItems="center" sx={{ marginBottom: "30px",marginTop: "15px" }}>
                <Pagination
                    count={Math.ceil(filteredProducts.length / itemsPerPage)} // Tính số trang
                    page={currentPage}
                    onChange={handleChange}
                    color="primary"
                    renderItem={(item) => (
                        <PaginationItem {...item} className="pagination-item-home-page" />
                    )}
                />
            </Stack>

            <div className="fixed bottom-10 right-10 cart-modal">
                <button
                    className=" text-white p-3 rounded-lg shadow-lg"
                    onClick={handleOpenCart}
                >
                    View Cart ({cart.length})
                </button>
            </div>

            {/* Cart Modal */}
            <CartModal
                open={openCartModal}
                onClose={handleCloseCart}
                cartItems={cart}
                totalPrice={totalPrice}
            />
        </div>
    );
}

export default Home;
