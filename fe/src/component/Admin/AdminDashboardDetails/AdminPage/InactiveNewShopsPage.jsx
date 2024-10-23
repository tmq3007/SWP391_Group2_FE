import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import '../../../../style/AdminDashboard.css';
import SearchIcon from "@mui/icons-material/Search";
import { ChevronLeft, ChevronRight, Check, Close, Visibility } from "@mui/icons-material";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import { getAllUnverifiedShop } from "../../../State/Admin/Action";
import { verifyShop } from "../../../State/Admin/Action";  // Import the verifyShop API call

const PER_PAGE = 4;

function InactiveNewShopsPage() {
    const [currentPage, setCurrentPage] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [shops, setShops] = useState([]);

    // Modal states for verify and reject
    const [openVerifyModal, setOpenVerifyModal] = useState(false);
    const [openRejectModal, setOpenRejectModal] = useState(false);
    const [selectedShop, setSelectedShop] = useState(null);

    // Fetch shops from API
    useEffect(() => {
        async function fetchShops() {
            try {
                const response = await getAllUnverifiedShop();
                const mappedShops = response.result.map((shop) => ({
                    shopId: shop.shopId,
                    shopName: shop.shopName,
                    owner: `${shop.user.firstName} ${shop.user.lastName}`,
                    email: shop.user.email,
                    avatar: shop.logo || 'https://via.placeholder.com/40', // Placeholder if no logo is provided
                }));
                setShops(mappedShops);
            } catch (error) {
                console.error("Error fetching unverified shops", error);
            }
        }

        fetchShops();
    }, []);

    // Filter shops based on search input
    const filteredShops = shops.filter(
        (shop) =>
            shop.shopName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            shop.owner.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Handle pagination click
    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    // Calculate pagination offset
    const offset = currentPage * PER_PAGE;
    const pageCount = Math.ceil(filteredShops.length / PER_PAGE);
    const currentShops = filteredShops.slice(offset, offset + PER_PAGE);

    // Open modal to confirm verification
    const handleOpenVerifyModal = (shop) => {
        setSelectedShop(shop);
        setOpenVerifyModal(true);
    };

    // Open modal to confirm rejection
    const handleOpenRejectModal = (shop) => {
        setSelectedShop(shop);
        setOpenRejectModal(true);
    };

    // Close the verify or reject modal
    const handleClose = () => {
        setOpenVerifyModal(false);
        setOpenRejectModal(false);
    };

    // Confirm verification and call the API
    const handleConfirmVerify = async () => {
        if (selectedShop) {
            try {
                await verifyShop(selectedShop.shopId); // Call verify API
                // Remove the shop from the list after successful verification
                setShops((prevShops) => prevShops.filter((shop) => shop.shopId !== selectedShop.shopId));
                handleClose();
            } catch (error) {
                console.error("Error verifying shop", error);
            }
        }
    };

    // Confirm rejection and remove the shop (no API call)
    const handleConfirmReject = () => {
        if (selectedShop) {
            // Remove the shop from the list after rejection
            setShops((prevShops) => prevShops.filter((shop) => shop.shopId !== selectedShop.shopId));
            handleClose();
        }
    };

    return (
        <div style={{ flex: 1, padding: '20px', marginTop: '36px' }}>
            <div className="container overflow-hidden rounded-lg bg-white p-6 md:p-7 col-span-full">
                <div className='flex justify-between mt-3'>
                    <div className='recent-orders-header relative top-3'>
                        <h2 className='text-2xl font-semibold'>Inactive/New Shops</h2>
                    </div>

                    <div className="search-container top-2">
                        <input
                            type="text"
                            placeholder="Search by Shop Name or Owner"
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
                        <th id='center'>Shop Name</th>
                        <th id='owner-un-shop'>Owner</th>
                        <th id='center'>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentShops.map((shop, index) => (
                        <tr key={index}>
                            <td>{shop.shopName}</td>
                            <td>
                                <div className="customer-info">
                                    <img src={shop.avatar} alt="Avatar" className="avatar" />
                                    <div className="customer-details">
                                        <span className="customer-name">{shop.owner}</span>
                                        <small className="customer-email">{shop.email}</small>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <button
                                    className='action-button'
                                    onClick={() => handleOpenVerifyModal(shop)}
                                    title="Verify"
                                    style={{ cursor: 'pointer' }}
                                >
                                    <Check style={{ color: 'green' }} />
                                </button>
                                <button
                                    className='action-button'
                                    onClick={() => handleOpenRejectModal(shop)}
                                    title="Reject"
                                    style={{ cursor: 'pointer' }}
                                >
                                    <Close style={{ color: 'red' }} />
                                </button>
                                <button
                                    className='action-button'
                                    title="View Details"
                                    style={{ cursor: 'pointer' }}
                                >
                                    <Visibility style={{ color: 'blue' }} />
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

            {/* Verify Modal */}
            <Dialog
                open={openVerifyModal}
                onClose={handleClose}
                aria-labelledby="verify-action-dialog-title"
                aria-describedby="verify-action-dialog-description"
            >
                <DialogTitle id="verify-action-dialog-title">
                    Confirm Verification
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="verify-action-dialog-description">
                        Are you sure you want to verify the shop "{selectedShop?.shopName}"?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} style={{ backgroundColor: '#dee2e6', color: '#000' }}>
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmVerify} style={{ backgroundColor: '#28a745', color: '#fff' }} autoFocus>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Reject Modal */}
            <Dialog
                open={openRejectModal}
                onClose={handleClose}
                aria-labelledby="reject-action-dialog-title"
                aria-describedby="reject-action-dialog-description"
            >
                <DialogTitle id="reject-action-dialog-title">
                    Confirm Rejection
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="reject-action-dialog-description">
                        Are you sure you want to reject the shop "{selectedShop?.shopName}"?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} style={{ backgroundColor: '#dee2e6', color: '#000' }}>
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmReject} style={{ backgroundColor: '#ff4d4f', color: '#fff' }} autoFocus>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default InactiveNewShopsPage;
