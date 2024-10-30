import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import '../../../../style/AdminDashboard.css';
import SearchIcon from "@mui/icons-material/Search";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import PersonIcon from "@mui/icons-material/Person";
import PersonOffIcon from '@mui/icons-material/PersonOff';
import {
    Alert,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Snackbar
} from "@mui/material";
import { banUser, unbanUser, getAllVendors} from "../../../State/Admin/Action";

const PER_PAGE = 5;

function VendorsPage() {
    const [currentPage, setCurrentPage] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [usersData, setUsersData] = useState([]);

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
        const fetchSummaryData = async () => {
            try {
                const response = await getAllVendors();
                const transformedData = response.result.map((user) => {
                    let shopName = 'No Shop';
                    let shopStatus = 'Not Registered';
                    let shopLogo = 'https://via.placeholder.com/40';

                    if (user.shop) {
                        shopName = user.shop.shopName;
                        shopStatus = 'Active';
                        shopLogo = user.shop.logo || 'https://via.placeholder.com/40';
                    } else if (user.unverifiedShop) {
                        shopName = user.unverifiedShop.shopName;
                        shopStatus = user.unverifiedShop.isRejected ? 'Being Rejected' : 'Pending Approve';
                        shopLogo = user.unverifiedShop.logo || 'https://via.placeholder.com/40';
                    }

                    return {
                        id: user.id,
                        name: `${user.firstName} ${user.lastName}`,
                        email: user.email,
                        avatar: 'https://via.placeholder.com/40',
                        status: user.isActive ? 'Active' : 'Inactive',
                        shopLogo,
                        shopName,
                        shopStatus,
                    };
                });
                setUsersData(transformedData);
            } catch (e) {
                setSnackBarMessage("Cannot connect to the server. Please check your internet connection.");
                setSnackBarOpen(true);
            }
        };

        fetchSummaryData();
    }, []);

    const filteredUsers = usersData.filter(
        (user) =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleOpenModal = (user) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleConfirm = async () => {
        if (selectedUser) {
            try {
                if (selectedUser.status === 'Active') {
                    await banUser(selectedUser.id).then((response) => {
                        setSuccessSnackBarMessage("User has been banned successfully.");
                        setSuccessSnackBarOpen(true);
                    });
                } else {
                    await unbanUser(selectedUser.id).then((response) => {
                        setSuccessSnackBarMessage("User has been unbanned successfully.");
                        setSuccessSnackBarOpen(true);
                    });
                }

                const updatedUsers = usersData.map((user) =>
                    user.id === selectedUser.id
                        ? { ...user, status: user.status === 'Active' ? 'Inactive' : 'Active' }
                        : user
                );
                setUsersData(updatedUsers);
                handleCloseModal();

            } catch (error) {
                setSnackBarMessage("An error occurred. Please try again later.");
                setSnackBarOpen(true);
            }
        }
    };

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    const offset = currentPage * PER_PAGE;
    const pageCount = Math.ceil(filteredUsers.length / PER_PAGE);
    const currentUsers = filteredUsers.slice(offset, offset + PER_PAGE);

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
                        <h2 className='text-2xl font-semibold'>Vendors</h2>
                    </div>

                    <div className='flex justify-end w-3/4'>
                        <div className="search-container mr-20 top-2">
                            <input
                                type="text"
                                placeholder="Search by Name"
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
            </div>

            <div className="container-table overflow-hidden rounded-lg bg-white col-span-full mt-10 mb-5">
                <table>
                    <thead>
                    <tr>
                        <th id='center'>ID</th>
                        <th id='center'>Name</th>
                        {usersData.some(user => user.shopName !== 'No Shop') && <th id='center'>Shop Name</th>}
                        <th id='center'>Shop's Status</th>
                        <th id='center'>User's Status</th>
                        <th id='center'>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentUsers.map((user) => (
                        <tr key={user.id}>
                            <td>#ID: {user.id}</td>
                            <td>
                                <div className="customer-info">
                                    <img src={user.avatar} alt="Avatar" className="avatar"/>
                                    <div className="customer-details">
                                        <span className="customer-name">{user.name}</span>
                                        <small className="customer-email">{user.email}</small>
                                    </div>
                                </div>
                            </td>
                            <td>
                                {user.shopName === 'No Shop' ? (
                                    ''
                                ) : (
                                    <div className="customer-info">
                                        <img
                                            src={user.shopLogo || 'https://via.placeholder.com/40'}
                                            alt="Shop Avatar"
                                            className="avatar"
                                        />
                                        <span className="customer-name">{user.shopName}</span>
                                    </div>
                                )}
                            </td>
                            <td>
    <span className={
        user.shopStatus === 'Active' ? 'shop-active-status' :
            user.shopStatus === 'Pending Approve' ? 'shop-pending-status' :
                user.shopStatus === 'Being Rejected' ? 'shop-reject-status' :
                    'no-shop-status'

    }>
        {user.shopStatus}
    </span>
                            </td>
                            <td>
                                <span className={user.status === 'Active' ? 'active-status' : 'inactive-status'}>
                                    {user.status}
                                </span>
                            </td>

                            <td>
                                <button className='eye' onClick={() => handleOpenModal(user)}>
                                    {user.status === 'Active' ? (
                                        <PersonOffIcon style={{color: 'red'}}/>
                                    ) : (
                                        <PersonIcon style={{color: 'green'}}/>
                                    )}
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

            <Dialog
                open={isModalOpen}
                onClose={handleCloseModal}
            >
            <DialogTitle>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <img src="https://img.icons8.com/material-outlined/24/ff0000/trash--v1.png" alt="Trash Icon" />
                        <span>{selectedUser?.status === 'Active' ? 'Block Customer' : 'Unblock Customer'}</span>
                    </div>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {`Are you sure you want to ${selectedUser?.status === 'Active' ? 'ban' : 'unban'} this customer?`}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal} style={{ backgroundColor: '#dee2e6', color: '#000' }}>
                        Cancel
                    </Button>
                    <Button onClick={handleConfirm} style={{ backgroundColor: '#ff4d4f', color: '#fff' }}>
                        {selectedUser?.status === 'Active' ? 'Ban' : 'Unban'}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    </div>
    );
}

export default VendorsPage;
