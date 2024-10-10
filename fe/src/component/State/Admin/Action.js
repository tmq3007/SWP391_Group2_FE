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
