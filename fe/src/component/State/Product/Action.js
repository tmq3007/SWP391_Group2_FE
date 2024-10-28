// Action to get all products
import {
    GET_ALL_PRODUCTS_FAILURE,
    GET_ALL_PRODUCTS_REQUEST,
    GET_ALL_PRODUCTS_SUCCESS, GET_PRODUCT_BY_ID_FAILURE,
    GET_PRODUCT_BY_ID_REQUEST, GET_PRODUCT_BY_ID_SUCCESS,
    UPDATE_PRODUCT_BY_ID_REQUEST, UPDATE_PRODUCT_BY_ID_SUCCESS,
    UPDATE_PRODUCT_BY_ID_FAILURE, DELETE_PRODUCT_BY_ID_REQUEST,
    DELETE_ALL_PRODUCTS_REQUEST, DELETE_ALL_PRODUCTS_SUCCESS,
    DELETE_ALL_PRODUCTS_FAILURE, DELETE_PRODUCT_BY_ID_SUCCESS,
    DELETE_PRODUCT_BY_ID_FAILURE, CREATE_PRODUCT_REQUEST,
    CREATE_PRODUCT_SUCCESS, CREATE_PRODUCT_FAILURE,
    GET_ALL_PRODUCT_BY_SHOP_ID_SUCCESS, GET_ALL_PRODUCT_BY_SHOP_ID_FAILURE,
    GET_ALL_PRODUCT_BY_SHOP_ID_REQUEST

} from "./ActionType";
import {api} from "../../config/api";
import axios from "axios";

export const createProductAction = (reqData) => async (dispatch) => {
    const jwt = localStorage.getItem('jwt');

    if (!jwt) {
        console.error("No JWT found. Please log in.");
        return;
    }

    dispatch({ type: CREATE_PRODUCT_REQUEST });
    try {
        const { data } = await axios.post("http://localhost:8080/api/v1/products", reqData, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            }
        });
        dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: data });
        console.log("Product created successfully", data);
    } catch (error) {
        console.error("Error creating product:", error.response ? error.response.data : error.message);
        dispatch({ type: CREATE_PRODUCT_FAILURE, payload: error });
    }
};


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

export const getAllProductsByShopIdAction = (shopId) => async (dispatch) => {
    const jwt = localStorage.getItem('jwt');

    if (!jwt) {
        console.error("No JWT found. Please log in.");
        return;
    }

    dispatch({ type: GET_ALL_PRODUCT_BY_SHOP_ID_REQUEST });
    try {
        const { data } = await axios.get(`http://localhost:8080/api/v1/products/get-all-product-by-shopId/${shopId}`, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            }
        });
        dispatch({ type: GET_ALL_PRODUCT_BY_SHOP_ID_SUCCESS, payload: data });
        console.log("All products fetched successfully", data);
    } catch (error) {
        console.error("Error fetching products by shop ID:", error.response ? error.response.data : error.message);
        dispatch({ type: GET_ALL_PRODUCT_BY_SHOP_ID_FAILURE, payload: error });
    }
};


// Action to get product by ID
export const getProductById = (productId) => async (dispatch) => {
    const jwt = localStorage.getItem('jwt');

    if (!jwt) {
        console.error("No JWT found. Please log in.");
        return;
    }

    dispatch({ type: GET_PRODUCT_BY_ID_REQUEST });
    try {
        const { data } = await axios.get(`http://localhost:8080/api/v1/products/${productId}`, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });
        dispatch({ type: GET_PRODUCT_BY_ID_SUCCESS, payload: data });
        console.log("Product fetched successfully", data);
    } catch (error) {
        console.error("Error fetching product:", error.response ? error.response.data : error.message);
        dispatch({ type: GET_PRODUCT_BY_ID_FAILURE, payload: error });
    }
};


// Update product by ID action
export const updateProductById = (productId, updatedProductData) => async (dispatch) => {
    const jwt = localStorage.getItem('jwt');

    if (!jwt) {
        console.error("No JWT found. Please log in.");
        return;
    }

    dispatch({ type: UPDATE_PRODUCT_BY_ID_REQUEST });
    try {
        const { data } = await axios.patch(`http://localhost:8080/api/v1/products/${productId}`, updatedProductData, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });
        dispatch({ type: UPDATE_PRODUCT_BY_ID_SUCCESS, payload: data });
        console.log("Product updated successfully", data);
    } catch (error) {
        console.error("Error updating product:", error.response ? error.response.data : error.message);
        dispatch({ type: UPDATE_PRODUCT_BY_ID_FAILURE, payload: error });
    }
};


// Action to delete product by ID
export const deleteProductById = (productId) => {
    return async (dispatch) => {
        dispatch({ type: DELETE_PRODUCT_BY_ID_REQUEST});
        try {
            const response = await axios.delete(`http://localhost:8080/api/v1/products/${productId}`);
            dispatch({ type: DELETE_PRODUCT_BY_ID_SUCCESS, payload: response.data });
        } catch (error) {
            console.log("all err", error);
            dispatch({ type: DELETE_PRODUCT_BY_ID_FAILURE, payload: error });
        }
    };
};

// Action to delete all product
export const deleteAllProductAction = () => {
    return async (dispatch) => {
        dispatch({ type: DELETE_ALL_PRODUCTS_REQUEST});
        try {
            const response = await axios.delete(`http://localhost:8080/api/v1/products`);
            dispatch({ type: DELETE_ALL_PRODUCTS_SUCCESS, payload: response.data });
        } catch (error) {
            console.log("all err", error);
            dispatch({ type: DELETE_ALL_PRODUCTS_FAILURE, payload: error });
        }
    };
};

