import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import '../../../../style/AdminDashboard.css';
import SearchIcon from "@mui/icons-material/Search";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import PersonIcon from "@mui/icons-material/Person";
import PersonOffIcon from '@mui/icons-material/PersonOff';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

const usersData = [
    {
        id: '1',
        name: 'Jhon Doe',
        email: 'admin@demo.com',
        avatar: 'https://via.placeholder.com/40',
        permissions: ['super_admin', 'customer', 'store_owner'],
        walletPoints: '',
        status: 'Active',
    },
    {
        id: '2',
        name: 'Customer',
        email: 'customer@demo.com',
        avatar: 'https://via.placeholder.com/40',
        permissions: ['customer'],
        walletPoints: '1090',
        status: 'Active',
    },
    {
        id: '3',
        name: 'Store Owner',
        email: 'store_owner@demo.com',
        avatar: 'https://via.placeholder.com/40',
        permissions: ['customer', 'store_owner'],
        walletPoints: '',
        status: 'Active',
    },
    // Add more users as needed
];

const PER_PAGE = 4;

function UsersPage() {
    const [currentPage, setCurrentPage] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null); // For tracking the user being blocked/unblocked

    const filteredUsers = usersData.filter(
        (user) =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Open modal for the selected user
    const handleOpenModal = (user) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    // Confirm block/unblock user and toggle the status
    const handleConfirm = () => {
        if (selectedUser) {
            // Toggle the user status between Active and Inactive
            const updatedUsers = usersData.map((user) =>
                user.id === selectedUser.id
                    ? { ...user, status: user.status === 'Active' ? 'Inactive' : 'Active' }
                    : user
            );

            // Update the users data (this would normally be done by updating state or sending a request to a backend)
            usersData.splice(0, usersData.length, ...updatedUsers);

            handleCloseModal(); // Close the modal after confirming
        }
    };

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    const offset = currentPage * PER_PAGE;
    const pageCount = Math.ceil(filteredUsers.length / PER_PAGE);
    const currentUsers = filteredUsers.slice(offset, offset + PER_PAGE);

    return (
        <div style={{ flex: 1, padding: '20px', marginTop: '36px' }}>
            <div className="container overflow-hidden rounded-lg bg-white p-6 md:p-7 col-span-full">

                <div className='flex justify-between mt-3'>
                    <div className='recent-orders-header relative top-3'>
                        <h2 className='text-2xl font-semibold'>Users</h2>
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
                        <button className="add-user-button w-1/10 h-12 relative top-2">
                            + Add User
                        </button>
                    </div>
                </div>
            </div>

            <div className="container-table overflow-hidden rounded-lg bg-white col-span-full mt-10 mb-5">
                <table>
                    <thead>
                    <tr>
                        <th id='center'>ID</th>
                        <th id='center'>Name</th>
                        <th id='center'>Permissions</th>
                        <th id='center'>Available wallet points</th>
                        <th id='center'>Status</th>
                        <th id='center'>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentUsers.map((user) => (
                        <tr key={user.id}>
                            <td>#ID: {user.id}</td>
                            <td>
                                <div className="customer-info">
                                    <img src={user.avatar} alt="Avatar" className="avatar" />
                                    <div className="customer-details">
                                        <span className="customer-name">{user.name}</span>
                                        <small className="customer-email">{user.email}</small>
                                    </div>
                                </div>
                            </td>
                            <td>
                                {user.permissions.map((perm, i) => (
                                    <span key={i} className="permission-badge">
                                            {perm}
                                        </span>
                                ))}
                            </td>
                            <td>{user.walletPoints || 'N/A'}</td>
                            <td>
                                    <span className={user.status === 'Active' ? 'active-status' : 'inactive-status'}>
                                        {user.status}
                                    </span>
                            </td>
                            <td>
                                <button className='eye' onClick={() => handleOpenModal(user)}>
                                    {user.status === 'Active' ? (
                                        <PersonOffIcon style={{ color: 'red' }} />
                                    ) : (
                                        <PersonIcon style={{ color: 'green' }} />
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
    );
}

export default UsersPage;
