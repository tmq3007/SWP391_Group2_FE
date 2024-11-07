import React, { useState, useEffect } from 'react';
import "../../style/ShopProduct.css";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import axios from "axios";

export const ShopReview = () => {
    const token = localStorage.getItem('jwt');
    const userId = localStorage.getItem("userId");

    const [reviews, setReviews] = useState([]);
    const [shopId, setShopId] = useState("");
    const [page, setPage] = useState(1);

    const reviewsPerPage = 5;
    const totalPages = Math.ceil(reviews.length / reviewsPerPage);
    const indexOfLastReview = page * reviewsPerPage;
    const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
    const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

    // Function to fetch all reviews by shopId
    const getAllReviewsByShopId = async (shopId) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/reviews/get-all-review-by-shop-id/${shopId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setReviews(response.data.result || []); // Set reviews, default to empty array if result is null or undefined
        } catch (error) {
            console.error("Error fetching reviews:", error);
        }
    };

    useEffect(() => {
        const fetchShopId = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/v1/shops/get-shopId/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const shopId = response.data.result;
                setShopId(shopId);
                if (shopId) getAllReviewsByShopId(shopId);
            } catch (error) {
                console.error("Error fetching shopId:", error);
            }
        };
        fetchShopId();
    }, [userId, token]);

    const handlePageChange = (event, value) => setPage(value);

    return (
        <div className="w-full bg-white h-screen overflow-y-auto">
            <div className='h-screen p-6'>
                <div className="bg-white rounded-lg p-6 shadow-md mb-8">
                    <h2 className="text-xl mt-5 font-semibold text-gray-800">Reviews</h2>
                </div>

                {/* Conditionally render reviews table only if there are reviews */}
                {reviews.length > 0 ? (
                    <div className="rc-table-content">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Review ID</th>
                                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Product Name</th>
                                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">User Name</th>
                                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Review Text</th>
                                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Rating</th>
                                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Created At</th>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            {currentReviews.map(review => (
                                <tr key={review.reviewId} className="text-center">
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{review.reviewId}</td>
                                    <td className="px-6 py-4 text-sm text-gray-900">{review.product?.productName || "N/A"}</td>
                                    <td className="px-6 py-4 text-sm text-gray-900">{review.user?.firstName || "Anonymous"}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{review.reviewText}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{review.rating}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{new Date(review.createAt).toLocaleString()}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-center text-gray-500">No reviews available</p>
                )}

                {reviews.length > 0 && (
                    <div className="flex items-center justify-end mt-5">
                        <Stack spacing={2}>
                            <Pagination
                                count={totalPages}
                                page={page}
                                onChange={handlePageChange}
                                color="primary"
                            />
                        </Stack>
                    </div>
                )}
            </div>
        </div>
    );
};
