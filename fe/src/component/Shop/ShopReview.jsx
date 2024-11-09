import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import axios from "axios";
import { getAllProductsByShopIdAction } from "../State/Product/Action";

export const ShopReview = () => {
    const dispatch = useDispatch();
    const token = localStorage.getItem("jwt");
    const userId = localStorage.getItem("userId");
    const [shopId, setShopId] = useState("");
    const [review, setReview] = useState([]);
    const [sortOrder, setSortOrder] = useState("asc");

    // Get shop Id
    useEffect(() => {
        let isMounted = true;

        const fetchShopId = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/v1/shops/get-shopId/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (isMounted) {
                    const shopId = response.data.result;
                    setShopId(shopId);
                    if (shopId) dispatch(getAllProductsByShopIdAction(shopId));
                }
            } catch (error) {
                console.error("Error fetching shopId:", error);
            }
        };

        fetchShopId();
        return () => { isMounted = false };
    }, [dispatch, token, userId]);

    // Get all reviews by shop id
    useEffect(() => {
        let isMounted = true;

        const fetchReviews = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/v1/reviews/get-all-review-by-shop-id/3`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (isMounted) {
                    const review = response.data;
                    setReview(review);
                }
            } catch (error) {
                console.error("Error fetching review:", error);
            }
        };

        fetchReviews();
        return () => { isMounted = false };
    }, [dispatch, token, shopId]);

    const sortReviews = () => {
        const sortedReviews = [...review].sort((a, b) => {
            if (sortOrder === "asc") {
                return a.rating - b.rating;
            } else {
                return b.rating - a.rating;
            }
        });
        setReview(sortedReviews);
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    };

    return (
        <div className="p-6 bg-white shadow-md rounded-lg mt-5">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Reviews</h2>
            <div className="overflow-y-auto max-h-[680px]">
                <table className="min-w-full bg-white border border-gray-200 ">
                    <thead>
                    <tr className="bg-gray-50">
                        <th className="px-6 py-3 border-b text-xs font-medium text-gray-500 uppercase">ID</th>
                        <th className="px-6 py-3 border-b text-xs font-medium text-gray-500 uppercase">Product</th>
                        <th className="px-6 py-3 border-b text-xs font-medium text-gray-500 uppercase">Customer Review
                        </th>
                        <th
                            className="px-6 py-3 border-b text-xs font-medium text-gray-500 uppercase cursor-pointer"
                            onClick={sortReviews}
                        >
                            Ratings {sortOrder === "asc" ? "↑" : "↓"}
                        </th>
                        <th className="px-6 py-3 border-b text-xs font-medium text-gray-500 uppercase">Date</th>
                    </tr>
                    </thead>
                    <tbody className="">
                    {review.map((re) => (
                        <tr key={re.reviewId} className="hover:bg-gray-50 ">
                            <td className="px-6 py-4 border-b text-sm font-medium text-gray-900">#ID: {re.reviewId}</td>
                            <td className="px-6 py-4 border-b text-center">
                                <img src={re.product.pictureUrl} alt={re.product.pictureUrl}
                                     className="h-10 w-10 rounded-full mx-auto"/>
                                <p>{re.product.productName}</p>
                            </td>
                            <td className="px-6 py-4 border-b text-sm text-gray-500">
                                <p><span className="font-semibold">By {re.user.firstName + re.user.lastName}</span></p>
                                <p>{re.reviewText}</p>
                            </td>
                            <td className="px-6 py-4 border-b text-center">
                                <span className="text-green-500 font-semibold">{re.rating}</span>
                            </td>
                            <td className="px-6 py-4 border-b text-center">
                                {new Date(re.createAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
};
