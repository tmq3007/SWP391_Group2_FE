import React from 'react'
import {NavbarShop} from "../Navbar/NavbarShop";
import {ShopDashboardSidebar} from "./ShopDashboardSidebar";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';


export const ShopAddProduct = () => {
    const [category, setCategory] = React.useState(0); // Đặt giá trị mặc định là 0 (ALL)

    const handleChange = (event) => {
        setCategory(event.target.value);
    };

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
                                <h4 className={"text-base font-semibold text-body-dark mb-2"}>Group & Category</h4>
                                <p>Select product group and category from here</p>
                            </div>
                            <div className={"rounded bg-light p-5 shadow md:p-8 w-full sm:w-8/12 md:w-2/3"}>
                                {/*Group*/}
                                <div className={"mb-5"}>
                                    <label htmlFor="" className={"flex text-body-dark " +
                                        "font-semibold text-sm leading-none mb-3"}>Group*</label>
                                    <div className="relative mt-2">
                                        <select
                                            id="shop-select"
                                            value={category}
                                            onChange={handleChange}
                                            className="relative w-full cursor-default rounded-md bg-white py-3 pl-3 pr-10 text-left text-gray-900 text-lg shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                            style={{
                                                height: '50px',
                                                fontSize: '18px'
                                            }}
                                        >
                                            <option className="text-[#019376]" value={0}>
                                                Fruit
                                            </option>
                                            <option className="text-[#019376]" value={10}>
                                                Vegetables
                                            </option>
                                            <option className="text-[#019376]" value={20}>
                                                Shop 2
                                            </option>
                                            <option className="text-[#019376]" value={30}>
                                                Shop 3
                                            </option>
                                        </select>
                                    </div>
                                </div>

                                {/*Categories*/}
                                <div className={"mb-5"}>
                                    <label htmlFor="" className={"flex text-body-dark " +
                                        "font-semibold text-sm leading-none mb-3"}>Category</label>
                                    <div className="relative mt-2">
                                        <select
                                            id="shop-select"
                                            value={category}
                                            onChange={handleChange}
                                            className="relative w-full cursor-default rounded-md bg-white py-3 pl-3 pr-10 text-left text-gray-900 text-lg shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                            style={{
                                                height: '50px',
                                                fontSize: '18px'
                                            }}
                                        >
                                            <option className="text-[#019376]" value={0}>
                                                Fruit
                                            </option>
                                            <option className="text-[#019376]" value={10}>
                                                Vegetables
                                            </option>
                                            <option className="text-[#019376]" value={20}>
                                                Shop 2
                                            </option>
                                            <option className="text-[#019376]" value={30}>
                                                Shop 3
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                {/*Authors*/}
                                <div className={"mb-5"}>
                                    <label htmlFor="" className={"flex text-body-dark " +
                                        "font-semibold text-sm leading-none mb-3"}>Author</label>
                                    <div className="relative mt-2">
                                        <select
                                            id="shop-select"
                                            value={category}
                                            onChange={handleChange}
                                            className="relative w-full cursor-default rounded-md bg-white py-3 pl-3 pr-10 text-left text-gray-900 text-lg shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                            style={{
                                                height: '50px',
                                                fontSize: '18px'
                                            }}
                                        >
                                            <option className="text-[#019376]" value={0}>
                                                Fruit
                                            </option>
                                            <option className="text-[#019376]" value={10}>
                                                Vegetables
                                            </option>
                                            <option className="text-[#019376]" value={20}>
                                                Shop 2
                                            </option>
                                            <option className="text-[#019376]" value={30}>
                                                Shop 3
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                {/*Manufacture*/}
                                <div className={"mb-5"}>
                                    <label htmlFor="" className={"flex text-body-dark " +
                                        "font-semibold text-sm leading-none mb-3"}>Manufacture</label>
                                    <div className="relative mt-2">
                                        <select
                                            id="shop-select"
                                            value={category}
                                            onChange={handleChange}
                                            className="relative w-full cursor-default rounded-md bg-white py-3 pl-3 pr-10 text-left text-gray-900 text-lg shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                            style={{
                                                height: '50px',
                                                fontSize: '18px'
                                            }}
                                        >
                                            <option className="text-[#019376]" value={0}>
                                                Fruit
                                            </option>
                                            <option className="text-[#019376]" value={10}>
                                                Vegetables
                                            </option>
                                            <option className="text-[#019376]" value={20}>
                                                Shop 2
                                            </option>
                                            <option className="text-[#019376]" value={30}>
                                                Shop 3
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                {/*Tags*/}
                                <div className={"mb-5"}>
                                    <label htmlFor="" className={"flex text-body-dark " +
                                        "font-semibold text-sm leading-none mb-3"}>Tags</label>
                                    <div className="relative mt-2">
                                        <select
                                            id="shop-select"
                                            value={category}
                                            onChange={handleChange}
                                            className="relative w-full cursor-default rounded-md bg-white py-3 pl-3 pr-10 text-left text-gray-900 text-lg shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                            style={{
                                                height: '50px',
                                                fontSize: '18px'
                                            }}
                                        >
                                            <option className="text-[#019376]" value={0}>
                                                Fruit
                                            </option>
                                            <option className="text-[#019376]" value={10}>
                                                Vegetables
                                            </option>
                                            <option className="text-[#019376]" value={20}>
                                                Shop 2
                                            </option>
                                            <option className="text-[#019376]" value={30}>
                                                Shop 3
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/*Description*/}
                        <div className="flex flex-wrap pb-8 my-5 border-b border-dashed border-border-base sm:my-8">
                            {/*Left*/}
                            <div className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5">
                                <h4 className="text-base font-semibold text-body-dark mb-2"
                                    data-label-id="0">Description</h4>
                                <p className={"text-sm text-body"}>Add your product description and necessary information from here</p>
                            </div>

                            {/*Right*/}
                            <div className="rounded bg-light p-5 shadow md:p-8 w-full sm:w-8/12 md:w-2/3">
                                {/*Name*/}
                                <div className={"mb-5"}>
                                    <label htmlFor="" className={"flex text-body-dark " +
                                        "font-semibold text-sm leading-none mb-3"}>Name*</label>
                                    <input id="name" name="name" type="text"
                                           className="px-4 flex items-center w-full rounded appearance-none transition duration-300 ease-in-out text-heading text-sm focus:outline-none focus:ring-0 border border-border-base focus:border-accent h-12"
                                           autoComplete="off" autoCorrect="off" autoCapitalize="off"
                                           aria-invalid="false" data-label-id="0"/>

                                </div>

                                {/*Unit*/}
                                <div className={"mb-5"}>
                                    <label htmlFor="" className={"flex text-body-dark " +
                                        "font-semibold text-sm leading-none mb-3"}>Unit*</label>
                                    <input id="name" name="name" type="text"
                                           className="px-4 h-12 flex items-center w-full rounded appearance-none transition duration-300 ease-in-out text-heading text-sm focus:outline-none focus:ring-0 border border-border-base focus:border-accent "
                                           autoComplete="off" autoCorrect="off" autoCapitalize="off"
                                           aria-invalid="false" data-label-id="0"/>

                                </div>

                                {/*Description*/}
                                <div className={"mb-5"}>
                                    <label htmlFor="" className={"flex text-body-dark " +
                                        "font-semibold text-sm leading-none mb-3"}>Description</label>
                                    <input id="name" name="name" type="text"
                                           className="px-4 h-12 flex items-center w-full rounded appearance-none transition duration-300 ease-in-out text-heading text-sm focus:outline-none focus:ring-0 border border-border-base focus:border-accent "
                                           autoComplete="off" autoCorrect="off" autoCapitalize="off"
                                           aria-invalid="false" data-label-id="0"/>

                                </div>
                            </div>
                        </div>

                        {/*Product Infomation*/}
                        <div className="flex flex-wrap pb-8 my-5 border-b border-dashed border-border-base sm:my-8">
                            {/*left*/}
                            <div className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5">
                                <div className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5">
                                    <h4 className="text-base font-semibold text-body-dark mb-2"
                                        data-label-id="0">Product Infomation</h4>
                                    <p className={"text-sm text-body"}>Add your simple product description and necessary information from here</p>
                                </div>
                            </div>

                            {/*right*/}
                            <div className="rounded bg-light p-5 shadow md:p-8 w-full sm:w-8/12 md:w-2/3">
                                {/*Price*/}
                                <div className={"mb-5"}>
                                    <label htmlFor="" className={"flex text-body-dark " +
                                        "font-semibold text-sm leading-none mb-3"}>Price*</label>
                                    <input id="name" name="name" type="text"
                                           className="px-4 h-12 flex items-center w-full rounded appearance-none transition duration-300 ease-in-out text-heading text-sm focus:outline-none focus:ring-0 border border-border-base focus:border-accent "
                                           autoComplete="off" autoCorrect="off" autoCapitalize="off"
                                           aria-invalid="false" data-label-id="0"/>

                                </div>

                                {/*Sale Price*/}
                                <div className={"mb-5"}>
                                    <label htmlFor="" className={"flex text-body-dark " +
                                        "font-semibold text-sm leading-none mb-3"}>Sale Price*</label>
                                    <input id="name" name="name" type="text"
                                           className="px-4 h-12 flex items-center w-full rounded appearance-none transition duration-300 ease-in-out text-heading text-sm focus:outline-none focus:ring-0 border border-border-base focus:border-accent "
                                           autoComplete="off" autoCorrect="off" autoCapitalize="off"
                                           aria-invalid="false" data-label-id="0"/>

                                </div>

                                {/*Quantity*/}
                                <div className={"mb-5"}>
                                    <label htmlFor="" className={"flex text-body-dark " +
                                        "font-semibold text-sm leading-none mb-3"}>Quantity*</label>
                                    <input id="name" name="name" type="text"
                                           className="px-4 h-12 flex items-center w-full rounded appearance-none transition duration-300 ease-in-out text-heading text-sm focus:outline-none focus:ring-0 border border-border-base focus:border-accent "
                                           autoComplete="off" autoCorrect="off" autoCapitalize="off"
                                           aria-invalid="false" data-label-id="0"/>

                                </div>

                                {/*SKU*/}
                                <div className={"mb-5"}>
                                    <label htmlFor="" className={"flex text-body-dark " +
                                        "font-semibold text-sm leading-none mb-3"}>SKU*</label>
                                    <input id="name" name="name" type="text"
                                           className="px-4 h-12 flex items-center w-full rounded appearance-none transition duration-300 ease-in-out text-heading text-sm focus:outline-none focus:ring-0 border border-border-base focus:border-accent "
                                           autoComplete="off" autoCorrect="off" autoCapitalize="off"
                                           aria-invalid="false" data-label-id="0"/>

                                </div>

                                {/*Width*/}
                                <div className={"mb-5"}>
                                    <label htmlFor="" className={"flex text-body-dark " +
                                        "font-semibold text-sm leading-none mb-3"}>Width</label>
                                    <input id="name" name="name" type="text"
                                           className="px-4 h-12 flex items-center w-full rounded appearance-none transition duration-300 ease-in-out text-heading text-sm focus:outline-none focus:ring-0 border border-border-base focus:border-accent "
                                           autoComplete="off" autoCorrect="off" autoCapitalize="off"
                                           aria-invalid="false" data-label-id="0"/>

                                </div>

                                {/*Length*/}
                                <div className={"mb-5"}>
                                    <label htmlFor="" className={"flex text-body-dark " +
                                        "font-semibold text-sm leading-none mb-3"}>Width</label>
                                    <input id="name" name="name" type="text"
                                           className="px-4 h-12 flex items-center w-full rounded appearance-none transition duration-300 ease-in-out text-heading text-sm focus:outline-none focus:ring-0 border border-border-base focus:border-accent "
                                           autoComplete="off" autoCorrect="off" autoCapitalize="off"
                                           aria-invalid="false" data-label-id="0"/>

                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}
