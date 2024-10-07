import React from 'react';
import '../../../style/AdminDashboard.css';

const Summary= () => {
    const summaryData = [
        {
            id: 1,
            label: 'Total Revenue',
            value: '$1,818.80',
            icon: '💰', // You can replace these with SVG or images
            color: 'green',
        },
        {
            id: 2,
            label: 'Total Order',
            value: '14',
            icon: '🛒',
            color: 'purple',
        },
        {
            id: 3,
            label: 'Vendor',
            value: '11',
            icon: '📋',
            color: 'pink',
        },
        {
            id: 4,
            label: 'Total Shops',
            value: '14',
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
                        key={item.id} style={{borderColor: item.color}}>
                        <div className='flex mb-auto w-full items-center justify-between'>
                    <div className="icon flex h-14 w-14 shrink-0 items-center justify-center rounded bg-gray-100/80 me-3" style={{ color: item.color }}>
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

export default Summary;