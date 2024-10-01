import React, { useState } from 'react';
import "./Home.css";
import MultiItemCarousel from "./MultiItemCarousel";
import {Divider, PaginationItem} from "@mui/material";
import CategoryMenu from "../Category/CategoryMenu";
import ProductCard from "../Product/ProductCard";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';


const products = [1, 1, 1, 1, 1, 1,1,1,1,1,1,1,1,1, 1, 1, 1, 1, 1, 1, 1, 1, 1]; // Thay thế bằng sản phẩm thực tế

const Home = () => {
    const itemsPerPage = 8; // Số sản phẩm mỗi trang
    const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại

    // Tính toán số sản phẩm cần hiển thị
    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    // Hàm xử lý thay đổi trang
    const handleChange = (event, value) => {
        setCurrentPage(value);
    };

    return (
        <div>
            <section className="banner -z-50 relative flex flex-col items-center">
                <div className="w-[50vw] z-10 text-center">
                    <p className="text-2xl lg:text-5xl font-bold z-10 py-5 mt-9" style={{color: "#019376"}}>
                        Grocery
                    </p>
                    <p className="z-10 text-black-400 text-xl lg:text-2xl">
                        Get your healthy foods & snacks delivered at your doorsteps all day every day
                    </p>
                </div>
            </section>
            <Divider/>
            <section className="p-10 lg:py-10 lg:px-20">
                <p className="text-2xl font-semibold text-black-400 py-3 pb-10" style={{color: "#019376"}}>
                    Top Product
                </p>
                <MultiItemCarousel/>
            </section>

            <section className="pt-[2rem] lg:flex relative">
                <div className="space-y-10 w-[300px] filter" style={{backgroundColor: '#ffffff', padding: '1rem'}}>
                    <div className="box spacey-8 items-center lg:sticky top-28">
                        <CategoryMenu/>
                    </div>
                </div>

                <div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mx-auto ml-8"
                    style={{width: '100%', maxWidth: '1600px'}}
                >
                    {
                        currentProducts.map((item, index) => <ProductCard key={index} item={item}/>)
                    }
                </div>
            </section>

            <Stack  spacing={2} className="mt-5" alignItems="center" sx={{marginBottom:"20px"}}>
                <Pagination
                    count={Math.ceil(products.length / itemsPerPage)} // Số trang
                    page={currentPage} // Trang hiện tại
                    onChange={handleChange} // Hàm xử lý thay đổi trang
                    color="primary"
                    renderItem={(item) => (
                        <PaginationItem
                            {...item}
                            className={`pagination-item ${item.selected ? 'Mui-selected' : ''}`} // Thêm class cho trang hiện tại
                        />
                    )}
                />
            </Stack>
        </div>
    );
}

export default Home;
