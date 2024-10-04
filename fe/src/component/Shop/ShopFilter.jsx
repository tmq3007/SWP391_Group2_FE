import React from 'react'
import { useState } from 'react'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';


export const ShopFilter = () => {
    const [category, setCategory] = React.useState(0); // Đặt giá trị mặc định là 0 (ALL)

    const handleChange = (event) => {
        setCategory(event.target.value);
    };


    return (

        <div
            className="flex w-full flex-col space-y-5 rtl:space-x-reverse md:flex-row md:items-end md:space-x-5 md:space-y-0">
            <div className="w-full">
                {/* Label */}
                <label className="block text-sm font-semibold leading-6 text-gray-900">
                    Filter By Group
                </label>

                {/* Select Box */}
                <div className="relative mt-2">
                    <select
                        id="shop-select"
                        value={category}
                        onChange={handleChange}
                        className="relative w-full cursor-default rounded-md bg-white py-3 pl-3 pr-10 text-left text-gray-900 text-lg shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
                        style={{height: '50px', fontSize: '18px'}} // Thêm dòng này để tăng chiều cao và kích thước chữ
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

            <div className="w-full">
                {/* Label */}
                <label className="block text-sm font-semibold leading-6 text-gray-900">
                    Filter By Category
                </label>

                {/* Select Box */}
                <div className="relative mt-2">
                    <select
                        id="shop-select"
                        value={category}
                        onChange={handleChange}
                        className="relative w-full cursor-default rounded-md bg-white py-3 pl-3 pr-10 text-left text-gray-900 text-lg shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
                        style={{height: '50px', fontSize: '18px'}} // Thêm dòng này để tăng chiều cao và kích thước chữ
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

            <div className="w-full">
                {/* Label */}
                <label className="block text-sm font-semibold leading-6 text-gray-900">
                    Filter by Product Type
                </label>

                {/* Select Box */}
                <div className="relative mt-2">
                    <select
                        id="shop-select"
                        value={category}
                        onChange={handleChange}
                        className="relative w-full cursor-default rounded-md bg-white py-3 pl-3 pr-10 text-left text-gray-900 text-lg shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
                        style={{height: '50px', fontSize: '18px'}} // Thêm dòng này để tăng chiều cao và kích thước chữ
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
    )
}
