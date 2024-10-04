import React, {useState} from 'react';
import "../../style/ShopProduct.css";
import { NavbarShop } from '../../component/Navbar/NavbarShop';
import { ShopDashboardSidebar } from './ShopDashboardSidebar';
import SearchIcon from "@mui/icons-material/Search";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import {ShopFilter} from "./ShopFilter";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export const ShopProduct = () => {

    const products = [
        { id: 1, name: 'Product 1', type: 'Type 1', price: '$10', quantity: 100, status: 'Available' },
        { id: 2, name: 'Product 2', type: 'Type 2', price: '$20', quantity: 50, status: 'Out of stock' },
        { id: 3, name: 'Product 3', type: 'Type 3', price: '$15', quantity: 75, status: 'Available' },
        { id: 4, name: 'Product 4', type: 'Type 1', price: '$30', quantity: 60, status: 'Available' },
        { id: 5, name: 'Product 5', type: 'Type 2', price: '$12', quantity: 120, status: 'Out of stock' },
        { id: 6, name: 'Product 6', type: 'Type 3', price: '$25', quantity: 85, status: 'Available' },
        { id: 7, name: 'Product 7', type: 'Type 1', price: '$18', quantity: 30, status: 'Available' },
        { id: 8, name: 'Product 8', type: 'Type 2', price: '$22', quantity: 95, status: 'Available' },
        { id: 9, name: 'Product 9', type: 'Type 3', price: '$11', quantity: 40, status: 'Out of stock' },
        { id: 10, name: 'Product 10', type: 'Type 1', price: '$35', quantity: 150, status: 'Available' }
    ];

    const productsPerPage = 5;

    const [page, setPage] = useState(1);

    const totalPages = Math.ceil(products.length / productsPerPage);

    const indexOfLastProduct = page * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    return (
        <section className='main flex h-screen'>
            {/* Navbar */}
            <NavbarShop />
            {/* Sidebar */}
            <ShopDashboardSidebar />
            {/* Main Content */}
            <div className="w-4/5 bg-white">
                <div className='h-full p-5 md:p-8'>
                    <div className='bg-white rounded bg-light p-5 shadow md:p-8 mb-8 flex flex-col'>
                        <div className='flex w-full flex-col items-center md:flex-row justify-between'>
                            <h2 className="before:content-'' relative text-lg font-semibold text-heading before:absolute
                                before:-top-0.5 before:h-8 before:rounded-tr-md before:rounded-br-md before:bg-accent
                                ltr:before:-left-8 rtl:before:-right-8 md:before:w-1"
                                data-metatip="true" data-label-id="0">
                                Products
                            </h2>

                            <div className='flex w-full flex-col items-center md:w-3/4 md:flex-row justify-between'>
                                <div className='flex w-full items-center'>
                                    <div className="relative hidden w-full max-w-[710px] lg:flex items-center">
                                        <SearchIcon className="absolute left-4 text-gray-400"/>
                                        <input
                                            type="text"
                                            id="search"
                                            name="searchText"
                                            className="ps-10 pe-4 h-12 flex items-center w-full rounded-md
                                            appearance-none transition duration-300 ease-in-out text-heading
                                            text-sm focus:outline-none focus:ring-0 border border-border-base focus:border-accent"
                                            placeholder="Search by Name"
                                            aria-label="Search"
                                            autoComplete="off"
                                            data-metatip="true"
                                            data-label-id="0"
                                        />
                                    </div>
                                    <button className="inline-flex items-center justify-center flex-shrink-0 font-medium bg-[#019376]
                                    leading-none rounded-full outline-none transition
                                    duration-300 ease-in-out focus:outline-none focus:shadow text-white
                                    bg-accent border border-solid border-accent hover:bg-accent-hover
                                    hover:text-white hover:border-transparent px-5 py-0 h-12 text-[15px]
                                    lg:text-base ms-4">
                                        <span className='hidden md:block'>+Add Product</span>
                                    </button>

                                    <button className="mt-5 flex items-center whitespace-nowrap
                                    text-base font-semibold text-[#019376] md:mt-0 pl-3">
                                        Filter
                                        <ArrowUpwardIcon className="text-[#019376]"/>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="flex w-full transition visible h-auto">
                            <div className="mt-5 flex w-full flex-col border-t border-gray-200 pt-5
                            md:mt-8 md:flex-row md:items-center md:pt-8">
                                <div className="flex w-full flex-col space-x-5 rtl:space-x-reverse
                                md:flex-row md:items-end md:space-x-5 md:space-y-0">
                                    <ShopFilter/>
                                </div>


                            </div>

                        </div>
                    </div>

                    <div className="rc-table-content">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                            <tr>
                                <th scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    ID
                                </th>
                                <th scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Product
                                </th>
                                <th scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Product Type
                                </th>
                                <th scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Price/Unit
                                </th>
                                <th scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Quantity
                                </th>
                                <th scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Action
                                </th>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            {currentProducts.map((product) => (
                                <tr key={product.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.type}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.price}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.quantity}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.status}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Action</td>
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
        </section>
    );
};
