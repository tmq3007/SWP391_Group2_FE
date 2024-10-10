import React, { useEffect, useState } from 'react';
import '../../../style/AdminDashboard.css';
import { getTotalOrders, getTotalShops, getTotalVendors } from "../../State/Admin/Action";

const Summary = () => {
    const [totalShops, setTotalShops] = useState(0);
    const [totalVendors, setTotalVendors] = useState(0);
    const [totalOrders, setTotalOrders] = useState(0);

    useEffect(() => {
        // Async function to fetch summary data
        const fetchSummaryData = async () => {
            try {
                const shopsData = await getTotalShops();
                setTotalShops(shopsData?.result || 0);  // Fallback to 0 if no data

                const vendorsData = await getTotalVendors();
                setTotalVendors(vendorsData?.result || 0);  // Fallback to 0 if no data

                const ordersData = await getTotalOrders();
                setTotalOrders(ordersData?.result || 0);  // Fallback to 0 if no data
            } catch (e) {
                console.log('Error fetching summary data', e);
            }
        };

        // Call the async function
        fetchSummaryData();
    }, []); // Empty dependency array to ensure it runs only once on mount

    const summaryData = [
        {
            id: 1,
            label: 'Total Revenue',
            value: 1818.80, // Static value, you can make it dynamic as needed
            icon: '💰',
            color: 'green',
        },
        {
            id: 2,
            label: 'Total Order',
            value: totalOrders, // Dynamic value from API
            icon: '🛒',
            color: 'purple',
        },
        {
            id: 3,
            label: 'Vendor',
            value: totalVendors, // Dynamic value from API
            icon: '📋',
            color: 'pink',
        },
        {
            id: 4,
            label: 'Total Shops',
            value: totalShops, // Dynamic value from API
            icon: '🛍️',
            color: 'red',
        },
    ];

    return (
        <div className='summary-card-container col-span-full rounded-lg bg-white p-6 md:p-7'>
            <div className='summary-header'>
                <h2 className='text-2xl font-semibold'>Summary</h2>
            </div>
            <div className='grid w-full grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4 card-contain mt-4'>
                {summaryData.map((item) => (
                    <div
                        className="summary-card flex h-full w-full flex-col rounded-lg border border-b-4 bg-white p-5 md:p-6"
                        key={item.id}
                        style={{borderColor: item.color}}>
                        <div className='flex mb-auto w-full items-center justify-between'>
                            <div className="icon flex h-14 w-14 shrink-0 items-center justify-center rounded bg-gray-100/80 me-3" style={{ color: item.color }}>
                                {item.icon}
                            </div>
                            <div className="card-details flex flex-col w-full text-end">
                                <span className='mb-1 text-base font-normal'>{item.label}</span>
                                <span className='mb-2 text-2xl font-semibold'>
                                    {item.label === 'Total Revenue' ? `$${item.value}` : item.value}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Summary;
