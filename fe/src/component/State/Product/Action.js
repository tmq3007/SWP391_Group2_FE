// Action to get all products
import {
    GET_ALL_PRODUCTS_FAILURE,
    GET_ALL_PRODUCTS_REQUEST,
    GET_ALL_PRODUCTS_SUCCESS, GET_PRODUCT_BY_ID_FAILURE,
    GET_PRODUCT_BY_ID_REQUEST, GET_PRODUCT_BY_ID_SUCCESS
} from "./ActionType";
import axios from "axios";
import {api} from "../../config/api";
export const getAllProductsAction = () => {
    return async (dispatch) => {
        dispatch({ type: GET_ALL_PRODUCTS_REQUEST });
        try {
            const { data } = await axios.get("http://localhost:8080/api/v1/products");
            dispatch({ type: GET_ALL_PRODUCTS_SUCCESS, payload: data });
            console.log("all products", data);
        } catch (error) {
            console.log("all err", error);
            dispatch({ type: GET_ALL_PRODUCTS_FAILURE, payload: error });
        }
    };
};

// Action to get product by ID
export const getProductById = (productId) => {
    return async (dispatch) => {
        dispatch({ type: GET_PRODUCT_BY_ID_REQUEST });
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/products/${productId}`); // Không cần token
            dispatch({ type: GET_PRODUCT_BY_ID_SUCCESS, payload: response.data });
        } catch (error) {
            console.log("all err", error);
            dispatch({ type: GET_PRODUCT_BY_ID_FAILURE, payload: error });
        }
    };
};
