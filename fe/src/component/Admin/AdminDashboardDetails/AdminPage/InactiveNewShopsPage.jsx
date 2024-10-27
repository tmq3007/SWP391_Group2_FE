import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import '../../../../style/AdminDashboard.css';
import SearchIcon from "@mui/icons-material/Search";
import { ChevronLeft, ChevronRight, Check, Close, Visibility } from "@mui/icons-material";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button,
    Alert,
    Snackbar
} from '@mui/material';
import { getAllUnverifiedShop, verifyShop, rejectShop, announceVerifyShop, announceRejectShop } from "../../../State/Admin/Action"; // Import APIs

const PER_PAGE = 4;

function InactiveNewShopsPage() {
    const [rejectReason, setRejectReason] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [shops, setShops] = useState([]);

    const [openVerifyModal, setOpenVerifyModal] = useState(false);
    const [openRejectModal, setOpenRejectModal] = useState(false);
    const [selectedShop, setSelectedShop] = useState(null);

    const [successSnackBarOpen, setSuccessSnackBarOpen] = useState(false);
    const [successSnackBarMessage, setSuccessSnackBarMessage] = useState("");

    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState("");

    const handleCloseSnackBar = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setSnackBarOpen(false);
    };

    const handleCloseSuccessSnackBar = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setSuccessSnackBarOpen(false);
    };

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

    const filteredShops = shops.filter(
        (shop) =>
            shop.shopName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            shop.owner.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    const offset = currentPage * PER_PAGE;
    const pageCount = Math.ceil(filteredShops.length / PER_PAGE);
    const currentShops = filteredShops.slice(offset, offset + PER_PAGE);

    const handleOpenVerifyModal = (shop) => {
        setSelectedShop(shop);
        setOpenVerifyModal(true);
    };

    const handleOpenRejectModal = (shop) => {
        setSelectedShop(shop);
        setOpenRejectModal(true);
    };

    const handleClose = () => {
        setOpenVerifyModal(false);
        setOpenRejectModal(false);
    };

    const handleRejectReasonChange = (e) => {
        setRejectReason(e.target.value);
    };

    // Confirm verification and call the API
    const handleConfirmVerify = async () => {
        if (selectedShop) {
            try {
                // Call the verifyShop API and announce verification via email
                await verifyShop(selectedShop.shopId);

                setSuccessSnackBarMessage("Shop verified successfully");
                setSuccessSnackBarOpen(true);

                // Remove the shop from the list after successful verification
                setShops((prevShops) => prevShops.filter((shop) => shop.shopId !== selectedShop.shopId));
                handleClose();
            } catch (error) {
                setSnackBarMessage("Error verifying shop");
                setSnackBarOpen(true);
            }
            await announceVerifyShop(selectedShop.email);
        }
    };

    // Confirm rejection and call the API
    const handleConfirmReject = async () => {
        if (selectedShop) {
            const rejectData = {
                email: selectedShop.email,
                message: rejectReason
            };

            try {
                // Call the rejectShop API and announce rejection via email
                await rejectShop(selectedShop.shopId);

                setSuccessSnackBarMessage("Shop rejected successfully");
                setSuccessSnackBarOpen(true);

                // Remove the shop from the list after successful rejection
                setShops((prevShops) => prevShops.filter((shop) => shop.shopId !== selectedShop.shopId));
                handleClose();
            } catch (error) {
                setSnackBarMessage("Error rejecting shop");
                setSnackBarOpen(true);
            }
            await announceRejectShop(rejectData);
        }
    };

    return (
        <div>
            <Snackbar
                open={snackBarOpen}
                onClose={handleCloseSnackBar}
                autoHideDuration={6000}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <Alert
                    onClose={handleCloseSnackBar}
                    severity="error"
                    variant="filled"
                    sx={{ width: "100%" }}
                >
                    {snackBarMessage}
                </Alert>
            </Snackbar>

            <Snackbar
                open={successSnackBarOpen}
                onClose={handleCloseSuccessSnackBar}
                autoHideDuration={6000}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <Alert
                    onClose={handleCloseSuccessSnackBar}
                    severity="success"
                    variant="filled"
                    sx={{ width: "100%" }}
                >
                    {successSnackBarMessage}
                </Alert>
            </Snackbar>

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
                            Are you sure you want to verify this shop?
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
                            Please provide a reason for rejecting the shop "{selectedShop?.shopName}".
                        </DialogContentText>
                        <textarea
                            value={rejectReason}
                            onChange={handleRejectReasonChange}
                            placeholder="Enter reason for rejection"
                            style={{ width: '100%', marginTop: '10px', padding: '8px' }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} style={{ backgroundColor: '#dee2e6', color: '#000' }}>
                            Cancel
                        </Button>
                        <Button onClick={handleConfirmReject} style={{ backgroundColor: '#ff4d4f', color: '#fff' }}>
                            Confirm
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    );
}

export default InactiveNewShopsPage;
