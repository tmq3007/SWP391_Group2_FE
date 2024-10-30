import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import '../../../../style/AdminDashboard.css';
import SearchIcon from "@mui/icons-material/Search";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import PersonIcon from "@mui/icons-material/Person";
import PersonOffIcon from '@mui/icons-material/PersonOff';
import SortIcon from "@mui/icons-material/Sort"; // Import Sort Icon
import {
    Alert,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Snackbar,
    Menu,
    MenuItem,
} from "@mui/material";
import { getAllUsers, banUser, unbanUser } from "../../../State/Admin/Action";

const PER_PAGE = 5;

function UsersPage() {
    const [currentPage, setCurrentPage] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null); // For tracking the user being blocked/unblocked
    const [usersData, setUsersData] = useState([]); // Store fetched users data

    const [successSnackBarOpen, setSuccessSnackBarOpen] = useState(false);
    const [successSnackBarMessage, setSuccessSnackBarMessage] = useState("");

    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState("");

    const [sortOption, setSortOption] = useState('name-asc'); // State to hold selected sort option
    const [anchorEl, setAnchorEl] = useState(null); // For managing dropdown menu

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
        // Async function to fetch users data
        const fetchSummaryData = async () => {
            try {
                const response = await getAllUsers();  // Fetch data
                const transformedData = response.result.map((user) => ({
                    id: user.id,
                    name: `${user.firstName} ${user.lastName}`, // Combine first and last names
                    email: user.email,
                    avatar: 'https://via.placeholder.com/40', // Placeholder image for now
                    phone: user.phone,
                    permissions: user.roles.map((role) => role.name), // Extract roles
                    status: user.isActive ? 'Active' : 'Inactive' // Determine status from `isActive`
                }));
                setUsersData(transformedData); // Update state with transformed data
            } catch (e) {
                setSnackBarMessage("Cannot connect to the server. Please check your internet connection.");
                setSnackBarOpen(true);
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

    // Sort users based on selected option
    const sortedUsers = filteredUsers.sort((a, b) => {
        switch (sortOption) {
            case 'name-asc':
                return a.name.localeCompare(b.name);
            case 'name-desc':
                return b.name.localeCompare(a.name);
            case 'id-asc':
                return a.id - b.id;
            case 'id-desc':
                return b.id - a.id;
            default:
                return 0;
        }
    });

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

                // Update local state with the new status
                const updatedUsers = usersData.map((user) =>
                    user.id === selectedUser.id
                        ? { ...user, status: user.status === 'Active' ? 'Inactive' : 'Active' }
                        : user
                );
                setUsersData(updatedUsers); // Update users data
                handleCloseModal(); // Close the modal after confirming

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
    const pageCount = Math.ceil(sortedUsers.length / PER_PAGE);
    const currentUsers = sortedUsers.slice(offset, offset + PER_PAGE);

    // Handle opening the dropdown menu
    const handleSortClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    // Handle closing the dropdown menu
    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    // Handle sort option selection
    const handleSortOptionSelect = (option) => {
        setSortOption(option);
        handleCloseMenu(); // Close the menu after selection
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
                            <button onClick={handleSortClick} className="sort-button">
                                <SortIcon />
                            </button>
                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleCloseMenu}
                            >
                                <MenuItem onClick={() => handleSortOptionSelect('name-asc')}>Name: A-Z</MenuItem>
                                <MenuItem onClick={() => handleSortOptionSelect('name-desc')}>Name: Z-A</MenuItem>
                                <MenuItem onClick={() => handleSortOptionSelect('id-asc')}>ID: Ascending</MenuItem>
                                <MenuItem onClick={() => handleSortOptionSelect('id-desc')}>ID: Descending</MenuItem>
                            </Menu>
                        </div>
                    </div>
                </div>

                <div className="container-table overflow-hidden rounded-lg bg-white col-span-full mt-10 mb-5">
                    <table>
                        <thead>
                        <tr>
                            <th id='center'>ID</th>
                            <th id='center'>Name</th>
                            <th id='center'>Phone</th>
                            <th id='center'>Roles</th>
                            <th id='center'>Status</th>
                            <th id='center'>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {currentUsers.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>
                                    <div className="customer-info">
                                        <img src={user.avatar} alt="Avatar" className="avatar"/>
                                        <div className="customer-details">
                                            <span className="customer-name">{user.name}</span>
                                            <small className="customer-email">{user.email}</small>
                                        </div>
                                    </div>
                                </td>
                                <td >{user.phone || 'N/A'}</td>
                                <td >
                                    {user.permissions.map((perm, i) => (
                                        <span key={i} className="permission-badge">
                                                {perm}
                                            </span>
                                    ))}
                                </td>
                                <td>
                                        <span className={user.status === 'Active' ? 'active-status' : 'inactive-status'}>
                                            {user.status}
                                        </span>
                                </td>
                                <td>
                                    {!user.permissions.includes("ADMIN") && (
                                        <button className='eye' onClick={() => handleOpenModal(user)}>
                                            {user.status === 'Active' ? (
                                                <PersonOffIcon style={{color: 'red'}}/>
                                            ) : (
                                                <PersonIcon style={{color: 'green'}}/>
                                            )}
                                        </button>
                                    )}
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
                            <span>{selectedUser?.status === 'Active' ? 'Ban User' : 'Unban User'}</span>
                        </div>
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {`Are you sure you want to ${selectedUser?.status === 'Active' ? 'ban' : 'unban'} this user?`}
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

export default UsersPage;
