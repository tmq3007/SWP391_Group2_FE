import React from 'react'
import "../../style/ShopProduct.css";
import { NavbarShop } from '../../component/Navbar/NavbarShop';
import { ShopDashboardSidebar } from './ShopDashboardSidebar';
import SearchIcon from "@mui/icons-material/Search";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

export const ShopProduct = () => {
    return (
        <section className='main flex h-screen'>
            {/*Navbar*/}
            <NavbarShop/>
            {/*Sidebar*/}
            <ShopDashboardSidebar/>
            {/*Main*/}
            <div className="w-4/5 bg-white">
                <div className='h-full p-5 md:p-8'>
                    <div className='bg-white rounded bg-light p-5 shadow md:p-8 mb-8 flex flex-col'>
                        <div
                            className='flex w-full flex-col items-center md:flex-row justify-between'> {/* Thêm justify-between */}
                            <h2 className="before:content-'' relative text-lg font-semibold text-heading before:absolute
            before:-top-0.5 before:h-8 before:rounded-tr-md before:rounded-br-md before:bg-accent
            ltr:before:-left-8 rtl:before:-right-8 md:before:w-1"
                                data-metatip="true" data-label-id="0">Products</h2>

                            <div
                                className='flex w-full flex-col items-center md:w-3/4 md:flex-row justify-between'> {/* Thêm justify-between */}
                                <div className='flex w-full items-center'>
                                    <div className="relative hidden w-full max-w-[710px] lg:flex items-center">
                                        <SearchIcon className="absolute left-4 text-gray-400"/>
                                        <input type="text" id="search" name="searchText"
                                               className="ps-10 pe-4 h-12 flex items-center w-full rounded-md appearance-none transition duration-300 ease-in-out text-heading text-sm focus:outline-none focus:ring-0 border border-border-base focus:border-accent"
                                               placeholder="Search by Name" aria-label="Search" autoComplete="off"
                                               data-metatip="true" data-label-id="0"/>
                                    </div>
                                        <button
                                            className="inline-flex items-center justify-center flex-shrink-0 font-medium bg-[#019376]
                                        leading-none rounded-full outline-none transition duration-300 ease-in-out
                                        focus:outline-none focus:shadow text-white bg-accent border border-solid border-accent
                                        hover:bg-accent-hover hover:text-white hover:border-transparent px-5 py-0 h-12 text-[15px]
                                        lg:text-base ms-4 "
                                        >
                                            <span className='hidden md:block'> +Add Product</span>
                                        </button>

                                    </div>
                                    <button
                                        className="mt-5 flex items-center whitespace-nowrap text-base font-semibold text-[#019376] md:mt-0 pl-3"
                                    >
                                        Filter
                                        <ArrowUpwardIcon className="text-[#019376]"/>
                                    </button>

                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        </section>
)
}
