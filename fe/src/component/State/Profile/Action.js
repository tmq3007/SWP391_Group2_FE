import{
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAILURE

} from "./ActionType";
import axios  from "axios";
import {API_URL} from "../../config/api";
import {jwtDecode} from "jwt-decode"
export const updateUserById = (userId, profileData, jwt) => async (dispatch) => {
    dispatch({ type: UPDATE_PROFILE_REQUEST });
    try {
        const { data } = await axios.put(`${API_URL}/api/v1/users/${userId}`, profileData, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });

        dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data });
        return data; // Return the data if further handling is needed
    } catch (error) {
        dispatch({ type: UPDATE_PROFILE_FAILURE, payload: error.message });
        console.error('Error updating user:', error);
    }
};