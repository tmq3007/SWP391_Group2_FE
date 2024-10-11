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
