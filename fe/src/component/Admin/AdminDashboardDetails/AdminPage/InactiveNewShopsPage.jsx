import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import '../../../../style/AdminDashboard.css';
import SearchIcon from "@mui/icons-material/Search";
import {ChevronLeft, ChevronRight} from "@mui/icons-material";

const ordersData = [
    {
        trackingNumber: '20240207303639',
        customer: 'Customer',
        email: 'customer@demo.com',
        avatar: 'https://via.placeholder.com/40', // Placeholder avatar image
        products: 6,
        orderDate: '8 months ago',
        total: '$64.79',
        status: 'Processing',
    },
    {
        trackingNumber: '20231105635099',
        customer: 'Jhon Doe',
        email: 'admin@demo.com',
        avatar: 'https://via.placeholder.com/40',
        products: 2,
        orderDate: 'a year ago',
        total: '$52.24',
        status: 'Processing',
    },
    // ...more orders
];

const PER_PAGE = 4;

function InactiveNewShopsPage() {
    const [currentPage, setCurrentPage] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredOrders = ordersData.filter(
        (order) =>
            order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    const offset = currentPage * PER_PAGE;
    const pageCount = Math.ceil(filteredOrders.length / PER_PAGE);
    const currentOrders = filteredOrders.slice(offset, offset + PER_PAGE);

    return (
        <div style={{flex: 1, padding: '20px', marginTop: '36px'}}>
            <div className="container overflow-hidden rounded-lg bg-white p-6 md:p-7 col-span-full">

                <div className='flex justify-between mt-3'>
                    <div className='recent-orders-header relative top-3'>
                        <h2 className='text-2xl font-semibold'>Inactive/New shops</h2>
                    </div>

                    <div className="search-container top-2">
                        <input
                            type="text"
                            placeholder="Search by Name"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="search-input"
                        />
                        <span className="search-icon">
                        <SearchIcon/>
                </span>
                    </div>
                </div>
            </div>

            <div className="container-table overflow-hidden rounded-lg bg-white col-span-full mt-10 mb-5">
                <table>
                    <thead>
                    <tr>
                        <th id='center'>Tracking Number</th>
                        <th id='center'>Customer</th>
                        <th id='center'>Products</th>
                        <th id='center'>Order Date</th>
                        <th id='center'>Total</th>
                        <th id='center'>Status</th>
                        <th id='center'>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentOrders.map((order, index) => (
                        <tr key={index}>
                            <td>{order.trackingNumber}</td>
                            <td>
                                <div className="customer-info">
                                    <img src={order.avatar} alt="Avatar" className="avatar"/>
                                    <div className="customer-details">
                                        <span className="customer-name">{order.customer}</span>
                                        <small className="customer-email">{order.email}</small>
                                    </div>
                                </div>
                            </td>
                            <td>{order.products}</td>
                            <td>{order.orderDate}</td>
                            <td>{order.total}</td>
                            <td>
                <span
                    className={
                        order.status === 'Completed'
                            ? 'completed-status'
                            : 'processing-status'
                    }
                >
                    {order.status}
                </span>
                            </td>
                            <td>
                                <button className='eye'>
                                    <img src="https://img.icons8.com/material-rounded/24/000000/visible.png"
                                         alt="View"/>
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>

                </table>
            </div>

            <ReactPaginate
                previousLabel={<ChevronLeft/>}
                nextLabel={<ChevronRight/>}
                pageCount={pageCount}
                onPageChange={handlePageClick}
                containerClassName={'pagination'}
                activeClassName={'active'}

            />
        </div>
    );
}

export default InactiveNewShopsPage;
