import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [selectedItem, setSelectedItem] = useState('');

    useEffect(() => {
        // Cập nhật `selectedItem` dựa trên URL hiện tại
        switch (location.pathname) {
            case '/help-center/new-user':
                setSelectedItem('New User');
                break;
            case '/help-center/order-payment':
                setSelectedItem('Order');
                break;
            case '/help-center/explore':
                setSelectedItem('Payment');
                break;
            case '/help-center/promotions':
                setSelectedItem('Promotions');
                break;
            case '/help-center/shopii-policies':
                setSelectedItem('Shopii Policies');
                break;
            case '/help-center/shopii-account':
                setSelectedItem('Shopii Account');
                break;
            default:
                setSelectedItem('');
        }
    }, [location.pathname]);

    const handleSelect = (item, navigate_path) => {
        setSelectedItem(item);
        navigate(`/help-center${navigate_path}`);
    };

    return (
        <div className="w-64 p-4 border-r border-gray-300">
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
                        className={`p-2 cursor-pointer ${selectedItem === 'Order' ? 'bg-[#019376] text-white' : 'text-gray-500'}`}
                        onClick={() => handleSelect('Order', '/order-payment')}
                    >
                        Order
                    </li>
                    <li
                        className={`p-2 cursor-pointer ${selectedItem === 'Payment' ? 'bg-[#019376] text-white' : 'text-gray-500'}`}
                        onClick={() => handleSelect('Payment', '/explore')}
                    >
                        Payment
                    </li>
                </ul>
            </div>
            <div className="mb-6">
                <h3 className="font-bold text-black mb-2">Sales</h3>
                <ul>
                    <li
                        className={`p-2 cursor-pointer ${selectedItem === 'Promotions' ? 'bg-[#019376] text-white' : 'text-gray-500'}`}
                        onClick={() => handleSelect('Promotions', '/promotions')}
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
                        onClick={() => handleSelect('Shopii Policies', '/shopii-policies')}
                    >
                        Shopii Policies
                    </li>
                    <li
                        className={`p-2 cursor-pointer ${selectedItem === 'Shopii Account' ? 'bg-[#019376] text-white' : 'text-gray-500'}`}
                        onClick={() => handleSelect('Shopii Account', '/shopii-account')}
                    >
                        Shopii Account
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
