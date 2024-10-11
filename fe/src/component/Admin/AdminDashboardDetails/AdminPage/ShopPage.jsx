import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import '../../../../style/AdminDashboard.css';
import SearchIcon from "@mui/icons-material/Search";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import ToggleOnIcon from '@mui/icons-material/ToggleOn';   // For active status
import ToggleOffIcon from '@mui/icons-material/ToggleOff'; // For inactive status
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

const shopData = [
    {
        id: 'shop001',
        shop: {
            avatar: 'https://via.placeholder.com/40',
            name: 'Tech Store',
        },
        products: 120,
        orders: 45,
        owner: {
            avatar: 'https://via.placeholder.com/40',
            name: 'John Doe',
        },
        status: 'Active', // Active shop
    },
    {
        id: 'shop002',
        shop: {
            avatar: 'https://via.placeholder.com/40',
            name: 'Clothing Hub',
        },
        products: 80,
        orders: 30,
        owner: {
            avatar: 'https://via.placeholder.com/40',
            name: 'Jane Smith',
        },
        status: 'Inactive', // Inactive shop
    },
    // More shops can be added here
];

const PER_PAGE = 4;

function ShopsPage() {
    const [currentPage, setCurrentPage] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [shops, setShops] = useState(shopData); // Use state for shop data
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedShop, setSelectedShop] = useState(null); // Track the selected shop for toggling status

    const filteredShops = shops.filter(
        (shop) =>
            shop.shop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            shop.owner.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    const handleStatusToggle = (shop) => {
        // Open the modal to confirm toggle action
        setSelectedShop(shop);
        setIsModalOpen(true);
    };

    const confirmStatusToggle = () => {
        if (selectedShop) {
            setShops((prevShops) =>
                prevShops.map((shop) =>
                    shop.id === selectedShop.id
                        ? { ...shop, status: shop.status === 'Active' ? 'Inactive' : 'Active' }
                        : shop
                )
            );
        }
        setIsModalOpen(false); // Close the modal after confirmation
    };

    const handleCloseModal = () => {
        setIsModalOpen(false); // Close the modal without making changes
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
                        <th id='center'>Status</th>
                        <th id='center'>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentShops.map((shop) => (
                        <tr key={shop.id}>
                            <td>{shop.id}</td>
                            <td>
                                <div className="shop-info flex relative left-20">
                                    <img src={shop.shop.avatar} alt="Shop Avatar" className="avatar" />
                                    <div className="shop-details">
                                        <span className="shop-name relative top-2">{shop.shop.name}</span>
                                    </div>
                                </div>
                            </td>
                            <td>{shop.products}</td>
                            <td>{shop.orders}</td>
                            <td>
                                <div className="owner-info flex relative left-20">
                                    <img src={shop.owner.avatar} alt="Owner Avatar" className="avatar" />
                                    <div className="owner-details">
                                        <span className="owner-name relative top-2">{shop.owner.name}</span>
                                    </div>
                                </div>
                            </td>
                            <td>
                                    <span
                                        className={shop.status === 'Active' ? 'active-status' : 'inactive-status'}
                                    >
                                        {shop.status}
                                    </span>
                            </td>
                            <td>
                                <button onClick={() => handleStatusToggle(shop)} className='toggle-status'>
                                    {shop.status === 'Active' ? (
                                        <ToggleOnIcon style={{ color: 'green' }} />
                                    ) : (
                                        <ToggleOffIcon style={{ color: 'grey' }} />
                                    )}
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

            {/* Confirmation Modal */}
            <Dialog
                open={isModalOpen}
                onClose={handleCloseModal}
            >
                <DialogTitle>
                    Confirm Status Change
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to {selectedShop?.status === 'Active' ? 'deactivate' : 'activate'} this shop?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal} style={{ backgroundColor: '#dee2e6', color: '#000' }}>
                        Cancel
                    </Button>
                    <Button onClick={confirmStatusToggle} style={{ backgroundColor: '#28a745', color: '#fff' }}>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default ShopsPage;
