import React, {useEffect, useState} from 'react'
import SearchIcon from "@mui/icons-material/Search";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import {ShopFilter} from "./ShopFilter";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getAllProductsAction} from "../State/Product/Action";

export const ShopTransaction = () => {
    //move to another page
    const navigate = useNavigate();

    //call api
    const dispatch = useDispatch();
    const { products } = useSelector(store => store);

    //pagination
    const productsPerPage = 5;
    const [page, setPage] = useState(1);

    // Lấy dữ liệu tất cả sản phẩm khi component được mount
    useEffect(() => {
        dispatch(getAllProductsAction());
    }, [dispatch]);

    // Pagination logic
    const totalPages = Math.ceil(products.length / productsPerPage);
    const indexOfLastProduct = page * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products && products.products ? products.products.slice(indexOfFirstProduct, indexOfLastProduct) : [];
    {/*const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);*/}

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    return (
        <div className="w-full bg-white h-screen overflow-y-auto">
            <div className='h-screen p-6'>
                <div className='bg-white rounded bg-light p-5 shadow md:p-8 mb-8 flex flex-col'>
                    <div className='flex w-full flex-col items-center md:flex-row justify-between'>
                        <h2 className="relative text-lg font-semibold text-heading text-[#1f2937] top-3">Products</h2>

                        <div className='flex w-full flex-col items-center md:w-3/4 md:flex-row justify-between'>
                            <div className='flex w-full items-center'>
                                <div className=" relative hidden w-full max-w-[710px] lg:flex items-center top-3">
                                    <SearchIcon className="absolute left-4 text-gray-400 top-3 "/>
                                    <input
                                        type="text"
                                        id="search"
                                        name="searchText"
                                        className="ps-10 pe-4 h-12 flex items-center w-full rounded-lg
                                            appearance-none transition duration-300 ease-in-out text-heading
                                            text-sm focus:outline-none focus:ring-0 border border-border-base focus:border-accent"
                                        placeholder="Type your query and press enter"
                                        aria-label="Search"
                                        autoComplete="off"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="rc-table-content">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Tracking Number</th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Product Price</th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Delivery Fee</th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Discount</th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Payment gateway</th>
                            <th className={"px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"}>Payment Status</th>


                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {currentProducts.map((product) => (
                            <tr key={product.productId} className={"text-center"}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.productId}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.productName}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.category.categoryName}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.unitSellPrice}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.stock}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.isActive ? 'Active' : 'Inactive'}</td>
                                <td className="px-6 py-4 whitespace-nowrap
                                    text-sm text-gray-500 flex-col cursor-pointer">
                                    <ModeEditIcon onClick={() => navigate("/shop-dashboard/shop-edit-product")}/>
                                    <RemoveRedEyeIcon onClick={() => navigate("/")}/>
                                    <DeleteIcon onClick={() => navigate("/")}/></td>
                            </tr>
                        ))}

                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-end mt-5">
                    <Stack spacing={2}>
                        <Pagination
                            count={totalPages}
                            page={page}
                            onChange={handlePageChange}
                            color="primary"
                        />
                    </Stack>
                </div>
            </div>
        </div>
    )
}
