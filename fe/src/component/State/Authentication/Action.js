import {
    GET_USER_FAILURE,
    GET_USER_REQUEST,
    GET_USER_SUCCESS, LOGIN_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS, LOGOUT, REGISTER_FAILURE,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAILURE,
    UPDATE_PROFILE_REQUEST, CHANGE_PASSWORD_REQUEST, CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_FAILURE
} from "./ActionType";
import axios from "axios";
import {API_URL} from "../../config/api";
import {jwtDecode} from "jwt-decode";
import axiosInstance, {refreshToken} from "../instance";

export const registerUser = (reqData) => async (dispatch) => {
    dispatch({ type: REGISTER_REQUEST });

        const {data}=await axios.post(`${API_URL}/api/v1/users/sign-up`,reqData.userData);

        reqData.navigate("/auth/login");
        dispatch({ type: REGISTER_SUCCESS, payload: data.jwt });
        console.log("registered",data);
}

export const resetPassword = (reqData) => async (dispatch) => {


    const {data}=await axios.post(`${API_URL}/api/v1/reset-password`,reqData.userData);

    console.log("registered",data);
}

export const loginUser = (reqData) => async (dispatch) => {

    dispatch({ type: LOGIN_REQUEST });

        const { data } = await axios.post("http://localhost:8080/api/v1/auth/login", reqData.userData);
        const token = jwtDecode(data.result.token);

        console.log("Response from API:", data);
        console.log("token", token);


        if (data.result.token) {
            localStorage.setItem('jwt', data.result.token);
            localStorage.setItem('tokenExpiration', Date.now() + token.exp * 1000);

            // Lấy role dưới dạng String, giả sử scope có thể là mảng
            const role = Array.isArray(token.scope) ? token.scope[0] : token.scope;
            const userId = token.userId;
            localStorage.setItem('role', role );
            localStorage.setItem('userId', userId);
            console.log("role", role);
        }



        // Điều hướng dựa trên vai trò
        if (token.scope === "ROLE_VENDOR") {
            console.log("shopId" , token.shopId);
            console.log("unverified shop Id,", token.unverifiedShopId);
            if(token.shopId){
                localStorage.setItem('shopId', token.shopId);
            }
            if(token.unverifiedShopId){
                localStorage.setItem('unverifiedShopId', token.unverifiedShopId);
            }

            reqData.navigate("/");
        } else if (token.scope === "ROLE_ADMIN") {
            console.log("ADMIN...", token.scope);
            reqData.navigate("/admin-dashboard");
        } else {
            reqData.navigate("");
        }

        dispatch({ type: LOGIN_SUCCESS, payload: data.result.token });
        console.log("logged in", data);
}

    export const updateUserById = (userId, user, jwt) => async (dispatch) => {
        dispatch({ type: UPDATE_PROFILE_REQUEST });
        try {
            const { data } = await axios.put(`${API_URL}/api/v1/users/profile/${userId}`, user, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            });

            dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data });
            return data; // Return the data if further  handling is needed
        } catch (error) {
            dispatch({ type: UPDATE_PROFILE_FAILURE, payload: error.message });
            console.error('Error updating user:', error);
        }
    };


export const changePassword = (userId, request, jwt) => async (dispatch) => {
    dispatch({ type: CHANGE_PASSWORD_REQUEST });
    try {
        const { data } = await axios.put(`http://localhost:8080/api/v1/users/change-password/${userId}`, request, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });

        dispatch({ type: CHANGE_PASSWORD_SUCCESS, payload: data });
        console.log("change",request)
        return data;

    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message;
        dispatch({
            type: CHANGE_PASSWORD_FAILURE,
            payload: errorMessage,
        });
        console.error('Error changin3g password:', error,errorMessage);
        throw new Error(errorMessage); // Propagate error to be handled in the component
    }
};


export const getUser = (jwt) => async (dispatch) => {
    dispatch({ type: GET_USER_REQUEST});
    try{
        const {data}=await axios.get(`${API_URL}/api/v1/users/my-info`,{
            headers:{
                Authorization: `Bearer ${jwt}`
            }
        });

        dispatch({ type: GET_USER_SUCCESS, payload: data.token });
        console.log("user data", data);
        return data;

    } catch (error) {
        dispatch({ type: GET_USER_FAILURE, payload: error });
        console.error('Error get user:', error);

    }
}

export const logout = (token) => async (dispatch) => {
    dispatch({ type: GET_USER_REQUEST});
    try{
        const {data}=await axios.post(`${API_URL}/api/v1/auth/logout`,token);

        localStorage.clear();
        dispatch({ type: LOGOUT, payload: data.jwt });

        console.log("logout");
    } catch (error) {
        console.error('Error:', error);

    }
}