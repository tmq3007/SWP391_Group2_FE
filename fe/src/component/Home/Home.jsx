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
    const { products } = useSelector(store => store);  // Lấy products từ store
    const [cart, setCart] = useState([]);  // Khởi tạo state giỏ hàng
    const [openCartModal, setOpenCartModal] = useState(false);  // State để mở/đóng modal giỏ hàng
    const itemsPerPage = 8;
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState('all');  // State cho danh mục đã chọn
    const [selectedPrice, setSelectedPrice] = useState('all');  // State cho giá đã chọn
    const [searchQuery, setSearchQuery] = useState(""); // Thêm state cho giá trị tìm kiếm

    // Fetch products
    useEffect(() => {
        dispatch(getAllProductsAction()); // Gọi action để lấy dữ liệu sản phẩm
    }, [dispatch]);

    // Load cart từ localStorage khi lần đầu render
    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('cart'));
        if (savedCart) {
            setCart(savedCart);  // Load dữ liệu giỏ hàng
        }
    }, []);

    // Lưu cart vào localStorage khi state cart thay đổi
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));  // Lưu giỏ hàng vào localStorage
    }, [cart]);

    // Hàm thêm sản phẩm vào giỏ hàng
    const addToCart = (product) => {
        const updatedCart = [...cart, product];
        setCart(updatedCart);  // Cập nhật state giỏ hàng
    };

    // Lọc sản phẩm dựa trên danh mục, giá trị đã chọn và từ khóa tìm kiếm
    const filteredProducts = products && products.products ? products.products.filter((product) => {
        // Lọc theo danh mục
        if (selectedCategory !== 'all' && product.category.categoryName !== selectedCategory) {
            return false;
        }
        // Lọc theo giá
        if (selectedPrice === 'low' && product.unitSellPrice > 50) { // ví dụ giá nhỏ hơn 50
            return false;
        }
        if (selectedPrice === 'high' && product.unitSellPrice <= 50) { // ví dụ giá lớn hơn 50
            return false;
        }
        // Lọc theo từ khóa tìm kiếm
        if (searchQuery && !product.productName.toLowerCase().includes(searchQuery.toLowerCase())) {
            return false;
        }
        return true;
    }) : [];

    // Sản phẩm hiện tại dựa trên trang và itemsPerPage
    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    // Xử lý khi thay đổi trang
    const handleChange = (event, value) => {
        setCurrentPage(value); // Cập nhật trang hiện tại
    };

    // Hàm mở và đóng modal
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
            <NavbarHomePage setSearchQuery={setSearchQuery} />
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
                                addToCart={() => addToCart(item)} // Add "Add to Cart" functionality
                            />
                        )  // Dùng item.id làm key
                    }
                </div>
            </section>

            <Stack spacing={2} className="mt-5" alignItems="center" sx={{ marginBottom: "30px" }}>
                <Pagination
                    count={Math.ceil(filteredProducts.length / itemsPerPage)} // Tính số trang
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
