import axios from "axios";
import {
    GET_ALL_PRODUCTS_FAILURE,
    GET_ALL_PRODUCTS_REQUEST,
    GET_ALL_PRODUCTS_SUCCESS, GET_PRODUCT_BY_ID_FAILURE,
    GET_PRODUCT_BY_ID_REQUEST, GET_PRODUCT_BY_ID_SUCCESS
} from "../Product/ActionType";
import {
    GET_ALL_CATEGORIES_FAILURE,
    GET_ALL_CATEGORIES_REQUEST,
    GET_ALL_CATEGORIES_SUCCESS,
    GET_CATEGORY_BY_ID_REQUEST
} from "./ActionType";

export const getAllCategoriesAction = () => {
    return async (dispatch) => {
        dispatch({ type: GET_ALL_CATEGORIES_REQUEST });
        try {
            const { data } = await axios.get("http://localhost:8080/api/v1/categories");
            dispatch({ type: GET_ALL_CATEGORIES_SUCCESS, payload: data });
            console.log("all catefories", data);
        } catch (error) {
            console.log("all err", error);
            dispatch({ type: GET_ALL_CATEGORIES_FAILURE, payload: error });
        }
    };
};

// Action to get product by ID
export const getCategoryById = (categoryId) => {
    return async (dispatch) => {
        dispatch({ type: GET_CATEGORY_BY_ID_REQUEST });
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/categories/${categoryId}`);
            dispatch({ type: GET_PRODUCT_BY_ID_SUCCESS, payload: response.data });
        } catch (error) {
            console.log("all err", error);
            dispatch({ type: GET_PRODUCT_BY_ID_FAILURE, payload: error });
        }
    };
};