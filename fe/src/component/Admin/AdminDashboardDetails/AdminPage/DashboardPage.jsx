import React from 'react';
import Summary from "../Summary";
import RecentOrders from "../RecentOrder";
import SaleHistory from "../SaleHistory";
import PopularProducts from "../PopularProducts";
import TopProducts from "../TopProducts";
import TopCategories from "../TopCategories";

const DashboardPage = () => {
    return (

        <div className='h-screen overflow-y-auto' style={{flex: 1, padding: '20px'}}>
            <div className='mt-10'>
                <Summary/>
            </div>

            <div className='flex justify-between w-full mt-10'>
                <div className='sale-history-container bg-white p-5 rounded-lg w-2/3'>
                    <SaleHistory/>
                </div>

                <div className='ml-4 w-1/3'>
                    <PopularProducts/>
                </div>
            </div>

            <div className='flex justify-between w-full mt-10'>
                <div className='top-products-container bg-white p-5 rounded-lg w-2/5'>
                    <TopProducts/>
                </div>

                <div className='top-categories-container ml-4 w-3/5 p-5 rounded-lg'>
                    <TopCategories/>
                </div>
            </div>
        </div>

    );
};

export default DashboardPage;