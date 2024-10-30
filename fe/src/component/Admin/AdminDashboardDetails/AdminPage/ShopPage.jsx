import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import '../../../../style/AdminDashboard.css';
import SearchIcon from "@mui/icons-material/Search";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import ToggleOnIcon from '@mui/icons-material/ToggleOn';   // For active status
import ToggleOffIcon from '@mui/icons-material/ToggleOff'; // For inactive status
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import {getAllStatisticsShop} from "../../../State/Admin/Action";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";


const PER_PAGE = 4;

function ShopsPage() {
    const [currentPage, setCurrentPage] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [shops, setShops] = useState([]);

    useEffect(() => {
        // Fetch shop statistics data on component mount
        const fetchShopsData = async () => {
            try {
                const data = await getAllStatisticsShop();
                // Map the API data to the format expected by the component
                const formattedData = data.result.map((shop) => ({
                    id: `#ID: ${shop.shopID}`, // Formatting ID for unique key
                    shop: {
                        avatar: shop.logo,
                        name: shop.shopName,
                    },
                    products: shop.totalProduct,
                    orders: shop.totalOrder,
                    owner: {
                        avatar: shop.user.avatar || 'https://via.placeholder.com/40', // Default avatar if missing
                        name: `${shop.user.firstName} ${shop.user.lastName}`,
                    },
                }));
                setShops(formattedData);
            } catch (error) {
                console.error("Error fetching shop statistics", error);
            }
        };

        fetchShopsData();
    }, []);

    const filteredShops = shops.filter(
        (shop) =>
            shop.shop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            shop.owner.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    const offset = currentPage * PER_PAGE;
    const pageCount = Math.ceil(filteredShops.length / PER_PAGE);
    const currentShops = filteredShops.slice(offset, offset + PER_PAGE);

    return (
        <div style={{ flex: 1, padding: '20px', marginTop: '36px' }}>
            <div className="container overflow-hidden rounded-lg bg-white p-6 md:p-7 col-span-full">
                <div className='flex justify-between mt-3'>
                    <div className='recent-orders-header relative top-3'>
                        <h2 className='text-2xl font-semibold'>Shops</h2>
                    </div>

                    <div className="search-container top-2">
                        <input
                            type="text"
                            placeholder="Search by Shop or Owner"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="search-input"
                        />
                        <span className="search-icon">
                            <SearchIcon />
                        </span>
                    </div>
                </div>
            </div>

            <div className="container-table overflow-hidden rounded-lg bg-white col-span-full mt-10 mb-5">
                <table>
                    <thead>
                    <tr>
                        <th id='center'>ID</th>
                        <th id='center'>Shop</th>
                        <th id='center'>Products</th>
                        <th id='center'>Orders</th>
                        <th id='center'>Owner</th>
                        <th id='center'>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentShops.map((shop) => (
                        <tr key={shop.id}>
                            <td>{shop.id}</td>
                            <td>
                                <div className="shop-info flex relative left-10">
                                    <img src={shop.shop.avatar} alt="Shop Avatar" className="avatar" />
                                    <div className="shop-details">
                                        <span className="shop-name relative top-2">{shop.shop.name}</span>
                                    </div>
                                </div>
                            </td>
                            <td>{shop.products}</td>
                            <td>{shop.orders}</td>
                            <td>
                                <div className="owner-info flex relative left-16">
                                    <img src={shop.owner.avatar} alt="Owner Avatar" className="avatar" />
                                    <div className="owner-details">
                                        <span className="owner-name relative top-2">{shop.owner.name}</span>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <button className='toggle-status'>
                                    <RemoveRedEyeIcon />
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <ReactPaginate
                previousLabel={<ChevronLeft />}
                nextLabel={<ChevronRight />}
                pageCount={pageCount}
                onPageChange={handlePageClick}
                containerClassName={'pagination'}
                activeClassName={'active'}
            />


        </div>
    );
}

export default ShopsPage;
