import React from 'react'
import ProfileNav from './ProfileNav'
import ProfileInfo from './ProfileInfo'
import {AddressProfile} from "./AddressProfile";
import {Route, Routes} from "react-router-dom";
import StaticOrderList from "./Orders/OrderList";
import OrderList from "./Orders/OrderList";
import OrderView from "./Orders/OrderView";

export const MyOrder = () => {
    return (
        <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/3 p-4">
                <OrderList/>
            </div>
            <div className="w-full md:w-2/3 p-4">
                <OrderView/>
            </div>
        </div>
    )
}
