import axiosInstance from "../instance"; // Assuming axiosInstance is correctly configured in instance.js

export const getTotalShops = async () => {
    try {
        const response = await axiosInstance.get(`/api/v1/shops/total-shops`); // No need for API_URL since axiosInstance has the base URL configured
        console.log(response.data.result);
        return response.data;
    } catch (error) {
        console.error("Error fetching total shops", error);
        throw error;  // Optional: rethrow the error if you want to handle it elsewhere
    }
}

export const getTotalVendors = async () => {
    try {
        const response = await axiosInstance.get(`/api/v1/users/total-vendors`);
        return response.data;
    } catch (error) {
        console.error("Error fetching total vendors", error);
        throw error;
    }
}

export const getTotalOrders = async () => {
    try {
        const response = await axiosInstance.get(`/api/v1/orders/total-orders`);
        return response.data;
    } catch (error) {
        console.error("Error fetching total orders", error);
        throw error;
    }
}

export const getAllUsers = async () => {
    try {
        const response = await axiosInstance.get(`/api/v1/users`);
        return response.data;
    } catch (error) {
        console.error("Error fetching users", error);
        throw error;
    }
}

export const getAllVendors = async () => {
    try {
        const response = await axiosInstance.get(`/api/v1/users/all-vendors`);
        return response.data;
    } catch (error) {
        console.error("Error fetching vendors", error);
        throw error;
    }
}

export const getAllCustomers = async (jwt) => {
    try {
        const response = await axiosInstance.get(`/api/v1/users/all-customers`);
        return response.data;
    } catch (error) {
        console.error("Error fetching customers", error);
        throw error;
    }
}

export const banUser = async (userId) => {
    try {
        const response = await axiosInstance.put(`/api/v1/users/ban/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error banning user", error);
        throw error;
    }
}

export const unbanUser = async (userId) => {
    try {
        const response = await axiosInstance.put(`/api/v1/users/unban/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error unbanning user", error);
        throw error;
    }
}

export const addCategory = async (newCategory) => {
    try {
        const response = await axiosInstance.post(`/api/v1/categories`, newCategory);
        return response.data;
    } catch (error) {
        console.error("Error adding category", error);
        throw error;
    }
}

export const getAllCategoriesAdmin = async () => {
    try {
        const response = await axiosInstance.get(`/api/v1/categories`);
        return response.data;
    } catch (error) {
        console.error("Error fetching categories", error);
        throw error;
    }
}

export const updateCategory = async (categoryId, updatedCategory) => {
    try {
        const response = await axiosInstance.patch(`/api/v1/categories/${categoryId}`, updatedCategory);
        return response.data;
    } catch (error) {
        console.error("Error updating category", error);
        throw error;
    }
}

export const getCategoryById = async (categoryId) => {
    try {
        const response = await axiosInstance.get(`/api/v1/categories/${categoryId}`);
        return response.data;
    }
    catch (error) {
        console.error("Error fetching category", error);
        throw error;
    }
}

export const deleteCategory = async (categoryId) => {
    try {
        const response = await axiosInstance.delete(`/api/v1/categories/${categoryId}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting category", error);
        throw error;
    }
}

export const getAllUnverifiedShop = async () => {
    try {
        const response = await axiosInstance.get(`/api/v1/get-all-unverified-shops`);
        return response.data;
    } catch (error) {
        console.error("Error fetching unverified shop", error);
        throw error;
    }
}

export const verifyShop = async (shopId) => {
    try {
        const response = await axiosInstance.put(`/api/v1/verify-shop/${shopId}`);
        return response.data;
    } catch (error) {
        console.error("Error verifying shop", error);
        throw error;
    }
}

export const rejectShop = async (shopId) => {
    try {
        const response = await axiosInstance.put(`/api/v1/reject-shop/${shopId}`);
        return response.data;
    } catch (error) {
        console.error("Error rejecting shop", error);
        throw error;
    }
}

export const announceVerifyShop = async (email) => {
    try {
        const response = await axiosInstance.post(`/api/v1/announce-verify-shop`, email);
        return response.data;
    } catch (error) {
        console.error("Error announcing shop verification", error);
    }
}

export const announceRejectShop = async (data) => {
    try {
        const response = await axiosInstance.post(`/api/v1/announce-reject-shop`, data);
        return response.data;
    } catch (error) {
        console.error("Error announcing shop rejection", error);
    }
}