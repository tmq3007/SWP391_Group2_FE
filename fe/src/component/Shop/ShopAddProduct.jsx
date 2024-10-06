import React from 'react'
import {NavbarShop} from "../Navbar/NavbarShop";
import {ShopDashboardSidebar} from "./ShopDashboardSidebar";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';


export const ShopAddProduct = () => {


    return (
        <section className={"main flex h-screen overflow-hidden"}>
            {/* Navbar */}
            <NavbarShop/>
            {/* Sidebar */}
            <ShopDashboardSidebar/>
            {/* Main Content */}
            <div className="w-4/5 bg-white h-full overflow-y-auto">
                <div className={"h-screen p-5 md:pt-8"}>
                    <div className={"flex border-b border-dashed border-border-base pb-5 md:pb-7"}>
                        <h1 className={"text-lg font-semibold text-heading text-[#1f2937]"}>Create New Product</h1>
                    </div>
                    <form action="">
                        <div className={"flex flex-wrap pb-8 my-5 border-b border-dashed border-border-base sm:my-8"}>
                            <div className={"w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"}>
                                <h4 className={"text-base font-semibold text-body-dark mb-2"}>Featured Image</h4>
                                <p className={"text-sm text-body"}>Upload your product featured image here
                                    Image size should not be more than <span className={"font-bold"}>2 MB</span></p>
                            </div>
                            <div className={"rounded bg-light p-5 shadow md:p-8 w-full sm:w-8/12 md:w-2/3"}>
                                <div className="border-dashed border-2 border-border-base h-36 rounded
                                flex flex-col justify-center items-center cursor-pointer focus:border-accent-400
                                focus:outline-none relative">
                                    <CloudUploadIcon/>
                                    <p className={"mt-4 text-sm text-center text-body"}><span
                                        className={"font-semibold text-accent text-[#009f7f]"}>Upload an image </span>
                                        or drag and drop PNG, JPG</p>
                                </div>
                            </div>
                        </div>

                        <div className={"flex flex-wrap pb-8 my-5 border-b border-dashed border-border-base sm:my-8"}>
                            <div className={"w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"}>
                                <h4 className={"text-base font-semibold text-body-dark mb-2"}>Gallery</h4>
                                <p className={"text-sm text-body"}>Upload your product image gallery here
                                    Image size should not be more than <span className={"font-bold"}>2 MB</span></p>
                            </div>
                            <div className={"rounded bg-light p-5 shadow md:p-8 w-full sm:w-8/12 md:w-2/3"}>
                                <div className="border-dashed border-2 border-border-base h-36 rounded
                                flex flex-col justify-center items-center cursor-pointer focus:border-accent-400
                                focus:outline-none relative">
                                    <CloudUploadIcon/>
                                    <p className={"mt-4 text-sm text-center text-body"}><span
                                        className={"font-semibold text-accent text-[#009f7f]"}>Upload an image </span>
                                        or drag and drop PNG, JPG</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap pb-8 my-5 border-b border-dashed border-border-base sm:my-8">
                            <div className={"w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"}>
                                <h4 className={"text-base font-semibold text-body-dark mb-2"}>Group&Category</h4>
                                <p>Select product group and category from here</p>
                            </div>
                            <div className={"rounded bg-light p-5 shadow md:p-8 w-full sm:w-8/12 md:w-2/3"}>

                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </section>
    )
}
