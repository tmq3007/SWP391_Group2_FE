import React, { useState, useEffect } from 'react';
import {useNavigate} from "react-router-dom";

const Sidebar = () => {
    const [selectedItem, setSelectedItem] = useState('New User');
    const navigate = useNavigate();

    const handleSelect = (item, navigate_path) => {
        setSelectedItem(item);
        navigate(`/help-center${navigate_path}`)
    };


    return (
        <div className="w-64 p-4 bg-gray-100 border-r border-gray-300">
            <div className="mb-6">
                <h3 className="font-bold text-black mb-2">Shopping with Shopii</h3>
                <ul>
                    <li
                        className={`p-2 cursor-pointer ${selectedItem === 'New User' ? 'bg-[#019376] text-white' : 'text-gray-500'}`}
                        onClick={() => handleSelect('New User', '/new-user')}
                    >
                        New User
                    </li>
                    <li
                        className={`p-2 cursor-pointer ${selectedItem === 'Order Payment' ? 'bg-[#019376] text-white' : 'text-gray-500'}`}
                        onClick={() => handleSelect('Order Payment', '/order-payment')}
                    >
                        Order Payment
                    </li>
                    <li
                        className={`p-2 cursor-pointer ${selectedItem === 'Explore' ? 'bg-[#019376] text-white' : 'text-gray-500'}`}
                        onClick={() => handleSelect('Explore', '/explore')}
                    >
                        Explore
                    </li>
                </ul>
            </div>
            <div className="mb-6">
                <h3 className="font-bold text-black mb-2">Sales</h3>
                <ul>
                    <li
                        className={`p-2 cursor-pointer ${selectedItem === 'Promotions' ? 'bg-[#019376] text-white' : 'text-gray-500'}`}
                        onClick={() => handleSelect('Promotions', '/new-user')}
                    >
                        Promotions
                    </li>
                </ul>
            </div>
            <div>
                <h3 className="font-bold text-black mb-2">General Information</h3>
                <ul>
                    <li
                        className={`p-2 cursor-pointer ${selectedItem === 'Shopii Policies' ? 'bg-[#019376] text-white' : 'text-gray-500'}`}
                        onClick={() => handleSelect('Shopii Policies', '/new-user')}
                    >
                        Shopii Policies
                    </li>
                    <li
                        className={`p-2 cursor-pointer ${selectedItem === 'Shopii Account' ? 'bg-[#019376] text-white' : 'text-gray-500'}`}
                        onClick={() => handleSelect('Shopii Account', '/new-user')}
                    >
                        Shopii Account
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;