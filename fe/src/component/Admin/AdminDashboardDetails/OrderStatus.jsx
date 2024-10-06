import React, { useState } from 'react';
import '../../../style/AdminDashboard.css';

const OrderStatus = () => {
    const [timeFilter, setTimeFilter] = useState('today');

    const orderStatusData = [
        {
            id: 1,
            label: 'Pending Order',
            value: '0',
            icon: '📋',
            borderColor: 'blue',
        },
        {
            id: 2,
            label: 'Processing Order',
            value: '0',
            icon: '👥',
            borderColor: 'lightblue',
        },
        {
            id: 3,
            label: 'Completed Order',
            value: '0',
            icon: '📦',
            borderColor: 'orange',
        },
        {
            id: 4,
            label: 'Cancelled Order',
            value: '0',
            icon: '💸',
            borderColor: 'lightgreen',
        },
    ];

    const handleFilterClick = (filter) => {
        setTimeFilter(filter);
    };

    return (
        <div className='order-status-container col-span-full rounded-lg bg-white p-6 md:p-7'>
            <div className='flex justify-between'>
            <div className='order-status-header'>
                <h2 className='text-2xl font-semibold'>Order Status</h2>
            </div>
                {/* Time Filter Section */}
                <div className="time-filter mt-4 flex space-x-3 bg-gray-100 rounded-full">
                    {['today', 'weekly', 'monthly', 'yearly'].map((filter) => (
                        <button
                            key={filter}
                            className={`py-2 px-4 rounded-full border ${
                                timeFilter === filter
                                    ? 'bg-white text-green-600 border-green-600'
                                    : 'bg-transparent text-gray-500 border-transparent hover:border-gray-300'
                            }`}
                            onClick={() => handleFilterClick(filter)}
                        >
                            {filter.charAt(0).toUpperCase() + filter.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            <div className='grid w-full grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4 mt-4'>
                {orderStatusData.map((item) => (
                    <div
                        className="order-status-card flex h-full w-full flex-col rounded-lg border border-b-4 bg-white p-5 md:p-6"
                        key={item.id}
                        style={{ borderColor: item.borderColor }}>
                        <div className='flex mb-auto w-full items-center justify-between'>
                            <div className="icon flex h-14 w-14 shrink-0 items-center justify-center rounded bg-gray-100/80 me-3"
                                 style={{ color: item.borderColor }}>
                                {item.icon}
                            </div>
                            <div className="card-details flex flex-col w-full text-end">
                                <span className='mb-1 text-base font-normal'>{item.label}</span>
                                <span className='mb-2 text-2xl font-semibold'>{item.value}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrderStatus;
