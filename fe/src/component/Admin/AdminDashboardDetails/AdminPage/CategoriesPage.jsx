import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import '../../../../style/AdminDashboard.css';
import SearchIcon from "@mui/icons-material/Search";
import {ChevronLeft, ChevronRight, Edit} from "@mui/icons-material";
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import {useNavigate} from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import {deleteCategory, getAllCategoriesAdmin} from "../../../State/Admin/Action";

const PER_PAGE = 4;

function CategoriesPage() {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [categories, setCategories] = useState([]);  // Initialize as an empty array
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    // Fetch categories from the API on component mount
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await getAllCategoriesAdmin();  // API call
                // Map API response to match your table data format
                const mappedCategories = response.result.map(cat => ({
                    id: cat.categoryId,  // Map categoryId to id
                    name: cat.categoryName,  // Map categoryName to name
                    icon: cat.picture || 'https://via.placeholder.com/40',  // Use picture or placeholder
                    status: cat.isActive ? 'Active' : 'Inactive'  // Convert boolean to status string
                }));
                setCategories(mappedCategories);  // Set categories in state
            } catch (error) {
                console.error("Error fetching categories", error);
            }
        };

        fetchCategories();  // Call the fetch function
    }, []);  // Empty dependency array to run this effect only once on mount

    const filteredCategories = categories.filter(
        (category) =>
            category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    const handleStatusToggle = (category) => {
        setSelectedCategory(category);
        setIsModalOpen(true);
    };

    const handleNavigate = (path) => {
        navigate(`/admin-dashboard${path}`);
    };

    const confirmStatusToggle = () => {
        if (selectedCategory) {
            setCategories((prevCategories) =>
                prevCategories.map((category) =>
                    category.id === selectedCategory.id
                        ? { ...category, status: category.status === 'Active' ? 'Inactive' : 'Active' }
                        : category
                )
            );
        }
        setIsModalOpen(false);
    };

    const handleDelete = (category) => {
        setSelectedCategory(category);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        try {
            // Call the deleteCategory API function
            await deleteCategory(selectedCategory.id);

            // Update local state to remove the deleted category
            setCategories(prevCategories =>
                prevCategories.filter(category => category.id !== selectedCategory.id)
            );

            // Close the delete modal
            setIsDeleteModalOpen(false);
        } catch (error) {
            console.error("Error deleting category", error);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleCloseDeleteModal = () => {
        setIsDeleteModalOpen(false);
    };

    const offset = currentPage * PER_PAGE;
    const pageCount = Math.ceil(filteredCategories.length / PER_PAGE);
    const currentCategories = filteredCategories.slice(offset, offset + PER_PAGE);

    return (
        <div style={{ flex: 1, padding: '20px', marginTop: '36px' }}>
            <div className="container overflow-hidden rounded-lg bg-white p-6 md:p-7 col-span-full">
                <div className='flex justify-between mt-3'>
                    <div className='recent-orders-header relative top-3'>
                        <h2 className='text-2xl font-semibold'>Categories</h2>
                    </div>
                    <div className="flex justify-end w-3/4">
                        <div className="search-container mr-20 top-2">
                            <input
                                type="text"
                                placeholder="Search by Category"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="search-input"
                            />
                            <span className="search-icon">
                                <SearchIcon/>
                            </span>
                        </div>
                        <button onClick={() => handleNavigate('/create-category')} className="add-user-button w-1/10 h-12 relative top-2">
                            + Add Category
                        </button>
                    </div>
                </div>
            </div>

            <div className="container-table overflow-hidden rounded-lg bg-white col-span-full mt-10 mb-5">
                <table>
                    <thead>
                    <tr>
                        <th id='center'>ID</th>
                        <th id='center'>Category</th>
                        <th id='center'>Status</th>
                        <th id='center'>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentCategories.map((category) => (
                        <tr key={category.id}>
                            <td>{category.id}</td>
                            <td>
                                <div className="category-info flex relative left-40">
                                    <img src={category.icon} alt="Category Icon" className="avatar" />
                                    <div className="category-details">
                                        <span className="category-name relative top-2">{category.name}</span>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <span className={category.status === 'Active' ? 'active-status' : 'inactive-status'}>
                                    {category.status}
                                </span>
                            </td>
                            <td>
                                <button onClick={() => handleStatusToggle(category)} className='toggle-status'>
                                    {category.status === 'Active' ? (
                                        <ToggleOnIcon style={{ color: 'green' }} />
                                    ) : (
                                        <ToggleOffIcon style={{ color: 'grey' }} />
                                    )}
                                </button>
                                <button onClick={() => handleNavigate(`/edit-category/${category.id}`)} className='edit-category'>
                                    <Edit />
                                </button>
                                <button onClick={() => handleDelete(category)} className='delete-category'>
                                    <DeleteIcon />
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
                        Are you sure you want to {selectedCategory?.status === 'Active' ? 'deactivate' : 'activate'} this category?
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

            <Dialog open={isDeleteModalOpen} onClose={handleCloseDeleteModal}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete the category {selectedCategory?.name}? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteModal} style={{ backgroundColor: '#dee2e6', color: '#000' }}>
                        Cancel
                    </Button>
                    <Button onClick={confirmDelete} style={{ backgroundColor: '#ff4d4f', color: '#fff' }}>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default CategoriesPage;
