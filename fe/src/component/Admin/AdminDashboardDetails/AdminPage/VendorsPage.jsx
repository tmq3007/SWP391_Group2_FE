import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import '../../../../style/AdminDashboard.css';
import SearchIcon from "@mui/icons-material/Search";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import PersonIcon from "@mui/icons-material/Person";
import PersonOffIcon from '@mui/icons-material/PersonOff';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { banUser, unbanUser, getAllVendors} from "../../../State/Admin/Action";

const PER_PAGE = 4;

function VendorsPage() {
    const [currentPage, setCurrentPage] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null); // For tracking the user being blocked/unblocked
    const [usersData, setUsersData] = useState([]); // Store fetched users data

    useEffect(() => {
        // Async function to fetch users data
        const fetchSummaryData = async () => {
            try {
                const response = await getAllVendors();  // Fetch data
                const transformedData = response.result.map((user) => ({
                    id: user.id,
                    name: `${user.firstName} ${user.lastName}`, // Combine first and last names
                    email: user.email,
                    avatar: 'https://via.placeholder.com/40', // Placeholder image for now
                    permissions: user.roles.map((role) => role.name), // Extract roles
                    walletPoints: '', // No wallet points in the original data
                    status: user.isActive ? 'Active' : 'Inactive' // Determine status from `isActive`
                }));
                setUsersData(transformedData); // Update state with transformed data
            } catch (e) {
                console.log('Error fetching summary data');
            }
        };

        fetchSummaryData(); // Fetch data when the component mounts
    }, []);

    // Filter users based on search term
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
    const handleConfirm = async () => {
        if (selectedUser) {
            try {
                // Call the appropriate function based on the user's current status
                if (selectedUser.status === 'Active') {
                    await banUser(selectedUser.id);  // Ban the user
                } else {
                    await unbanUser(selectedUser.id);  // Unban the user
                }

                // Update local state with the new status
                const updatedUsers = usersData.map((user) =>
                    user.id === selectedUser.id
                        ? { ...user, status: user.status === 'Active' ? 'Inactive' : 'Active' }
                        : user
                );
                setUsersData(updatedUsers); // Update users data
                handleCloseModal(); // Close the modal after confirming

            } catch (error) {
                console.error(`Error ${selectedUser.status === 'Active' ? 'banning' : 'unbanning'} user:`, error);
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

export default VendorsPage;
