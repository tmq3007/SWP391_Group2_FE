import {
    FIND_CART_REQUEST,
    FIND_CART_SUCCESS,
    FIND_CART_FAILURE,
    CLEAR_CART_REQUEST,
    CLEAR_CART_SUCCESS,
    CLEAR_CART_FAILURE,
    ADD_ITEM_TO_CART_REQUEST,
    ADD_ITEM_TO_CART_SUCCESS,
    ADD_ITEM_TO_CART_FAILURE,
    UPDATE_CARTITEM_REQUEST,
    UPDATE_CARTITEM_SUCCESS,
    UPDATE_CARTITEM_FAILURE,
    REMOVE_CARTITEM_REQUEST,
    REMOVE_CARTITEM_SUCCESS,
    REMOVE_CARTITEM_FAILURE,
    GET_ALL_CART_ITEMS_REQUEST,
    GET_ALL_CART_ITEMS_SUCCESS,
    GET_ALL_CART_ITEMS_FAILURE,
} from './ActionType';
import axios from 'axios';

// API URL
const API_URL = 'http://localhost:8080/api/v1/cart';

// Thêm hàm để tìm giỏ hàng
export const findCart = (userId,jwt) => async (dispatch) => {
    dispatch({ type: FIND_CART_REQUEST });
    try {
        const response = await axios.get(`${API_URL}/${userId}`,{
            headers:{
                Authorization: `Bearer ${jwt}`
            }
        });
        dispatch({ type: FIND_CART_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: FIND_CART_FAILURE, payload: error.response.data.message });
    }
};

// Thêm hàm để thêm sản phẩm vào giỏ hàng
export const addItemToCart = (userId,item, jwt) => async (dispatch) => {
    dispatch({ type: ADD_ITEM_TO_CART_REQUEST });
    try {
        const response = await axios.put(`${API_URL}/add/${userId}`, item,{
            headers:{
                Authorization: `Bearer ${jwt}`
            }
        });
        dispatch({ type: ADD_ITEM_TO_CART_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: ADD_ITEM_TO_CART_FAILURE, payload: error.response.data.message });
    }
};

// Thêm hàm để cập nhật sản phẩm trong giỏ hàng
export const updateCartItem = (userId, cartItemId, item,jwt) => async (dispatch) => {
    dispatch({ type: UPDATE_CARTITEM_REQUEST });
    try {
        const response = await axios.put(`${API_URL}/delete/user/${userId}/cartItem/${cartItemId}`, item,{
            headers:{
                Authorization: `Bearer ${jwt}`
            }
        });
        dispatch({ type: UPDATE_CARTITEM_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: UPDATE_CARTITEM_FAILURE, payload: error.response.data.message });
    }
};

// Thêm hàm để xóa sản phẩm trong giỏ hàng
export const removeCartItem = (userId, cartItemId,jwt) => async (dispatch) => {
    dispatch({ type: REMOVE_CARTITEM_REQUEST });
    try {
        const response = await axios.delete(`${API_URL}/delete/user/${userId}/cartItem/${cartItemId}`,{
            headers:{
                Authorization: `Bearer ${jwt}`
            }
        });
        dispatch({ type: REMOVE_CARTITEM_SUCCESS, payload: cartItemId });
    } catch (error) {
        dispatch({ type: REMOVE_CARTITEM_FAILURE, payload: error.response.data.message });
    }
};

// Thêm hàm để xóa giỏ hàng (nếu cần)
export const clearCart = () => async (dispatch) => {
    dispatch({ type: CLEAR_CART_REQUEST });
    try {
        // Gọi API xóa giỏ hàng nếu có
        // const response = await axios.delete(`${API_URL}/clear`);
        dispatch({ type: CLEAR_CART_SUCCESS });
    } catch (error) {
        dispatch({ type: CLEAR_CART_FAILURE, payload: error.response.data.message });
    }
};

// Thêm hàm để lấy tất cả sản phẩm trong giỏ hàng (nếu cần)
export const getAllCartItems = (userId,jwt) => async (dispatch) => {
    dispatch({ type: GET_ALL_CART_ITEMS_REQUEST });
    try {
        const response = await axios.get(`${API_URL}/${userId}/items`,{
            headers:{
                Authorization: `Bearer ${jwt}`
            }
        });
        dispatch({ type: GET_ALL_CART_ITEMS_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: GET_ALL_CART_ITEMS_FAILURE, payload: error.response.data.message });
    }
};
