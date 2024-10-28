import React from "react";

export const SearchBar = () => {
    return (
        <div className="w-full bg-[#019376] flex flex-col items-center justify-center py-10 text-white">
            <h1 className="text-2xl md:text-3xl font-semibold mb-6">
                Xin chào, Shopii có thể giúp gì cho bạn?
            </h1>

                <form className="px-4 w-full max-w-[1000px]">
                    <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                           htmlFor="default-search">Search</label>
                    <div className="relative">

                        <input
                            required
                            placeholder="Search"
                            className="block w-full p-4 py-5 ps-10 text-lg text-[#019376] placeholder-[#019376] border border-white rounded-lg bg-white focus:ring-0 focus:outline-none focus:border-[#019376] dark:bg-white dark:border-white dark:placeholder-[#019376] dark:text-[#019376] dark:focus:border-[#019376]"
                            id="default-search"
                            type="search"
                        />

                        <button
                            className="absolute -top-5 end-2.5 translate-y-1/2 p-4 text-sm font-medium text-white bg-[#019376] rounded-lg hover:bg-[#017D62] focus:outline-none focus:ring-0">
                            <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
                                 className="w-5 h-5">
                                <path d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" strokeWidth={2}
                                      strokeLinejoin="round" strokeLinecap="round" stroke="currentColor"/>
                            </svg>
                            <span className="sr-only">Search</span>
                        </button>
                    </div>
                </form>

        </div>
    );
}