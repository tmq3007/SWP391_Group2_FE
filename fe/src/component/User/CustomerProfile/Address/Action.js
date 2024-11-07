import axios from "axios";

export const getAddressData = async (userId,jwt) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/v1/addresses/user/${userId}`, {
            headers: {
                Authorization:`Bearer ${jwt}`
            }
        });
        return response.data;
    } catch (error) {
        console.log("Error fetching user data:", error);
        throw error;
    }
};
export const deleteAddress = async (id,jwt) => {
    try {
        const response = await axios.delete(`http://localhost:8080/api/v1/addresses/${id}`, {
            headers: {
                Authorization:`Bearer ${jwt}`
            }
        });
        return response.data;
    } catch (error) {
        console.log("Error fetching user data:", error);
        throw error;
    }
};
