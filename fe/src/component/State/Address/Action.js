import axios from 'axios';
export const addAddress = (addressData, jwt) => async (dispatch) => {
    try {
        const response = await axios.post(`http://localhost:8080/api/v1/addresses`, addressData, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });

        // Dispatch a success action with the response data
        dispatch({
            type: 'ADD_ADDRESS_SUCCESS',
            payload: response.data,
        });
    } catch (error) {
        console.error("Error fetching user data:", error);
        // Dispatch a failure action with the error message
        dispatch({
            type: 'ADD_ADDRESS_FAILURE',
            payload: error.message,
        });
    }
};