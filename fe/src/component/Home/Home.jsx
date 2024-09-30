import React from 'react';
import "./Home.css";
import MultiItemCarousel from "./MultiItemCarousel";
import { Divider } from "@mui/material";
import CategoryMenu from "../Category/CategoryMenu";
import ProductCard from "../Product/ProductCard";

const products = [1,1,1,1,1,1,1,1, 1, 1, 1, 1,1,1,1];

const Home = () => {
    return (
        <div>
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
                <div className="space-y-10 w-[750px]  filter" style={{ backgroundColor: '#ffffff', padding: '1rem' }}>
                    <div className="box space-y-5 items-center lg:sticky top-28">
                        <CategoryMenu  />
                    </div>
                </div>

                <div className="flex flex-wrap items-center justify-around gap-5">
                    {
                        products.map((item, index) => <ProductCard key={index} />)
                    }
                </div>
            </section>
        </div>
    );
}

export default Home;
